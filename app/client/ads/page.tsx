import AppShell from "@/components/AppShell";
import { getCurrentClient } from "@/lib/current-client";

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

export default async function AdsPage() {
  const client = await getCurrentClient();
  const isGrowth = client?.plan === "growth";

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Ads analytics ({isGrowth ? "Advanced" : "Basic"})</h1>
      <div className="gradient-border p-6 max-w-2xl">
        <p className="text-sm text-slate-600">
          Ads analytics requires connecting a Facebook Business account, which is being finalized. Once connected, {isGrowth ? "detailed breakdowns by placement, demographics, and funnel stage" : "top-line spend, reach, and impressions"} will show up here.
        </p>
      </div>
    </AppShell>
  );
}