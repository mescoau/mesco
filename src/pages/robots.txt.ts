import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

export const GET: APIRoute = () => {
  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteConfig.url}/sitemap-index.xml`,
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
