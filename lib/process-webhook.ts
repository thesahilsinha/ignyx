import { getCentralClient } from "./supabase-central";
import { getClientDbServiceClient } from "./supabase-client-db";
import { findMatchingCommentRule, matches, CommentRule } from "./rules";
import { replyToComment, sendPrivateReplyToComment, sendDirectMessage } from "./meta";
import { generateAiReply } from "./groq";

interface CommentChangeValue {
  id: string;
  text: string;
  from?: { id: string; username: string };
}

interface Change {
  field: string;
  value: CommentChangeValue;
}

interface MessagingEvent {
  sender: { id: string };
  recipient: { id: string };
  message?: { mid: string; text?: string };
}

interface WebhookEntry {
  id: string;
  changes?: Change[];
  messaging?: MessagingEvent[];
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
      if (change.field === "comments" && change.value.id && change.value.text) {
        await handleComment(client, { id: change.value.id, text: change.value.text });
      }
    }

    for (const msg of entry.messaging || []) {
      if (msg.message?.text) {
        await handleDirectMessage(client, msg.sender.id, msg.message.text);
      }
    }
  }
}

async function handleComment(
  client: { supabase_url: string; supabase_service_key: string; meta_access_token: string },
  comment: { id: string; text: string }
) {
  const clientDb = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

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
  client: {
    supabase_url: string;
    supabase_service_key: string;
    meta_access_token: string;
    meta_ig_business_id: string;
    ai_plus_enabled: boolean;
    groq_api_key: string | null;
  },
  senderId: string,
  text: string
) {
  const clientDb = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { data: rules } = await clientDb.from("dm_story_rules").select("*").eq("channel", "dm");
  const token = client.meta_access_token;

  if (rules && rules.length > 0) {
    for (const rule of rules) {
      if (matches(text, rule.trigger_word, rule.match_method)) {
        if (rule.reply_text) {
          await sendDirectMessage(client.meta_ig_business_id, senderId, rule.reply_text, token);
        }
        return;
      }
    }
  }

  if (client.ai_plus_enabled && client.groq_api_key) {
    const { data: contextRow } = await clientDb.from("ai_context").select("context_text").single();
    const context = contextRow?.context_text || "You are a helpful assistant for this Instagram business.";
    const aiReply = await generateAiReply(client.groq_api_key, context, text);
    if (aiReply) {
      await sendDirectMessage(client.meta_ig_business_id, senderId, aiReply, token);
      return;
    }
  }

  const { data: fallback } = await clientDb
    .from("fallback_messages")
    .select("*")
    .eq("message_type", "exception")
    .single();

  if (fallback?.content) {
    await sendDirectMessage(client.meta_ig_business_id, senderId, fallback.content, token);
  }
}