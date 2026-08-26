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

export default function ClientGuidePage() {
  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">How IGNYX works</h1>
      <div className="gradient-border p-6 space-y-4 text-sm leading-relaxed">
        <div>
          <div className="font-medium mb-1">Comment rules</div>
          <p className="text-slate-600">Set a trigger word and how it should match (exact, starts with, or contains). Choose whether to reply publicly, send a DM, or both when someone comments it.</p>
        </div>
        <div>
          <div className="font-medium mb-1">DM & Story rules</div>
          <p className="text-slate-600">Same idea, for direct messages and story replies. When someone sends a matching message, they get your configured reply automatically.</p>
        </div>
        <div>
          <div className="font-medium mb-1">Greeting & Exception</div>
          <p className="text-slate-600">Greeting fires on someone&apos;s first message. Exception fires on any later message that doesn&apos;t match a rule — this is where AI+ can take over if it&apos;s enabled on your account.</p>
        </div>
        <div>
          <div className="font-medium mb-1">Scheduling</div>
          <p className="text-slate-600">Upload an image to your own storage, paste the link, write a caption, and pick a time — your post goes live automatically.</p>
        </div>
      </div>
    </AppShell>
  );
}