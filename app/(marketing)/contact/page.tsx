"use client";

import { useState } from "react";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/nyxlabs360@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-ink)] overflow-x-hidden">
      <MarketingHeader />

      <section className="relative px-6 pt-20 pb-6 overflow-visible">
        <div
          className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[380px] w-[680px] rounded-full blur-[120px] opacity-20 animate-[glow-pulse_7s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
        />
        <div className="relative max-w-xl mx-auto text-center animate-[fade-up_0.7s_ease-out]">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
            Contact
          </span>
          <h1 className="font-serif font-semibold text-[clamp(32px,5vw,48px)] leading-tight tracking-tight mt-3 mb-4 text-balance">
            Let&apos;s talk about your shop
          </h1>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Setup, pricing, or whether IGNYX fits how you run things — send a note
            and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
        <div className="max-w-xl mx-auto px-6 py-16">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white/50 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_60px_-25px_rgba(22,19,15,0.35)] min-h-[420px] flex items-center">
            {status === "success" ? (
              <div className="w-full text-center py-8 animate-[fade-up_0.4s_ease-out]">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 mb-6">
                  <span className="text-[var(--color-accent)] text-2xl">✓</span>
                </div>
                <h2 className="font-serif font-semibold text-2xl mb-3">
                  Thanks — we&apos;ve got your message
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  We&apos;ll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <input type="hidden" name="_subject" value="New message from IGNYX contact page" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-white/60 backdrop-blur px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:bg-white/90 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@yourshop.com"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-white/60 backdrop-blur px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:bg-white/90 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="shop" className="block font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">
                    Instagram handle / shop name
                  </label>
                  <input
                    id="shop"
                    name="shop"
                    type="text"
                    placeholder="@yourshop"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-white/60 backdrop-blur px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:bg-white/90 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What do you want to know?"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-white/60 backdrop-blur px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:bg-white/90 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong — please try again, or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-medium bg-[var(--color-ink)] text-white shadow-[0_8px_24px_-8px_rgba(22,19,15,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(22,19,15,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center font-mono text-[12px] text-[var(--color-text-muted)]">
            Or email us directly at{" "}
            <a href="mailto:hello@ignyx.in" className="text-[var(--color-accent)] hover:underline">
              hello@ignyx.in
            </a>
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}