const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function aiMatchUsers(search, users) {
  if (!search || !users?.length) return [];

  const prompt = `
You are a skill matching engine.

Search Skill:
"${search}"

Rules:
- If skill exists in OFFERS → 80–100
- If skill exists in NEEDS → 40–70
- Related skill → 20–40
- No relation → 0 (exclude)

Users:
${users
  .map(
    (u) => `
UserId: ${u.id}
Offers: ${u.offers.join(", ")}
Needs: ${u.needs.join(", ")}
`
  )
  .join("\n")}

Return ONLY valid JSON in this format:
[
  { "userId": number, "match": number }
]
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(
      `${GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await res.json();

    let text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // 🔥 Remove ```json ``` wrappers if Gemini adds them
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    // ✅ Final safety filter
    return Array.isArray(parsed)
      ? parsed.filter(
          (u) =>
            typeof u.userId === "number" &&
            typeof u.match === "number" &&
            u.match > 0
        )
      : [];
  } catch (err) {
    console.error("Gemini AI Match Error:", err);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
