'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function generateRegistrationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no ambiguous chars like 0/O, 1/I
  let code = 'DE-' // Dhiman Education prefix
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function addStudent(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const standard = formData.get('standard') as string
  const phone = formData.get('phone') as string

  // Generate a unique registration code
  const registration_code = generateRegistrationCode()

  const { error } = await supabase
    .from('students')
    .insert([{ name, email, standard, phone, status: 'Active', registration_code }])

  if (error) {
    return { error: error.message, success: false, registration_code: null }
  }

  revalidatePath('/admin/dashboard/students')
  revalidatePath('/admin/dashboard')
  
  return { success: true, message: "Student added successfully!", registration_code }
}
