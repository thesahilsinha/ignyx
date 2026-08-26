"use client";

import { useState } from "react";
import Link from "next/link";

export default function MarketingHeader() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-[var(--color-accent)]">IGNYX</Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/features" className="hover:text-[var(--color-accent)]">Features</Link>
          <Link href="/pricing" className="hover:text-[var(--color-accent)]">Pricing</Link>
          <Link href="/about" className="hover:text-[var(--color-accent)]">About</Link>
          <Link href="/blog" className="hover:text-[var(--color-accent)]">Blog</Link>
        </nav>

        <div className="relative">
          <button
            onClick={() => setLoginOpen(!loginOpen)}
            className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Log in
          </button>
          {loginOpen && (
            <div className="absolute right-0 mt-2 w-44 gradient-border bg-white overflow-hidden z-10">
              <Link
                href="/admin"
                className="block px-4 py-3 text-sm hover:bg-[var(--color-surface-muted)] border-b border-[var(--color-border)]"
              >
                Admin login
              </Link>
              <Link
                href="/client"
                className="block px-4 py-3 text-sm hover:bg-[var(--color-surface-muted)]"
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