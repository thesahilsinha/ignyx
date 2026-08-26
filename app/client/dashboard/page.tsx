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

export default async function ClientDashboard() {
  const client = await getCurrentClient();

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Welcome, {client?.business_name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="gradient-border p-5">
          <div className="text-sm text-slate-500 mb-1">Account status</div>
          <div className="text-lg font-semibold capitalize">{client?.status.replace("_", " ")}</div>
        </div>
        <div className="gradient-border p-5">
          <div className="text-sm text-slate-500 mb-1">Plan</div>
          <div className="text-lg font-semibold capitalize">{client?.plan}</div>
        </div>
        <div className="gradient-border p-5">
          <div className="text-sm text-slate-500 mb-1">Instagram</div>
          <div className="text-lg font-semibold">
            {client?.meta_ig_business_id ? "Connected" : "Not connected"}
          </div>
        </div>
      </div>
    </AppShell>
  );
}