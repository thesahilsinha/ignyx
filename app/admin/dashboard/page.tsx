"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";

import { adminNavItems } from "@/lib/admin-nav";

const navItems = adminNavItems;

interface AnalyticsSummary {
  totalClients: number;
  byStatus: Record<string, number>;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [maintenance, setMaintenance] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    fetch("/api/admin/analytics").then((res) => res.json()).then(setData);
    fetch("/api/admin/maintenance").then((res) => res.json()).then((d) => setMaintenance(d.maintenance_mode));
  }, []);

  async function toggleMaintenance() {
    setToggling(true);
    const res = await fetch("/api/admin/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ maintenance_mode: !maintenance }),
    });
    const d = await res.json();
    setMaintenance(d.maintenance_mode);
    setToggling(false);
  }

  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Admin overview</h1>
        <p className="text-sm text-[var(--color-text-muted)]">A snapshot of how IGNYX is doing right now.</p>
      </div>

      <div className={`card p-4 mb-6 flex items-center justify-between ${maintenance ? "border-amber-400" : ""}`}>
        <div>
          <div className="font-medium text-sm">Client dashboard maintenance mode</div>
          <div className="text-xs text-[var(--color-text-muted)]">
            {maintenance ? "Clients currently can't access their dashboard. Automation keeps running." : "Everything is accessible normally."}
          </div>
        </div>
        <button
          onClick={toggleMaintenance}
          disabled={toggling}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${maintenance ? "bg-amber-500 text-white" : "btn-primary"}`}
        >
          {maintenance ? "Turn off" : "Turn on"}
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-5">
            <div className="text-xs text-[var(--color-text-muted)] mb-1">Total clients</div>
            <div className="text-2xl font-bold ig-gradient-text">{data.totalClients}</div>
          </div>
          <div className="card p-5">
            <div className="text-xs text-[var(--color-text-muted)] mb-1">Active</div>
            <div className="text-2xl font-bold">{data.byStatus.active || 0}</div>
          </div>
          <div className="card p-5">
            <div className="text-xs text-[var(--color-text-muted)] mb-1">Revenue collected</div>
            <div className="text-2xl font-bold">â‚¹{data.totalRevenue.toLocaleString("en-IN")}</div>
          </div>
        </div>
      )}

      <div className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">Quick actions</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/onboarding" className="card p-5 hover:scale-[1.02] transition">
          <div className="font-medium mb-1">Onboard a client</div>
          <div className="text-xs text-[var(--color-text-muted)]">Add a new client and set up Supabase</div>
        </Link>
        <Link href="/admin/clients" className="card p-5 hover:scale-[1.02] transition">
          <div className="font-medium mb-1">Manage clients</div>
          <div className="text-xs text-[var(--color-text-muted)]">Edit status, keys, and payments</div>
        </Link>
        <Link href="/admin/tickets" className="card p-5 hover:scale-[1.02] transition">
          <div className="font-medium mb-1">Open tickets</div>
          <div className="text-xs text-[var(--color-text-muted)]">See what clients are raising</div>
        </Link>
      </div>
    </AppShell>
  );
}