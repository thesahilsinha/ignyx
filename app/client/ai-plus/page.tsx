"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

export default function AiPlusPage() {
  const [enabled, setEnabled] = useState(false);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/client/ai-context")
      .then((res) => res.json())
      .then((data) => {
        setEnabled(data.enabled);
        setContext(data.context || "");
        setLoading(false);
      });
  }, []);

  async function save() {
    await fetch("/api/client/ai-context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context_text: context }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  if (loading) return null;

  if (!enabled) {
    return (
      <AppShell title="IGNYX" navItems={navItems}>
        <div className="gradient-border p-8 text-center max-w-md mx-auto mt-12">
          <div className="text-lg font-semibold mb-2">AI+ is not active yet</div>
          <p className="text-sm text-slate-500 mb-4">
            AI+ lets an AI assistant handle unmatched DMs using context you provide, instead of a static reply. Contact us to unlock it.
          </p>
          <button className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm">Unlock now</button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">AI+ context</h1>
      <div className="gradient-border p-6 max-w-2xl">
        <p className="text-sm text-slate-500 mb-3">
          When a DM doesn&apos;t match any of your rules, AI+ uses this context to write a relevant reply instead of your static fallback message.
        </p>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={8}
          placeholder="e.g. We sell handmade candles, ship across India in 3-5 days, prices range â‚¹299-â‚¹899. Be warm and concise."
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 mb-3"
        />
        <button onClick={save} className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm">
          {saved ? "Saved" : "Save context"}
        </button>
      </div>
    </AppShell>
  );
}