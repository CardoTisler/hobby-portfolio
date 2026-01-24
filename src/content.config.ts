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
      featured: z.boolean().default(false),
      date: z.coerce.date().optional(),
    }),
});

export const collections = { projects };
