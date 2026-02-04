import type { VercelRequest, VercelResponse } from "@vercel/node";

const SYSTEM_PROMPT = `
Tu es Chronos, l'assistant virtuel expert de TimeTravel Agency.
Ta personnalité : Professionnel, chaleureux, passionné d'histoire, un peu geek.
Tes connaissances :
- Paris 1889 (Belle Époque) : 2 500 €, romantique, Tour Eiffel.
- Florence 1504 (Renaissance) : 3 200 €, art, Michel-Ange.
- Crétacé -65M (Dinosaures) : 5 000 €, safari adrénaline, danger élevé.
Consignes : Réponds en français, sois concis (max 3 phrases), donne les prix si demandés.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

  if (!MISTRAL_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Mistral API error");
    }

    return res.status(200).json({
      content: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
