"use client";

import { useState, useActionState, useEffect } from "react";
import { Users, Plus, AlertCircle, Copy, CheckCircle2, Key } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { addStudent } from "./actions";
import { createBrowserClient } from '@supabase/ssr'

const initialState = {
  error: "",
  success: false,
  message: "",
  registration_code: null as string | null,
};

export default function StudentsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [latestCode, setLatestCode] = useState<string | null>(null);
  
  const [state, formAction, isPending] = useActionState(addStudent, initialState);

  const fetchStudents = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (state.success && state.registration_code) {
      setLatestCode(state.registration_code);
      setIsAdding(false);
      fetchStudents();
    }
  }, [state.success, state.registration_code]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Students Directory</h1>
          <p className="text-foreground/60">Manage all enrolled students</p>
        </div>
        <Button onClick={() => { setIsAdding(!isAdding); setLatestCode(null); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      {/* New Code Alert - shown after adding a student */}
      {latestCode && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="bg-green-500/20 p-3 rounded-xl">
            <Key className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-green-700 dark:text-green-400">Student Added Successfully!</p>
            <p className="text-sm text-foreground/70 mt-1">Share this Registration Code with the student. It can only be used <strong>once</strong>.</p>
            <div className="mt-2 flex items-center gap-3">
              <code className="bg-background border border-border text-primary font-mono font-bold px-4 py-2 rounded-lg text-lg tracking-widest">
                {latestCode}
              </code>
              <Button variant="outline" size="sm" onClick={() => copyCode(latestCode)}>
                {copiedCode === latestCode ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copiedCode === latestCode ? " Copied!" : " Copy"}
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLatestCode(null)}>Dismiss</Button>
        </div>
      )}

      {isAdding && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add New Student</h2>
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="bg-red-500/10 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" /> {state.error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Full Name</label>
                <input name="name" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" placeholder="e.g. Rahul Patel" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Email</label>
                <input name="email" type="email" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" placeholder="e.g. rahul@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Standard</label>
                <select name="standard" required className="w-full px-4 py-2 rounded-lg border border-border bg-background">
                  <option value="Std 8">Std 8</option>
                  <option value="Std 9">Std 9</option>
                  <option value="Std 10">Std 10</option>
                  <option value="11 Commerce">11 Commerce</option>
                  <option value="12 Commerce">12 Commerce</option>
                  <option value="11 Arts">11 Arts</option>
                  <option value="12 Arts">12 Arts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Phone</label>
                <input name="phone" className="w-full px-4 py-2 rounded-lg border border-border bg-background" placeholder="e.g. 9876543210" />
              </div>
            </div>
            <p className="text-xs text-foreground/50 flex items-center gap-1"><Key className="h-3 w-3" /> A unique, one-time Registration Code will be automatically generated after saving.</p>
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Save & Generate Code"}</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary/5">
              <tr className="border-b border-border text-foreground/60">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Standard</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Registration Code</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">Loading students...</td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4 text-foreground/70">{student.standard}</td>
                    <td className="p-4 text-foreground/70">{student.email}</td>
                    <td className="p-4 text-foreground/70">{student.phone || '-'}</td>
                    <td className="p-4">
                      {student.registration_code ? (
                        <div className="flex items-center gap-2">
                          <code className={`font-mono text-xs px-2 py-1 rounded ${student.auth_id ? 'bg-green-500/10 text-green-600 line-through' : 'bg-primary/10 text-primary'}`}>
                            {student.registration_code}
                          </code>
                          {!student.auth_id && (
                            <button onClick={() => copyCode(student.registration_code)} title="Copy code">
                              {copiedCode === student.registration_code ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-foreground/40 hover:text-primary" />}
                            </button>
                          )}
                          {student.auth_id && <span className="text-xs text-green-600 font-medium">✓ Registered</span>}
                        </div>
                      ) : (
                        <span className="text-foreground/30 text-xs">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No students found. Add your first student above!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

