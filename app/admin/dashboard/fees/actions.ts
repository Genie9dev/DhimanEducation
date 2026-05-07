'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addFeeRecord(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const student_id = formData.get('student_id') as string
  const amount = parseInt(formData.get('amount') as string, 10)
  const due_date = formData.get('due_date') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('fees')
    .insert([{ student_id, amount, due_date, status }])

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/admin/dashboard/fees')
  revalidatePath('/admin/dashboard')
  
  return { success: true, message: "Fee record added successfully!" }
}

export async function updateFeeStatus(id: string, newStatus: string) {
  const supabase = await createClient()
  
  await supabase.from('fees').update({ status: newStatus }).eq('id', id)
  
  revalidatePath('/admin/dashboard/fees')
  revalidatePath('/admin/dashboard')
}
