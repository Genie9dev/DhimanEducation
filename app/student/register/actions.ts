'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function registerStudent(prevState: any, formData: FormData) {
  // Use admin client for DB lookups (bypasses RLS for unauthenticated users)
  const adminSupabase = createAdminClient()
  // Use regular server client for Auth operations (creates the user session)
  const supabase = await createClient()

  const code = (formData.get('code') as string).trim().toUpperCase()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (password !== confirmPassword) {
    return { error: "Passwords do not match.", success: false }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters.", success: false }
  }

  // 1. Find the student record for this code (admin client bypasses RLS)
  const { data: student, error: lookupError } = await adminSupabase
    .from('students')
    .select('id, name, email, auth_id')
    .eq('registration_code', code)
    .single()

  if (lookupError || !student) {
    return { error: "Invalid registration code. Please check with your teacher.", success: false }
  }

  // 2. SECURITY CHECK: If auth_id is already set, the code has been used
  if (student.auth_id) {
    return { error: "This registration code has already been used. Please contact Dhiman Education.", success: false }
  }

  // 3. Create the Auth user with email auto-confirmed (admin bypasses email verification)
  // Students are already vetted by the Admin, so no email confirmation needed.
  const { data: authData, error: signUpError } = await adminSupabase.auth.admin.createUser({
    email: student.email,
    password,
    email_confirm: true,
  })

  if (signUpError) {
    return { error: signUpError.message, success: false }
  }

  // 4. Link the Supabase Auth user ID to the student record — LOCKS the code permanently
  if (authData.user) {
    await adminSupabase
      .from('students')
      .update({ auth_id: authData.user.id })
      .eq('id', student.id)
  }

  return {
    success: true,
    studentName: student.name,
    error: null,
  }
}
