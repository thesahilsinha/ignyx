"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";

const navItems = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Guide", href: "/admin/guide" },
  { label: "Onboarding", href: "/admin/onboarding" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Analytics", href: "/admin/analytics" },
];

interface AnalyticsSummary {
  totalClients: number;
  byStatus: Record<string, number>;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Admin overview</h1>
        <p className="text-sm text-[var(--color-text-muted)]">A snapshot of how IGNYX is doing right now.</p>
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
            <div className="text-2xl font-bold">₹{data.totalRevenue.toLocaleString("en-IN")}</div>
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