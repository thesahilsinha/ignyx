"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

interface UsageStat {
  used: number;
  limit: number;
}

interface AnalyticsData {
  plan: string;
  commentRules: UsageStat;
  dmStoryRules: UsageStat;
  scheduledPosts: { used: number };
}

function UsageBar({ label, used, limit }: { label: string; used: number; limit: number }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-slate-500">{used} / {limit}</span>
      </div>
      <div className="w-full h-2 bg-[var(--color-surface-muted)] rounded-full overflow-hidden">
        <div className="h-full bg-[var(--color-accent)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function ClientAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/client/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Usage</h1>
      <div className="gradient-border p-6 max-w-lg">
        <UsageBar label="Comment rules" used={data.commentRules.used} limit={data.commentRules.limit} />
        <UsageBar label="DM / Story rules" used={data.dmStoryRules.used} limit={data.dmStoryRules.limit} />
        <div className="text-sm text-slate-500 mt-4">Scheduled posts: {data.scheduledPosts.used}</div>
      </div>
    </AppShell>
  );
}