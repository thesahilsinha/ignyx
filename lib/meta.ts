import crypto from "crypto";

const GRAPH_BASE = "https://graph.facebook.com/v21.0";

export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  const appSecret = process.env.META_APP_SECRET as string;
  const expected = "sha256=" + crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function getMetaLoginUrl(state: string): string {
  const appId = process.env.META_APP_ID as string;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta/callback`;
  const scopes = [
    "instagram_basic",
    "instagram_manage_comments",
    "instagram_manage_messages",
    "instagram_content_publish",
    "pages_show_list",
    "pages_read_engagement",
    "ads_read",
    "catalog_management",
  ].join(",");

  const url = new URL("https://www.facebook.com/v21.0/dialog/oauth");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scopes);
  url.searchParams.set("state", state);
  url.searchParams.set("response_type", "code");
  return url.toString();
}

export async function exchangeCodeForToken(code: string): Promise<string> {
  const appId = process.env.META_APP_ID as string;
  const appSecret = process.env.META_APP_SECRET as string;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta/callback`;

  const url = new URL(`${GRAPH_BASE}/oauth/access_token`);
  url.searchParams.set("client_id", appId);
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("code", code);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Token exchange failed");
  return data.access_token as string;
}

export async function getLongLivedToken(shortToken: string): Promise<{ token: string; expiresIn: number }> {
  const appId = process.env.META_APP_ID as string;
  const appSecret = process.env.META_APP_SECRET as string;

  const url = new URL(`${GRAPH_BASE}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("fb_exchange_token", shortToken);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Long-lived token exchange failed");
  return { token: data.access_token as string, expiresIn: data.expires_in as number };
}

export async function getPagesAndIgAccount(userToken: string): Promise<{
  pageId: string;
  pageAccessToken: string;
  igBusinessId: string | null;
} | null> {
  const res = await fetch(
    `${GRAPH_BASE}/me/accounts?fields=id,access_token,instagram_business_account&access_token=${userToken}`
  );
  const data = await res.json();
  if (!res.ok || !data.data || data.data.length === 0) return null;

  const page = data.data[0];
  return {
    pageId: page.id,
    pageAccessToken: page.access_token,
    igBusinessId: page.instagram_business_account?.id || null,
  };
}

// --- Instagram Login (API with Instagram Login) functions, used for the primary connect flow ---

const IG_GRAPH_BASE = "https://graph.instagram.com/v21.0";

export async function replyToComment(commentId: string, message: string, token: string): Promise<void> {
  const res = await fetch(`${IG_GRAPH_BASE}/${commentId}/replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, access_token: token }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error?.message || "Failed to reply to comment");
  }
}

export async function sendPrivateReplyToComment(commentId: string, message: string, token: string): Promise<void> {
  const res = await fetch(`${IG_GRAPH_BASE}/${commentId}/private_replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, access_token: token }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error?.message || "Failed to send private reply");
  }
}

export async function sendDirectMessage(igUserId: string, recipientId: string, message: string, token: string): Promise<void> {
  const res = await fetch(`${IG_GRAPH_BASE}/${igUserId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: message },
      access_token: token,
    }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error?.message || "Failed to send DM");
  }
}
