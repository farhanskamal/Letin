import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const repoName = "Letin";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? `/${repoName}/` : "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
