"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

interface CommentRule {
  id: string;
  trigger_word: string;
  match_method: string;
  action_type: string;
  reply_text: string | null;
  dm_text: string | null;
  dm_media_url: string | null;
}

const emptyForm = { trigger_word: "", match_method: "contains", action_type: "reply", reply_text: "", dm_text: "", dm_media_url: "" };

export default function CommentsPage() {
  const [rules, setRules] = useState<CommentRule[]>([]);
  const [limit, setLimit] = useState(8);
  const [plan, setPlan] = useState("starter");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  async function loadRules() {
    const res = await fetch("/api/client/comment-rules");
    const data = await res.json();
    setRules(data.rules || []);
    setLimit(data.limit || 8);
    setPlan(data.plan || "starter");
  }

  useEffect(() => {
    loadRules();
  }, []);

  function startEdit(rule: CommentRule) {
    setEditingId(rule.id);
    setForm({
      trigger_word: rule.trigger_word,
      match_method: rule.match_method,
      action_type: rule.action_type,
      reply_text: rule.reply_text || "",
      dm_text: rule.dm_text || "",
      dm_media_url: rule.dm_media_url || "",
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
      ? await fetch(`/api/client/comment-rules?id=${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      : await fetch("/api/client/comment-rules", {
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
    await fetch(`/api/client/comment-rules?id=${id}`, { method: "DELETE" });
    loadRules();
  }

  const isGrowth = plan === "growth";

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Comment rules ({rules.length}/{limit})</h1>
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
          <input
            placeholder="Trigger word"
            value={form.trigger_word}
            onChange={(e) => setForm({ ...form, trigger_word: e.target.value })}
            className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2"
          />
          <select
            value={form.match_method}
            onChange={(e) => setForm({ ...form, match_method: e.target.value })}
            className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2"
          >
            <option value="exact">Exact</option>
            <option value="starts_with">Starts with</option>
            <option value="contains">Contains</option>
          </select>
          <select
            value={form.action_type}
            onChange={(e) => setForm({ ...form, action_type: e.target.value })}
            className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2"
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
              className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2"
            />
          )}
          {(form.action_type === "dm" || form.action_type === "both") && (
            <>
              <input
                placeholder="DM text"
                value={form.dm_text}
                onChange={(e) => setForm({ ...form, dm_text: e.target.value })}
                className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2"
              />
              {isGrowth ? (
                <input
                  placeholder="Image or video URL for the DM (optional)"
                  value={form.dm_media_url}
                  onChange={(e) => setForm({ ...form, dm_media_url: e.target.value })}
                  className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2"
                />
              ) : (
                <p className="text-xs text-[var(--color-text-muted)] md:col-span-2">
                  Media in DM replies is a Growth-plan feature.
                </p>
              )}
            </>
          )}
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
              <div className="font-medium text-sm">
                &quot;{r.trigger_word}&quot; ({r.match_method}) â€” {r.action_type}
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">
                {r.reply_text && <span>Reply: {r.reply_text} </span>}
                {r.dm_text && <span>DM: {r.dm_text} </span>}
                {r.dm_media_url && <span>Â· has media</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => startEdit(r)} className="text-sm ig-gradient-text font-medium">Edit</button>
              <button onClick={() => handleDelete(r.id)} className="text-sm text-red-500">Delete</button>
            </div>
          </div>
        ))}
        {rules.length === 0 && <p className="text-sm text-[var(--color-text-muted)]">No comment rules yet.</p>}
      </div>
    </AppShell>
  );
}