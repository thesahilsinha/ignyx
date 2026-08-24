"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid PIN");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-muted)]">
      <form onSubmit={handleSubmit} className="gradient-border p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-1">IGNYX Admin</h1>
        <p className="text-sm text-slate-500 mb-6">Enter your admin PIN to continue.</p>

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Admin PIN"
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 mb-3 outline-none focus:border-[var(--color-accent)]"
        />

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-accent)] text-white rounded-md py-2 font-medium hover:bg-[var(--color-accent-dark)] transition"
        >
          {loading ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
}