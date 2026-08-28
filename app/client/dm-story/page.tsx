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

const emptyForm = { channel: "dm", trigger_word: "", match_method: "contains", reply_text: "" };

export default function DmStoryPage() {
  const [rules, setRules] = useState<DmStoryRule[]>([]);
  const [limit, setLimit] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  async function loadRules() {
    const res = await fetch("/api/client/dm-story-rules");
    const data = await res.json();
    setRules(data.rules || []);
    setLimit(data.limit || 10);
  }

  useEffect(() => {
    loadRules();
  }, []);

  function startEdit(rule: DmStoryRule) {
    setEditingId(rule.id);
    setForm({
      channel: rule.channel,
      trigger_word: rule.trigger_word,
      match_method: rule.match_method,
      reply_text: rule.reply_text || "",
    });
    setShowForm(true);
  }

  function startNew() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = editingId
      ? await fetch(`/api/client/dm-story-rules?id=${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      : await fetch("/api/client/dm-story-rules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to save rule");
      return;
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    loadRules();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/client/dm-story-rules?id=${id}`, { method: "DELETE" });
    loadRules();
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">DM & Story rules ({rules.length}/{limit})</h1>
        <button
          onClick={() => (showForm ? setShowForm(false) : startNew())}
          disabled={rules.length >= limit && !editingId}
          className="btn-primary px-4 py-2 text-sm disabled:opacity-40"
        >
          {showForm ? "Cancel" : "Add rule"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={form.channel}
            onChange={(e) => setForm({ ...form, channel: e.target.value })}
            className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2"
          >
            <option value="dm">DM</option>
            <option value="story_reply">Story reply</option>
          </select>
          <select
            value={form.match_method}
            onChange={(e) => setForm({ ...form, match_method: e.target.value })}
            className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2"
          >
            <option value="exact">Exact</option>
            <option value="starts_with">Starts with</option>
            <option value="contains">Contains</option>
          </select>
          <input
            placeholder="Trigger word"
            value={form.trigger_word}
            onChange={(e) => setForm({ ...form, trigger_word: e.target.value })}
            className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2"
          />
          <input
            placeholder="Reply text"
            value={form.reply_text}
            onChange={(e) => setForm({ ...form, reply_text: e.target.value })}
            className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2"
          />
          {error && <p className="text-sm text-red-500 md:col-span-2">{error}</p>}
          <button type="submit" className="md:col-span-2 btn-primary py-2 text-sm">
            {editingId ? "Save changes" : "Save rule"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {rules.map((r) => (
          <div key={r.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium text-sm capitalize">
                [{r.channel.replace("_", " ")}] &quot;{r.trigger_word}&quot; ({r.match_method})
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">{r.reply_text}</div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => startEdit(r)} className="text-sm ig-gradient-text font-medium">Edit</button>
              <button onClick={() => handleDelete(r.id)} className="text-sm text-red-500">Delete</button>
            </div>
          </div>
        ))}
        {rules.length === 0 && <p className="text-sm text-[var(--color-text-muted)]">No DM/Story rules yet.</p>}
      </div>
    </AppShell>
  );
}