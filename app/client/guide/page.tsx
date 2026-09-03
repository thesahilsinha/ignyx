import AppShell from "@/components/AppShell";
import { AccordionSection } from "@/components/Accordion";

import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-3">
      <div className="w-6 h-6 rounded-full ig-gradient text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
        {n}
      </div>
      <div className="text-[var(--color-text-muted)]">{children}</div>
    </div>
  );
}

function Example({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-lg p-3 text-xs mt-3">
      {children}
    </div>
  );
}

export default function ClientGuidePage() {
  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">How IGNYX works</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Everything below is written for you, not for a developer. Open a section to see exactly how it works.
        </p>
      </div>

      <AccordionSection title="Comment rules" subtitle="Auto-reply when someone comments a keyword" defaultOpen>
        <p className="mb-3">
          A comment rule watches every comment on your posts and reels. When a comment matches a keyword you set,
          IGNYX responds automatically, no one has to be online.
        </p>
        <Step n={1}>
          <strong>Pick a trigger word.</strong> This is the word or phrase you want to watch for, like &quot;price&quot; or &quot;size&quot;.
        </Step>
        <Step n={2}>
          <strong>Pick how it should match:</strong>
          <ul className="list-disc list-inside mt-1">
            <li><strong>Exact</strong> â€” the comment must be only that word, nothing else.</li>
            <li><strong>Starts with</strong> â€” the comment must begin with that word.</li>
            <li><strong>Contains</strong> â€” the word can appear anywhere in the comment. Most people use this one.</li>
          </ul>
        </Step>
        <Step n={3}>
          <strong>Pick what happens:</strong> reply publicly under the comment, send a private DM, or both.
        </Step>
        <Step n={4}>
          <strong>Write what it should say.</strong> On the Growth plan, you can also attach an image or video to the DM leg.
        </Step>
        <Example>
          Example: trigger word &quot;price&quot;, match &quot;contains&quot;, action &quot;both&quot;.
          Someone comments &quot;whats the price??&quot; and instantly gets a public reply plus a DM with your price list.
        </Example>
        <p className="mt-3 text-xs">
          Note: a public reply is always text only, that&apos;s an Instagram rule, not something we control. Images and videos can only go in the DM leg.
        </p>
      </AccordionSection>

      <AccordionSection title="DM & Story rules" subtitle="Auto-reply to direct messages and story replies">
        <p className="mb-3">
          Same idea as comment rules, but for messages sent straight to your inbox, and for replies to your stories.
        </p>
        <Step n={1}>Choose the channel: DM, or Story reply.</Step>
        <Step n={2}>Set the trigger word and matching method, same as comment rules.</Step>
        <Step n={3}>Write the reply. On Growth, you can also attach an image or video.</Step>
        <Example>
          Example: channel &quot;DM&quot;, trigger &quot;hello&quot;, match &quot;contains&quot;.
          Anyone who messages you with &quot;hello&quot; in it gets your reply right away, even at 2am.
        </Example>
      </AccordionSection>

      <AccordionSection title="Greeting & fallback messages" subtitle="What happens when nothing matches">
        <p className="mb-3">Two safety-net messages cover everything your rules don&apos;t.</p>
        <Step n={1}>
          <strong>Greeting</strong> fires the very first time someone messages you and their message doesn&apos;t match a rule. Use it to say hi and set expectations.
        </Step>
        <Step n={2}>
          <strong>Exception</strong> fires on any later message that still doesn&apos;t match a rule. A simple &quot;we&apos;ll get back to you soon&quot; works well here.
        </Step>
        <Example>
          If you have AI+ turned on, Exception gets smarter: instead of that fixed reply, an AI reads the message and answers using the context you&apos;ve given it.
        </Example>
      </AccordionSection>

      <AccordionSection title="AI+" subtitle="Let AI handle what your rules don't cover">
        <p className="mb-3">
          AI+ steps in only when nothing else matches, meaning your exact rules always come first. You give it context about your business once, and it uses that to answer naturally.
        </p>
        <Step n={1}>Write a few sentences about your business: what you sell, prices, shipping, tone of voice.</Step>
        <Step n={2}>Save it. That&apos;s it, no ongoing work needed.</Step>
        <Example>
          Example context: &quot;We sell handmade candles, ship across India in 3 to 5 days, prices range from 299 to 899 rupees. Be warm and keep replies short.&quot;
        </Example>
      </AccordionSection>

      <AccordionSection title="Scheduling posts" subtitle="Growth plan feature">
        <p className="mb-3">Queue up a post in advance and it publishes itself, no need to be online at the right time.</p>
        <Step n={1}>Upload your image to your own storage and paste the link into the Schedule page.</Step>
        <Step n={2}>Write your caption.</Step>
        <Step n={3}>Pick the date and time you want it to go live.</Step>
        <Step n={4}>That&apos;s it. Check back on the Schedule page to see it move from queued to published.</Step>
        <p className="mt-3 text-xs">
          If something goes wrong (a broken image link, for example) the post is marked failed rather than published, so check the page occasionally rather than assuming it always works silently.
        </p>
      </AccordionSection>

      <AccordionSection title="Catalogue" subtitle="Product tagging on Instagram">
        <p>
          Once active, your product catalogue gets connected so items can be tagged in your posts and reels for shopping.
          This needs your Facebook Business connected first, ask us if you&apos;re not sure whether yours is set up.
        </p>
      </AccordionSection>

      <AccordionSection title="Ads analytics" subtitle="See what your ads are actually doing">
        <p>
          Starter shows the basics: spend, reach, and impressions. Growth adds clicks and click-through rate too.
          This needs your Facebook Business connected, since ad data lives there, not on Instagram itself.
        </p>
      </AccordionSection>

      <AccordionSection title="Tickets" subtitle="Something not working right?">
        <p>
          Raise a ticket any time from the Tickets page. Tell us what happened and we&apos;ll take it from there.
        </p>
      </AccordionSection>
    </AppShell>
  );
}