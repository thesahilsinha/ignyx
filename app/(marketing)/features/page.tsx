import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

const rules = [
  { trigger: 'Comment contains "price"', reply: "Sends catalogue PDF via DM" },
  { trigger: 'DM contains "COD"', reply: '"Yes, COD is available on all orders"' },
  { trigger: 'Story reply contains "size"', reply: "Sends size chart image" },
];

const queue = [
  ["Festive lehenga set — new arrivals", "Mon, 10:00 AM"],
  ["Behind the scenes: block printing", "Wed, 6:30 PM"],
  ["Customer feature — repost", "Fri, 9:00 AM"],
];

const analytics = [
  ["₹18,240", "Ad spend"],
  ["61.4k", "Reach"],
  ["2.8%", "CTR"],
];
const chart = [38, 55, 47, 72, 60, 91, 78];

const grid = [
  {
    n: "01",
    title: "Exact, starts-with & contains matching",
    desc: "Rules trigger on the way people actually type — not just perfect keyword matches.",
  },
  {
    n: "02",
    title: "Greeting & fallback messages",
    desc: "A tailored first-message greeting, and a fallback for anything your rules don't catch.",
  },
  {
    n: "03",
    title: "AI+ assisted replies",
    desc: "Give your own context, and let AI handle unmatched messages with real relevance.",
  },
  {
    n: "04",
    title: "Image & video replies",
    desc: "Send more than text on Growth — size charts, catalogues, and video responses.",
  },
  {
    n: "05",
    title: "Product catalogue & Shopping tags",
    desc: "Tag products on posts and stories so a comment can turn into a checkout.",
  },
  {
    n: "06",
    title: "Post-level breakdowns",
    desc: "See exactly which post is pulling its weight, down to clicks and CTR, on Growth.",
  },
];

export default function FeaturesPage() {
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
            Features
          </span>
          <h1 className="font-serif font-semibold text-[clamp(32px,5vw,48px)] leading-tight tracking-tight mt-3 mb-4 text-balance">
            Everything you need to run Instagram on autopilot
          </h1>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            One rules engine behind comments, DMs, stories, scheduling, and analytics —
            not six separate tools stitched together.
          </p>
        </div>
      </section>

      {/* ============ SECTION 1: Reply automation, detailed ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
                Comments · DMs · Stories
              </span>
              <h2 className="font-serif font-semibold text-2xl md:text-3xl mt-3 mb-4">
                Reply automation that actually understands what people typed
              </h2>
              <p className="text-[15px] text-[var(--color-text-muted)] mb-5 leading-relaxed">
                Set a trigger once — exact match, starts-with, or contains — and every
                matching comment, DM, or story reply gets that response instantly,
                whether it&apos;s 2pm or 2am.
              </p>
              <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  Public comment reply, DM reply, or both at once
                </li>
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  Up to 20 comment rules and 35 DM/story rules on Growth
                </li>
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  A fallback message for anything that doesn&apos;t match a rule
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur p-5 hover:border-[var(--color-accent)]/40 hover:shadow-[0_20px_50px_-25px_rgba(91,42,134,0.35)] hover:-translate-y-1 transition-all duration-300">
              <div className="font-mono text-[11px] uppercase text-[var(--color-text-muted)] mb-3">
                Active rules
              </div>
              <div className="space-y-2.5">
                {rules.map((r) => (
                  <div
                    key={r.trigger}
                    className="rounded-lg border border-[var(--color-border)] bg-white/40 px-3.5 py-3 text-[13px] hover:bg-white/70 transition-colors"
                  >
                    <div className="text-[var(--color-text-muted)] mb-1">
                      WHEN {r.trigger}
                    </div>
                    <div className="text-[var(--color-accent)]">→ {r.reply}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: Scheduling + Analytics, two panels ============ */}
      <section className="border-t border-[var(--color-border)] bg-white/40">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              Scheduling & analytics
            </span>
            <h2 className="font-serif font-semibold text-2xl md:text-3xl mt-3 mb-4">
              Plan the week, then see what actually worked
            </h2>
            <p className="text-[var(--color-text-muted)]">
              Queue posts in one sitting on Growth, and track spend, reach, and
              engagement without switching apps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/60 backdrop-blur p-6 hover:border-[var(--color-accent)]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="font-mono text-[11px] uppercase text-[var(--color-text-muted)] mb-3">
                This week&apos;s queue
              </div>
              <div className="space-y-2">
                {queue.map(([title, time]) => (
                  <div
                    key={title}
                    className="flex justify-between items-center border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white/40 hover:bg-white/70 transition-colors"
                  >
                    <span>{title}</span>
                    <span className="font-mono text-[11.5px] text-[var(--color-text-muted)]">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-white/60 backdrop-blur p-6 hover:border-[var(--color-accent)]/40 hover:-translate-y-1 transition-all duration-300">
              <div className="font-mono text-[11px] uppercase text-[var(--color-text-muted)] mb-4">
                Last 7 days
              </div>
              <div className="flex gap-6 mb-4">
                {analytics.map(([v, l]) => (
                  <div key={l}>
                    <div className="font-mono text-lg">{v}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1.5 h-[60px]">
                {chart.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm hover:opacity-90 transition-opacity"
                    style={{ height: `${h}%`, background: "var(--color-accent)", opacity: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: Full feature grid ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              Everything else
            </span>
            <h2 className="font-serif font-semibold text-2xl md:text-3xl mt-3 mb-4">
              The rest of the toolkit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grid.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur p-7 hover:border-[var(--color-accent)]/40 hover:bg-white/80 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(91,42,134,0.35)] transition-all duration-300"
              >
                <div className="font-mono text-2xl text-[var(--color-accent)]/30 font-semibold mb-3">
                  {f.n}
                </div>
                <div className="font-serif font-semibold text-lg mb-2">{f.title}</div>
                <p className="text-[14.5px] text-[var(--color-text-muted)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: CTA ============ */}
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