import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    // port: 5000,
    proxy: {
      "/linkapi": {
        target: "https://gimcszjh.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/linkapi/, ""),
      },
    },
  },
});
