import { NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";

export async function GET() {
  const db = getCentralClient();
  const { data, error } = await db
    .from("tickets")
    .select("*, clients(business_name)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tickets: data });
}