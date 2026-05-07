"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, FileText, CreditCard, Bell, Settings, LogOut, BookOpen, Menu, X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Students", path: "/admin/dashboard/students" },
  { icon: FileText, label: "Tests", path: "/admin/dashboard/tests" },
  { icon: CreditCard, label: "Fees", path: "/admin/dashboard/fees" },
  { icon: Bell, label: "Notices", path: "/admin/dashboard/announcements" },
  { icon: Settings, label: "Settings", path: "/admin/dashboard/settings" },
];

// Bottom bar shows first 5; Settings stays in sidebar/sheet
const bottomNavItems = navItems.slice(0, 5);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (path: string) =>
    path === "/admin/dashboard"
      ? pathname === path
      : pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-5 border-b border-border flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-primary">Admin Panel</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(item.path)
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="p-3 border-t border-border">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Slide-over Drawer ─────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-card border-r border-border flex flex-col">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-primary">Admin Panel</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-foreground/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-3 border-t border-border">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main Area ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-foreground/5">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">Admin Panel</span>
          </div>
          <div className="w-9" /> {/* spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Tab Bar ───────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card border-t border-border">
        <div className="grid grid-cols-5 h-16">
          {bottomNavItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-foreground/50 hover:text-foreground"
                }`}
              >
                <item.icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
                <span className="truncate">{item.label}</span>
                {active && <span className="absolute bottom-0 w-6 h-0.5 bg-primary rounded-t-full" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
