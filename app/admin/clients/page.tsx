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

const emptyForm = {
  business_name: "",
  contact_email: "",
  username: "",
  password: "",
  plan: "starter",
  supabase_url: "",
  supabase_anon_key: "",
  supabase_service_key: "",
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function loadClients() {
    const res = await fetch("/api/admin/clients");
    const data = await res.json();
    setClients(data.clients || []);
  }

  useEffect(() => {
    loadClients();
  }, []);

  function startEdit(c: Client) {
    setEditingId(c.id);
    setForm({
      business_name: c.business_name,
      contact_email: c.contact_email,
      username: c.username,
      password: "",
      plan: c.plan,
      supabase_url: c.supabase_url,
      supabase_anon_key: c.supabase_anon_key,
      supabase_service_key: c.supabase_service_key,
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

    if (editingId) {
      const { password, ...rest } = form;
      const updates: Record<string, string> = { ...rest };
      if (password) updates.password = password;
      await fetch(`/api/admin/clients/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } else {
      await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
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
        <h1 className="text-xl font-bold">Clients</h1>
        <button
          onClick={() => (showForm ? setShowForm(false) : startNew())}
          className="btn-primary px-4 py-2 text-sm"
        >
          {showForm ? "Cancel" : "Add client"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Business name" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
          <input placeholder="Contact email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
          <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" disabled={!!editingId} />
          <input placeholder={editingId ? "New password (leave blank to keep)" : "Password"} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
          <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2">
            <option value="starter">Starter</option>
            <option value="growth">Growth</option>
          </select>
          <input placeholder="Supabase URL" value={form.supabase_url} onChange={(e) => setForm({ ...form, supabase_url: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
          <input placeholder="Supabase anon key" value={form.supabase_anon_key} onChange={(e) => setForm({ ...form, supabase_anon_key: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
          <input placeholder="Supabase service key" value={form.supabase_service_key} onChange={(e) => setForm({ ...form, supabase_service_key: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
          <button type="submit" className="md:col-span-2 btn-primary py-2 text-sm">
            {editingId ? "Save changes" : "Save client"}
          </button>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-surface-muted)] text-left">
            <tr>
              <th className="p-3">Business</th>
              <th className="p-3">Username</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
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
                    className="border border-[var(--color-border)] bg-transparent rounded-lg px-2 py-1"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button onClick={() => startEdit(c)} className="text-sm ig-gradient-text font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}