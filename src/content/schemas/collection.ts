import { z } from 'astro/zod';
import { localizedStringSchema } from './project';

const idRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const collectionSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .regex(idRegex, 'ID must be kebab-case lowercase alphanumeric'),
    status: z.enum(['draft', 'published']),
    title: localizedStringSchema,
    summary: localizedStringSchema,
    projects: z
      .array(
        z
          .string()
          .min(1)
          .regex(
            idRegex,
            'Project ID must be kebab-case lowercase alphanumeric'
          )
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().int().optional(),
    cover: z
      .object({
        src: z.string().min(1),
        alt: localizedStringSchema,
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();
    for (const pid of data.projects) {
      if (seen.has(pid)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate project ID detected: "${pid}"`,
          path: ['projects'],
        });
      }
      seen.add(pid);
    }
  });

export type Collection = z.infer<typeof collectionSchema>;
