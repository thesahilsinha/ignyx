import { getCentralClient } from "./supabase-central";
import { getClientDbClient } from "./supabase-client-db";
import { findMatchingCommentRule, matches, CommentRule } from "./rules";
import { replyToComment, sendPrivateReplyToComment, sendDirectMessage } from "./meta";

interface ChangeValue {
  id?: string;
  text?: string;
  from?: { id: string; username: string };
  sender?: { id: string };
  recipient?: { id: string };
  message?: { mid: string; text: string };
}

interface Change {
  field: string;
  value: ChangeValue;
}

interface WebhookEntry {
  id: string;
  changes?: Change[];
}

interface WebhookPayload {
  entry: WebhookEntry[];
}

export async function processInstagramWebhook(payload: WebhookPayload): Promise<void> {
  console.log("WEBHOOK: received payload", JSON.stringify(payload));
  const centralDb = getCentralClient();

  for (const entry of payload.entry) {
    const igUserId = entry.id;
    console.log("WEBHOOK: looking up client for igUserId", igUserId);

    const { data: client, error: clientError } = await centralDb
      .from("clients")
      .select("*")
      .eq("meta_ig_business_id", igUserId)
      .single();

    if (clientError) console.log("WEBHOOK: client lookup error", clientError.message);
    if (!client || !client.meta_access_token) {
      console.log("WEBHOOK: no client or no token, skipping");
      continue;
    }
    console.log("WEBHOOK: found client", client.business_name);

    for (const change of entry.changes || []) {
      console.log("WEBHOOK: processing change field", change.field);

      if (change.field === "comments" && change.value.id && change.value.text) {
        await handleComment(client, { id: change.value.id, text: change.value.text });
      }

      if (change.field === "messages" && change.value.sender && change.value.message?.text) {
        console.log("WEBHOOK: DM text received:", change.value.message.text, "from", change.value.sender.id);
        await handleDirectMessage(client, change.value.sender.id, change.value.message.text);
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

async function handleDirectMessage(
  client: { supabase_url: string; supabase_anon_key: string; meta_access_token: string; meta_ig_business_id: string },
  senderId: string,
  text: string
) {
  const clientDb = getClientDbClient(client.supabase_url, client.supabase_anon_key);

  const { data: rules } = await clientDb
    .from("dm_story_rules")
    .select("*")
    .eq("channel", "dm");

  console.log("WEBHOOK: dm_story_rules found:", rules?.length || 0);

  const token = client.meta_access_token;

  if (rules && rules.length > 0) {
    for (const rule of rules) {
      const isMatch = matches(text, rule.trigger_word, rule.match_method);
      console.log(`WEBHOOK: checking rule "${rule.trigger_word}" (${rule.match_method}) against "${text}" -> ${isMatch}`);
      if (isMatch) {
        if (rule.reply_text) {
          console.log("WEBHOOK: sending rule reply:", rule.reply_text);
          try {
            await sendDirectMessage(client.meta_ig_business_id, senderId, rule.reply_text, token);
            console.log("WEBHOOK: rule reply sent successfully");
          } catch (err) {
            console.log("WEBHOOK: ERROR sending rule reply:", err instanceof Error ? err.message : String(err));
          }
        }
        return;
      }
    }
  }

  console.log("WEBHOOK: no rule matched, checking fallback");
  const { data: fallback } = await clientDb
    .from("fallback_messages")
    .select("*")
    .eq("message_type", "exception")
    .single();

  console.log("WEBHOOK: fallback found:", fallback?.content || "none");

  if (fallback?.content) {
    try {
      await sendDirectMessage(client.meta_ig_business_id, senderId, fallback.content, token);
      console.log("WEBHOOK: fallback reply sent successfully");
    } catch (err) {
      console.log("WEBHOOK: ERROR sending fallback reply:", err instanceof Error ? err.message : String(err));
    }
  }
}