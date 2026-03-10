import { defineCollection, z } from "astro:content";
const team = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      bio: z.string().optional(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      socials: z
        .array(
          z.object({
            label: z.string(),
            href: z.string(),
          })
        )
        .optional(),
    }),
});
const legal = defineCollection({
  schema: () =>
    z.object({
      page: z.string(),
      pubDate: z.date(),
    }),
});

const services = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      excerpt: z.string().optional(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      highlights: z.array(z.string()).optional(),
      featured: z.boolean().optional(),
      video: z.string().optional(),
    }),
});

const industries = defineCollection({
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      order: z.number().optional(),
      focus: z.string().optional(),
      typicalProjects: z.string().optional(),
    }),
});
const projects = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      client: z.string().optional(),
      location: z.string().optional(),
      year: z.union([z.number(), z.string()]).optional(),
      duration: z.string().optional(),
      scope: z.string().optional(),
      category: z.string().optional(),
      services: z.array(z.string()).optional(),
      cover: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      gallery: z
        .array(
          z.object({
            url: image(),
            alt: z.string(),
          })
        )
        .optional(),
      galleryDir: z.string().optional(),
      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          })
        )
        .optional(),
      featured: z.boolean().optional(),
    }),
});
export const collections = {
  team,
  legal,
  services,
  projects,
  industries,
};
