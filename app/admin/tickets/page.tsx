"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

const navItems = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Guide", href: "/admin/guide" },
  { label: "Onboarding", href: "/admin/onboarding" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Analytics", href: "/admin/analytics" },
];

interface TicketRow {
  id: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  clients: { business_name: string } | null;
}

const statusOptions = ["open", "in_progress", "resolved"];

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketRow[]>([]);

  async function loadTickets() {
    const res = await fetch("/api/admin/tickets");
    const data = await res.json();
    setTickets(data.tickets || []);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadTickets();
  }

  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Tickets</h1>
      <div className="space-y-3">
        {tickets.map((t) => (
          <div key={t.id} className="gradient-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">{t.clients?.business_name || "Unknown client"} — {t.subject}</span>
              <select
                value={t.status}
                onChange={(e) => updateStatus(t.id, e.target.value)}
                className="border border-[var(--color-border)] rounded-md px-2 py-1 text-sm"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-slate-600">{t.message}</p>
          </div>
        ))}
        {tickets.length === 0 && <p className="text-sm text-slate-500">No tickets yet.</p>}
      </div>
    </AppShell>
  );
}