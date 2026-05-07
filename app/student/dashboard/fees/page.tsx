import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";

export default async function StudentFeesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/student/login");

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (!student) redirect("/student/login");

  const { data: fees } = await supabase
    .from("fees")
    .select("*")
    .eq("student_id", student.id)
    .order("due_date", { ascending: true });

  const pending = (fees || []).filter(f => f.status === "Pending");
  const paid = (fees || []).filter(f => f.status === "Paid");

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Fees</h1>
        <p className="text-foreground/60">Track your fee payment status</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <p className="text-sm text-foreground/60 mb-1">Pending Amount</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            ₹{pending.reduce((acc, f) => acc + f.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-foreground/50 mt-1">{pending.length} pending payment(s)</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
          <p className="text-sm text-foreground/60 mb-1">Total Paid</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            ₹{paid.reduce((acc, f) => acc + f.amount, 0).toLocaleString()}
          </p>
          <p className="text-xs text-foreground/50 mt-1">{paid.length} paid payment(s)</p>
        </div>
      </div>

      {/* Pending Fees */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5" /> Pending Payments
          </h2>
          <div className="space-y-3">
            {pending.map((fee: any) => (
              <div key={fee.id} className="bg-card border border-red-500/20 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">₹{fee.amount.toLocaleString()}</p>
                  <p className="text-sm text-foreground/60">Due: {new Date(fee.due_date).toLocaleDateString()}</p>
                </div>
                <span className="bg-red-500/10 text-red-600 text-xs font-medium px-3 py-1 rounded-full">Pending</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground/50 mt-3 text-center">Please contact Dhiman Education to clear your dues.</p>
        </div>
      )}

      {/* Paid Fees */}
      {paid.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5" /> Payment History
          </h2>
          <div className="space-y-3">
            {paid.map((fee: any) => (
              <div key={fee.id} className="bg-card border border-border rounded-xl p-4 flex justify-between items-center opacity-70">
                <div>
                  <p className="font-bold text-lg">₹{fee.amount.toLocaleString()}</p>
                  <p className="text-sm text-foreground/60">Paid on: {new Date(fee.due_date).toLocaleDateString()}</p>
                </div>
                <span className="bg-green-500/10 text-green-600 text-xs font-medium px-3 py-1 rounded-full">✓ Paid</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!fees || fees.length === 0) && (
        <div className="bg-card border border-border rounded-2xl p-12 text-center text-foreground/50">
          <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p>No fee records found. All clear! 🎉</p>
        </div>
      )}
    </div>
  );
}

