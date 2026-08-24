import { NextRequest, NextResponse } from "next/server";
import { getMetaLoginUrl } from "@/lib/meta";

export async function GET(req: NextRequest) {
  const clientId = req.nextUrl.searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
  }

  const loginUrl = getMetaLoginUrl(clientId);
  return NextResponse.redirect(loginUrl);
}