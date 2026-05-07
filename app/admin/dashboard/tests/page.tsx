"use client";

import { useState, useActionState, useEffect } from "react";
import { FileText, Plus, AlertCircle, Calendar, ClipboardList, Pencil, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { addTest, updateTestDate } from "./actions";
import { createBrowserClient } from '@supabase/ssr'
import Link from "next/link";

const initialState = {
  error: "",
  success: false,
  message: ""
};

export default function TestsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  
  const [state, formAction, isPending] = useActionState(addTest, initialState);

  const fetchTests = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase.from('tests').select('*').order('date', { ascending: false });
    if (data) setTests(data);
    setLoading(false);
  };

  useEffect(() => { fetchTests(); }, []);
  useEffect(() => { if (state.success) { setIsAdding(false); fetchTests(); } }, [state.success]);

  const startEdit = (test: any) => {
    setEditingId(test.id);
    // Convert stored UTC to local datetime-local format
    const local = new Date(test.date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    setEditDate(
      `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}T${pad(local.getHours())}:${pad(local.getMinutes())}`
    );
  };

  const handleSaveDate = async (id: string) => {
    setSaving(true);
    await updateTestDate(id, editDate);
    setSaving(false);
    setEditingId(null);
    setSavedId(id);
    fetchTests();
    setTimeout(() => setSavedId(null), 2000);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Test Portal</h1>
          <p className="text-foreground/60">Schedule offline tests and manage syllabus</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="mr-2 h-4 w-4" /> Schedule Test
        </Button>
      </div>

      {isAdding && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Schedule New Test</h2>
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="bg-red-500/10 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" /> {state.error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Test Title</label>
                <input name="title" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" placeholder="e.g. Maths Chapter 4 Unit Test" />
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
                <label className="block text-sm font-medium mb-1 text-foreground/80">Date & Time</label>
                <input type="datetime-local" name="date" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Total Marks</label>
                <input type="number" name="total_marks" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" placeholder="e.g. 50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Syllabus / Topics</label>
              <textarea name="syllabus" required rows={3} className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none" placeholder="List the topics covered in this test..."></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>{isPending ? "Scheduling..." : "Schedule Test"}</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary/5">
              <tr className="border-b border-border text-foreground/60">
                <th className="p-4 font-medium">Test Title</th>
                <th className="p-4 font-medium">Standard</th>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium text-center">Total Marks</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-foreground/50">Loading tests...</td>
                </tr>
              ) : tests.length > 0 ? (
                tests.map((test) => (
                  <tr key={test.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-4 font-medium">
                      {test.title}
                      <div className="text-xs text-foreground/50 mt-1 truncate max-w-xs">{test.syllabus}</div>
                    </td>
                    <td className="p-4 text-foreground/70">{test.standard}</td>
                    <td className="p-4">
                      {editingId === test.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="datetime-local"
                            value={editDate}
                            onChange={e => setEditDate(e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                          <button
                            onClick={() => handleSaveDate(test.id)}
                            disabled={saving}
                            className="p-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                            title="Save"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                            title="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-foreground/40" />
                          <span className={savedId === test.id ? "text-green-600 font-medium" : "text-foreground/70"}>
                            {new Date(test.date).toLocaleString()}
                          </span>
                          <button
                            onClick={() => startEdit(test)}
                            className="ml-1 p-1 rounded hover:bg-primary/10 text-foreground/40 hover:text-primary transition-colors"
                            title="Edit date"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-foreground/70 text-center">{test.total_marks}</td>
                    <td className="p-4 text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/dashboard/tests/results?testId=${test.id}`}>
                          <ClipboardList className="mr-2 h-4 w-4" /> Enter Marks
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-foreground/50">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No tests scheduled. Click "Schedule Test" to plan an upcoming exam.</p>
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

