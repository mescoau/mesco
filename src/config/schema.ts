/**
 * Schema.org constants
 *
 * These objects are used directly as schema.org JSON-LD nodes.
 * Update contact details here and they propagate to all structured data.
 */
import { siteConfig } from "./site";

/** Stable @id references used to cross-link nodes */
export const ORG_ID = `${siteConfig.url}/#organization`;
export const SITE_ID = `${siteConfig.url}/#website`;

/** Core Organization + ProfessionalService node — sitewide */
export const orgSchema = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "McPhee Engineering Systems (MESCo)",
  alternateName: "MESCo",
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/favicon-96x96.png`,
  },
  image: `${siteConfig.url}/default.jpg`,
  description:
    "A Western Australian engineering systems consultancy specialising in structured project systems, QA/QC frameworks, HSE compliance, and ISO audit support for construction and resources projects.",
  email: "admin@mesco.au",
  telephone: "+61409729303",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61409729303",
    contactType: "customer service",
    email: "admin@mesco.au",
    availableLanguage: "English",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  },
  areaServed: {
    "@type": "Country",
    name: "Australia",
  },
  knowsAbout: [
    "QA/QC frameworks",
    "HSE compliance systems",
    "ISO 9001 quality management",
    "ISO 45001 occupational health and safety",
    "ISO 14001 environmental management",
    "Engineering administration",
    "Project management documentation",
    "Construction compliance",
    "Audit-ready project systems",
  ],
};

/** WebSite node — sitewide */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: siteConfig.url,
  name: "McPhee Engineering Systems (MESCo)",
  description:
    "Structured systems and compliance support for clean, auditable project delivery.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-AU",
};
