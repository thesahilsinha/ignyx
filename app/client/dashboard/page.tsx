import Link from "next/link";
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
  const statusColor: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    trial: "bg-blue-100 text-blue-700",
    hold: "bg-amber-100 text-amber-700",
    suspended: "bg-red-100 text-red-700",
    in_review: "bg-slate-100 text-slate-700",
  };

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Welcome back, {client?.business_name}</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs text-[var(--color-text-muted)] mb-2">Account status</div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColor[client?.status || ""] || ""}`}>
            {client?.status.replace("_", " ")}
          </span>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[var(--color-text-muted)] mb-2">Plan</div>
          <div className="text-lg font-semibold ig-gradient-text capitalize">{client?.plan}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[var(--color-text-muted)] mb-2">Instagram</div>
          <div className="text-lg font-semibold flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${client?.meta_ig_business_id ? "bg-emerald-500" : "bg-slate-300"}`} />
            {client?.meta_ig_business_id ? "Connected" : "Not connected"}
          </div>
        </div>
      </div>

      <div className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">Quick actions</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/client/comments" className="card p-5 hover:scale-[1.02] transition">
          <div className="font-medium mb-1">Comment rules</div>
          <div className="text-xs text-[var(--color-text-muted)]">Manage auto-replies</div>
        </Link>
        <Link href="/client/dm-story" className="card p-5 hover:scale-[1.02] transition">
          <div className="font-medium mb-1">DM & Story rules</div>
          <div className="text-xs text-[var(--color-text-muted)]">Manage message automation</div>
        </Link>
        <Link href="/client/schedule" className="card p-5 hover:scale-[1.02] transition">
          <div className="font-medium mb-1">Schedule a post</div>
          <div className="text-xs text-[var(--color-text-muted)]">Queue up content</div>
        </Link>
        <Link href="/client/analytics" className="card p-5 hover:scale-[1.02] transition">
          <div className="font-medium mb-1">View usage</div>
          <div className="text-xs text-[var(--color-text-muted)]">Check your limits</div>
        </Link>
      </div>
    </AppShell>
  );
}