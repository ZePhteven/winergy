import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/_variables.scss";
        `,
      },
    },
  },
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@app": resolve(__dirname, "./src"),
    },
  },
});
