import { NextRequest, NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/current-client";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";

const BUCKET = "ignyx-media";
const MAX_IMAGES = 10;
const MAX_VIDEOS = 6;

async function ensureBucket(db: ReturnType<typeof getClientDbServiceClient>) {
  const { data: buckets } = await db.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    await db.storage.createBucket(BUCKET, { public: true });
  }
}

function isVideo(name: string) {
  return /\.(mp4|mov|m4v)$/i.test(name);
}

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  await ensureBucket(db);

  const { data: files, error } = await db.storage.from(BUCKET).list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const items = (files || []).map((f) => {
    const { data: urlData } = db.storage.from(BUCKET).getPublicUrl(f.name);
    return { name: f.name, url: urlData.publicUrl, isVideo: isVideo(f.name), createdAt: f.created_at };
  });

  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  await ensureBucket(db);

  const { data: existing } = await db.storage.from(BUCKET).list("", { limit: 100 });
  const imageCount = (existing || []).filter((f) => !isVideo(f.name)).length;
  const videoCount = (existing || []).filter((f) => isVideo(f.name)).length;
  const uploadingVideo = isVideo(file.name);

  if (uploadingVideo && videoCount >= MAX_VIDEOS) {
    return NextResponse.json({ error: `Video limit reached (${MAX_VIDEOS})` }, { status: 400 });
  }
  if (!uploadingVideo && imageCount >= MAX_IMAGES) {
    return NextResponse.json({ error: `Image limit reached (${MAX_IMAGES})` }, { status: 400 });
  }

  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await db.storage.from(BUCKET).upload(fileName, arrayBuffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = db.storage.from(BUCKET).getPublicUrl(fileName);
  return NextResponse.json({ url: urlData.publicUrl, name: fileName });
}

export async function DELETE(req: NextRequest) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

  const db = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
  const { error } = await db.storage.from(BUCKET).remove([name]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}