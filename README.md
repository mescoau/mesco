# MESCo Website

**McPhee Engineering Systems Co (MESCo)** — [mesco.au](https://mesco.au)

Custom website designed and built by **Josh Withers** of **[The Internet](https://theinternet.com.au)** and **[Unpopular](https://unpopular.au)** SEO.
For technical questions, contact Josh Withers [josh@withers.co](mailto:josh@withers.co).

---

## How this website works

This website is built with **Astro 6**, a modern static site framework. Understanding two tools is all you need to work on it: **Node.js** and **Astro**.

### Node.js

[Node.js](https://nodejs.org) is a JavaScript runtime that runs on your computer (not in the browser). It is the engine that powers the build process — it reads the source files, processes them, and outputs a finished website.

You don't need to know how to write Node.js code. You just need it installed on your machine so the build tools can run. Download and install it from [nodejs.org](https://nodejs.org) — install the LTS (Long Term Support) version.

Once Node.js is installed, you get access to `npm` (Node Package Manager), which is the command-line tool used to install this project's dependencies and run build commands.

To verify Node.js is installed correctly, run:

```bash
node --version
npm --version
```

Both should print a version number.

### Astro

[Astro](https://astro.build) is the framework this website is built on. It takes the source files in `src/` — pages, components, content, images — and compiles them into a folder of plain HTML, CSS, and JavaScript files ready to put on a web server.

Astro pages and components use `.astro` files, which look like HTML with a JavaScript frontmatter block at the top (between the `---` lines). Content is written in Markdown (`.md` files) inside `src/content/`.

You do not need to understand Astro deeply to update content. The content collections (services, projects, team, industries, legal) are all plain Markdown files with structured front matter — no code knowledge required to edit them.

### The build process in plain English

1. You write or edit source files in `src/`
2. You run `npm run build` in your terminal from the project folder
3. Astro reads all the source files and outputs a complete website into `./dist/`
4. You upload the contents of `./dist/` to your web host

The `./dist/` folder is the actual website — plain files a browser can read. Nothing in `src/` is ever uploaded to a web server.

### Working locally

To preview the website on your own machine before building:

1. Open a terminal and navigate to the project folder
2. Run `npm install` (only needed once, or after pulling new changes)
3. Run `npm run dev`
4. Open `http://localhost:4321` in your browser

Changes to source files will live-reload in the browser automatically.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Astro 6](https://astro.build) | Static site framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling (via Vite plugin) |
| [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) | Form element base styles |
| [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) | Prose/rich-text styling for Markdown content |
| [Fuse.js](https://www.fusejs.io) | Client-side fuzzy search |
| [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) | MDX support for content |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Auto-generated sitemap |
| TypeScript | Type-checking and IDE support |

The site compiles to fully static HTML/CSS/JS — no server required, this is a static site.

---

## Project Structure

```
/
├── public/
│   ├── brand/              # Logo files and brand guidelines PDF (served at /brand/*)
│   ├── videos/             # Background video assets (hero, footer, etc.)
│   ├── 404.html            # Interactive space-themed 404 page
│   ├── favicons & icons    # favicon.ico, favicon.svg, apple-touch-icon.png, etc.
│   ├── default.jpg         # Default Open Graph image
│   ├── mesco_email_sig.png # Email signature image
│   └── site.webmanifest    # PWA manifest
├── src/
│   ├── components/
│   │   ├── about/          # About page sections (Hero, Expertise, Process, Certifications)
│   │   ├── assets/         # Logo, AnimatedLogo
│   │   ├── contact/        # Contact page sections (Form, FAQ, Hero, ReachOut, Navigate)
│   │   ├── fundations/     # Base elements — containers, buttons, text, icons, head tags
│   │   ├── global/         # Navigation, Footer, Search modal
│   │   ├── landing/        # Homepage sections (Hero, Intro, WhatWeDo, Advantage, Contact)
│   │   ├── projects/       # Project card components
│   │   ├── services/       # Service card and principles components
│   │   └── team/           # Team cards and birthday hat easter egg
│   ├── config/
│   │   ├── site.ts         # Site URL, email, phone, trailing slash config
│   │   └── schema.ts       # Schema.org structured data (Organization, WebSite)
│   ├── content/            # Content collections (see below)
│   ├── content.config.ts   # Content collection schemas
│   ├── data/
│   │   └── faq.ts          # FAQ items for the contact page
│   ├── images/             # Images imported via Astro image processing
│   ├── layouts/            # Page layout wrappers (Base, Services, Projects, Team, Legal)
│   ├── pages/              # Routes (each file = a URL)
│   ├── scripts/
│   │   └── site-shell.ts   # Video autoplay, scroll effects, interaction handling
│   ├── styles/
│   │   └── global.css      # Tailwind theme, CSS variables, font config
│   └── types/              # TypeScript type definitions
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Commands

Run from the project root:

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro check` | Type-check the project |

---

## Pages & Routes

| Route | Source | Description |
|---|---|---|
| `/` | `pages/index.astro` | Homepage with hero, services overview, advantages |
| `/about` | `pages/about.astro` | About MESCo — expertise, process, certifications |
| `/values` | `pages/values.astro` | Company values |
| `/services` | `pages/services/index.astro` | All services listing |
| `/services/<slug>` | `pages/services/[...slug].astro` | Individual service detail pages |
| `/case-studies` | `pages/case-studies/index.astro` | Case studies listing |
| `/case-studies/<slug>` | `pages/case-studies/[...slug].astro` | Individual case study detail pages |
| `/projects` | `pages/projects/index.astro` | Projects listing |
| `/projects/<slug>` | `pages/projects/[...slug].astro` | Individual project detail pages |
| `/team` | `pages/team/index.astro` | Team members listing |
| `/team/<slug>` | `pages/team/[...slug].astro` | Individual team member profiles |
| `/industries` | `pages/industries.astro` | Industries served |
| `/contact` | `pages/contact.astro` | Contact form and FAQ |
| `/brand` | `pages/brand.astro` | Brand assets and guidelines |
| `/legal/<slug>` | `pages/legal/[...slug].astro` | Legal pages (privacy, terms, cookies) |
| `/thank-you` | `pages/thank-you.astro` | Form submission success (excluded from sitemap) |
| `/signature` | `pages/signature.astro` | Email signature generator (internal, noindex) |
| `/for-llms` | `pages/for-llms.astro` | LLM-friendly content page |
| `/llms.txt` | `pages/llms.txt.ts` | Plain-text content dump for LLM context |
| `/llms-full.txt` | `pages/llms-full.txt.ts` | Extended LLM content dump |
| `/search-index.json` | `pages/search-index.json.ts` | JSON search index for Fuse.js |
| `/robots.txt` | `pages/robots.txt.ts` | Robots file with sitemap reference |
| `/sitemap-index.xml` | Auto-generated | Sitemap (excludes /thank-you and /signature) |

---

## Content Collections

Content is managed via Astro Content Collections in `src/content/`. Each collection is a folder of Markdown files with a defined front matter schema.

The schema is defined in `src/content.config.ts`.

---

### `services` — `src/content/services/`

One file per service offering. Slug becomes the URL: `/services/<slug>`.

**Current services:** Project Start-Up, Project Familiarisation & Delivery Tools, Automated Engineering Systems & QA/QC Frameworks, HSE Systems, ISO Systems & Audit Support, Engineering Administration & Project Support, Short-Term Fill-Ins, Project Close-Out.

```yaml
---
featured: true                          # boolean (optional) — show on homepage/featured lists
title: Project Start-Up Services        # string — page title and card heading
description: >                          # string — full description (used in meta and page intro)
  Systems, registers and procedures...
excerpt: Move from blank page to...     # string (optional) — short card teaser
image:
  url: "/src/images/services/file.png"  # image path (Astro image processing)
  alt: "Alt text for the image"         # string
video: "https://example.com/video.mp4"  # string URL (optional) — hero video instead of image
highlights:                             # string[] (optional) — bullet points shown on cards
  - Management plans and project procedures
  - QA/QC frameworks
---

Page body content in Markdown...
```

---

### `projects` — `src/content/projects/`

One file per case study. Slug becomes the URL: `/case-studies/<slug>` and `/projects/<slug>`.

**Current projects:** Paraburdoo Airport Asphalt Overlay, BHT LME04 Diversion Road Construction, Northern Revetment Wall Rehabilitation.

```yaml
---
featured: true                          # boolean (optional)
title: Paraburdoo Airport Asphalt Overlay
description: >                          # string — meta description and intro
  On-site QA/QC engineering support...
client: DTI on behalf of Rio Tinto      # string (optional)
location: Paraburdoo, WA (Pilbara)      # string (optional)
year: 2024                              # number or string (optional)
duration: 6 months                      # string (optional)
scope: Asphalt overlay, QA/QC...        # string (optional)
category: Infrastructure & Transport    # string (optional) — used for filtering
services:                               # string[] (optional) — related service names
  - Project Start-Up Services
cover:
  url: "/src/images/folder/image.jpg"   # image path (Astro image processing)
  alt: "Alt text"
gallery:                                # array (optional) — additional images
  - url: "/src/images/folder/img2.jpg"
    alt: "Gallery image alt"
galleryDir: "/src/images/folder"        # string (optional) — auto-load all images from dir
metrics:                                # array (optional) — stat callouts on project page
  - label: "Duration"
    value: "6 months"
  - label: "Audit findings"
    value: "Zero"
---

Page body content in Markdown...
```

---

### `team` — `src/content/team/`

One file per team member. Slug becomes the URL: `/team/<slug>`.

**Current team:** Adrian McPhee, Kyriah McPhee.

```yaml
---
name: Adrian McPhee                     # string
role: Director, HSE & Compliance Systems  # string (optional)
bio: >                                  # string (optional) — short bio for cards
  A safety and operations professional...
image:
  url: "/src/images/team/adrian.png"    # image path (Astro image processing)
  alt: "Adrian McPhee — Director..."
socials:                                # array (optional) — links shown on profile
  - label: Email
    href: "mailto:adrian@mesco.au"
  - label: LinkedIn
    href: "https://linkedin.com/in/..."
birthday: "03-15"                       # string "MM-DD" (optional) — shows birthday hat on their page
hatX: 50                                # number (optional) — hat X position
hatY: 0                                 # number (optional) — hat Y position
hatRotate: 0                            # number (optional) — hat rotation
hatSize: 100                            # number (optional) — hat size
---

Full profile content in Markdown...
```

---

### `industries` — `src/content/industries/`

One file per industry. Rendered on the `/industries` page.

**Current industries:** Civil Construction, Infrastructure & Transport, Resources & Mining, Energy & Renewables, Government Projects.

```yaml
---
title: Civil Construction               # string
description: >                          # string — shown on industry cards
  Civil construction projects...
order: 1                                # number (optional) — sort order on the page
focus: >                                # string (optional) — "MESCo's focus" callout
  Translating specifications into...
typicalProjects: >                      # string (optional) — example project types
  Civil infrastructure works...
image:                                  # object (optional) — industry image
  url: "/src/images/assets/example.jpg"
  alt: "Description"
---
```

No page body is used for industries — all content is in front matter.

---

### `legal` — `src/content/legal/`

One file per legal page (`privacy.md`, `terms.md`, `cookies.md`). Rendered via `/legal/<slug>`.

```yaml
---
page: Privacy                           # string — page title
pubDate: 2026-02-27                     # date — last updated date (YYYY-MM-DD)
---

Full legal text in Markdown...
```

---

## Site Configuration

Central configuration lives in two files:

### `src/config/site.ts`

Controls core site settings used across pages and components:

```typescript
siteConfig = {
  url: "https://mesco.au",       // Site URL (used in sitemap, meta tags, canonical links)
  email: "kyriah@mesco.au",      // Primary contact email
  phone: "+61 431 308 396",      // Primary contact phone
  trailingSlash: false,          // URL style — no trailing slashes
}
```

If the domain changes, update the `url` here — it propagates everywhere automatically.

### `src/config/schema.ts`

Schema.org structured data (JSON-LD) for search engines. Defines the organization as a `ProfessionalService` with service descriptions, contact details, and operating hours (Mon–Fri, 08:00–17:00).

---

## Features

### Search

The site includes a **client-side search** powered by [Fuse.js](https://www.fusejs.io). A search icon in the navigation opens a modal where users can search across all services, projects, team members, and legal pages.

- The search index is generated at build time as `/search-index.json`
- Fuzzy matching with a threshold of 0.3 — users don't need to type exact titles
- Results display as cards with type labels, titles, descriptions, and metadata

### Email Signature Generator

An internal tool at `/signature` (not indexed by search engines) that generates formatted HTML email signatures for MESCo staff. Enter a name, title, email, and phone number to generate a signature that can be copied and pasted into email clients.

### LLM Content Endpoints

The site publishes its content in plain-text format for AI tools and large language models:

- `/llms.txt` — Summary of all content, organised by section
- `/llms-full.txt` — Full content of every page
- `/for-llms` — Human-readable page linking to the above

### Video Handling

Hero and footer sections support background video. The site intelligently handles autoplay:

- Respects `prefers-reduced-motion` user preferences
- Skips video on slow connections (2G/3G) or when data-saver is enabled
- Lazy-loads video sources for performance
- Retries playback on first user interaction if autoplay was blocked

### Brand & Style Guide

The site includes a comprehensive brand reference page at `/brand` for affiliates, designers, printing partners, and vehicle wrap suppliers. It covers:

- **Logo** — Primary logo shown on dark, light, and profile picture variants. Includes an animated SVG version used on the website.
- **Colour palette** — Primary brand colours (Brand Blue `#04203E`, Brand Gold `#BE9B48`, White, Black) plus full accent (blue) and base (neutral) scales with click-to-copy hex values.
- **Typography** — The site uses [Inter](https://fonts.google.com/specimen/Inter), a variable sans-serif. The brand page displays the full type scale from Text XS through Display 3XL.
- **Website elements** — Live previews of button and link components in all variants (Default, Accent, Muted) and sizes.
- **Downloadable assets** — All logo files organised into four categories:

| Category | Formats | Use case |
|---|---|---|
| Web Logos | SVG, PNG (transparent) | Digital, websites, overlays |
| Print Logos | PDF, AI, EPS (CMYK & RGB), PNG/JPG banners | Print, signage, vehicle wraps |
| Social & Profile | PNG, SVG, JPG | Profile pictures, social media avatars |
| Brand Guidelines | PDF | Complete brand guidelines document |

All assets are served from `public/brand/` and accessible at `/brand/<filename>`. The brand guidelines PDF can be downloaded directly at `/brand/brand-guidelines.pdf`.

All brand assets are copyright MESCo and require written permission to use.

### Interactive 404 Page

The custom 404 page (`public/404.html`) features an interactive space-themed asteroid game. Users can click flying asteroids to score points, with a combo multiplier system. The footer includes a link inviting visitors to check it out.

---

## Contact Form

The contact form is at `src/components/contact/Form.astro`.

**Form fields:**

| Field | Name | Type | Required |
|---|---|---|---|
| Name | `name` | text | Yes |
| Company | `company` | text | No |
| Role | `role` | text | No |
| Email | `email` | email | Yes |
| Phone | `phone` | tel | No |
| Project Stage | `project_stage` | select | No |
| Services of Interest | `services` | checkbox (multiple) | No |
| Preferred Contact Method | `preferred_contact` | radio | No |
| Project Summary / Enquiry | `message` | textarea | No |

**Form action:**

The form currently posts to Netlify Forms.

---

## Brand Assets

Brand assets (logos, PDFs, AI/EPS source files) are served statically from `public/brand/`. They are accessible at `/brand/<filename>` and linked from the brand reference page at `/brand`.

The full brand guidelines PDF is at `/brand/brand-guidelines.pdf`.

---

## Hosting Requirements

The site builds to fully static files in `./dist/`. It requires no server runtime, no database, and no Node.js in production.

**Minimum hosting requirements:**
- Static file hosting (Netlify, Cloudflare Pages, Vercel, AWS S3 + CloudFront, or any web host)
- HTTPS (required — form submissions and modern browser features depend on it)
- Ability to serve a custom 404 page (`dist/404.html`)
- No PHP, no server-side processing required

**Recommended:** Cloudflare Pages or Netlify — both support automatic builds from a Git repository, custom domains, and HTTPS out of the box.

**To deploy manually:**
1. Run `npm install` then `npm run build`
2. Upload the contents of `./dist/` to your host

**Sitemap:** Auto-generated at `/sitemap-index.xml` during build. The site URL is configured in `src/config/site.ts` — update the `url` field if the domain changes.

---

## How to Update Content (for non-developers)

You don't need to write code to update the website's content. Here's what to do for common tasks:

### Add a new service
1. Create a new `.md` file in `src/content/services/`
2. Copy the front matter structure from an existing service file
3. Fill in the title, description, image, and highlights
4. Write the page body in Markdown below the `---`
5. Build and deploy

### Add a new project / case study
1. Create a new `.md` file in `src/content/projects/`
2. Copy the front matter structure from an existing project file
3. Add project images to `src/images/projects/` (or a subfolder)
4. Fill in all the details — title, client, location, metrics, etc.
5. Write the page body in Markdown below the `---`
6. Build and deploy

### Add a new team member
1. Create a new `.md` file in `src/content/team/`
2. Add their portrait photo to `src/images/team/`
3. Fill in name, role, bio, image path, and social links
4. Write their full profile in Markdown below the `---`
5. Build and deploy

### Update legal pages
1. Edit the relevant file in `src/content/legal/` (privacy.md, terms.md, or cookies.md)
2. Update the `pubDate` in front matter to today's date
3. Build and deploy

### Update contact details
Edit `src/config/site.ts` to change the email address or phone number. These values are used across the site (footer, contact page, schema.org data).
