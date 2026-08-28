import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/40 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-8">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs">
            <div className="font-serif font-semibold text-lg mb-2">IGNYX</div>
            <p className="text-[13.5px] text-[var(--color-text-muted)] leading-relaxed">
              Reply automation, scheduling, and analytics for Instagram-first
              shops.
            </p>
          </div>

          <div className="flex gap-14">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                Product
              </div>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link href="#product" className="hover:text-[var(--color-accent)] transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="hover:text-[var(--color-accent)] transition-colors">
                  Pricing
                </Link>
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                Company
              </div>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors">
                  Contact
                </Link>
                <a href="mailto:nyxlabs360@gmail.com" className="hover:text-[var(--color-accent)] transition-colors">
                  nyxlabs360@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-wrap justify-between items-center gap-4">
          <div className="text-[13px] text-[var(--color-text-muted)]">
            © 2026 IGNYX. All rights reserved.
          </div>
          <div className="font-mono text-[12px] text-[var(--color-text-muted)]">
            A product from{" "}
            <span className="text-[var(--color-ink)] font-medium">Nyx Labs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}