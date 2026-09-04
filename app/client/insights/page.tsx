"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AppShell from "@/components/AppShell";
import { clientNavItems } from "@/lib/client-nav";

const navItems = clientNavItems;

interface MediaItem {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  like_count?: number;
  comments_count?: number;
  view_count?: number;
}

interface CommentItem {
  text: string;
  username: string;
  timestamp: string;
  postCaption?: string;
}

interface InsightsData {
  media: MediaItem[];
  nextCursor: string | null;
  recentComments: CommentItem[];
  viewsGraph: { date: string; views: number; reach: number }[];
  viewsGraphError: string | null;
  commentRepliesSent: number;
  dmRepliesSent: number;
  error?: string;
}

export default function InsightsPage() {
  const [data, setData] = useState<InsightsData | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [range, setRange] = useState<7 | 30>(7);

  useEffect(() => {
    fetch("/api/client/insights").then((res) => res.json()).then(setData);
  }, []);

  async function loadMore() {
    if (!data?.nextCursor) return;
    setLoadingMore(true);
    const res = await fetch(`/api/client/insights?after=${data.nextCursor}`);
    const more: InsightsData = await res.json();
    setData({ ...data, media: [...data.media, ...more.media], nextCursor: more.nextCursor });
    setLoadingMore(false);
  }

  if (!data) return null;

  if (data.error) {
    return (
      <AppShell title="IGNYX" navItems={navItems}>
        <div className="card p-8 text-center max-w-md">
          <p className="text-sm text-[var(--color-text-muted)]">{data.error}</p>
        </div>
      </AppShell>
    );
  }

  const graphData = range === 7 ? data.viewsGraph.slice(-7) : data.viewsGraph;

  return (
    <AppShell title="IGNYX" navItems={navItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Insights</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Your recent activity, at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
        <div className="card p-5">
          <div className="text-xs text-[var(--color-text-muted)] mb-1">Comment replies sent</div>
          <div className="text-2xl font-bold ig-gradient-text">{data.commentRepliesSent}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-[var(--color-text-muted)] mb-1">DM replies sent</div>
          <div className="text-2xl font-bold ig-gradient-text">{data.dmRepliesSent}</div>
        </div>
      </div>

      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium text-sm">Views and reach</div>
          <div className="flex gap-2">
            <button
              onClick={() => setRange(7)}
              className={`text-xs px-3 py-1 rounded-full ${range === 7 ? "btn-primary" : "border border-[var(--color-border)]"}`}
            >
              Last week
            </button>
            <button
              onClick={() => setRange(30)}
              className={`text-xs px-3 py-1 rounded-full ${range === 30 ? "btn-primary" : "border border-[var(--color-border)]"}`}
            >
              Last month
            </button>
          </div>
        </div>
        {data.viewsGraphError ? (
          <p className="text-sm text-red-500">{data.viewsGraphError}</p>
        ) : graphData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#ff2e63" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="reach" stroke="#833ab4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">Not enough data yet.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">Recent posts</div>
          <div className="grid grid-cols-2 gap-3">
            {data.media.map((m) => (
              <a key={m.id} href={m.permalink} target="_blank" rel="noreferrer" className="card p-2 block">
                <img src={m.thumbnail_url || m.media_url} alt="" className="w-full aspect-square object-cover rounded-lg mb-2" />
                <div className="text-xs text-[var(--color-text-muted)] flex flex-wrap gap-x-2 px-1">
                  <span>{m.like_count ?? 0} likes</span>
                  <span>{m.comments_count ?? 0} comments</span>
                  {m.view_count != null && <span>{m.view_count} views</span>}
                </div>
              </a>
            ))}
            {data.media.length === 0 && <p className="text-sm text-[var(--color-text-muted)] col-span-2">No posts found.</p>}
          </div>
          {data.nextCursor && (
            <button onClick={loadMore} disabled={loadingMore} className="w-full mt-3 btn-primary py-2 text-sm">
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </div>

        <div>
          <div className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">Recent comments</div>
          <div className="space-y-2">
            {data.recentComments.map((c, i) => (
              <div key={i} className="card p-3">
                <div className="text-sm">
                  <span className="font-medium">@{c.username}</span>: {c.text}
                </div>
                {c.postCaption && <div className="text-xs text-[var(--color-text-muted)] mt-1">on &quot;{c.postCaption}...&quot;</div>}
              </div>
            ))}
            {data.recentComments.length === 0 && <p className="text-sm text-[var(--color-text-muted)]">No recent comments.</p>}
          </div>
        </div>
      </div>
    </AppShell>
  );
}