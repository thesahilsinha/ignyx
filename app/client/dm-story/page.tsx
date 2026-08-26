"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

const navItems = [
  { label: "Home", href: "/client/dashboard" },
  { label: "Comments", href: "/client/comments" },
  { label: "DM / Story", href: "/client/dm-story" },
  { label: "Schedule", href: "/client/schedule" },
  { label: "AI+", href: "/client/ai-plus" },
  { label: "Catalogue", href: "/client/catalogue" },
  { label: "Greeting", href: "/client/greeting" },
  { label: "Analytics", href: "/client/analytics" },
  { label: "Ads", href: "/client/ads" },
  { label: "Guide", href: "/client/guide" },
  { label: "Tickets", href: "/client/tickets" },
];

interface DmStoryRule {
  id: string;
  channel: string;
  trigger_word: string;
  match_method: string;
  reply_text: string | null;
}

export default function DmStoryPage() {
  const [rules, setRules] = useState<DmStoryRule[]>([]);
  const [limit, setLimit] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    channel: "dm",
    trigger_word: "",
    match_method: "contains",
    reply_text: "",
  });

  async function loadRules() {
    const res = await fetch("/api/client/dm-story-rules");
    const data = await res.json();
    setRules(data.rules || []);
    setLimit(data.limit || 10);
  }

  useEffect(() => {
    loadRules();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/client/dm-story-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to add rule");
      return;
    }
    setShowForm(false);
    setForm({ channel: "dm", trigger_word: "", match_method: "contains", reply_text: "" });
    loadRules();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/client/dm-story-rules?id=${id}`, { method: "DELETE" });
    loadRules();
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">DM & Story rules ({rules.length}/{limit})</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={rules.length >= limit}
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm disabled:opacity-40"
        >
          {showForm ? "Cancel" : "Add rule"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="gradient-border p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={form.channel}
            onChange={(e) => setForm({ ...form, channel: e.target.value })}
            className="border border-[var(--color-border)] rounded-md px-3 py-2"
          >
            <option value="dm">DM</option>
            <option value="story_reply">Story reply</option>
          </select>
          <select
            value={form.match_method}
            onChange={(e) => setForm({ ...form, match_method: e.target.value })}
            className="border border-[var(--color-border)] rounded-md px-3 py-2"
          >
            <option value="exact">Exact</option>
            <option value="starts_with">Starts with</option>
            <option value="contains">Contains</option>
          </select>
          <input
            placeholder="Trigger word"
            value={form.trigger_word}
            onChange={(e) => setForm({ ...form, trigger_word: e.target.value })}
            className="border border-[var(--color-border)] rounded-md px-3 py-2 md:col-span-2"
          />
          <input
            placeholder="Reply text"
            value={form.reply_text}
            onChange={(e) => setForm({ ...form, reply_text: e.target.value })}
            className="border border-[var(--color-border)] rounded-md px-3 py-2 md:col-span-2"
          />
          {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
          <button type="submit" className="md:col-span-2 bg-[var(--color-accent)] text-white rounded-md py-2 text-sm font-medium">
            Save rule
          </button>
        </form>
      )}

      <div className="space-y-3">
        {rules.map((r) => (
          <div key={r.id} className="gradient-border p-4 flex items-center justify-between">
            <div>
              <div className="font-medium text-sm capitalize">
                [{r.channel.replace("_", " ")}] &quot;{r.trigger_word}&quot; ({r.match_method})
              </div>
              <div className="text-sm text-slate-500">{r.reply_text}</div>
            </div>
            <button onClick={() => handleDelete(r.id)} className="text-sm text-red-600">
              Delete
            </button>
          </div>
        ))}
        {rules.length === 0 && <p className="text-sm text-slate-500">No DM/Story rules yet.</p>}
      </div>
    </AppShell>
  );
}