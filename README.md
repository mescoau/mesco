# MESCo Website

**McPhee Engineering Systems Co (MESCo)** — [mesco.au](https://mesco.au)

Custom website designed and built by **Josh Withers** of **[Unpopular](https://unpopular.au)**.
For technical questions, contact Josh Withers [josh@jwithers.co](mailto:josh@joshwithers.au).

---

## How this website works

This website is built with **Astro**, a modern static site framework. Understanding two tools is all you need to work on it: **Node.js** and **Astro**.

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

You do not need to understand Astro deeply to update content. The content collections (services, case studies, team, industries, legal) are all plain Markdown files with structured front matter — no code knowledge required to edit them.

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
| [Astro](https://astro.build) | Static site framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling (via Vite plugin) |
| [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) | Form element base styles |
| [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) | MDX support for content |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Auto-generated sitemap |
| [@astrolib/seo](https://github.com/onwidget/astrolib/tree/main/packages/seo) | SEO meta tags |

The site compiles to fully static HTML/CSS/JS — no server required, this is a static site.

---

## Project Structure

```
/
├── public/
│   ├── brand/          # Logo files and brand guidelines PDF (served at /brand/*)
│   └── *.mp4           # Background video assets (hero, footer, etc.)
│   └── favicons        # Browser favicon assets and default.jpg Opengraph image
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── assets/     # Logo, AnimatedLogo
│   │   ├── contact/    # Contact page sections
│   │   ├── fundations/ # Base elements (Button, Text, Kicker, Wrapper, icons)
│   │   ├── global/     # Navigation, Footer
│   │   └── landing/    # Homepage sections
│   ├── content/        # Content collections (see below)
│   ├── images/         # Images imported via Astro image processing
│   ├── layouts/        # Page layout wrappers
│   ├── pages/          # Routes (each file = a URL)
│   ├── styles/
│   │   └── global.css  # Tailwind theme, CSS variables, font config
│   └── types/          # TypeScript type definitions
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

## Content Collections

Content is managed via Astro Content Collections in `src/content/`. Each collection is a folder of Markdown files with a defined front matter schema.

The schema is defined in `src/content/config.ts`.

---

### `services` — `src/content/services/`

One file per service offering. Slug becomes the URL: `/services/<slug>`.

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
highlights:                             # string[] (optional) — bullet points shown on cards
  - Management plans and project procedures
  - QA/QC frameworks
---

Page body content in Markdown...
```

---

### `projects` — `src/content/projects/`

One file per case study. Slug becomes the URL: `/case-studies/<slug>`.

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

```yaml
---
name: Adrian McPhee                     # string
role: Director, HSE & Compliance Systems  # string (optional)
bio: >                                  # string (optional) — short bio for cards
  A safety and operations professional...
image:
  url: "/src/images/adrian.png"         # image path (Astro image processing)
  alt: "Adrian McPhee — Director..."
socials:                                # array (optional) — links shown on profile
  - label: Email
    href: "mailto:adrian@mesco.au"
  - label: LinkedIn
    href: "https://linkedin.com/in/..."
---

Full profile content in Markdown...
```

---

### `industries` — `src/content/industries/`

One file per industry. Rendered on the `/industries` page.

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

The form currently posts to:

```
https://forms-backend.withersco.workers.dev/api/forms/mesco
```

This is a Cloudflare Workers endpoint maintained by Josh Withers. It receives form submissions and forwards them to MESCo. If MESCo or a future administrator needs to change this — for example to use a different form backend, Formspree, or a self-hosted solution — update the `action` attribute on the `<form>` element in `src/components/contact/Form.astro`.

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

**Sitemap:** Auto-generated at `/sitemap-index.xml` during build. The site URL is configured in `astro.config.mjs` — update `site: "https://mesco.au"` if the domain changes.

---

## Architect

**Josh Withers**
[Unpopular](https://unpopular.au) — Perth, WA
[josh@unpopular.au](mailto:josh@unpopular.au)
[joshwithers.au](https://joshwithers.au)
