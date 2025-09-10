import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type SubscribeBody = { email?: string };
type GsResponse = { ok?: boolean; error?: string };
function isGsResponse(value: unknown): value is GsResponse {
	return typeof value === 'object' && value !== null;
}

export async function POST(request: Request) {
	let email = '';
	try {
		const parsed = (await request.json()) as Partial<SubscribeBody>;
		email = String(parsed?.email ?? '').trim();
	} catch {}
	if (!isValidEmail(email)) {
		return NextResponse.json({ ok: false, error: 'Geçersiz e‑posta' }, { status: 400 });
	}
	// If a Google Apps Script Web App URL is provided, forward to it
	const gsUrl = process.env.GS_WEBAPP_URL;
	if (gsUrl) {
		try {
			const resp = await fetch(gsUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});
			const dataUnknown: unknown = await resp.json().catch(() => ({}));
			const data: GsResponse = isGsResponse(dataUnknown) ? (dataUnknown as GsResponse) : {};
			if (!resp.ok || data.ok === false) {
				return NextResponse.json({ ok: false, error: data.error || 'Dış servis hatası' }, { status: 502 });
			}
			return NextResponse.json({ ok: true });
		} catch {
			return NextResponse.json({ ok: false, error: 'Dış servise ulaşılamıyor' }, { status: 502 });
		}
	}

	// If Supabase is configured, write to Supabase
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (supabaseUrl && supabaseServiceKey) {
		try {
			const supabase = createClient(supabaseUrl, supabaseServiceKey, {
				auth: { persistSession: false },
			});
			// Ensure table exists (idempotent attempt)
			try {
				await supabase.rpc('noop');
			} catch {}
			const { error } = await supabase.from('subscribers').insert({ email });
			if (error && !String(error.message || '').toLowerCase().includes('duplicate')) {
				return NextResponse.json({ ok: false, error: 'Veritabanı hatası' }, { status: 500 });
			}
			return NextResponse.json({ ok: true });
		} catch {
			return NextResponse.json({ ok: false, error: 'Veritabanına ulaşılamıyor' }, { status: 502 });
		}
	}

	// Fallback: local JSON (development only)
	const dataDir = path.join(process.cwd(), 'data');
	const dataFile = path.join(dataDir, 'subscribers.json');
	try {
		await fs.mkdir(dataDir, { recursive: true });
		let list: string[] = [];
		try {
			const raw = await fs.readFile(dataFile, 'utf8');
			list = JSON.parse(raw);
			if (!Array.isArray(list)) list = [];
		} catch {}
		if (!list.includes(email)) {
			list.push(email);
			await fs.writeFile(dataFile, JSON.stringify(list, null, 2), 'utf8');
		}
		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json({ ok: false, error: 'Sunucu hatası' }, { status: 500 });
	}
}


