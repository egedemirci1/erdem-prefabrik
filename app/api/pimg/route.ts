import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

function getContentTypeByExt(ext: string): string {
	const e = ext.toLowerCase();
	if (e === '.jpg' || e === '.jpeg') return 'image/jpeg';
	if (e === '.png') return 'image/png';
	if (e === '.webp') return 'image/webp';
	if (e === '.gif') return 'image/gif';
	return 'application/octet-stream';
}

export async function GET(request: Request) {
	const url = new URL(request.url);
	const raw = url.searchParams.get('path') || '';
	// Expect a public-relative path like "/images/projects/.../file.jpg"
	// Normalize and guard against path traversal
    const rel = raw.replace(/^\/+/, '');
	if (!rel.startsWith('images/')) {
		return new NextResponse('Bad Request', { status: 400 });
	}
	const abs = path.join(process.cwd(), 'public', rel);
    try {
        const file = await fs.readFile(abs);
        const contentType = getContentTypeByExt(path.extname(abs));
        const bytes = new Uint8Array(file);
        return new NextResponse(bytes, { headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=604800, immutable' } });
    } catch {
		return new NextResponse('Not Found', { status: 404 });
	}
}


