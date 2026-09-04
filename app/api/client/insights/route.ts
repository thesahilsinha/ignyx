import { NextRequest, NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

const GRAPH_BASE = "https://graph.instagram.com/v22.0";

export async function GET(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!client.meta_access_token || !client.meta_ig_business_id) {
    return NextResponse.json({ error: "Instagram not connected" }, { status: 400 });
  }

  const token = client.meta_access_token;
  const igId = client.meta_ig_business_id;
  const after = req.nextUrl.searchParams.get("after");

  let media: any[] = [];
  let nextCursor: string | null = null;

  try {
    const mediaFields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count,view_count";
    const url = after
      ? `${GRAPH_BASE}/${igId}/media?fields=${mediaFields}&limit=8&after=${after}&access_token=${token}`
      : `${GRAPH_BASE}/${igId}/media?fields=${mediaFields}&limit=8&access_token=${token}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      media = data.data || [];
      nextCursor = data.paging?.cursors?.after && data.paging?.next ? data.paging.cursors.after : null;
    }
  } catch {
    media = [];
  }

  const recentComments: { text: string; username: string; timestamp: string; postCaption?: string }[] = [];
  for (const post of media.slice(0, 5)) {
    try {
      const res = await fetch(`${GRAPH_BASE}/${post.id}/comments?fields=text,from,timestamp&limit=3&access_token=${token}`);
      const data = await res.json();
      if (res.ok && data.data) {
        for (const c of data.data) {
          recentComments.push({
            text: c.text,
            username: c.from?.username || "unknown",
            timestamp: c.timestamp,
            postCaption: post.caption?.slice(0, 40),
          });
        }
      }
    } catch {
      // skip
    }
  }
  recentComments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  let viewsGraph: { date: string; views: number; reach: number }[] = [];
  let viewsGraphError: string | null = null;
  try {
    const until = Math.floor(Date.now() / 1000);
    const since = until - 30 * 24 * 60 * 60;
    const res = await fetch(
      `${GRAPH_BASE}/${igId}/insights?metric=views,reach&period=day&since=${since}&until=${until}&access_token=${token}`
    );
    const data = await res.json();
    if (!res.ok) {
      viewsGraphError = data.error?.message || "Failed to load insights";
    } else if (data.data) {
      const viewsMetric = data.data.find((m: any) => m.name === "views");
      const reachMetric = data.data.find((m: any) => m.name === "reach");
      const values = viewsMetric?.values || [];
      viewsGraph = values.map((v: any, i: number) => ({
        date: v.end_time.slice(5, 10),
        views: v.value,
        reach: reachMetric?.values?.[i]?.value || 0,
      }));
    }
  } catch (err) {
    viewsGraphError = err instanceof Error ? err.message : "Failed to load insights";
  }

  const clientDb = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { count: commentReplies } = await clientDb
    .from("activity_log")
    .select("*", { count: "exact", head: true })
    .eq("type", "comment_reply");
  const { count: dmReplies } = await clientDb
    .from("activity_log")
    .select("*", { count: "exact", head: true })
    .eq("type", "dm_reply");

  return NextResponse.json({
    media,
    nextCursor,
    recentComments: recentComments.slice(0, 10),
    viewsGraph,
    viewsGraphError,
    commentRepliesSent: commentReplies || 0,
    dmRepliesSent: dmReplies || 0,
  });
}