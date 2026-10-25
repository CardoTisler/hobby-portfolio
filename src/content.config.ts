import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['Woodworking', 'Renovation', 'Garden', 'Other']),
      thumbnail: image(),
      images: z.array(image()).optional(),
      beforeImage: image().optional(),
      afterImage: image().optional(),
      date: z.coerce.date().optional(),
      material: z.string().optional(),
      dimensions: z.string().optional(),
      finish: z.string().optional(),
      costs: z.array(z.object({
        item: z.string(),
        cost: z.number(),
      })).optional(),
      progress: z.array(z.object({
        leftTitle: z.string(),
        rightTitle: z.string(),
        description: z.string(),
        images: z.array(image()).optional(),
        imagesDir: z.string().optional(),
      }).refine(
        (step) => (step.images && step.images.length > 0) || step.imagesDir,
        { message: 'Each progress step must have either "images" or "imagesDir"' }
      )).optional(),
    }),
});

// Per-language overrides for a project's text, e.g. translations/et/coffee-table.md.
// Only text lives here; images, dates and prices always come from the English entry.
// Arrays are matched to the English entry by position. The Markdown body replaces the intro.
const translations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/translations' }),
  schema: z.object({
    title: z.string().optional(),
    material: z.string().optional(),
    dimensions: z.string().optional(),
    finish: z.string().optional(),
    costs: z.array(z.object({
      item: z.string().optional(),
    })).optional(),
    progress: z.array(z.object({
      leftTitle: z.string().optional(),
      rightTitle: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { projects, translations };
