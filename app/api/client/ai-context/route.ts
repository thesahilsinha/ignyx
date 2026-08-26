import { NextRequest, NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { data } = await db.from("ai_context").select("*").single();

  return NextResponse.json({ context: data?.context_text || "", enabled: client.ai_plus_enabled });
}

export async function POST(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!client.ai_plus_enabled) return NextResponse.json({ error: "AI+ not enabled" }, { status: 403 });

  const { context_text } = await req.json();
  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { data: existing } = await db.from("ai_context").select("id").single();

  let result;
  if (existing) {
    result = await db
      .from("ai_context")
      .update({ context_text, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await db.from("ai_context").insert({ context_text }).select().single();
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
  return NextResponse.json({ context: result.data });
}