# Design: PB-004 Define Project Content Schema

## 1. Problem Statement & Context
The portfolio requires a structured, type-safe content model for projects to support:
- Stable unique project identification independent of localized titles.
- First-class bilingual content (`en` and `ar`).
- Multiple project types (`software`, `design`, `ui-ux`, `automation`, `ai`, `other`).
- Flexible metadata (skills, dates, cover images, external evidence links, role, and outcomes).
- Early build-time failure with actionable error messages when content is malformed.

This design implements the content schema in `src/content.config.ts` using Astro 5 Content Collections and Zod.

---

## 2. Technical Decisions & Trade-offs

- **Storage Format**: Individual JSON files under `src/content/projects/<id>.json`. This decouples structured project metadata from long-form case studies and enables clean JSON schema validation.
- **Unified Localization**: A single project file holds both English and Arabic translations for translatable fields (`title`, `summary`, `cover.alt`, `link.label`, `role`, and `outcomes`). Shared attributes (status, tags, dates, URLs) are defined once to eliminate duplicate data.
- **Astro 5 Loader API**: Using `glob({ pattern: '**/*.json', base: './src/content/projects' })` in `src/content.config.ts`.
- **Validation Strictness**:
  - Required fields: `id`, `status`, `title` (en & ar), `summary` (en & ar), and non-empty `types`.
  - Optional fields: `role`, `skills`, `date`, `cover`, `links`, and `outcomes`.
  - Actionable error messages attached to each Zod rule.

---

## 3. Schema Architecture & Data Shapes

### Localization Helper
```typescript
export const localizedStringSchema = z.object({
  en: z.string().min(1, 'English text is required'),
  ar: z.string().min(1, 'Arabic text is required'),
});
```

### Taxonomy & Supporting Types
```typescript
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
  type: z.enum(['repo', 'demo', 'test', 'case-study', 'review', 'other']).optional(),
});

export const projectOutcomeSchema = z.object({
  metric: z.string().optional(),
  description: localizedStringSchema,
});
```

### Main Project Schema
```typescript
export const projectSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'ID must be kebab-case lowercase alphanumeric'),
  status: z.enum(['draft', 'published']),
  title: localizedStringSchema,
  summary: localizedStringSchema,
  types: z.array(projectTypeEnum).min(1, 'At least one project type is required'),
  role: localizedStringSchema.partial().optional(),
  skills: z.array(z.string().min(1)).default([]),
  date: z
    .string()
    .regex(/^\d{4}(-\d{2})?(-\d{2})?$/, 'Date must be YYYY, YYYY-MM, or YYYY-MM-DD')
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
```

### Astro Content Collection Export
```typescript
export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
    schema: projectSchema,
  }),
};
```

---

## 4. Verification & Testing Plan

1. **Unit Tests (`tests/unit/content/project-schema.test.ts`)**:
   - Validate full valid project object passes.
   - Validate minimal project object passes with defaults (`skills: []`, `links: []`, `outcomes: []`).
   - Validate invalid IDs (uppercase, spaces, special symbols) produce expected errors.
   - Validate missing Arabic or English strings in `title`/`summary` fail.
   - Validate invalid URLs in `links` fail.
   - Validate empty `types` array or unknown types fail.
   - Validate valid dates (`2024`, `2024-05`, `2024-05-18`) pass and invalid dates fail.
2. **Build and Typecheck**:
   - Run `pnpm check` and `pnpm build` to confirm Astro processes the schema and collections without diagnostic errors.
