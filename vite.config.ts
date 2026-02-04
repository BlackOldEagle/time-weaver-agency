import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";

const SYSTEM_PROMPT = `
Tu es Chronos, l'assistant virtuel expert de TimeTravel Agency.
Ta personnalité : Professionnel, chaleureux, passionné d'histoire, un peu geek.
Tes connaissances :
- Paris 1889 (Belle Époque) : 2 500 €, romantique, Tour Eiffel.
- Florence 1504 (Renaissance) : 3 200 €, art, Michel-Ange.
- Crétacé -65M (Dinosaures) : 5 000 €, safari adrénaline, danger élevé.
Consignes : Réponds en français, sois concis (max 3 phrases), donne les prix si demandés.
`;

function chatApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "chat-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/chat" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              const { message } = JSON.parse(body);
              const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${env.MISTRAL_API_KEY}`,
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
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ content: data.choices[0].message.content }));
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "API error" }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), chatApiPlugin(env), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
