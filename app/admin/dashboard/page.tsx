import { Users, FileText, CreditCard, Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch live stats
  const { count: studentCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
  const { count: testsCount } = await supabase.from('tests').select('*', { count: 'exact', head: true });
  const { count: pendingFees } = await supabase.from('fees').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
  
  // Fetch recent admissions
  const { data: recentStudents } = await supabase
    .from('students')
    .select('name, standard, created_at, status')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Students", value: studentCount || 0, icon: Users, color: "bg-blue-500" },
          { title: "Active Tests", value: testsCount || 0, icon: FileText, color: "bg-green-500" },
          { title: "Pending Fees", value: pendingFees || 0, icon: CreditCard, color: "bg-red-500" },
          { title: "Recent Admissions", value: recentStudents?.length || 0, icon: Users, color: "bg-secondary" }
        ].map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-foreground/60">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl text-white ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Admissions Table */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Admissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/60">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Standard</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentStudents && recentStudents.length > 0 ? (
                  recentStudents.map((row: any, i: number) => (
                    <tr key={i}>
                      <td className="py-3 font-medium">{row.name}</td>
                      <td className="py-3 text-foreground/70">{row.standard}</td>
                      <td className="py-3 text-foreground/70">{new Date(row.created_at).toLocaleDateString()}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === "Verified" || row.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                        }`}>
                          {row.status || "Active"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-foreground/50">No recent admissions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a href="/admin/dashboard/tests" className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <span className="font-medium">Create Test</span>
            </a>
            <a href="/admin/dashboard/announcements" className="flex flex-col items-center justify-center p-6 bg-secondary/5 rounded-xl border border-secondary/10 hover:bg-secondary/10 transition-colors gap-3">
              <Bell className="h-8 w-8 text-secondary" />
              <span className="font-medium">Send Announcement</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

