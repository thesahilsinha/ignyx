import { NextRequest, NextResponse } from "next/server";
import { createSessionToken } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { pin } = await req.json();

  if (!pin || pin !== process.env.ADMIN_PIN) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }

  const token = await createSessionToken({ role: "admin" });

  const response = NextResponse.json({ success: true });
  response.cookies.set("ignyx_admin_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}