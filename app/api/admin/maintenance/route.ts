import { NextRequest, NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";

export async function GET() {
  const db = getCentralClient();
  const { data } = await db.from("platform_settings").select("maintenance_mode").eq("id", 1).single();
  return NextResponse.json({ maintenance_mode: data?.maintenance_mode || false });
}

export async function POST(req: NextRequest) {
  const { maintenance_mode } = await req.json();
  const db = getCentralClient();
  const { error } = await db
    .from("platform_settings")
    .update({ maintenance_mode, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ maintenance_mode });
}