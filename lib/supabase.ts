import { createClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://htzcbqevjyxyiyvqnujj.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0emNicWV2anl4eWl5dnFudWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMjc5NTEsImV4cCI6MjA3MjkwMzk1MX0.8QZqH8GYzn7TtBlLEmsV-l0_UCUQztBgKfeLpWRysh1Y'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0emNicWV2anl4eWl5dnFudWpqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzMyNzk1MSwiZXhwIjoyMDcyOTAzOTUxfQ.SQqH8GYzn7TtBlLEmsV-l0_UCUQztBgKfeLpWRysh1Y'

// Debug: Environment variables kontrolü
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')
console.log('Full Anon Key:', supabaseAnonKey)

// Client-side client (for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for API routes with service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
