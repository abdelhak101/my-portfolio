import { z } from 'astro/zod';

export const localizedStringSchema = z.object({
  en: z.string().min(1, 'English text is required'),
  ar: z.string().min(1, 'Arabic text is required'),
});

export const projectTypeEnum = z.enum([
  'software',
  'design',
  'ui-ux',
  'automation',
  'ai',
  'other',
]);

export const projectLinkSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  label: localizedStringSchema,
  type: z
    .enum(['repo', 'demo', 'test', 'case-study', 'review', 'other'])
    .optional(),
});

export const projectOutcomeSchema = z.object({
  metric: z.string().optional(),
  description: localizedStringSchema,
});

export const projectSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'ID must be kebab-case lowercase alphanumeric'
    ),
  status: z.enum(['draft', 'published']),
  title: localizedStringSchema,
  summary: localizedStringSchema,
  types: z
    .array(projectTypeEnum)
    .min(1, 'At least one project type is required'),
  role: localizedStringSchema.partial().optional(),
  skills: z.array(z.string().min(1)).default([]),
  date: z
    .string()
    .regex(
      /^\d{4}(-\d{2})?(-\d{2})?$/,
      'Date must be YYYY, YYYY-MM, or YYYY-MM-DD'
    )
    .optional(),
  cover: z
    .object({
      src: z.string().min(1),
      alt: localizedStringSchema,
    })
    .optional(),
  links: z.array(projectLinkSchema).default([]),
  outcomes: z.array(projectOutcomeSchema).default([]),
});

export type Project = z.infer<typeof projectSchema>;
export type LocalizedString = z.infer<typeof localizedStringSchema>;
export type ProjectType = z.infer<typeof projectTypeEnum>;
export type ProjectLink = z.infer<typeof projectLinkSchema>;
export type ProjectOutcome = z.infer<typeof projectOutcomeSchema>;
