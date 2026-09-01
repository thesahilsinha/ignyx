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

const defaultSql = `create table if not exists comment_rules (
  id uuid primary key default gen_random_uuid(),
  trigger_word text not null,
  match_method text not null check (match_method in ('exact','starts_with','contains')),
  action_type text not null check (action_type in ('reply','dm','both')),
  reply_text text,
  dm_text text,
  dm_media_url text,
  created_at timestamptz not null default now()
);

create table if not exists dm_story_rules (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('dm','story_reply')),
  trigger_word text not null,
  match_method text not null check (match_method in ('exact','starts_with','contains')),
  reply_text text,
  media_url text,
  created_at timestamptz not null default now()
);

create table if not exists fallback_messages (
  id uuid primary key default gen_random_uuid(),
  message_type text not null check (message_type in ('greeting','exception')),
  content text not null,
  media_url text,
  updated_at timestamptz not null default now()
);

create table if not exists scheduled_posts (
  id uuid primary key default gen_random_uuid(),
  caption text,
  location_id text,
  collaborator_usernames text[],
  media_url text,
  scheduled_for timestamptz not null,
  meta_container_id text,
  status text not null default 'queued' check (status in ('queued','processing','published','failed')),
  permalink text,
  created_at timestamptz not null default now()
);

create table if not exists ai_context (
  id uuid primary key default gen_random_uuid(),
  context_text text not null,
  updated_at timestamptz not null default now()
);`;

export default function OnboardingPage() {
  const [copied, setCopied] = useState(false);

  function copySql() {
    navigator.clipboard.writeText(defaultSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <AppShell title="IGNYX Admin" navItems={navItems}>
      <h1 className="text-xl font-bold mb-4">Onboarding a new client</h1>
      <ol className="card p-6 space-y-3 text-sm list-decimal list-inside mb-6">
        <li>Client creates a new Supabase project, shares the Project URL, anon key, and service role key.</li>
        <li>Client also creates an Instagram Business account, links it to a Facebook Page.</li>
        <li>Go to Clients → Add client, enter their details plus the three Supabase values.</li>
        <li>Open that Supabase project&apos;s SQL editor, paste and run the schema below.</li>
        <li>
          In Meta&apos;s dashboard, go to Instagram API → Generate access tokens → Add account, enter the client&apos;s
          Instagram username. They must accept the tester invite from Instagram → Settings → Apps and websites.
        </li>
        <li>Once accepted, click Generate token for their row. Also confirm their Webhook Subscription toggle is On.</li>
        <li>
          Copy the generated token and the client&apos;s Instagram Business Account ID, paste both into their client
          record in the admin panel.
        </li>
        <li>Set their status to trial or active once everything checks out.</li>
      </ol>
      <div className="card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">Default client SQL</span>
          <button onClick={copySql} className="text-sm btn-primary px-3 py-1">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="bg-[var(--color-surface-muted)] p-3 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">{defaultSql}</pre>
      </div>
    </AppShell>
  );
}