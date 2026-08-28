"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MarketingHeader() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
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
          <Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors">
            Contact
          </Link>
          <Link href="/blog" className="hover:text-[var(--color-accent)] transition-colors">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Login (desktop only) */}
          <div className="relative hidden md:block">
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

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-[var(--color-border)] bg-white/40 backdrop-blur hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="relative w-4 h-3">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-[var(--color-ink)] transition-all duration-300 ${
                  menuOpen ? "rotate-45 top-[5px]" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] h-[1.5px] w-4 bg-[var(--color-ink)] transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[10px] h-[1.5px] w-4 bg-[var(--color-ink)] transition-all duration-300 ${
                  menuOpen ? "-rotate-45 top-[5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white/80 backdrop-blur-xl animate-[fade-up_0.2s_ease-out]">
          <nav className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1 font-mono text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            <Link
              href="/features"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--color-border)] hover:text-[var(--color-accent)] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--color-border)] hover:text-[var(--color-accent)] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--color-border)] hover:text-[var(--color-accent)] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--color-border)] hover:text-[var(--color-accent)] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-[var(--color-border)] hover:text-[var(--color-accent)] transition-colors"
            >
              Blog
            </Link>

            <div className="pt-4 flex flex-col gap-2 normal-case font-sans">
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block text-center rounded-full border border-[var(--color-border)] py-2.5 text-sm font-medium hover:border-[var(--color-accent)] transition-colors"
              >
                Admin login
              </Link>
              <Link
                href="/client"
                onClick={() => setMenuOpen(false)}
                className="block text-center rounded-full py-2.5 text-sm font-medium bg-[var(--color-ink)] text-white hover:opacity-90 transition"
              >
                Client login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}