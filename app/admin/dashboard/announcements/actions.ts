'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addAnnouncement(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase
    .from('announcements')
    .insert([{ title, content }])

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/admin/dashboard/announcements')
  revalidatePath('/student/dashboard')
  
  return { success: true, message: "Announcement posted successfully!" }
}
