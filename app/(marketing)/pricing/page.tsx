import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

const starterFeatures = [
  "8 comment automation rules",
  "10 DM & story reply rules",
  "Text-only replies",
  "Greeting & fallback messages",
  "Ads analytics — spend, reach, impressions",
  "Post & account analytics",
];

const growthFeatures = [
  "Everything in Starter",
  "20 comment rules, 35 DM & story rules",
  "Image and video replies",
  "Post scheduling included",
  "Clicks, CTR, and post-level breakdowns",
  "Text, image & video greeting/fallback messages",
];

const addons = [
  {
    title: "AI+ add-on",
    price: "₹2,999/yr",
    desc: "AI-handled replies for anything that doesn't match a rule, using your own shop's context. Works on either plan.",
  },
  {
    title: "Catalogue add-on",
    price: "₹4,999/yr",
    desc: "Product catalogue setup and Instagram Shopping tags, so a comment can turn straight into a checkout. Works on either plan.",
  },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes — upgrade or downgrade anytime. The new rule and feature limits apply immediately; billing adjusts on your next renewal.",
  },
  {
    q: "What happens if I go over my rule limit?",
    a: "You won't be able to save a new rule past your plan's limit until you remove one or upgrade to Growth.",
  },
  {
    q: "Do add-ons need a specific plan?",
    a: "No — AI+ and the Catalogue add-on work on both Starter and Growth.",
  },
  {
    q: "Is there a monthly option?",
    a: "Not currently — IGNYX is billed annually only, which keeps the price lower than metered or monthly plans.",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] overflow-x-hidden">
      <MarketingHeader />

      {/* ============ HERO ============ */}
      <section className="relative px-6 pt-20 pb-6 overflow-visible">
        <div
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[380px] w-[680px] rounded-full blur-[120px] opacity-20 animate-[glow-pulse_7s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
        />
        <div className="relative max-w-2xl mx-auto text-center animate-[fade-up_0.7s_ease-out]">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
            Pricing
          </span>
          <h1 className="font-serif font-semibold text-[clamp(32px,5vw,48px)] leading-tight tracking-tight mt-3 mb-4 text-balance">
            Simple, honest pricing
          </h1>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Billed once a year. No monthly surprises, no per-message metering.
          </p>
        </div>
      </section>

      {/* ============ PLANS ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Starter */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur p-8 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 transition-all duration-300">
              <div className="font-semibold text-lg mb-1">Starter</div>
              <div className="font-mono text-3xl mb-6">
                ₹4,999<span className="text-sm text-[var(--color-text-muted)] font-normal"> / year</span>
              </div>
              <ul className="space-y-3 text-sm mb-8">
                {starterFeatures.map((f) => (
                  <li
                    key={f}
                    className="pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-[var(--color-accent)]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center rounded-full border border-[var(--color-border)] py-2.5 text-sm font-medium hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-colors"
              >
                Start with Starter
              </Link>
            </div>

            {/* Growth */}
            <div className="relative rounded-2xl border-2 border-[var(--color-accent)] bg-white/70 backdrop-blur p-8 shadow-[0_20px_50px_-25px_rgba(91,42,134,0.45)] hover:shadow-[0_28px_65px_-25px_rgba(91,42,134,0.55)] hover:-translate-y-1 transition-all duration-300">
              <span className="absolute -top-3 left-8 rounded-full bg-[var(--color-accent)] text-white text-xs font-medium px-3 py-1">
                Most picked
              </span>
              <div className="font-semibold text-lg mb-1">Growth</div>
              <div className="font-mono text-3xl mb-6">
                ₹8,999<span className="text-sm text-[var(--color-text-muted)] font-normal"> / year</span>
              </div>
              <ul className="space-y-3 text-sm mb-8">
                {growthFeatures.map((f) => (
                  <li
                    key={f}
                    className="pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-[var(--color-accent)]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center rounded-full py-2.5 text-sm font-medium bg-[var(--color-ink)] text-white hover:opacity-90 transition"
              >
                Start with Growth
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ADD-ONS ============ */}
      <section className="border-t border-[var(--color-border)] bg-white/40">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              Add-ons
            </span>
            <h2 className="font-serif font-semibold text-2xl md:text-3xl mt-3 mb-3">
              Optional extras, either plan
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {addons.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-[var(--color-border)] bg-white/60 backdrop-blur p-7 hover:border-[var(--color-accent)]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-serif font-semibold text-lg">{a.title}</div>
                  <div className="font-mono text-sm text-[var(--color-text-muted)] whitespace-nowrap">
                    {a.price}
                  </div>
                </div>
                <p className="text-[14.5px] text-[var(--color-text-muted)] leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              FAQ
            </span>
            <h2 className="font-serif font-semibold text-2xl md:text-3xl mt-3">
              Questions, answered
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-[var(--color-border)] bg-white/50 backdrop-blur px-6 py-5 hover:bg-white/70 transition-colors"
              >
                <div className="font-medium text-sm mb-1.5">{f.q}</div>
                <p className="text-[13.5px] text-[var(--color-text-muted)] leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[560px] rounded-full blur-[100px] opacity-20 animate-[glow-pulse_8s_ease-in-out_infinite]"
            style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
          />
          <div className="relative rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur-xl p-12 hover:bg-white/70 transition-colors duration-500">
            <h2 className="font-serif font-semibold text-2xl md:text-3xl mb-3">
              Still deciding?
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              Talk to us about which plan fits how your shop actually runs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-medium bg-[var(--color-ink)] text-white shadow-[0_8px_24px_-8px_rgba(22,19,15,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(22,19,15,0.6)] hover:-translate-y-0.5 transition-all"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}