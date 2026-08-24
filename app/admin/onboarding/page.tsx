"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

const navItems = [
  { label: "Home", href: "/admin/dashboard" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Guide", href: "/admin/guide" },
  { label: "Onboarding", href: "/admin/onboarding" },
  { label: "Tickets", href: "/admin/tickets" },
  { label: "Analytics", href: "/admin/analytics" },
];

const defaultSql = `-- Paste into the client's Supabase SQL editor and run once.
-- Full contents live in schema/client-default.sql in the repo.`;

export default function OnboardingPage() {
  const [copied, setCopied] = useState(false);

  function copySql() {
    navigator.clipboard.writeText(defaultSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Onboarding a new client</h1>
      <ol className="gradient-border p-6 space-y-3 text-sm list-decimal list-inside mb-6">
        <li>Have the client create a new Supabase project and share the Project URL, anon key, and service key.</li>
        <li>Go to Clients → Add client, and enter their details plus those three Supabase values.</li>
        <li>Open that project&apos;s SQL editor and run the default schema (copy button below).</li>
        <li>Walk the client through connecting their Instagram via the Business Login button once Chunk 3 is live.</li>
        <li>Set their status to trial or active once everything checks out.</li>
      </ol>
      <div className="gradient-border p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">Default client SQL</span>
          <button onClick={copySql} className="text-sm bg-[var(--color-accent)] text-white px-3 py-1 rounded-md">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="bg-[var(--color-surface-muted)] p-3 rounded-md text-xs overflow-x-auto">{defaultSql}</pre>
      </div>
    </AppShell>
  );
}