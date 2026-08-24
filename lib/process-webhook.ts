import { getCentralClient } from "./supabase-central";
import { getClientDbClient } from "./supabase-client-db";
import { findMatchingCommentRule, CommentRule } from "./rules";
import { replyToComment, sendPrivateReplyToComment } from "./meta";

interface CommentChange {
  field: string;
  value: {
    id: string;
    text: string;
    from?: { id: string; username: string };
  };
}

interface WebhookEntry {
  id: string;
  changes?: CommentChange[];
}

interface WebhookPayload {
  entry: WebhookEntry[];
}

export async function processInstagramWebhook(payload: WebhookPayload): Promise<void> {
  const centralDb = getCentralClient();

  for (const entry of payload.entry) {
    const igUserId = entry.id;

    const { data: client } = await centralDb
      .from("clients")
      .select("*")
      .eq("meta_ig_business_id", igUserId)
      .single();

    if (!client || !client.meta_access_token) continue;

    for (const change of entry.changes || []) {
      if (change.field === "comments") {
        await handleComment(client, change.value);
      }
    }
  }
}

async function handleComment(
  client: { supabase_url: string; supabase_anon_key: string; meta_access_token: string },
  comment: { id: string; text: string }
) {
  const clientDb = getClientDbClient(client.supabase_url, client.supabase_anon_key);

  const { data: rules } = await clientDb.from("comment_rules").select("*");
  if (!rules || rules.length === 0) return;

  const matched = findMatchingCommentRule(comment.text, rules as CommentRule[]);
  if (!matched) return;

  const token = client.meta_access_token;

  if (matched.action_type === "reply" || matched.action_type === "both") {
    if (matched.reply_text) {
      await replyToComment(comment.id, matched.reply_text, token);
    }
  }

  if (matched.action_type === "dm" || matched.action_type === "both") {
    if (matched.dm_text) {
      await sendPrivateReplyToComment(comment.id, matched.dm_text, token);
    }
  }
}