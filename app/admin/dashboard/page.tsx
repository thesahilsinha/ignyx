import AppShell from "@/components/AppShell";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Guide", href: "/admin/guide" },
  { label: "Onboarding", href: "/admin/onboarding" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Analytics", href: "/admin/analytics" },
];

export default function AdminDashboard() {
  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Quick actions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/onboarding" className="gradient-border p-5 block">
          <div className="font-medium mb-1">Onboard a client</div>
          <div className="text-sm text-slate-500">Add a new client and set up their Supabase project.</div>
        </Link>
        <Link href="/admin/clients" className="gradient-border p-5 block">
          <div className="font-medium mb-1">Manage clients</div>
          <div className="text-sm text-slate-500">View, edit, and update status for existing clients.</div>
        </Link>
        <Link href="/admin/tickets" className="gradient-border p-5 block">
          <div className="font-medium mb-1">Open tickets</div>
          <div className="text-sm text-slate-500">Review support tickets raised by clients.</div>
        </Link>
      </div>
    </AppShell>
  );
}