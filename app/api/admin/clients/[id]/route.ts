import { NextRequest, NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";
import { hashPassword } from "@/lib/password";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const updates = await req.json();

  if (updates.password) {
    updates.password_hash = await hashPassword(updates.password);
    delete updates.password;
  }

  const db = getCentralClient();
  const { data, error } = await db.from("clients").update(updates).eq("id", id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ client: data });
}