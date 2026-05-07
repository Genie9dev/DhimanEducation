"use client";

import { useState, useActionState, useEffect } from "react";
import { CreditCard, Plus, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { addFeeRecord, updateFeeStatus } from "./actions";
import { createBrowserClient } from '@supabase/ssr'

const initialState: { error: string; success: boolean; message: string } = {
  error: "",
  success: false,
  message: ""
};

export default function FeesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [fees, setFees] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [state, formAction, isPending] = useActionState(addFeeRecord, initialState);

  useEffect(() => {
    async function fetchData() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      // Fetch fees with student details
      const { data: feesData } = await supabase
        .from('fees')
        .select('*, students(name, standard)')
        .order('due_date', { ascending: true });
        
      if (feesData) setFees(feesData);

      // Fetch students for the dropdown
      const { data: studentsData } = await supabase
        .from('students')
        .select('id, name, standard')
        .order('name', { ascending: true });
        
      if (studentsData) setStudents(studentsData);
      
      setLoading(false);
    }
    fetchData();
  }, [state.success]);

  useEffect(() => {
    if (state.success) {
      setIsAdding(false);
    }
  }, [state.success]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setFees(fees.map(f => f.id === id ? { ...f, status: newStatus } : f));
    await updateFeeStatus(id, newStatus);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Fees Management</h1>
          <p className="text-foreground/60">Track pending and completed student payments</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="mr-2 h-4 w-4" /> Add Fee Record
        </Button>
      </div>

      {isAdding && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Create Fee Record</h2>
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="bg-red-500/10 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" /> {state.error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Student</label>
                <select name="student_id" required className="w-full px-4 py-2 rounded-lg border border-border bg-background">
                  <option value="">Select a student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.standard})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Amount (₹)</label>
                <input type="number" name="amount" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" placeholder="e.g. 5000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Due Date</label>
                <input type="date" name="due_date" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Status</label>
                <select name="status" required className="w-full px-4 py-2 rounded-lg border border-border bg-background">
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Record"}</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary/5">
              <tr className="border-b border-border text-foreground/60">
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium">Standard</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Due Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">Loading fee records...</td>
                </tr>
              ) : fees.length > 0 ? (
                fees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-4 font-medium">{fee.students?.name || "Unknown"}</td>
                    <td className="p-4 text-foreground/70">{fee.students?.standard || "-"}</td>
                    <td className="p-4 font-medium">₹{fee.amount}</td>
                    <td className="p-4 text-foreground/70">{new Date(fee.due_date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        fee.status === 'Paid' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {fee.status === 'Pending' && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(fee.id, 'Paid')}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Mark Paid
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No fee records found. Click "Add Fee Record" above.</p>
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


