import { createClient } from '@supabase/supabase-js'

// Environment variables — .env dosyasından okunur, hardcoded fallback yoktur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase bağlantı bilgileri eksik. Lütfen .env dosyasında NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY değerlerini tanımlayın.'
  )
}

// Client-side client (for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for API routes with service role)
// Service key olmadan da çalışır, sadece admin işlemleri yapılamaz
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null
