import { NextRequest, NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";
import { comparePassword } from "@/lib/password";
import { createSessionToken } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const db = getCentralClient();
  const { data: client, error } = await db
    .from("clients")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !client) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const valid = await comparePassword(password, client.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = await createSessionToken({ role: "client", clientId: client.id });

  const response = NextResponse.json({ success: true });
  response.cookies.set("ignyx_client_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}