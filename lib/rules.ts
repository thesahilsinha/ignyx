export type MatchMethod = "exact" | "starts_with" | "contains";

export function matches(text: string, trigger: string, method: MatchMethod): boolean {
  const normalizedText = text.trim().toLowerCase();
  const normalizedTrigger = trigger.trim().toLowerCase();

  if (method === "exact") return normalizedText === normalizedTrigger;
  if (method === "starts_with") return normalizedText.startsWith(normalizedTrigger);
  return normalizedText.includes(normalizedTrigger);
}

export interface CommentRule {
  id: string;
  trigger_word: string;
  match_method: MatchMethod;
  action_type: "reply" | "dm" | "both";
  reply_text: string | null;
  dm_text: string | null;
  dm_media_url: string | null;
}

export function findMatchingCommentRule(text: string, rules: CommentRule[]): CommentRule | null {
  for (const rule of rules) {
    if (matches(text, rule.trigger_word, rule.match_method)) return rule;
  }
  return null;
}