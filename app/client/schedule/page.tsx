"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

interface ScheduledPost {
  id: string;
  caption: string | null;
  media_url: string;
  scheduled_for: string;
  status: string;
  permalink: string | null;
}

export default function SchedulePage() {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ caption: "", media_url: "", scheduled_for: "" });

  async function loadPosts() {
    const res = await fetch("/api/client/scheduled-posts");
    const data = await res.json();
    setPosts(data.posts || []);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/client/scheduled-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to schedule post");
      return;
    }
    setShowForm(false);
    setForm({ caption: "", media_url: "", scheduled_for: "" });
    loadPosts();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/client/scheduled-posts?id=${id}`, { method: "DELETE" });
    loadPosts();
  }

  const statusColor: Record<string, string> = {
    queued: "bg-slate-100 text-slate-700",
    processing: "bg-amber-100 text-amber-700",
    published: "bg-emerald-100 text-emerald-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Scheduled posts</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm">
          {showForm ? "Cancel" : "Schedule a post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="gradient-border p-5 mb-6 space-y-3">
          <input
            placeholder="Image URL (from your Supabase Storage bucket)"
            value={form.media_url}
            onChange={(e) => setForm({ ...form, media_url: e.target.value })}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2"
          />
          <textarea
            placeholder="Caption"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
            rows={3}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2"
          />
          <input
            type="datetime-local"
            value={form.scheduled_for}
            onChange={(e) => setForm({ ...form, scheduled_for: e.target.value })}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="bg-[var(--color-accent)] text-white rounded-md py-2 px-4 text-sm font-medium">
            Schedule
          </button>
        </form>
      )}

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="gradient-border p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{p.caption || "(no caption)"}</div>
              <div className="text-xs text-slate-500">{new Date(p.scheduled_for).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColor[p.status] || ""}`}>{p.status}</span>
              {p.status === "queued" && (
                <button onClick={() => handleDelete(p.id)} className="text-sm text-red-600">Cancel</button>
              )}
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-slate-500">Nothing scheduled yet.</p>}
      </div>
    </AppShell>
  );
}