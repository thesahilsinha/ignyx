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

  if (loading) return null;

  const isGrowth = plan === "growth";

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Ads analytics ({isGrowth ? "Advanced" : "Basic"})</h1>

      {error && (
        <div className="gradient-border p-6 max-w-2xl">
          <p className="text-sm text-slate-600">{error}</p>
        </div>
      )}

      {insights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="gradient-border p-5">
            <div className="text-sm text-slate-500 mb-1">Spend</div>
            <div className="text-lg font-semibold">₹{insights.spend || "0"}</div>
          </div>
          <div className="gradient-border p-5">
            <div className="text-sm text-slate-500 mb-1">Reach</div>
            <div className="text-lg font-semibold">{insights.reach || "0"}</div>
          </div>
          <div className="gradient-border p-5">
            <div className="text-sm text-slate-500 mb-1">Impressions</div>
            <div className="text-lg font-semibold">{insights.impressions || "0"}</div>
          </div>
          {isGrowth && (
            <>
              <div className="gradient-border p-5">
                <div className="text-sm text-slate-500 mb-1">Clicks</div>
                <div className="text-lg font-semibold">{insights.clicks || "0"}</div>
              </div>
              <div className="gradient-border p-5">
                <div className="text-sm text-slate-500 mb-1">CTR</div>
                <div className="text-lg font-semibold">{insights.ctr || "0"}%</div>
              </div>
            </>
          )}
        </div>
      )}
    </AppShell>
  );
}