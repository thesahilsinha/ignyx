import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

const values = [
  {
    n: "01",
    title: "Built for SMBs, not enterprises",
    desc: "Priced and scoped for how small Instagram-first shops actually run — not a stripped-down enterprise tool.",
  },
  {
    n: "02",
    title: "Practical over flashy",
    desc: "No bloated feature lists or confusing setup. Just the automation your shop actually needs, live in minutes.",
  },
  {
    n: "03",
    title: "Reliable by default",
    desc: "Rules fire the moment they match — 2pm or 2am — because the messages that go unanswered are the sales you lose.",
  },
];

export default function AboutPage() {
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
            About
          </span>
          <h1 className="font-serif font-semibold text-[clamp(32px,5vw,48px)] leading-tight tracking-tight mt-3 mb-4 text-balance">
            Built by Nyx Labs, for Instagram-first shops
          </h1>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Practical automation for Indian SMBs running their sales and support
            straight out of the DMs.
          </p>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur p-8 md:p-10 hover:border-[var(--color-accent)]/30 transition-colors duration-300">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              Our story
            </span>
            <h2 className="font-serif font-semibold text-2xl mt-3 mb-5">
              We started with WhatsApp, and built IGNYX the same way
            </h2>
            <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed mb-4">
              Nyx Labs started by automating WhatsApp for small and medium
              businesses across India. Shop owners kept telling us the same
              messages — pricing, COD, sizing — were eating their day on
              Instagram too.
            </p>
            <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed">
              IGNYX is that same approach applied to Instagram: no bloated
              feature lists, no confusing setup. Just the comment, DM, and
              story automation an Instagram-first shop actually needs, priced
              for how SMBs actually operate.
            </p>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="border-t border-[var(--color-border)] bg-white/40">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              What we believe
            </span>
            <h2 className="font-serif font-semibold text-2xl md:text-3xl mt-3 mb-4">
              How we decide what to build
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[var(--color-border)] bg-white/60 backdrop-blur p-7 hover:border-[var(--color-accent)]/40 hover:bg-white/90 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-25px_rgba(91,42,134,0.35)] transition-all duration-300"
              >
                <div className="font-mono text-2xl text-[var(--color-accent)]/30 font-semibold mb-4">
                  {v.n}
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-[14.5px] text-[var(--color-text-muted)] leading-relaxed">
                  {v.desc}
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
              See it running on your own shop
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              Live in under 10 minutes — connect your Instagram business account and go.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-medium bg-[var(--color-ink)] text-white shadow-[0_8px_24px_-8px_rgba(22,19,15,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(22,19,15,0.6)] hover:-translate-y-0.5 transition-all"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}