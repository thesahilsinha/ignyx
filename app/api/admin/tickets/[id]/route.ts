import { NextRequest, NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();

  const db = getCentralClient();
  const { data, error } = await db.from("tickets").update({ status }).eq("id", id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ticket: data });
}