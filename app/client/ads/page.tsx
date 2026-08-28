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

interface Insights {
  spend?: string;
  impressions?: string;
  reach?: string;
  clicks?: string;
  ctr?: string;
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5">
      <div className="text-xs text-[var(--color-text-muted)] mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

export default function AdsPage() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("starter");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/ads-data")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          setInsights(data.insights);
          setPlan(data.plan);
        }
        setLoading(false);
      });
  }, []);

  const isGrowth = plan === "growth";

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Ads analytics</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          <span className="ig-gradient-text font-medium">{isGrowth ? "Advanced" : "Basic"}</span> — last 30 days
        </p>
      </div>

      {loading && <div className="text-sm text-[var(--color-text-muted)]">Loading...</div>}

      {!loading && error && !insights && (
        <div className="card p-8 text-center max-w-md">
          <div className="w-12 h-12 rounded-full ig-gradient mx-auto mb-4 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
          </div>
          <div className="font-medium mb-1">No ad data yet</div>
          <p className="text-sm text-[var(--color-text-muted)]">{error}</p>
        </div>
      )}

      {insights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi label="Spend" value={`₹${insights.spend || "0"}`} />
          <Kpi label="Reach" value={insights.reach || "0"} />
          <Kpi label="Impressions" value={insights.impressions || "0"} />
          {isGrowth && (
            <>
              <Kpi label="Clicks" value={insights.clicks || "0"} />
              <Kpi label="CTR" value={`${insights.ctr || "0"}%`} />
            </>
          )}
        </div>
      )}
    </AppShell>
  );
}