"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

export default function GreetingPage() {
  const [greeting, setGreeting] = useState("");
  const [exception, setException] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    fetch("/api/client/fallback-messages")
      .then((res) => res.json())
      .then((data) => {
        const g = data.messages?.find((m: { message_type: string }) => m.message_type === "greeting");
        const e = data.messages?.find((m: { message_type: string }) => m.message_type === "exception");
        if (g) setGreeting(g.content);
        if (e) setException(e.content);
      });
  }, []);

  async function saveGreeting() {
    await fetch("/api/client/fallback-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_type: "greeting", content: greeting }),
    });
    setSaved("greeting");
    setTimeout(() => setSaved(""), 1500);
  }

  async function saveException() {
    await fetch("/api/client/fallback-messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_type: "exception", content: exception }),
    });
    setSaved("exception");
    setTimeout(() => setSaved(""), 1500);
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <h1 className="text-xl font-semibold mb-4">Greeting & fallback messages</h1>

      <div className="gradient-border p-5 mb-6">
        <div className="font-medium text-sm mb-1">Greeting message</div>
        <p className="text-xs text-slate-500 mb-3">Sent on the first message of a new chat that doesn&apos;t match any rule.</p>
        <textarea
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          rows={3}
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 mb-3"
        />
        <button onClick={saveGreeting} className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm">
          {saved === "greeting" ? "Saved" : "Save"}
        </button>
      </div>

      <div className="gradient-border p-5">
        <div className="font-medium text-sm mb-1">Exception message</div>
        <p className="text-xs text-slate-500 mb-3">Sent on any later message that doesn&apos;t match a rule.</p>
        <textarea
          value={exception}
          onChange={(e) => setException(e.target.value)}
          rows={3}
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 mb-3"
        />
        <button onClick={saveException} className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm">
          {saved === "exception" ? "Saved" : "Save"}
        </button>
      </div>
    </AppShell>
  );
}