import { NextRequest, NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { data, error } = await db.from("scheduled_posts").select("*").order("scheduled_for", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (client.plan !== "growth") {
    return NextResponse.json({ error: "Scheduling is a Growth-tier feature" }, { status: 403 });
  }

  const body = await req.json();
  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { data, error } = await db
    .from("scheduled_posts")
    .insert({
      caption: body.caption || null,
      location_id: body.location_id || null,
      collaborator_usernames: body.collaborator_usernames || null,
      media_url: body.media_url,
      scheduled_for: body.scheduled_for,
      status: "queued",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}

export async function DELETE(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { error } = await db.from("scheduled_posts").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}