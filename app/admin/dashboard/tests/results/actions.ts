'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'

export async function saveMarks(prevState: any, formData: FormData) {
  const adminSupabase = createAdminClient()

  const test_id = formData.get('test_id') as string
  const entries = JSON.parse(formData.get('entries') as string) as { student_id: string; marks: number }[]

  const upsertData = entries
    .filter(e => !isNaN(e.marks) && e.marks >= 0)
    .map(e => ({
      test_id,
      student_id: e.student_id,
      marks_obtained: e.marks,
    }))

  if (upsertData.length === 0) {
    return { error: 'No valid marks entered.', success: false }
  }

  const { error } = await adminSupabase
    .from('test_results')
    .upsert(upsertData, { onConflict: 'test_id,student_id' })

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/admin/dashboard/tests')
  revalidatePath('/student/dashboard/tests')

  return { success: true, error: "" }
}
