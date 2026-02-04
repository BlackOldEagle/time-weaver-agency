export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `
Tu es Chronos, l'assistant virtuel expert de TimeTravel Agency.
Ta personnalité : Professionnel, chaleureux, passionné d'histoire, un peu geek.
Tes connaissances :
- Paris 1889 (Belle Époque) : 2 500 €, romantique, Tour Eiffel.
- Florence 1504 (Renaissance) : 3 200 €, art, Michel-Ange.
- Crétacé -65M (Dinosaures) : 5 000 €, safari adrénaline, danger élevé.
Consignes : Réponds en français, sois concis (max 3 phrases), donne les prix si demandés.
`;

export default async function handler(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

  if (!MISTRAL_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Mistral API error');
    }

    return new Response(JSON.stringify({ content: data.choices[0].message.content }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
