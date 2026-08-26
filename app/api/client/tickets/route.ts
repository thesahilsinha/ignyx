import { NextRequest, NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getCentralClient } from "@/lib/supabase-central";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getCentralClient();
  const { data, error } = await db
    .from("tickets")
    .select("*")
    .eq("client_id", client.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tickets: data });
}

export async function POST(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, message } = await req.json();
  if (!subject || !message) {
    return NextResponse.json({ error: "Missing subject or message" }, { status: 400 });
  }

  const db = getCentralClient();
  const { data, error } = await db
    .from("tickets")
    .insert({ client_id: client.id, subject, message, status: "open" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ticket: data });
}