/* eslint-disable @typescript-eslint/no-var-requires */
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react(),
    envCompatible({
      mountedPath: "process.env",
    }),
  ],
});
