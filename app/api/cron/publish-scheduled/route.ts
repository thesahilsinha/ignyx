import { NextRequest, NextResponse } from "next/server";
import { getCentralClient } from "@/lib/supabase-central";
import { getClientDbServiceClient } from "@/lib/supabase-client-db";
import { createMediaContainer, publishMediaContainer } from "@/lib/meta";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const centralDb = getCentralClient();
  const { data: clients } = await centralDb
    .from("clients")
    .select("*")
    .not("meta_access_token", "is", null);

  let processed = 0;

  for (const client of clients || []) {
    const clientDb = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);
    const { data: duePosts } = await clientDb
      .from("scheduled_posts")
      .select("*")
      .eq("status", "queued")
      .lte("scheduled_for", new Date().toISOString());

    for (const post of duePosts || []) {
      try {
        await clientDb.from("scheduled_posts").update({ status: "processing" }).eq("id", post.id);

        const containerId = await createMediaContainer(
          client.meta_ig_business_id,
          post.media_url,
          post.caption || "",
          client.meta_access_token
        );
        const mediaId = await publishMediaContainer(client.meta_ig_business_id, containerId, client.meta_access_token);

        await clientDb
          .from("scheduled_posts")
          .update({ status: "published", meta_container_id: mediaId })
          .eq("id", post.id);

        processed++;
      } catch (err) {
        await clientDb.from("scheduled_posts").update({ status: "failed" }).eq("id", post.id);
        console.log("CRON: failed to publish post", post.id, err instanceof Error ? err.message : String(err));
      }
    }
  }

  return NextResponse.json({ processed });
}