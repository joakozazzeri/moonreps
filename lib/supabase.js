import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificar si las variables de entorno están configuradas
const isSupabaseConfigured = supabaseUrl && supabaseKey

let supabase = null

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client initialized successfully')
  } catch (error) {
    console.error('Error initializing Supabase client:', error)
    supabase = null
  }
} else {
  console.warn('Supabase environment variables not configured. Using fallback data.')
}

export { supabase, isSupabaseConfigured }
