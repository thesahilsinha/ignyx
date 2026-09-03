"use client";

import { useEffect, useRef, useState } from "react";
import AppShell from "@/components/AppShell";

import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

interface LibraryItem {
  name: string;
  url: string;
  isVideo: boolean;
}

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copiedName, setCopiedName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadItems() {
    const res = await fetch("/api/client/library");
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/client/library", { method: "POST", body: formData });
    const data = await res.json();

    setUploading(false);
    if (!res.ok) {
      setError(data.error || "Upload failed");
      return;
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadItems();
  }

  async function handleDelete(name: string) {
    await fetch(`/api/client/library?name=${encodeURIComponent(name)}`, { method: "DELETE" });
    loadItems();
  }

  function copyUrl(url: string, name: string) {
    navigator.clipboard.writeText(url);
    setCopiedName(name);
    setTimeout(() => setCopiedName(""), 1500);
  }

  const imageCount = items.filter((i) => !i.isVideo).length;
  const videoCount = items.filter((i) => i.isVideo).length;

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Library</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Upload images and videos here, then copy the link into your DM or comment reply text.
          {" "}{imageCount}/10 images, {videoCount}/6 videos.
        </p>
      </div>

      <div className="card p-5 mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/quicktime"
          onChange={handleUpload}
          disabled={uploading}
          className="text-sm"
        />
        {uploading && <p className="text-xs text-[var(--color-text-muted)] mt-2">Uploading...</p>}
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.name} className="card p-3">
            {item.isVideo ? (
              <video src={item.url} className="w-full aspect-square object-cover rounded-lg mb-2" muted />
            ) : (
              <img src={item.url} alt="" className="w-full aspect-square object-cover rounded-lg mb-2" />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => copyUrl(item.url, item.name)}
                className="flex-1 text-xs btn-primary py-1.5"
              >
                {copiedName === item.name ? "Copied" : "Copy link"}
              </button>
              <button onClick={() => handleDelete(item.name)} className="text-xs text-red-500 px-2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-sm text-[var(--color-text-muted)]">No files uploaded yet.</p>}
    </AppShell>
  );
}