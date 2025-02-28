import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    lib: {
      entry: "src/index.js",
      name: "GIconsV2",
      fileName: "index",
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
