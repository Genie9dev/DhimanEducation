"use client";

import { useState, useActionState } from "react";
import { CheckCircle2, AlertCircle, ArrowLeft, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { saveMarks } from "./actions";
import Link from "next/link";

const initialState = { error: "", success: false };

export default function EnterMarksClient({
  test,
  students,
  resultsMap,
}: {
  test: any;
  students: any[];
  resultsMap: Record<string, number>;
}) {
  const [marks, setMarks] = useState<Record<string, string>>(
    Object.fromEntries(
      students.map(s => [s.id, resultsMap[s.id]?.toString() ?? ''])
    )
  );

  const [state, formAction, isPending] = useActionState(saveMarks, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const hiddenInput = form.querySelector<HTMLInputElement>('input[name="entries"]');
    if (hiddenInput) {
      const entries = students.map(s => ({
        student_id: s.id,
        marks: parseFloat(marks[s.id]),
      })).filter(e => !isNaN(e.marks));
      hiddenInput.value = JSON.stringify(entries);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <Link href="/admin/dashboard/tests" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Tests
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Enter Marks</h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-foreground/60">
          <span className="font-medium text-primary">{test.title}</span>
          <span>•</span>
          <span>{test.standard}</span>
          <span>•</span>
          <span>Total: <strong>{test.total_marks} marks</strong></span>
          <span>•</span>
          <span>{new Date(test.date).toLocaleDateString()}</span>
        </div>
      </div>

      {state.success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 p-4 rounded-xl flex items-center gap-2 mb-6">
          <CheckCircle2 className="h-5 w-5" /> Marks saved successfully!
        </div>
      )}

      {state.error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-xl flex items-center gap-2 mb-6">
          <AlertCircle className="h-5 w-5" /> {state.error}
        </div>
      )}

      {students.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center text-foreground/50">
          <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p>No students found in <strong>{test.standard}</strong>.</p>
          <p className="text-sm mt-1">Add students for this standard from the Students module.</p>
        </div>
      ) : (
        <form action={formAction} onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <input type="hidden" name="test_id" value={test.id} />
          <input type="hidden" name="entries" value="" />

          <table className="w-full text-sm">
            <thead className="bg-primary/5">
              <tr className="border-b border-border">
                <th className="p-4 text-left font-medium text-foreground/60">#</th>
                <th className="p-4 text-left font-medium text-foreground/60">Student Name</th>
                <th className="p-4 text-center font-medium text-foreground/60">Marks Obtained</th>
                <th className="p-4 text-center font-medium text-foreground/60">Out of {test.total_marks}</th>
                <th className="p-4 text-center font-medium text-foreground/60">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {students.map((student, i) => {
                const m = parseFloat(marks[student.id]);
                const pct = !isNaN(m) ? ((m / test.total_marks) * 100).toFixed(1) : '—';
                const pctNum = parseFloat(pct);
                return (
                  <tr key={student.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-4 text-foreground/50">{i + 1}</td>
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        min={0}
                        max={test.total_marks}
                        step={0.5}
                        value={marks[student.id]}
                        onChange={e => setMarks(prev => ({ ...prev, [student.id]: e.target.value }))}
                        className="w-24 mx-auto block px-3 py-2 rounded-lg border border-border bg-background text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="—"
                      />
                    </td>
                    <td className="p-4 text-center text-foreground/50">{test.total_marks}</td>
                    <td className="p-4 text-center">
                      {!isNaN(pctNum) ? (
                        <span className={`font-bold ${pctNum >= 75 ? 'text-green-600' : pctNum >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                          {pct}%
                        </span>
                      ) : (
                        <span className="text-foreground/30">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="p-4 border-t border-border flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save All Marks"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

