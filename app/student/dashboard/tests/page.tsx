import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Calendar, CheckCircle2, Clock, Trophy } from "lucide-react";

export default async function StudentTestsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/student/login");

  const { data: student } = await supabase
    .from("students")
    .select("id, standard")
    .eq("auth_id", user.id)
    .single();

  if (!student) redirect("/student/login");

  const now = new Date().toISOString();

  // Upcoming tests for this standard
  const { data: upcoming } = await supabase
    .from("tests")
    .select("*")
    .eq("standard", student.standard)
    .gte("date", now)
    .order("date", { ascending: true });

  // Past tests with results
  const { data: past } = await supabase
    .from("tests")
    .select("*, test_results(marks_obtained)")
    .eq("standard", student.standard)
    .lt("date", now)
    .order("date", { ascending: false });

  // Filter past tests to only include results for this student
  const pastWithMyResult = (past || []).map((test: any) => {
    const myResult = test.test_results?.find ? null : null;
    return { ...test, myResult: test.test_results?.[0] ?? null };
  });

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Tests</h1>
        <p className="text-foreground/60">Standard: {student.standard}</p>
      </div>

      {/* Upcoming Tests */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Upcoming Tests
        </h2>
        <div className="space-y-3">
          {upcoming && upcoming.length > 0 ? (
            upcoming.map((test: any) => (
              <div key={test.id} className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{test.title}</h3>
                  <p className="text-sm text-foreground/60 mt-1">{test.syllabus}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-primary">{new Date(test.date).toLocaleDateString()}</p>
                  <p className="text-sm text-foreground/50">{test.total_marks} marks</p>
                  <span className="inline-block mt-1 text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">Upcoming</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 text-center text-foreground/50">
              <Clock className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No upcoming tests scheduled. 🎉</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Tests & Results */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-secondary" /> Past Tests & Results
        </h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-primary/5">
              <tr className="border-b border-border text-foreground/60">
                <th className="p-4 text-left font-medium">Test</th>
                <th className="p-4 text-left font-medium">Date</th>
                <th className="p-4 text-center font-medium">Your Marks</th>
                <th className="p-4 text-center font-medium">Total</th>
                <th className="p-4 text-center font-medium">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {pastWithMyResult.length > 0 ? (
                pastWithMyResult.map((test: any) => {
                  const marks = test.myResult?.marks_obtained;
                  const pct = marks != null ? ((marks / test.total_marks) * 100).toFixed(1) : null;
                  return (
                    <tr key={test.id} className="hover:bg-primary/5 transition-colors">
                      <td className="p-4 font-medium">{test.title}</td>
                      <td className="p-4 text-foreground/60">{new Date(test.date).toLocaleDateString()}</td>
                      <td className="p-4 text-center font-bold">
                        {marks != null ? marks : <span className="text-foreground/30 text-xs">Not entered</span>}
                      </td>
                      <td className="p-4 text-center text-foreground/60">{test.total_marks}</td>
                      <td className="p-4 text-center">
                        {pct != null ? (
                          <span className={`font-bold ${parseFloat(pct) >= 75 ? 'text-green-600' : parseFloat(pct) >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                            {pct}%
                          </span>
                        ) : (
                          <span className="text-foreground/30 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-foreground/50">No past tests yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

