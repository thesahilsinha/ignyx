"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MarketingHeader() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-white/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="IGNYX"
            width={120}
            height={32}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
          <Link href="/features" className="hover:text-[var(--color-accent)] transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-[var(--color-accent)] transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">
            About
          </Link>
          <Link href="/blog" className="hover:text-[var(--color-accent)] transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors">
            Contact
          </Link>
        </nav>

        <div className="relative">
          <button
            onClick={() => setLoginOpen(!loginOpen)}
            className="inline-flex items-center rounded-full px-5 py-2 text-sm font-medium border border-[var(--color-border)] bg-white/40 backdrop-blur hover:border-[var(--color-accent)] hover:bg-white/70 hover:-translate-y-0.5 transition-all"
          >
            Log in
          </button>

          {loginOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-[var(--color-border)] bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_-25px_rgba(22,19,15,0.35)] overflow-hidden z-10 animate-[fade-up_0.2s_ease-out]">
              <Link
                href="/admin"
                className="block px-4 py-3 text-sm border-b border-[var(--color-border)] hover:bg-white/60 transition-colors"
              >
                Admin login
              </Link>
              <Link
                href="/client"
                className="block px-4 py-3 text-sm hover:bg-white/60 transition-colors"
              >
                Client login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}