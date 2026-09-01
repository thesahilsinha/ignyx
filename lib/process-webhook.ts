import { getCentralClient } from "./supabase-central";
import { getClientDbServiceClient } from "./supabase-client-db";
import { findMatchingCommentRule, matches, CommentRule } from "./rules";
import { replyToComment, sendPrivateReplyToComment, sendDirectMessage, sendMediaMessage } from "./meta";
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

    try {
      const { data: client } = await centralDb
        .from("clients")
        .select("*")
        .eq("meta_ig_business_id", igUserId)
        .single();

      if (!client || !client.meta_access_token) {
        console.log(`WEBHOOK [${igUserId}]: no client or token found for this igUserId`);
        continue;
      }
      console.log(`WEBHOOK [${client.business_name}]: entry received`);

      for (const change of entry.changes || []) {
        if (change.field === "comments" && change.value.id && change.value.text) {
          try {
            await handleComment(client, {
              id: change.value.id,
              text: change.value.text,
              fromId: change.value.from?.id,
            });
          } catch (err) {
            console.log(`WEBHOOK [${client.business_name}]: comment handling error:`, err instanceof Error ? err.message : String(err));
          }
        }
      }

      for (const msg of entry.messaging || []) {
        if (msg.message?.text) {
          try {
            await handleDirectMessage(client, msg.sender.id, msg.message.text);
          } catch (err) {
            console.log(`WEBHOOK [${client.business_name}]: dm handling error:`, err instanceof Error ? err.message : String(err));
          }
        }
      }
    } catch (err) {
      console.log(`WEBHOOK [${igUserId}]: entry-level error:`, err instanceof Error ? err.message : String(err));
    }
  }
}

async function handleComment(
  client: { supabase_url: string; supabase_service_key: string; meta_access_token: string; meta_ig_business_id: string },
  comment: { id: string; text: string; fromId?: string }
) {
  const clientDb = getClientDbServiceClient(client.supabase_url, client.supabase_service_key);

  const { data: rules } = await clientDb.from("comment_rules").select("*");
  if (!rules || rules.length === 0) {
    console.log("WEBHOOK: no comment rules configured");
    return;
  }

  const matched = findMatchingCommentRule(comment.text, rules as CommentRule[]);
  if (!matched) {
    console.log(`WEBHOOK: comment "${comment.text}" matched no rule`);
    return;
  }
  console.log(`WEBHOOK: comment matched rule "${matched.trigger_word}", action ${matched.action_type}`);

  const token = client.meta_access_token;

  if (matched.action_type === "reply" || matched.action_type === "both") {
    if (matched.reply_text) {
      try {
        await replyToComment(comment.id, matched.reply_text, token);
        console.log("WEBHOOK: public reply sent");
      } catch (err) {
        console.log("WEBHOOK: public reply FAILED:", err instanceof Error ? err.message : String(err));
      }
    }
  }

  if (matched.action_type === "dm" || matched.action_type === "both") {
    if (matched.dm_text) {
      try {
        await sendPrivateReplyToComment(client.meta_ig_business_id, comment.id, matched.dm_text, token);
        console.log("WEBHOOK: private reply sent");
      } catch (err) {
        console.log("WEBHOOK: private reply FAILED:", err instanceof Error ? err.message : String(err));
      }
    }
    if (matched.dm_media_url && comment.fromId) {
      try {
        await sendMediaMessage(client.meta_ig_business_id, comment.fromId, matched.dm_media_url, token);
        console.log("WEBHOOK: comment media DM sent");
      } catch (err) {
        console.log("WEBHOOK: comment media DM FAILED:", err instanceof Error ? err.message : String(err));
      }
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
  console.log(`WEBHOOK: dm rules found: ${rules?.length || 0}`);
  const token = client.meta_access_token;

  if (rules && rules.length > 0) {
    for (const rule of rules) {
      if (matches(text, rule.trigger_word, rule.match_method)) {
        console.log(`WEBHOOK: dm matched rule "${rule.trigger_word}"`);
        if (rule.reply_text) {
          try {
            await sendDirectMessage(client.meta_ig_business_id, senderId, rule.reply_text, token);
            console.log("WEBHOOK: dm rule reply sent");
          } catch (err) {
            console.log("WEBHOOK: dm rule reply FAILED:", err instanceof Error ? err.message : String(err));
          }
        }
        if (rule.media_url) {
          try {
            await sendMediaMessage(client.meta_ig_business_id, senderId, rule.media_url, token);
            console.log("WEBHOOK: dm rule media sent");
          } catch (err) {
            console.log("WEBHOOK: dm rule media FAILED:", err instanceof Error ? err.message : String(err));
          }
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
      try {
        await sendDirectMessage(client.meta_ig_business_id, senderId, aiReply, token);
        console.log("WEBHOOK: ai+ reply sent");
      } catch (err) {
        console.log("WEBHOOK: ai+ reply FAILED:", err instanceof Error ? err.message : String(err));
      }
      return;
    }
  }

  const { data: fallback } = await clientDb
    .from("fallback_messages")
    .select("*")
    .eq("message_type", "exception")
    .single();

  if (fallback?.content) {
    try {
      await sendDirectMessage(client.meta_ig_business_id, senderId, fallback.content, token);
      console.log("WEBHOOK: fallback reply sent");
    } catch (err) {
      console.log("WEBHOOK: fallback reply FAILED:", err instanceof Error ? err.message : String(err));
    }
  } else {
    console.log("WEBHOOK: no fallback message configured either, nothing sent");
  }
}