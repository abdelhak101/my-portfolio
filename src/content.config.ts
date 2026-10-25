import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './content/schemas/project';

export * from './content/schemas/project';

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
    schema: projectSchema,
  }),
};
