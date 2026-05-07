import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import EnterMarksClient from './EnterMarksClient'

export default async function EnterMarksPage({ searchParams }: { searchParams: Promise<{ testId: string }> }) {
  const { testId } = await searchParams
  const adminSupabase = createAdminClient()

  // Fetch the test details
  const { data: test } = await adminSupabase
    .from('tests')
    .select('*')
    .eq('id', testId)
    .single()

  if (!test) notFound()

  // Fetch all students in this standard
  const { data: students } = await adminSupabase
    .from('students')
    .select('id, name')
    .eq('standard', test.standard)
    .order('name', { ascending: true })

  // Fetch existing results for this test
  const { data: existingResults } = await adminSupabase
    .from('test_results')
    .select('student_id, marks_obtained')
    .eq('test_id', testId)

  const resultsMap = Object.fromEntries(
    (existingResults || []).map(r => [r.student_id, r.marks_obtained])
  )

  return (
    <EnterMarksClient
      test={test}
      students={students || []}
      resultsMap={resultsMap}
    />
  )
}

