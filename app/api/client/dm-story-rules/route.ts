import { NextRequest, NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { data, error } = await db.from("dm_story_rules").select("*").order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rules: data, limit: client.plan === "growth" ? 35 : 10, plan: client.plan });
}

export async function POST(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { count } = await db.from("dm_story_rules").select("*", { count: "exact", head: true });
  const limit = client.plan === "growth" ? 35 : 10;
  if ((count || 0) >= limit) {
    return NextResponse.json({ error: `Rule limit reached (${limit})` }, { status: 400 });
  }

  const { data, error } = await db
    .from("dm_story_rules")
    .insert({
      channel: body.channel,
      trigger_word: body.trigger_word,
      match_method: body.match_method,
      reply_text: body.reply_text || null,
      media_url: body.media_url || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rule: data });
}

export async function PATCH(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await req.json();
  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { data, error } = await db
    .from("dm_story_rules")
    .update({
      channel: body.channel,
      trigger_word: body.trigger_word,
      match_method: body.match_method,
      reply_text: body.reply_text || null,
      media_url: body.media_url || null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rule: data });
}

export async function DELETE(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { error } = await db.from("dm_story_rules").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}