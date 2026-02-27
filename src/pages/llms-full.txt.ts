import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig, link } from "@/config/site";

const hr = "---";

function section(title: string, url: string, body: string): string {
  return [hr, `# ${title}`, `URL: ${url}`, "", body.trim(), ""].join("\n");
}

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
  const parts: string[] = [];

  // ── Preamble ────────────────────────────────────────────────────────────────
  parts.push(
    [
      "# McPhee Engineering Systems (MESCo) — Full Site Content",
      "",
      "This file contains the full text content of the MESCo website, structured for LLM consumption.",
      `Source: ${base}/llms-full.txt`,
      `Index:  ${base}/llms.txt`,
      "",
    ].join("\n")
  );

  // ── Static pages ─────────────────────────────────────────────────────────────
  parts.push(
    section(
      "Home",
      `${base}/`,
      `McPhee Engineering Systems (MESCo) is a Western Australian engineering systems consultancy. We bridge the gap between design intent and site delivery with structured, audit-ready project systems. Our services cover the full project lifecycle — from mobilisation to close-out — ensuring systems are built, maintained and traceable.

Contact: ${siteConfig.email} | ${siteConfig.phone} | Perth, WA`
    )
  );

  parts.push(
    section(
      "About",
      `${base}${link("/about")}`,
      `McPhee Engineering Systems Co (MESCo) is a Western Australian consultancy specialising in structured systems and compliance frameworks for construction and resources projects.

MESCo combines deep field experience with management systems expertise to deliver engineering administration, QA/QC, HSE compliance, and ISO audit support. Our work spans the full project lifecycle — from mobilisation planning to close-out documentation — for contractors, EPCM firms, and clients across WA and Queensland.`
    )
  );

  parts.push(
    section(
      "Values",
      `${base}${link("/values")}`,
      `MESCo's five core values spell out MESCO:

- **M — Mobilise with Intent**: Every job starts structured — with clear scope, systems, and deliverables.
- **E — Engineer for Execution**: We build tools that work — on site, under pressure, in real-world projects.
- **S — Simplify Compliance**: We make ISO, HSE, and QA practical, auditable, and field-ready.
- **C — Communicate Clearly**: No jargon. No confusion. Just clear, direct, professional delivery.
- **O — Own the Outcome**: We take responsibility for results — not just advice or templates.`
    )
  );

  // Industries page — built from collection data
  const industriesBody = industries
    .map((i) => {
      const lines = [`## ${i.data.title}`, "", i.data.description];
      if (i.data.focus) lines.push("", `**Focus:** ${i.data.focus}`);
      if (i.data.typicalProjects) lines.push("", `**Typical Projects:** ${i.data.typicalProjects}`);
      return lines.join("\n");
    })
    .join("\n\n");

  parts.push(
    section(
      "Industries",
      `${base}${link("/industries")}`,
      `MESCo's systems and compliance support apply across major Australian industries.\n\n${industriesBody}`
    )
  );

  parts.push(
    section(
      "Contact",
      `${base}${link("/contact")}`,
      `Get in touch with MESCo to scope systems and support for your next project.

- **Email:** ${siteConfig.email}
- **Phone:** ${siteConfig.phone}
- **Location:** Perth, WA
- **Office hours:** Monday–Friday, 8:00–17:00 (AWST)`
    )
  );

  // ── Services ──────────────────────────────────────────────────────────────────
  for (const service of services) {
    const { title, description, excerpt, highlights } = service.data;
    const meta = [
      excerpt ? `> ${excerpt}` : null,
      description ? description.trim() : null,
      highlights?.length
        ? `\n**Highlights:**\n${highlights.map((h) => `- ${h}`).join("\n")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    parts.push(
      section(
        `Service: ${title}`,
        `${base}${link("/services/" + service.slug)}`,
        `${meta}\n\n${service.body.trim()}`
      )
    );
  }

  // ── Case Studies ──────────────────────────────────────────────────────────────
  for (const project of projects) {
    const { title, description, client, location, year, duration, scope, category, services: projectServices, metrics } = project.data;
    const metaLines = [
      client ? `**Client:** ${client}` : null,
      location ? `**Location:** ${location}` : null,
      year ? `**Year:** ${year}` : null,
      duration ? `**Duration:** ${duration}` : null,
      scope ? `**Scope:** ${scope}` : null,
      category ? `**Category:** ${category}` : null,
      projectServices?.length ? `**Services:** ${projectServices.join(", ")}` : null,
    ].filter(Boolean);

    const metricsBlock = metrics?.length
      ? `\n**Metrics:**\n${metrics.map((m) => `- ${m.label}: ${m.value}`).join("\n")}`
      : "";

    const header = [description.trim(), ...metaLines, metricsBlock]
      .filter(Boolean)
      .join("\n");

    parts.push(
      section(
        `Case Study: ${title}`,
        `${base}${link("/case-studies/" + project.slug)}`,
        `${header}\n\n${project.body.trim()}`
      )
    );
  }

  // ── Team ──────────────────────────────────────────────────────────────────────
  for (const member of team) {
    const { name, role, bio } = member.data;
    const header = [
      role ? `**Role:** ${role}` : null,
      bio ? `\n${bio.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    parts.push(
      section(
        `Team: ${name}`,
        `${base}${link("/team/" + member.slug)}`,
        `${header}\n\n${member.body.trim()}`
      )
    );
  }

  // ── Legal ─────────────────────────────────────────────────────────────────────
  for (const doc of legal) {
    parts.push(
      section(
        doc.data.page,
        `${base}${link("/legal/" + doc.slug)}`,
        doc.body.trim()
      )
    );
  }

  parts.push(hr + "\n");

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
