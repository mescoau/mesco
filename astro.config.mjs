import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { siteConfig } from "./src/config/site.ts";
export default defineConfig({
  site: siteConfig.url,
  trailingSlash: siteConfig.trailingSlash ? "always" : "never",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  integrations: [
    tailwindcss(),
    sitemap({
      filter: (page) =>
        !page.includes("/thank-you") && !page.includes("/signature") && !page.includes("/projects"),
    }),
    mdx(),
  ],
});
