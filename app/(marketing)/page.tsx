import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

const ticker = [
  "500+ Instagram shops automated",
  "1.2M replies sent since launch",
  "Live in under 10 minutes",
  "Comments, DMs & stories covered",
  "No developer required",
];

const trustStats = [
  { value: "500+", label: "shops automated" },
  { value: "1.2M", label: "replies sent" },
  { value: "24/7", label: "auto-reply coverage" },
  { value: "10 min", label: "average setup time" },
];

const rules = [
  { trigger: 'Comment contains "price" or "cost"', type: "Comment", reply: "Sends catalogue PDF via DM", status: "live" },
  { trigger: 'DM contains "COD" or "cash on delivery"', type: "DM", reply: '"Yes, COD is available on all orders"', status: "live" },
  { trigger: 'Story reply contains "size" or "fit"', type: "Story", reply: "Sends size chart image", status: "live" },
  { trigger: "No rule matched", type: "Fallback", reply: "AI+ replies using your shop's FAQ", status: "addon" },
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

const steps = [
  {
    n: "01",
    title: "Connect your Instagram business account",
    body: "Log in with Instagram, grant IGNYX access through Meta's official Graph API. Nothing to install.",
  },
  {
    n: "02",
    title: "Set your reply rules",
    body: "Write a trigger, write a reply. Do it for pricing, COD, sizing — whatever your DMs actually ask.",
  },
  {
    n: "03",
    title: "Go live",
    body: "Every matching comment, DM, or story mention gets answered instantly, starting the moment you save.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] overflow-x-hidden">
      <MarketingHeader />

      {/* ============ TICKER ============ */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-ink)] overflow-hidden">
        <div className="flex whitespace-nowrap py-2.5 animate-[ticker_28s_linear_infinite] motion-reduce:animate-none">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center font-mono text-[12px] text-white/70 px-6">
              {t}
              <span className="ml-6 text-[var(--color-accent-warm)]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ HERO — centered, glass panel, ambient glow ============ */}
      <section className="relative px-6 pt-20 pb-6 overflow-visible">
        <div
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[420px] w-[720px] rounded-full blur-[120px] opacity-25 animate-[glow-pulse_7s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
        />
        <div
          className="pointer-events-none absolute left-[62%] top-40 h-[300px] w-[300px] rounded-full blur-[110px] opacity-20 animate-[glow-pulse_9s_ease-in-out_infinite_1s]"
          style={{ background: "radial-gradient(closest-side, var(--color-accent-warm), transparent)" }}
        />

        <div className="relative max-w-3xl mx-auto text-center animate-[fade-up_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/50 backdrop-blur px-3.5 py-1.5 font-mono text-xs text-[var(--color-text-muted)] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Built for Instagram-first shops in India
          </div>
          <h1 className="font-serif font-semibold text-[clamp(36px,6vw,60px)] leading-[1.06] tracking-tight mb-6 text-balance">
            While you sleep, your Instagram is still selling.
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-xl mx-auto mb-9 leading-relaxed">
            IGNYX watches every comment, DM, and story reply for your shop — and answers before
            someone scrolls past.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-medium bg-[var(--color-ink)] text-white shadow-[0_8px_24px_-8px_rgba(22,19,15,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(22,19,15,0.6)] hover:-translate-y-0.5 transition-all"
            >
              See pricing — from ₹4,999/yr
            </Link>
            <Link
              href="#product"
              className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-medium border border-[var(--color-border)] bg-white/40 backdrop-blur hover:border-[var(--color-accent)] hover:bg-white/70 hover:-translate-y-0.5 transition-all"
            >
              See it in action
            </Link>
          </div>
          <p className="font-mono text-[13px] text-[var(--color-text-muted)]">
            Connects to your Instagram business account · Live in 10 minutes · No developer needed
          </p>
        </div>

        {/* ---- Glass product panel ---- */}
        <div
          id="product"
          className="relative mt-14 max-w-3xl mx-auto rounded-2xl border border-[var(--color-border)] bg-white/60 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_-25px_rgba(22,19,15,0.35)] hover:shadow-[0_28px_70px_-25px_rgba(22,19,15,0.45)] transition-shadow duration-500 animate-[fade-up_0.7s_ease-out_0.15s_backwards]"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border)] bg-white/40">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
            <span className="ml-2 font-mono text-xs text-[var(--color-text-muted)] bg-white/70 border border-[var(--color-border)] rounded px-2.5 py-0.5">
              app.ignyx.in/rules
            </span>
            <span className="ml-auto font-mono text-[11px] text-[var(--color-text-muted)]">
              Connected: @meher.ethnic
            </span>
          </div>
          <div className="p-5 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold">Active rules</h3>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">7 of 20 comment rules used</span>
            </div>
            <table className="w-full text-[13.5px] border-collapse">
              <thead>
                <tr>
                  {["Trigger", "Type", "Reply", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] font-medium pb-2.5 border-b border-[var(--color-border)]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.trigger} className="border-b border-[var(--color-border)] last:border-0 hover:bg-white/40 transition-colors">
                    <td className="py-3.5 pr-3">{r.trigger}</td>
                    <td className="py-3.5 pr-3">{r.type}</td>
                    <td className="py-3.5 pr-3">{r.reply}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] border border-[var(--color-border)] bg-white/60 rounded-full px-2.5 py-0.5">
                        {r.status === "live" && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {r.status === "live" ? "Live" : "AI+ add-on"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-[var(--color-text-muted)]">
          This is what your rules list actually looks like — not a mock dashboard for the website.
        </p>
      </section>

      {/* ============ TRUST BADGES ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustStats.map((s) => (
            <div
              key={s.label}
              className="group rounded-xl border border-[var(--color-border)] bg-white/50 backdrop-blur px-5 py-6 text-center hover:border-[var(--color-accent)]/40 hover:bg-white/80 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-serif font-semibold text-2xl md:text-3xl text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300">
                {s.value}
              </div>
              <div className="text-[12.5px] text-[var(--color-text-muted)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURES — alternating rows, glass cards ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              What it does
            </span>
            <h2 className="font-serif font-semibold text-3xl md:text-4xl mt-3 mb-4">
              Three jobs, handled the moment they happen.
            </h2>
            <p className="text-[var(--color-text-muted)]">
              Not a bundle of unrelated tools — one rules engine that watches your comments, DMs,
              and stories, plus scheduling and analytics built on top of it.
            </p>
          </div>

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-14 items-center py-14 border-t border-[var(--color-border)]">
            <div>
              <h3 className="font-serif font-semibold text-xl mb-3">
                Reply automation for comments, DMs, and stories
              </h3>
              <p className="text-[15px] text-[var(--color-text-muted)] mb-3 leading-relaxed">
                Set a trigger and a reply once. Every matching comment, DM, or story mention gets
                that exact reply — instantly, whether it&apos;s 2pm or 2am.
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  Text replies on Starter, image and video replies on Growth
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
                Rule builder
              </div>
              <div className="font-mono text-[12.5px] space-y-2.5">
                <div><span className="text-[var(--color-text-muted)]">WHEN</span> comment contains &quot;cash on delivery&quot;</div>
                <div>
                  <span className="text-[var(--color-accent)]">→ REPLY</span> &quot;Yes, COD is available on all orders&quot;
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-14 items-center py-14 border-t border-[var(--color-border)]">
            <div className="md:order-2">
              <h3 className="font-serif font-semibold text-xl mb-3">
                Post scheduling and a shopping catalogue
              </h3>
              <p className="text-[15px] text-[var(--color-text-muted)] mb-3 leading-relaxed">
                Queue a week of posts in one sitting on Growth. Add the catalogue add-on and tag
                products directly on your posts and stories, so a comment can turn into a checkout.
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  Schedule captions, images, and post timing in advance
                </li>
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  Optional catalogue setup and Instagram Shopping tags
                </li>
              </ul>
            </div>
            <div className="md:order-1 rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur p-5 hover:border-[var(--color-accent)]/40 hover:shadow-[0_20px_50px_-25px_rgba(91,42,134,0.35)] hover:-translate-y-1 transition-all duration-300">
              <div className="font-mono text-[11px] uppercase text-[var(--color-text-muted)] mb-3">
                This week&apos;s queue
              </div>
              <div className="space-y-2">
                {queue.map(([title, time]) => (
                  <div key={title} className="flex justify-between items-center border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm bg-white/40 hover:bg-white/70 transition-colors">
                    <span>{title}</span>
                    <span className="font-mono text-[11.5px] text-[var(--color-text-muted)]">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-14 items-center py-14 border-t border-[var(--color-border)]">
            <div>
              <h3 className="font-serif font-semibold text-xl mb-3">
                Ad and account analytics, without switching apps
              </h3>
              <p className="text-[15px] text-[var(--color-text-muted)] mb-3 leading-relaxed">
                Starter shows you spend, reach, and impressions. Growth breaks it down further —
                clicks, CTR, and which post is actually pulling its weight.
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  View-only spend, reach, and impressions on Starter
                </li>
                <li className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                  Click, CTR, and post-level breakdowns on Growth
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur p-5 hover:border-[var(--color-accent)]/40 hover:shadow-[0_20px_50px_-25px_rgba(91,42,134,0.35)] hover:-translate-y-1 transition-all duration-300">
              <div className="font-mono text-[11px] uppercase text-[var(--color-text-muted)] mb-4">
                Last 7 days · @meher.ethnic
              </div>
              <div className="flex gap-6 mb-4">
                {analytics.map(([v, l]) => (
                  <div key={l}>
                    <div className="font-mono text-lg">{v}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1.5 h-[70px]">
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

      {/* ============ HOW IT WORKS — numbered, real sequence ============ */}
      <section className="border-t border-[var(--color-border)] bg-white/40">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              How it works
            </span>
            <h2 className="font-serif font-semibold text-3xl md:text-4xl mt-3 mb-4">
              Three steps. No developer.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative group">
                <div className="rounded-2xl border border-[var(--color-border)] bg-white/60 backdrop-blur p-7 h-full hover:border-[var(--color-accent)]/40 hover:bg-white/90 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-25px_rgba(91,42,134,0.35)] transition-all duration-300">
                  <div className="font-mono text-3xl text-[var(--color-accent)]/30 font-semibold mb-4 group-hover:text-[var(--color-accent)]/60 transition-colors duration-300">
                    {s.n}
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-[14.5px] text-[var(--color-text-muted)] leading-relaxed">{s.body}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-[var(--color-accent)]/40 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING — centered glass cards ============ */}
      <section className="border-t border-[var(--color-border)]" id="pricing">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center max-w-lg mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              Pricing
            </span>
            <h2 className="font-serif font-semibold text-3xl md:text-4xl mt-3 mb-4">
              Two plans, billed once a year.
            </h2>
            <p className="text-[var(--color-text-muted)]">
              No monthly surprises, no per-message metering. Pick a plan based on how many rules
              you actually need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Starter */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur p-7 hover:border-[var(--color-accent)]/30 hover:-translate-y-1 transition-all duration-300">
              <div className="font-semibold text-lg mb-1">Starter</div>
              <div className="font-mono text-2xl mb-6">₹4,999<span className="text-sm text-[var(--color-text-muted)] font-normal"> / year</span></div>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "8 comment automation rules",
                  "10 DM & story reply rules",
                  "Text-only replies",
                  "Ads analytics — spend, reach, impressions",
                  "Post & account analytics",
                ].map((f) => (
                  <li key={f} className="pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="block text-center rounded-full border border-[var(--color-border)] py-2.5 text-sm font-medium hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-colors"
              >
                Start with Starter
              </Link>
            </div>

            {/* Growth */}
            <div className="relative rounded-2xl border-2 border-[var(--color-accent)] bg-white/70 backdrop-blur p-7 shadow-[0_20px_50px_-25px_rgba(91,42,134,0.45)] hover:shadow-[0_28px_65px_-25px_rgba(91,42,134,0.55)] hover:-translate-y-1 transition-all duration-300">
              <span className="absolute -top-3 left-7 rounded-full bg-[var(--color-accent)] text-white text-xs font-medium px-3 py-1">
                Most picked
              </span>
              <div className="font-semibold text-lg mb-1">Growth</div>
              <div className="font-mono text-2xl mb-6">₹8,999<span className="text-sm text-[var(--color-text-muted)] font-normal"> / year</span></div>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "20 comment automation rules",
                  "35 DM & story reply rules",
                  "Image and video replies",
                  "Post scheduling included",
                  "Clicks, CTR, and post-level breakdowns",
                  "Text, image & video greeting/fallback messages",
                ].map((f) => (
                  <li key={f} className="pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-[var(--color-accent)]">
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="block text-center rounded-full py-2.5 text-sm font-medium bg-[var(--color-ink)] text-white hover:opacity-90 transition"
              >
                Start with Growth
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6 max-w-3xl mx-auto">
            <div className="rounded-xl border border-[var(--color-border)] bg-white/40 p-5 flex justify-between gap-4 hover:bg-white/70 transition-colors">
              <div>
                <div className="font-medium text-sm mb-1">AI+ add-on</div>
                <p className="text-[13.5px] text-[var(--color-text-muted)]">
                  AI-handled replies for anything that doesn&apos;t match a rule. Works on either plan.
                </p>
              </div>
              <div className="font-mono text-[13px] text-[var(--color-text-muted)] whitespace-nowrap">₹2,999/yr</div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-white/40 p-5 flex justify-between gap-4 hover:bg-white/70 transition-colors">
              <div>
                <div className="font-medium text-sm mb-1">Catalogue add-on</div>
                <p className="text-[13.5px] text-[var(--color-text-muted)]">
                  Product catalogue setup and Instagram Shopping tags. Works on either plan.
                </p>
              </div>
              <div className="font-mono text-[13px] text-[var(--color-text-muted)] whitespace-nowrap">₹4,999/yr</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT REDIRECT ============ */}
      <section className="border-t border-[var(--color-border)]">
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[560px] rounded-full blur-[100px] opacity-20 animate-[glow-pulse_8s_ease-in-out_infinite]"
            style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
          />
          <div className="relative rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur-xl p-12 hover:bg-white/70 transition-colors duration-500">
            <h2 className="font-serif font-semibold text-2xl md:text-3xl mb-3">Still have questions?</h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              Talk to us directly — setup, pricing, or whether IGNYX fits how your shop runs.
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