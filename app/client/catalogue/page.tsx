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

export default async function CataloguePage() {
  const client = await getCurrentClient();

  if (!client?.catalogue_enabled) {
    return (
      <AppShell title="IGNYX" navItems={navItems}>
        <div className="gradient-border p-8 text-center max-w-md mx-auto mt-12">
          <div className="text-lg font-semibold mb-2">Catalogue is not active yet</div>
          <p className="text-sm text-slate-500 mb-4">
            Get your product catalogue set up and tagged on Instagram. Contact us to unlock it.
          </p>
          <button className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm">Unlock now</button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Catalogue</h1>
      <div className="gradient-border p-6 max-w-2xl">
        <p className="text-sm text-slate-600">
          Product catalogue setup requires connecting a Facebook Business account, which is being finalized. Once connected, you&apos;ll be able to manage your product feed and Instagram Shopping tags here.
        </p>
      </div>
    </AppShell>
  );
}