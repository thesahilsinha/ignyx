import { NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getAdAccountId, getAdInsights } from "@/lib/meta";

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!client.meta_user_access_token) {
    return NextResponse.json({ error: "Facebook Business not connected" }, { status: 400 });
  }

  try {
    const adAccountId = await getAdAccountId(client.meta_user_access_token);
    if (!adAccountId) {
      return NextResponse.json({ error: "No ad account found on this Facebook Business" }, { status: 404 });
    }
    const insights = await getAdInsights(adAccountId, client.meta_user_access_token);
    return NextResponse.json({ insights, plan: client.plan });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to fetch ads data" }, { status: 500 });
  }
}