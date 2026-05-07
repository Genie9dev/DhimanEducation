import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Admin client using the service_role key.
 * ONLY use this in server-side code (Server Actions, Route Handlers).
 * NEVER import this in client components — it bypasses Row Level Security.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
