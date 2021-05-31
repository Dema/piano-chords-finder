import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import reactRefresh from "@vitejs/plugin-react-refresh";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/piano-chords-finder/",
  plugins: [
    reactRefresh(),
    visualizer({}),
    // gzip
    viteCompression(),
    // br
    viteCompression({
      ext: ".br",
      algorithm: "brotliCompress",
    }),
  ],
});
