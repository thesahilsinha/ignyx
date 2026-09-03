"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const res = await fetch("/api/client/security", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Failed to update password");
      return;
    }
    setSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Security</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Change the password you use to log into IGNYX.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 max-w-md space-y-3">
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-[var(--color-border)] bg-transparent rounded-lg px-3 py-2"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-emerald-600">Password updated.</p>}
        <button type="submit" disabled={loading} className="btn-primary py-2 px-4 text-sm">
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </AppShell>
  );
}