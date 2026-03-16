import { getCollection } from "astro:content";
import { link } from "@/config/site";

export async function GET() {
  const [services, projects, team, legal] = await Promise.all([
    getCollection("services"),
    getCollection("projects"),
    getCollection("team"),
    getCollection("legal"),
  ]);

  const searchItems = [
    ...services.map((item) => ({
      type: "Service",
      title: item.data.title,
      description: item.data.excerpt ?? item.data.description,
      meta: item.data.highlights?.join(", "),
      url: link(`/services/${item.id}`),
    })),
    ...projects.map((item) => ({
      type: "Case Study",
      title: item.data.title,
      description: item.data.description,
      meta: [
        item.data.client,
        item.data.location,
        item.data.category,
        item.data.duration,
      ]
        .filter(Boolean)
        .join(" • "),
      url: link(`/case-studies/${item.id}`),
    })),
    ...team.map((item) => ({
      type: "Team",
      title: item.data.name,
      description: item.data.bio,
      meta: item.data.role,
      url: link(`/team/${item.id}`),
    })),
    ...legal.map((item) => ({
      type: "Legal",
      title: item.data.page,
      description:
        item.data.pubDate?.toISOString?.().split("T")[0] || "Legal notice",
      date: item.data.pubDate,
      url: link(`/legal/${item.id}`),
    })),
  ];

  return new Response(JSON.stringify(searchItems), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
