"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import type { Client } from "@/types";

import { adminNavItems } from "@/lib/admin-nav";

const navItems = adminNavItems;

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
  meta_ig_business_id: "",
  meta_access_token: "",
  meta_page_id: "",
  meta_page_access_token: "",
  meta_user_access_token: "",
  ai_plus_enabled: false,
  groq_api_key: "",
  catalogue_enabled: false,
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
      meta_ig_business_id: c.meta_ig_business_id || "",
      meta_access_token: c.meta_access_token || "",
      meta_page_id: c.meta_page_id || "",
      meta_page_access_token: c.meta_page_access_token || "",
      meta_user_access_token: c.meta_user_access_token || "",
      ai_plus_enabled: c.ai_plus_enabled,
      groq_api_key: c.groq_api_key || "",
      catalogue_enabled: c.catalogue_enabled,
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
      const updates: Record<string, string | boolean> = { ...rest };
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
        <form onSubmit={handleSubmit} className="card p-5 mb-6 space-y-5">
          <div>
            <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">Business</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Business name" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <input placeholder="Contact email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" disabled={!!editingId} />
              <input placeholder={editingId ? "New password (leave blank to keep)" : "Password"} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2">
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
              </select>
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">Client Supabase</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Supabase URL" value={form.supabase_url} onChange={(e) => setForm({ ...form, supabase_url: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2" />
              <input placeholder="Supabase anon key" value={form.supabase_anon_key} onChange={(e) => setForm({ ...form, supabase_anon_key: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <input placeholder="Supabase service key" value={form.supabase_service_key} onChange={(e) => setForm({ ...form, supabase_service_key: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">Instagram Login</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Instagram Business Account ID" value={form.meta_ig_business_id} onChange={(e) => setForm({ ...form, meta_ig_business_id: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <input placeholder="Instagram access token" value={form.meta_access_token} onChange={(e) => setForm({ ...form, meta_access_token: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">Facebook Login (ads / catalogue)</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Facebook Page ID" value={form.meta_page_id} onChange={(e) => setForm({ ...form, meta_page_id: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <input placeholder="Page access token" value={form.meta_page_access_token} onChange={(e) => setForm({ ...form, meta_page_access_token: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <input placeholder="User access token (for ads)" value={form.meta_user_access_token} onChange={(e) => setForm({ ...form, meta_user_access_token: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2 md:col-span-2" />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">Add-ons</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm border border-[var(--color-border)] rounded-lg px-3 py-2">
                <input type="checkbox" checked={form.ai_plus_enabled} onChange={(e) => setForm({ ...form, ai_plus_enabled: e.target.checked })} />
                AI+ enabled
              </label>
              <input placeholder="Groq API key" value={form.groq_api_key} onChange={(e) => setForm({ ...form, groq_api_key: e.target.value })} className="border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2" />
              <label className="flex items-center gap-2 text-sm border border-[var(--color-border)] rounded-lg px-3 py-2 md:col-span-2">
                <input type="checkbox" checked={form.catalogue_enabled} onChange={(e) => setForm({ ...form, catalogue_enabled: e.target.checked })} />
                Catalogue enabled
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary py-2 px-4 text-sm">
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