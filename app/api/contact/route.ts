import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
	const { name, phone, email, message } = await request.json().catch(() => ({}));

	const trimmed = {
		name: String(name ?? '').trim(),
		phone: String(phone ?? '').trim(),
		email: String(email ?? '').trim(),
		message: String(message ?? '').trim(),
	};

	const MAX_NAME = 80;
	const MAX_MESSAGE = 500;
	if (!trimmed.name || !trimmed.phone || !trimmed.email || !trimmed.message) {
		return NextResponse.json({ ok: false, error: 'Eksik alanlar' }, { status: 400 });
	}
	if (!isValidEmail(trimmed.email)) {
		return NextResponse.json({ ok: false, error: 'Geçersiz e‑posta' }, { status: 400 });
	}
	if (trimmed.name.length > MAX_NAME || trimmed.message.length > MAX_MESSAGE) {
		return NextResponse.json({ ok: false, error: 'Karakter sınırı aşıldı' }, { status: 400 });
	}

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (supabaseUrl && supabaseServiceKey) {
		try {
			const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
			const { error } = await supabase.from('contact_messages').insert({
				name: trimmed.name,
				phone: trimmed.phone,
				email: trimmed.email,
				message: trimmed.message,
			});
			if (error) {
				return NextResponse.json({ ok: false, error: 'Veritabanı hatası' }, { status: 500 });
			}
			return NextResponse.json({ ok: true });
		} catch {
			return NextResponse.json({ ok: false, error: 'Veritabanına ulaşılamıyor' }, { status: 502 });
		}
	}

	// Supabase yoksa sadece başarı dön (geliştirme amaçlı)
	return NextResponse.json({ ok: true });
}


