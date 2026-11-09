# Feature PB-015 - Build Project Detail Pages

## User Story
*As a visitor, I want to view a dedicated detail page for any published project, so that I can inspect its complete architecture, technical role, evidence, outcomes, external links, and tech stack in my preferred language.*

## Requirements

### Core Functionality
- Dynamic routing for published projects:
  - English: `/projects/[id]`
  - Arabic: `/ar/projects/[id]`
- Display complete core metadata:
  - Title and summary in active language
  - Project types with localized labels
  - Date formatted with `<time>` element
  - Breadcrumb / back link to catalog (`/` or `/ar`)
- Conditional sections rendered only when relevant data is present:
  - Technical role (`role`)
  - Project cover visual (`cover`)
  - External links (`links`) with badges (`repo`, `demo`, `case-study`, etc.) and secure attributes (`rel="noopener noreferrer" target="_blank"`)
  - Quantified outcomes / metrics (`outcomes`)
  - Technologies & skills list (`skills`)
  - Related projects list (`relatedProjects`)
- Dynamic SEO & accessibility:
  - Page title: `<Project Title> | Portfolio`
  - Meta description matching project summary
  - Language switcher points directly to the reciprocal project detail page (`/ar/projects/:id` ↔ `/projects/:id`)
- Draft projects are excluded from static generation and return 404

### Edge Cases
- Project with no `role`, `cover`, `links`, `outcomes`, `skills`, or `relatedProjects`: renders gracefully without empty containers, broken images, or blank cards.
- Project with `relatedProjects` referencing non-existent or draft projects: filter out unresolved IDs gracefully.
- External links missing `type`: default to generic link styling without broken tag.

### Constraints
- Astro SSG static dynamic routes (`export async function getStaticPaths()`).
- No external UI libraries — Tailwind CSS + design tokens.
- Fully bilingual (English and Arabic with proper `dir="rtl"`).

## Open Questions
*None — all resolved during design session.*

## Acceptance Criteria
- [x] Each published project has a detail page in both English (`/projects/:id`) and Arabic (`/ar/projects/:id`).
- [x] Draft projects are excluded from static routes.
- [x] Page metadata (`title`, `description`) is dynamically generated from project content.
- [x] Language switcher in Header navigates to the reciprocal project page in the opposite language.
- [x] Optional sections (`role`, `cover`, `links`, `outcomes`, `skills`, `relatedProjects`) render only when data is present.
- [x] External links include secure attributes (`rel="noopener noreferrer"` and `target="_blank"`).
- [x] Technical explanations, metrics, and outcomes use clear hierarchy and design system tokens.
- [x] Unit and page integration tests pass with 100% success.
- [x] Astro build (`pnpm build`) succeeds generating all dynamic project pages.

## Technical Details

### New Files
- `src/components/project/ProjectDetail.astro` — reusable presentation component for project detail views
- `src/pages/projects/[id].astro` — English dynamic route entrypoint
- `src/pages/ar/projects/[id].astro` — Arabic dynamic route entrypoint
- `tests/unit/pages/project-detail.test.ts` — test suite for project detail routing, metadata, and conditional rendering

### Modified Files
- `src/components/common/Header.astro` — support custom `switchTarget` prop for reciprocal deep links
- `src/components/ui/ProjectCard.astro` — link project titles / cards to `/projects/${project.id}` or `/ar/projects/${project.id}`

## Implementation Plan

- [x] **Step 1 — Update Header component for custom switchTarget** (`src/components/common/Header.astro`)
  - Add optional `switchTarget?: string` to Props
  - Use `switchTarget` when provided, falling back to default root switch (`/` or `/ar`)

- [x] **Step 2 — Update ProjectCard to link to detail pages** (`src/components/ui/ProjectCard.astro`)
  - Update card title and image links to point to `/projects/${project.id}` (or `/ar/projects/${project.id}`)

- [x] **Step 3 — Create ProjectDetail presentation component** (`src/components/project/ProjectDetail.astro`)
  - Accept `project: Project`, `allProjects?: Project[]`, `lang?: 'en' | 'ar'`
  - Implement hero header, metadata strip, conditional links, media cover, outcomes grid, skills tags, and related projects

- [x] **Step 4 — Create English and Arabic dynamic detail pages** (`src/pages/projects/[id].astro`, `src/pages/ar/projects/[id].astro`)
  - Implement `getStaticPaths()` fetching published projects
  - Render `BaseLayout` with dynamic `title`, `description`, `lang`, `dir`
  - Pass reciprocal `switchTarget` to `Header`
  - Render `ProjectDetail`

- [x] **Step 5 — Add unit & page integration tests** (`tests/unit/pages/project-detail.test.ts`)
  - Test static path generation & published status filtering
  - Test dynamic SEO metadata propagation
  - Test conditional rendering for optional fields
  - Test reciprocal language switcher links

**Checkpoints:**
- [x] After Step 3: Component renders cleanly without type errors (`pnpm check`)
- [x] After Step 5: `pnpm test` passes with all tests green
- [x] Final: `pnpm build` generates all static routes successfully

## Implementation Workflow
*For each step above, the AI will:*
1. State which files it plans to change and the approach
2. Wait for approval
3. Apply the change
4. Run or update tests
5. Summarize files changed, behavior modified, and follow-up TODOs

## Test Plan
- **Unit Tests:**
  - [ ] `Header.astro` respects custom `switchTarget`
  - [ ] `ProjectDetail.astro` renders core metadata (title, summary, types, date)
  - [ ] `ProjectDetail.astro` conditionally renders optional sections
  - [ ] `ProjectDetail.astro` renders secure links with `rel="noopener noreferrer"`
- **Integration/Page Tests:**
  - [ ] `src/pages/projects/[id].astro` defines `getStaticPaths` filtering published projects
  - [ ] `src/pages/ar/projects/[id].astro` defines `getStaticPaths` with `lang="ar"` and `dir="rtl"`
  - [ ] Reciprocal language links verified across EN and AR detail pages
- **Build Verification:**
  - [ ] `pnpm check` produces 0 errors
  - [ ] `pnpm build` creates static routes for all 4 published projects in both languages

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Component architecture | Dedicated `ProjectDetail.astro` component | Eliminates code duplication between `src/pages/projects/[id].astro` and `src/pages/ar/projects/[id].astro` |
| Deep language switching | Reciprocal `switchTarget` prop on `Header.astro` | Allows visitors to switch language on a project detail page without getting kicked back to homepage |
| Card navigation | Link cards in `ProjectCard.astro` to detail route | Natural user expectation when clicking project cards on the catalog |
