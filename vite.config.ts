import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createReadStream, existsSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/ski-trail-atlas/" : "/",
  plugins: [
    react(),
    {
      name: "local-fulong-reference",
      apply: "serve",
      configureServer(server) {
        // Fixed endpoint and local fixture. No arbitrary filesystem URL access.
        server.middlewares.use("/__reference/fulong-highres.webp", (request, response) => {
          const file = resolve("artifacts/reference/fulong-highres.webp");
          if (request.method !== "GET" && request.method !== "HEAD") {
            response.writeHead(405).end();
            return;
          }
          if (!existsSync(file)) {
            response.writeHead(404).end("Local Fulong reference missing. See README.");
            return;
          }
          response.writeHead(200, { "Content-Type": "image/webp", "Cache-Control": "no-store" });
          if (request.method === "HEAD") response.end();
          else createReadStream(file).on("error", () => response.destroy()).pipe(response);
        });
      },
    },
  ],
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
}));
