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

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ClientTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });

  async function loadTickets() {
    const res = await fetch("/api/client/tickets");
    const data = await res.json();
    setTickets(data.tickets || []);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/client/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({ subject: "", message: "" });
    loadTickets();
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Support tickets</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm">
          {showForm ? "Cancel" : "Raise a ticket"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="gradient-border p-5 mb-6 space-y-3">
          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2"
          />
          <textarea
            placeholder="Describe the issue"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2"
          />
          <button type="submit" className="bg-[var(--color-accent)] text-white rounded-md py-2 px-4 text-sm font-medium">
            Submit
          </button>
        </form>
      )}

      <div className="space-y-3">
        {tickets.map((t) => (
          <div key={t.id} className="gradient-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{t.subject}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-surface-muted)] capitalize">{t.status.replace("_", " ")}</span>
            </div>
            <p className="text-sm text-slate-600">{t.message}</p>
          </div>
        ))}
        {tickets.length === 0 && <p className="text-sm text-slate-500">No tickets raised yet.</p>}
      </div>
    </AppShell>
  );
}