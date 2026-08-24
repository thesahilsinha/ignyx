import { NextRequest, NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";
import { hashPassword } from "@/lib/password";

export async function GET() {
  const db = getCentralClient();
  const { data, error } = await db.from("clients").select("*").order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clients: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    business_name,
    contact_email,
    username,
    password,
    plan,
    supabase_url,
    supabase_anon_key,
    supabase_service_key,
  } = body;

  if (!business_name || !username || !password || !supabase_url) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const password_hash = await hashPassword(password);
  const db = getCentralClient();

  const { data, error } = await db
    .from("clients")
    .insert({
      business_name,
      contact_email,
      username,
      password_hash,
      plan: plan || "starter",
      status: "in_review",
      supabase_url,
      supabase_anon_key,
      supabase_service_key,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ client: data });
}