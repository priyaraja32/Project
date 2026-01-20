const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function aiMatchUsers(search, users) {
  if (!search || !Array.isArray(users) || users.length === 0) {
    return [];
  }

  const prompt =
    "You are a skill matching engine.\n\n" +
    `Search Skill:\n"${search}"\n\n` +
    "Rules:\n" +
    "- If skill exists in OFFERS → 80–100\n" +
    "- If skill exists in NEEDS → 40–70\n" +
    "- Related skill → 20–40\n" +
    "- No relation → 0 (exclude)\n\n" +
    "Users:\n" +
    users
      .map(
        (u) =>
          `UserId: ${u.id}\nOffers: ${u.offers.join(
            ", "
          )}\nNeeds: ${u.needs.join(", ")}`
      )
      .join("\n\n") +
    "\n\nReturn ONLY valid JSON:\n" +
    '[{ "userId": number, "match": number }]';

  try {
    const res = await fetch(
      `${GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await res.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

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
  }
}
