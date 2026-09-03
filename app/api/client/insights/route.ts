import { NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

const GRAPH_BASE = "https://graph.instagram.com/v22.0";

interface MediaItem {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface CommentItem {
  text: string;
  username?: string;
  timestamp: string;
}

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!client.meta_access_token || !client.meta_ig_business_id) {
    return NextResponse.json({ error: "Instagram not connected" }, { status: 400 });
  }

  const token = client.meta_access_token;
  const igId = client.meta_ig_business_id;

  let media: MediaItem[] = [];
  try {
    const res = await fetch(
      `${GRAPH_BASE}/${igId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&limit=12&access_token=${token}`
    );
    const data = await res.json();
    if (res.ok) media = data.data || [];
  } catch {
    media = [];
  }

  const recentComments: (CommentItem & { postCaption?: string })[] = [];
  for (const post of media.slice(0, 5)) {
    try {
      const res = await fetch(`${GRAPH_BASE}/${post.id}/comments?fields=text,username,timestamp&limit=3&access_token=${token}`);
      const data = await res.json();
      if (res.ok && data.data) {
        for (const c of data.data) {
          recentComments.push({ ...c, postCaption: post.caption?.slice(0, 40) });
        }
      }
    } catch {
      // skip this post's comments on failure, don't break the whole page
    }
  }
  recentComments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  let viewsGraph: { date: string; views: number; reach: number }[] = [];
  try {
    const until = Math.floor(Date.now() / 1000);
    const since = until - 30 * 24 * 60 * 60;
    const res = await fetch(
      `${GRAPH_BASE}/${igId}/insights?metric=views,reach&period=day&since=${since}&until=${until}&access_token=${token}`
    );
    const data = await res.json();
    if (res.ok && data.data) {
      const viewsMetric = data.data.find((m: { name: string }) => m.name === "views");
      const reachMetric = data.data.find((m: { name: string }) => m.name === "reach");
      const values = viewsMetric?.values || [];
      viewsGraph = values.map((v: { end_time: string; value: number }, i: number) => ({
        date: v.end_time.slice(5, 10),
        views: v.value,
        reach: reachMetric?.values?.[i]?.value || 0,
      }));
    }
  } catch {
    viewsGraph = [];
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
    recentComments: recentComments.slice(0, 10),
    viewsGraph,
    commentRepliesSent: commentReplies || 0,
    dmRepliesSent: dmReplies || 0,
  });
}