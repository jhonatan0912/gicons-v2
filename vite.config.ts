import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [createVuePlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: require("sass"),
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "GIconsV2",
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
      },
    },
    minify: "terser",
    terserOptions: {
      format: {
        comments: false,
      },
      compress: {
        drop_console: true,
      },
    },
    sourcemap: false,
    target: "es2015",
  },
});
