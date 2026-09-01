import AppShell from "@/components/AppShell";
import { AccordionSection } from "@/components/Accordion";

const navItems = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Guide", href: "/admin/guide" },
  { label: "Onboarding", href: "/admin/onboarding" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Analytics", href: "/admin/analytics" },
];

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs mt-3 text-amber-800">
      <strong>Watch out:</strong> {children}
    </div>
  );
}

export default function AdminGuidePage() {
  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Admin guide</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          How the system actually works, and every real issue we&apos;ve hit while onboarding clients.
        </p>
      </div>

      <AccordionSection title="Client statuses" subtitle="What each one means" defaultOpen>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>in_review</strong> — client added, nothing live yet.</li>
          <li><strong>trial</strong> — free trial period.</li>
          <li><strong>active</strong> — paying, fully live.</li>
          <li><strong>hold</strong> — temporarily paused, usually a payment issue.</li>
          <li><strong>suspended</strong> — access revoked.</li>
        </ul>
      </AccordionSection>

      <AccordionSection title="Two different tester systems, don't mix them up" subtitle="This has caused real bugs">
        <p className="mb-2">
          Meta has two separate places to add someone, and only one of them actually connects a client&apos;s Instagram.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>App roles</strong> (App settings → App roles) grants access to the Meta app itself. It does
            <strong> not</strong> send an Instagram invite and won&apos;t let a client&apos;s account send messages or comments.
          </li>
          <li>
            <strong>Instagram Testers</strong> (Instagram API → Generate access tokens → Add account) is the one that
            actually invites the client&apos;s Instagram account. They accept it from inside the Instagram app, under
            Settings → Apps and websites → Tester invites.
          </li>
        </ul>
        <Warn>
          If a client&apos;s automation isn&apos;t working at all and there are zero webhook logs for them, check they were
          added via Instagram Testers, not just App roles.
        </Warn>
      </AccordionSection>

      <AccordionSection title="Per-account webhook toggle" subtitle="A second, separate switch">
        <p>
          On the same Generate access tokens page, each connected account has its own Webhook Subscription toggle.
          This is different from the app-wide field subscriptions (comments, messages) on the Webhooks page.
          Both need to be on, for every client, individually.
        </p>
      </AccordionSection>

      <AccordionSection title="Comments not triggering? Check this order" subtitle="A real checklist, not guessing">
        <ol className="list-decimal list-inside space-y-1">
          <li>Confirm the comment is genuinely public, not auto-hidden by Instagram as spam.</li>
          <li>Confirm the comment was made on a post that client actually owns, not a post they were only tagged as a collaborator on. Collab post comments fire under the original poster&apos;s account, not the collaborator&apos;s.</li>
          <li>Check the client was added via Instagram Testers (see above), not just App roles.</li>
          <li>Check their per-account Webhook Subscription toggle is On.</li>
          <li>Use the Test button on the Webhooks page (comments field) to confirm Meta can reach your server at all, independent of any real comment.</li>
        </ol>
      </AccordionSection>

      <AccordionSection title="Facebook Login vs Instagram Login" subtitle="They serve different purposes">
        <p className="mb-2">
          Instagram Login handles the core product: comments, DMs, story replies, scheduling. It doesn&apos;t need a
          Facebook Page at all.
        </p>
        <p>
          Facebook Login for Business is only needed for Ads analytics and the Catalogue add-on, since ad accounts
          and product catalogs are Business Manager concepts, not things Instagram Login can access. A client only
          needs to go through this second connect flow if they&apos;re on a plan or add-on that needs it.
        </p>
      </AccordionSection>

      <AccordionSection title="AI+ and Catalogue add-ons" subtitle="How to turn them on for a client">
        <p>
          Both stay locked on a client&apos;s dashboard until enabled from their client record in Clients. AI+ also
          needs a Groq API key entered on that same record, the client generates their own key and gives it to you.
        </p>
      </AccordionSection>

      <AccordionSection title="Tickets" subtitle="Support requests from clients">
        <p>Clients raise tickets from their own dashboard. Check the Tickets page regularly and update status as you work through them.</p>
      </AccordionSection>
    </AppShell>
  );
}