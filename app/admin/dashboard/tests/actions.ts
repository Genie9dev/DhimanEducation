'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addTest(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const standard = formData.get('standard') as string
  const date = formData.get('date') as string
  const syllabus = formData.get('syllabus') as string
  const total_marks = parseInt(formData.get('total_marks') as string, 10)

  const { error } = await supabase
    .from('tests')
    .insert([{ title, standard, date, syllabus, total_marks }])

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/admin/dashboard/tests')
  revalidatePath('/admin/dashboard')
  revalidatePath('/student/dashboard')
  
  return { success: true, message: "Test scheduled successfully!" }
}

export async function updateTestDate(id: string, newDate: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('tests')
    .update({ date: newDate })
    .eq('id', id)

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/admin/dashboard/tests')
  revalidatePath('/student/dashboard/tests')
  revalidatePath('/student/dashboard')

  return { success: true }
}
