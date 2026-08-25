import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

function serveBoardJson() {
  const source = resolve("board.json");

  const send = (_req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(readFileSync(source));
  };

  return {
    name: "serve-board-json",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split("?")[0] === "/board.json") {
          send(req, res);
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split("?")[0] === "/board.json") {
          send(req, res);
          return;
        }
        next();
      });
    },
    closeBundle() {
      const dist = resolve("dist");
      mkdirSync(dist, { recursive: true });
      copyFileSync(source, resolve(dist, "board.json"));
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [serveBoardJson()],
  server: {
    host: true,
    port: 43147,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 43147,
    strictPort: true,
    allowedHosts: true,
  },
});
