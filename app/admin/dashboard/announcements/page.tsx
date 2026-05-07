"use client";

import { useState, useActionState, useEffect } from "react";
import { Bell, Plus, AlertCircle, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { addAnnouncement } from "./actions";
import { createBrowserClient } from '@supabase/ssr'

const initialState: { 
  error: string; 
  success: boolean; 
  message: string;
} = {
  error: "",
  success: false,
  message: ""
};

export default function AnnouncementsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [state, formAction, isPending] = useActionState(addAnnouncement, initialState);

  useEffect(() => {
    async function fetchAnnouncements() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
      if (data) setAnnouncements(data);
      setLoading(false);
    }
    fetchAnnouncements();
  }, [state.success]);

  useEffect(() => {
    if (state.success) {
      setIsAdding(false);
    }
  }, [state.success]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-foreground/60">Broadcast important notices to all students</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="mr-2 h-4 w-4" /> New Announcement
        </Button>
      </div>

      {isAdding && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Post Announcement</h2>
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="bg-red-500/10 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" /> {state.error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Title / Subject</label>
              <input name="title" required className="w-full px-4 py-2 rounded-lg border border-border bg-background" placeholder="e.g. Tomorrow's Maths Class Cancelled" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Message</label>
              <textarea name="content" required rows={4} className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none" placeholder="Type the full announcement here..."></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>{isPending ? "Posting..." : "Post Announcement"}</Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-foreground/50">Loading announcements...</div>
        ) : announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4">
              <div className="mt-1 bg-secondary/10 p-3 rounded-xl h-fit">
                <Megaphone className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-primary">{announcement.title}</h3>
                  <span className="text-xs text-foreground/50 bg-foreground/5 px-2 py-1 rounded-md">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-foreground/70 whitespace-pre-wrap">{announcement.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card border border-border rounded-2xl p-12 text-center text-foreground/50">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No announcements yet. Click "New Announcement" to broadcast to students.</p>
          </div>
        )}
      </div>
    </div>
  );
}

