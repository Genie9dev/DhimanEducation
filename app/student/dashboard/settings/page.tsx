"use client";

import { LogOut, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StudentSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/student/login");
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-foreground/60">Manage your student account</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <LogOut className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Account</h2>
        </div>
        <p className="text-sm text-foreground/60 mb-6">
          Sign out from this device. Your progress and data will remain safe and accessible when you sign back in.
        </p>
        <Button onClick={handleSignOut} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
          <LogOut className="mr-2 h-4 w-4" />
          {loading ? "Signing Out..." : "Sign Out"}
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-secondary/10 p-2 rounded-lg">
            <BookOpen className="h-5 w-5 text-secondary" />
          </div>
          <h2 className="text-lg font-semibold">About</h2>
        </div>
        <div className="text-sm space-y-2 text-foreground/70">
          <div className="flex justify-between border-b border-border pb-2">
            <span>Platform</span>
            <span className="font-medium text-foreground">Dhiman Education</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span>Location</span>
            <span className="font-medium text-foreground">Mehsana, Gujarat</span>
          </div>
          <div className="flex justify-between">
            <span>Role</span>
            <span className="font-medium text-primary">Student</span>
          </div>
        </div>
      </div>
    </div>
  );
}

