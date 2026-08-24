"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import type { Client } from "@/types";

const navItems = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Guide", href: "/admin/guide" },
  { label: "Onboarding", href: "/admin/onboarding" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Analytics", href: "/admin/analytics" },
];

const statusOptions = ["active", "hold", "trial", "suspended", "in_review"];

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    business_name: "",
    contact_email: "",
    username: "",
    password: "",
    plan: "starter",
    supabase_url: "",
    supabase_anon_key: "",
    supabase_service_key: "",
  });

  async function loadClients() {
    const res = await fetch("/api/admin/clients");
    const data = await res.json();
    setClients(data.clients || []);
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({
      business_name: "",
      contact_email: "",
      username: "",
      password: "",
      plan: "starter",
      supabase_url: "",
      supabase_anon_key: "",
      supabase_service_key: "",
    });
    loadClients();
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadClients();
  }

  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Clients</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm"
        >
          {showForm ? "Cancel" : "Add client"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="gradient-border p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Business name" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2" />
          <input placeholder="Contact email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2" />
          <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2" />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2" />
          <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2">
            <option value="starter">Starter</option>
            <option value="growth">Growth</option>
          </select>
          <input placeholder="Supabase URL" value={form.supabase_url} onChange={(e) => setForm({ ...form, supabase_url: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2" />
          <input placeholder="Supabase anon key" value={form.supabase_anon_key} onChange={(e) => setForm({ ...form, supabase_anon_key: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2" />
          <input placeholder="Supabase service key" value={form.supabase_service_key} onChange={(e) => setForm({ ...form, supabase_service_key: e.target.value })} className="border border-[var(--color-border)] rounded-md px-3 py-2" />
          <button type="submit" className="md:col-span-2 bg-[var(--color-accent)] text-white rounded-md py-2 text-sm font-medium">
            Save client
          </button>
        </form>
      )}

      <div className="gradient-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-surface-muted)] text-left">
            <tr>
              <th className="p-3">Business</th>
              <th className="p-3">Username</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t border-[var(--color-border)]">
                <td className="p-3">{c.business_name}</td>
                <td className="p-3">{c.username}</td>
                <td className="p-3 capitalize">{c.plan}</td>
                <td className="p-3">
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c.id, e.target.value)}
                    className="border border-[var(--color-border)] rounded-md px-2 py-1"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}