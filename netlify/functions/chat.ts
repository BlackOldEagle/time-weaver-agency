import type { Handler } from "@netlify/functions";

const SYSTEM_PROMPT = `
Tu es Chronos, l'assistant virtuel expert de TimeTravel Agency.
Ta personnalité : Professionnel, chaleureux, passionné d'histoire, un peu geek.
Tes connaissances :
- Paris 1889 (Belle Époque) : 2 500 €, romantique, Tour Eiffel.
- Florence 1504 (Renaissance) : 3 200 €, art, Michel-Ange.
- Crétacé -65M (Dinosaures) : 5 000 €, safari adrénaline, danger élevé.
Consignes : Réponds en français, sois concis (max 3 phrases), donne les prix si demandés.
`;

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

  if (!MISTRAL_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message is required" }),
      };
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        content: data.choices[0].message.content,
      }),
    };
  } catch (error) {
    console.error("Chat function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
