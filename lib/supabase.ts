import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Build zamanında (Vercel vb.) env yoksa throw etme; export null olur, form runtime'da uyarı gösterir
const hasClientEnv = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase: SupabaseClient | null = hasClientEnv
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

export const supabaseAdmin: SupabaseClient | null =
  hasClientEnv && supabaseServiceKey
    ? createClient(supabaseUrl!, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    : null
