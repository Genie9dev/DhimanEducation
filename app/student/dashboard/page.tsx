import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Bell, Calendar, CreditCard, Trophy, Megaphone } from "lucide-react";

export default async function StudentDashboard() {
  const supabase = await createClient();

  // Get logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/student/login");

  // Get the student record linked to this auth user
  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (!student) {
    return (
      <div className="p-8 text-center text-foreground/60">
        <p>Student profile not found. Please contact Dhiman Education.</p>
      </div>
    );
  }

  // Fetch upcoming tests for this student's standard
  const { data: tests } = await supabase
    .from("tests")
    .select("*")
    .eq("standard", student.standard)
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true })
    .limit(5);

  // Fetch latest announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch student fees
  const { data: fees } = await supabase
    .from("fees")
    .select("*")
    .eq("student_id", student.id)
    .eq("status", "Pending");

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {student.name.split(" ")[0]}! 👋</h1>
        <p className="text-foreground/60 mt-1">Class: {student.standard} &nbsp;•&nbsp; Dhiman Education</p>
      </div>

      {/* Stats Row */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg"><Calendar className="h-5 w-5 text-primary" /></div>
            <p className="text-sm font-medium text-foreground/60">Upcoming Tests</p>
          </div>
          <h3 className="text-3xl font-bold">{tests?.length || 0}</h3>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-500/10 p-2 rounded-lg"><CreditCard className="h-5 w-5 text-red-500" /></div>
            <p className="text-sm font-medium text-foreground/60">Pending Fees</p>
          </div>
          <h3 className="text-3xl font-bold">{fees?.length || 0}</h3>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-secondary/10 p-2 rounded-lg"><Trophy className="h-5 w-5 text-secondary" /></div>
            <p className="text-sm font-medium text-foreground/60">Standard</p>
          </div>
          <h3 className="text-2xl font-bold">{student.standard}</h3>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Tests */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" /> Upcoming Tests
          </h2>
          <div className="space-y-3">
            {tests && tests.length > 0 ? (
              tests.map((test: any) => (
                <div key={test.id} className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{test.title}</p>
                    <p className="text-xs text-foreground/60 mt-0.5 truncate">{test.syllabus}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-primary">{new Date(test.date).toLocaleDateString()}</p>
                    <p className="text-xs text-foreground/50">{test.total_marks} marks</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-foreground/50 py-6 text-sm">No upcoming tests. 🎉</p>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-secondary" /> Announcements
          </h2>
          <div className="space-y-3">
            {announcements && announcements.length > 0 ? (
              announcements.map((ann: any) => (
                <div key={ann.id} className="p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                  <p className="font-semibold text-sm text-primary">{ann.title}</p>
                  <p className="text-xs text-foreground/70 mt-1 line-clamp-2">{ann.content}</p>
                  <p className="text-xs text-foreground/40 mt-2">{new Date(ann.created_at).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-foreground/50 py-6 text-sm">No announcements yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Fee Warning */}
      {fees && fees.length > 0 && (
        <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex items-center gap-4">
          <CreditCard className="h-6 w-6 text-red-500 shrink-0" />
          <div>
            <p className="font-semibold text-red-600 dark:text-red-400">You have {fees.length} pending fee(s)</p>
            <p className="text-sm text-foreground/60">Please contact Dhiman Education to clear your dues.</p>
          </div>
        </div>
      )}
    </div>
  );
}

