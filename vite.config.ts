import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async () => {
  const tailwindcss = await import("tailwindcss");
  const autoprefixer = await import("autoprefixer");

  return {
    plugins: [remix(), tsconfigPaths()],
    css: {
      postcss: {
        plugins: [tailwindcss.default, autoprefixer.default],
      },
    },
  };
});
