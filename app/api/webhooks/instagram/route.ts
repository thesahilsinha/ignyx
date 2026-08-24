import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/meta";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(rawBody);

  // TODO (Chunk 4): route payload.entry[] events to comment/DM/story rule matching per client.
  console.log("IG webhook event:", JSON.stringify(payload));

  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}