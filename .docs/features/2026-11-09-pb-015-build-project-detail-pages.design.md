# PB-015: Build Project Detail Pages — Design

**Date:** 2026-11-09
**Status:** Validated
**Feature:** Dedicated detail pages for each published project with rich metadata, action links, and conditional evidence sections.

---

## Decisions

| Question | Decision | Rationale |
|---|---|---|
| Routing structure | Static dynamic routes (`/projects/[id].astro` and `/ar/projects/[id].astro`) | Matches current bilingual routing architecture; fully SSG compatible |
| Page content layout | Hero header + metadata strip + action bar + media + outcomes + skills + related projects | Clear evidence-driven structure; readable hierarchy |
| Links rendering | Semantic action buttons/links with type badges and secure external link attributes | Clear call-to-actions with explicit security (`rel="noopener noreferrer"`) |
| Optional data handling | Strict conditional rendering with visual degradation | Eliminates broken UI, empty boxes, or redundant placeholders |
| SEO & Language Switching | Dynamic `BaseLayout` metadata + route-aware `switchTarget` | Accurate title/description tags and smooth bilingual detail navigation |

---

## Section 1: Architecture & Route Handling

### Dynamic Routes
- `src/pages/projects/[id].astro` (English)
- `src/pages/ar/projects/[id].astro` (Arabic)

### `getStaticPaths` Contract
- Query published projects via `getCollection('projects', ({ data }) => data.status === 'published')`.
- Map entries into params:
  ```ts
  return projects.map((entry) => ({
    params: { id: entry.id },
    props: { project: entry.data, allProjects: projects.map(p => p.data) }
  }));
  ```
- Excludes draft projects to avoid generating unreleased pages (yielding 404).

### Header & Language Switcher
- `Header.astro` supports an optional `switchTarget` prop to override default `/` or `/ar` root targets.
- Detail pages pass reciprocal target:
  - EN page passes `/ar/projects/${project.id}`
  - AR page passes `/projects/${project.id}`

### Page Metadata
`BaseLayout` receives:
- `title`: `${project.title[lang]} | Portfolio`
- `description`: `project.summary[lang]`
- `lang`: `'en'` or `'ar'`
- `dir`: `'ltr'` or `'rtl'`

---

## Section 2: Page Layout & Component Structure

### Page Sections
1. **Back Navigation & Breadcrumb:**
   - Link back to catalog: `← Back to projects` (EN) / `← العودة إلى المشاريع` (AR)
2. **Hero Header:**
   - Title: `project.title[lang]`
   - Summary: `project.summary[lang]`
   - Metadata strip:
     - Types badges: localized pills (e.g., Software, AI)
     - Date: `<time datetime={project.date}>` formatted
     - Role: `project.role[lang]` (rendered conditionally)
3. **Action Links Bar (Conditional):**
   - Rendered only if `project.links.length > 0`
   - External links with `target="_blank" rel="noopener noreferrer"`
   - Type tags (`repo`, `demo`, `case-study`, etc.)
4. **Media Showcase (Conditional):**
   - Rendered only if `project.cover` exists
   - Responsive `<img>` with localized `alt` attribute
5. **Key Outcomes & Metrics (Conditional):**
   - Rendered only if `project.outcomes.length > 0`
   - Metric callout card with numerical or qualitative badges and localized text
6. **Technologies & Skills (Conditional):**
   - Rendered only if `project.skills.length > 0`
   - Pill list using design system tokens
7. **Related Projects (Conditional):**
   - Rendered only if `project.relatedProjects.length > 0`
   - Cards resolved from `allProjects`

---

## Section 3: Testing Strategy

### `tests/unit/pages/project-detail.test.ts`
- Verifies existence of both `src/pages/projects/[id].astro` and `src/pages/ar/projects/[id].astro`.
- Verifies `getStaticPaths` filters for published projects only.
- Verifies dynamic SEO metadata (`title`, `description`, `lang`, `dir`) passed to `BaseLayout`.
- Verifies conditional rendering patterns for optional fields (`role`, `cover`, `links`, `outcomes`, `skills`, `relatedProjects`).
- Verifies security attributes (`rel="noopener noreferrer"`) on external links.
- Verifies reciprocal `switchTarget` is passed to `Header`.

### Build Verification
- Full test suite passes (`pnpm test`).
- Type check passes (`pnpm check`).
- Production build generates all static pages with zero errors (`pnpm build`).
