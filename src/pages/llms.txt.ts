import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig, link } from "@/config/site";

export const GET: APIRoute = async () => {
  const [services, projects, team, legal, industries] = await Promise.all([
    getCollection("services"),
    getCollection("projects"),
    getCollection("team"),
    getCollection("legal"),
    getCollection("industries"),
  ]);

  services.sort((a, b) => {
    const featuredDiff = (b.data.featured ? 1 : 0) - (a.data.featured ? 1 : 0);
    if (featuredDiff !== 0) return featuredDiff;
    return a.data.title.localeCompare(b.data.title);
  });

  industries.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));

  const base = siteConfig.url;

  const lines: string[] = [
    "# McPhee Engineering Systems (MESCo)",
    "",
    "> MESCo is a Western Australian engineering systems consultancy specialising in structured project systems, QA/QC frameworks, HSE compliance, and ISO audit support for construction and resources projects. We bridge the gap between design intent and site delivery with audit-ready documentation, embedded project support, and close-out packages that stand up to scrutiny.",
    "",
    "## Company",
    "",
    `- [Home](${base}/): Overview of MESCo's services and capabilities.`,
    `- [About](${base}${link("/about")}): Background, expertise, and approach of McPhee Engineering Systems Co.`,
    `- [Values](${base}${link("/values")}): The five core values (MESCO) that underpin every system and project MESCo delivers.`,
    `- [Industries](${base}${link("/industries")}): Sectors served — construction, resources & mining, infrastructure, energy & renewables, and government projects.`,
    `- [Team](${base}${link("/team")}): The MESCo directors and team members.`,
    `- [Contact](${base}${link("/contact")}): Enquiries and project scoping.`,
    "",
    "## Services",
    "",
  ];

  for (const service of services) {
    lines.push(
      `- [${service.data.title}](${base}${link("/services/" + service.slug)}): ${service.data.description.trim()}`
    );
  }

  lines.push("", "## Case Studies", "");

  for (const project of projects) {
    const meta = [project.data.client, project.data.location, project.data.year]
      .filter(Boolean)
      .join(", ");
    const suffix = meta ? ` (${meta})` : "";
    lines.push(
      `- [${project.data.title}](${base}${link("/case-studies/" + project.slug)}): ${project.data.description.trim()}${suffix}`
    );
  }

  lines.push("", "## Team", "");

  for (const member of team) {
    const bio = member.data.bio?.trim() ?? "";
    lines.push(
      `- [${member.data.name}](${base}${link("/team/" + member.slug)})${member.data.role ? `, ${member.data.role}` : ""}${bio ? `: ${bio}` : ""}`
    );
  }

  lines.push("", "## Industries Served", "");

  for (const industry of industries) {
    lines.push(`- **${industry.data.title}**: ${industry.data.description.trim()}`);
  }

  lines.push("", "## Legal", "");

  for (const doc of legal) {
    lines.push(`- [${doc.data.page}](${base}${link("/legal/" + doc.slug)})`);
  }

  lines.push(
    "",
    "## Notes",
    "",
    `- [Sitemap](${base}/sitemap-index.xml)`,
    `- [Full content](${base}/llms-full.txt): llms-full.txt with complete page content.`,
  );

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
