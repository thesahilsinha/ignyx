import { NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { count: commentCount } = await db.from("comment_rules").select("*", { count: "exact", head: true });
  const { count: dmStoryCount } = await db.from("dm_story_rules").select("*", { count: "exact", head: true });
  const { count: scheduledCount } = await db.from("scheduled_posts").select("*", { count: "exact", head: true });

  const isGrowth = client.plan === "growth";

  return NextResponse.json({
    plan: client.plan,
    commentRules: { used: commentCount || 0, limit: isGrowth ? 20 : 8 },
    dmStoryRules: { used: dmStoryCount || 0, limit: isGrowth ? 35 : 10 },
    scheduledPosts: { used: scheduledCount || 0 },
  });
}