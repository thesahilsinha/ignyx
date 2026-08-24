import AppShell from "@/components/AppShell";

const navItems = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Guide", href: "/admin/guide" },
  { label: "Onboarding", href: "/admin/onboarding" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Analytics", href: "/admin/analytics" },
];

export default function GuidePage() {
  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Handling clients — guide</h1>
      <div className="gradient-border p-6 space-y-4 text-sm leading-relaxed">
        <div>
          <div className="font-medium mb-1">Client statuses</div>
          <p className="text-slate-600">
            in_review — client added, not yet active. trial — free trial period. active — paying, fully live.
            hold — temporarily paused (e.g. late payment). suspended — access revoked.
          </p>
        </div>
        <div>
          <div className="font-medium mb-1">AI+ and Catalogue add-ons</div>
          <p className="text-slate-600">
            These stay locked for a client until you enable them from their client record.
            AI+ requires the client&apos;s own Groq API key entered on their record.
          </p>
        </div>
        <div>
          <div className="font-medium mb-1">Tickets</div>
          <p className="text-slate-600">
            Clients raise tickets from their dashboard. Check the Tickets page regularly and update status
            as you work through them.
          </p>
        </div>
      </div>
    </AppShell>
  );
}