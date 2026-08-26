import { NextRequest, NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { data, error } = await db.from("fallback_messages").select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data });
}

export async function POST(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message_type, content, media_url } = await req.json();
  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { data: existing } = await db
    .from("fallback_messages")
    .select("id")
    .eq("message_type", message_type)
    .single();

  let result;
  if (existing) {
    result = await db
      .from("fallback_messages")
      .update({ content, media_url: media_url || null, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await db
      .from("fallback_messages")
      .insert({ message_type, content, media_url: media_url || null })
      .select()
      .single();
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
  return NextResponse.json({ message: result.data });
}