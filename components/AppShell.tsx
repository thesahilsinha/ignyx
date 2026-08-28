"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  label: string;
  href: string;
}

interface AppShellProps {
  title: string;
  navItems: NavItem[];
  children: ReactNode;
}

export default function AppShell({ title, navItems, children }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex md:flex-col w-60 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-bold ig-gradient-text">{title}</span>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <span className="font-bold ig-gradient-text">{title}</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setDrawerOpen(true)} className="p-2" aria-label="Open menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {drawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-64 bg-[var(--color-surface)] p-4">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold ig-gradient-text">{title}</span>
                <button onClick={() => setDrawerOpen(false)} aria-label="Close menu">✕</button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)] transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}