const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function aiMatchUsers(search, users) {
  if (!search || !Array.isArray(users) || users.length === 0) {
    return [];
  }

  const normalizedSearch = search.toLowerCase().trim();

  const prompt = `
You are a PROFESSIONAL skill matching engine.

Search skill:
"${normalizedSearch}"

SCORING RULES (STRICT):
1. If the search skill EXACTLY appears in OFFERS
   → score MUST be between 80 and 100

2. If the search skill EXACTLY appears in NEEDS
   → score MUST be between 40 and 70

3. If the search skill is PARTIALLY RELATED
   (same words, similar meaning, or shared letters)
   → score MUST be between 20 and 40

4. If there is ABSOLUTELY NO RELATION
   → score MUST be 0

IMPORTANT RULES:
- Return EVERY user (do not skip)
- Each user MUST have a match value
- Do NOT explain anything
- Do NOT add text
- Output ONLY valid JSON
- Percentages must look realistic (87, 94, 63, etc.)

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

Output format ONLY:
[
  { "userId": number, "match": number }
]
`;

  try {
    const res = await fetch(
      `${GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1, // 
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

    
    return users.map((user) => {
      const aiResult = parsed.find(
        (p) => Number(p.userId) === Number(user.id)
      );

      let match = Number(aiResult?.match ?? 0);

      // normalize
      if (isNaN(match)) match = 0;

  
      match = Math.max(0, Math.min(100, match));

  
      if (
        match === 0 &&
        hasPartialLetterMatch(normalizedSearch, [
          ...user.offers,
          ...user.needs,
        ])
      ) {
        match = random(20, 40);
      }

      return {
        userId: user.id,
        match,
      };
    });
  } catch (err) {
    console.error("Gemini AI Match Error:", err);
    return users.map((u) => ({ userId: u.id, match: 0 }));
  }
}



function hasPartialLetterMatch(search, skills) {
  const letters = new Set(search.split(""));
  return skills.some((skill) => {
    const s = skill.toLowerCase();
    let count = 0;
    letters.forEach((l) => s.includes(l) && count++);
    return count >= 2; 
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
