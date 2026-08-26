export async function generateAiReply(apiKey: string, context: string, userMessage: string): Promise<string | null> {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an Instagram DM assistant for a business. Reply briefly and helpfully based on this context: ${context}`,
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 200,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}