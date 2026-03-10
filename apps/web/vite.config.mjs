import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file from the root of the monorepo if needed
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@core": path.resolve(__dirname, "./src/core"),
        "@infrastructure": path.resolve(__dirname, "./src/infrastructure"),
        "@ui": path.resolve(__dirname, "./src/ui"),
      },
    },
    server: {
      port: 3000,
      proxy: {
        // Redirects frontend /api calls to your NestJS backend during dev
        "/api": {
          target: env.VITE_API_URL || "http://localhost:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
