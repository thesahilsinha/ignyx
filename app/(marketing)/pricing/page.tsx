import MarketingHeader from "@/components/MarketingHeader";

export default function PricingPage() {
  return (
    <div>
      <MarketingHeader />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold text-center mb-2">Simple, honest pricing</h1>
        <p className="text-center text-slate-500 mb-12">Billed annually. No surprise fees.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="gradient-border p-8">
            <div className="text-lg font-semibold mb-1">Starter</div>
            <div className="text-3xl font-bold mb-4">₹4,999<span className="text-sm font-normal text-slate-500">/year</span></div>
            <ul className="text-sm space-y-2 text-slate-600">
              <li>✓ 8 comment automation rules</li>
              <li>✓ 10 DM & story reply rules</li>
              <li>✓ Basic ads analytics (view-only)</li>
              <li>✓ Post & account analytics</li>
              <li>✓ Greeting & fallback messages</li>
            </ul>
          </div>

          <div className="gradient-border p-8 border-2 border-[var(--color-accent)]">
            <div className="text-lg font-semibold mb-1">Growth</div>
            <div className="text-3xl font-bold mb-4">₹8,999<span className="text-sm font-normal text-slate-500">/year</span></div>
            <ul className="text-sm space-y-2 text-slate-600">
              <li>✓ Everything in Starter</li>
              <li>✓ 20 comment rules, 35 DM & story rules</li>
              <li>✓ Media replies on DM & story rules</li>
              <li>✓ Post scheduling</li>
              <li>✓ Advanced, detailed ads analytics</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="gradient-border p-6">
            <div className="font-medium mb-1">AI+ add-on — ₹2,999/year</div>
            <p className="text-sm text-slate-500">AI-handled replies for messages your rules don&apos;t cover. Works on either plan.</p>
          </div>
          <div className="gradient-border p-6">
            <div className="font-medium mb-1">Catalogue add-on — ₹4,999/year</div>
            <p className="text-sm text-slate-500">Get your product catalogue set up and tagged on Instagram. Works on either plan.</p>
          </div>
        </div>
      </section>
    </div>
  );
}