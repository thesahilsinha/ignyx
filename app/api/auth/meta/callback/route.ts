import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getLongLivedToken, getPagesAndIgAccount } from "@/lib/meta";
import { getCentralClient } from "@/lib/supabase-central";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const clientId = req.nextUrl.searchParams.get("state");

  if (!code || !clientId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/clients?meta_error=missing_params`);
  }

  try {
    const shortToken = await exchangeCodeForToken(code);
    const { token: userToken } = await getLongLivedToken(shortToken);
    const pageInfo = await getPagesAndIgAccount(userToken);

    if (!pageInfo || !pageInfo.igBusinessId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/clients?meta_error=no_ig_account`);
    }

    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

    const db = getCentralClient();
    await db
      .from("clients")
      .update({
        meta_page_id: pageInfo.pageId,
        meta_page_access_token: pageInfo.pageAccessToken,
        meta_token_expires_at: expiresAt,
      })
      .eq("id", clientId);

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/clients?meta_connected=true`);
  } catch (err) {
    console.error("Meta callback error:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/clients?meta_error=exchange_failed`);
  }
}