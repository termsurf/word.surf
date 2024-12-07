import { createServerClient } from '@supabase/ssr'
import Cookies from './cookies'

export async function createClient(cookies: Cookies) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies.getInput()
        },
        setAll(cookiesToSet) {
          cookies.setOutput(cookiesToSet)
        },
      },
    },
  )
}
