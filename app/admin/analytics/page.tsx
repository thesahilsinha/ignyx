"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

import { adminNavItems } from "@/lib/admin-nav";

const navItems = adminNavItems;

interface AnalyticsData {
  totalClients: number;
  byStatus: Record<string, number>;
  byPlan: Record<string, number>;
  totalRevenue: number;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="gradient-border p-5">
          <div className="text-sm text-slate-500 mb-1">Total clients</div>
          <div className="text-2xl font-semibold">{data.totalClients}</div>
        </div>
        <div className="gradient-border p-5">
          <div className="text-sm text-slate-500 mb-1">Revenue collected</div>
          <div className="text-2xl font-semibold">â‚¹{data.totalRevenue.toLocaleString("en-IN")}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="gradient-border p-5">
          <div className="font-medium mb-2 text-sm">By status</div>
          {Object.entries(data.byStatus).map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm py-1 border-t border-[var(--color-border)] first:border-t-0">
              <span className="capitalize">{k}</span><span>{v}</span>
            </div>
          ))}
        </div>
        <div className="gradient-border p-5">
          <div className="font-medium mb-2 text-sm">By plan</div>
          {Object.entries(data.byPlan).map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm py-1 border-t border-[var(--color-border)] first:border-t-0">
              <span className="capitalize">{k}</span><span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}