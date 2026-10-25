import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { collectionSchema } from './content/schemas/collection';
import { projectSchema } from './content/schemas/project';

export * from './content/schemas/collection';
export * from './content/schemas/project';

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
    schema: projectSchema,
  }),
  collections: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/collections' }),
    schema: collectionSchema,
  }),
};
