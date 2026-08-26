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

interface CommentRule {
  id: string;
  trigger_word: string;
  match_method: string;
  action_type: string;
  reply_text: string | null;
  dm_text: string | null;
}

export default function CommentsPage() {
  const [rules, setRules] = useState<CommentRule[]>([]);
  const [limit, setLimit] = useState(8);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    trigger_word: "",
    match_method: "contains",
    action_type: "reply",
    reply_text: "",
    dm_text: "",
  });

  async function loadRules() {
    const res = await fetch("/api/client/comment-rules");
    const data = await res.json();
    setRules(data.rules || []);
    setLimit(data.limit || 8);
  }

  useEffect(() => {
    loadRules();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/client/comment-rules", {
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
    setForm({ trigger_word: "", match_method: "contains", action_type: "reply", reply_text: "", dm_text: "" });
    loadRules();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/client/comment-rules?id=${id}`, { method: "DELETE" });
    loadRules();
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Comment rules ({rules.length}/{limit})</h1>
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
          <input
            placeholder="Trigger word"
            value={form.trigger_word}
            onChange={(e) => setForm({ ...form, trigger_word: e.target.value })}
            className="border border-[var(--color-border)] rounded-md px-3 py-2"
          />
          <select
            value={form.match_method}
            onChange={(e) => setForm({ ...form, match_method: e.target.value })}
            className="border border-[var(--color-border)] rounded-md px-3 py-2"
          >
            <option value="exact">Exact</option>
            <option value="starts_with">Starts with</option>
            <option value="contains">Contains</option>
          </select>
          <select
            value={form.action_type}
            onChange={(e) => setForm({ ...form, action_type: e.target.value })}
            className="border border-[var(--color-border)] rounded-md px-3 py-2 md:col-span-2"
          >
            <option value="reply">Public reply only</option>
            <option value="dm">DM only</option>
            <option value="both">Both</option>
          </select>
          {(form.action_type === "reply" || form.action_type === "both") && (
            <input
              placeholder="Public reply text"
              value={form.reply_text}
              onChange={(e) => setForm({ ...form, reply_text: e.target.value })}
              className="border border-[var(--color-border)] rounded-md px-3 py-2 md:col-span-2"
            />
          )}
          {(form.action_type === "dm" || form.action_type === "both") && (
            <input
              placeholder="DM text"
              value={form.dm_text}
              onChange={(e) => setForm({ ...form, dm_text: e.target.value })}
              className="border border-[var(--color-border)] rounded-md px-3 py-2 md:col-span-2"
            />
          )}
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
              <div className="font-medium text-sm">
                &quot;{r.trigger_word}&quot; ({r.match_method}) — {r.action_type}
              </div>
              <div className="text-sm text-slate-500">
                {r.reply_text && <span>Reply: {r.reply_text} </span>}
                {r.dm_text && <span>DM: {r.dm_text}</span>}
              </div>
            </div>
            <button onClick={() => handleDelete(r.id)} className="text-sm text-red-600">
              Delete
            </button>
          </div>
        ))}
        {rules.length === 0 && <p className="text-sm text-slate-500">No comment rules yet.</p>}
      </div>
    </AppShell>
  );
}