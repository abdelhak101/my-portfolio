# Feature PB-022 - Build Collection Pages

## User Story
*As a visitor interested in specific engineering focus areas or thematic case studies, I want to view dedicated collection pages that showcase thematically grouped projects with canonical details, bidirectional navigation, and language switching, so that I can explore focused subsets of work with full context.*

## Requirements

### Core Functionality
- **Dedicated Collection Routes**:
  - English: `/collections/:id` via `src/pages/collections/[id].astro`
  - Arabic: `/ar/collections/:id` via `src/pages/ar/collections/[id].astro`
- **Canonical Project Content**:
  - Configured projects are resolved in order using `resolveCollection()` from `src/content/queries/collections.ts`.
  - Only published projects are rendered; draft projects are gracefully omitted.
  - Project cards reuse canonical `<ProjectCard />` components.
- **Navigation & Links**:
  - The page displays a back link to the full portfolio (`/` for English, `/ar` for Arabic).
  - Navigational arrows mirror in RTL (`rtl:rotate-180`).
  - Landing page collection previews link to their respective collection pages.
- **Language Support**:
  - Language switch link preserves the equivalent collection page (`/collections/:id` ↔ `/ar/collections/:id`).
  - Document direction is `dir="rtl"` for Arabic and `dir="ltr"` for English.
- **Not-Found Behavior**:
  - Unknown collection identifiers return Astro's static 404 response (`/404` or `/ar/404`).

### Edge Cases
- Empty or draft-only collections: renders an accessible empty-state placeholder message.
- Missing translations in collection summary/title: falls back cleanly to English content.
- Collections with missing project IDs: filtered gracefully without breaking page generation.

### Constraints
- Zero external UI libraries.
- Pure Tailwind CSS and Astro scoped styling.
- 100% test coverage for pure utilities and template integration.

## Open Questions
*None — all resolved during design session.*

## Acceptance Criteria
- [x] A collection route resolves from its stable identifier (`/collections/:id` and `/ar/collections/:id`).
- [x] The page displays its configured projects in specified order.
- [x] Collection project details come from canonical project content via `resolveCollection()`.
- [x] The page links to the full portfolio with bidirectional back navigation.
- [x] The collection supports approved language switching (`/collections/:id` ↔ `/ar/collections/:id`).
- [x] Unknown collection identifiers return the appropriate 404 response.
- [x] All unit and integration tests pass (`pnpm test`).
- [x] Full static build succeeds and generates 16 HTML pages (`pnpm build`).

## Technical Details

### New Files
- `src/components/collection/CollectionDetail.astro` — collection detail view component.
- `src/pages/collections/[id].astro` — English collection page route.
- `src/pages/ar/collections/[id].astro` — Arabic collection page route.
- `tests/unit/pages/collection-detail.test.ts` — test suite for collection pages.

### Modified Files
- `src/content/queries/collections.ts` — allow optional graceful filtering of unpublished projects.
- `src/components/landing/CollectionSection.astro` — link collection cards to dedicated collection pages.

## Implementation Plan

- [x] **Step 1 — Update Collection Resolution Logic** (`src/content/queries/collections.ts`, `tests/unit/content/collection-resolver.test.ts`)
  - Support graceful skipping of missing or unpublished projects when requested.

- [x] **Step 2 — Create Collection Detail View Component** (`src/components/collection/CollectionDetail.astro`)
  - Build the presentation component with header, back links, RTL mirrored arrow, project grid, and empty state.

- [x] **Step 3 — Create Static Collection Page Routes** (`src/pages/collections/[id].astro`, `src/pages/ar/collections/[id].astro`)
  - Wire `getStaticPaths` with `getCollection('collections')` and `getCollection('projects')`.

- [x] **Step 4 — Link Landing Page Collections to Detail Routes** (`src/components/landing/CollectionSection.astro`)
  - Add navigation links from home page collection cards to `/collections/:id` and `/ar/collections/:id`.

- [x] **Step 5 — Add Unit & Integration Tests & Verify Build** (`tests/unit/pages/collection-detail.test.ts`)
  - Add tests for collection routes, back links, bidirectional mirroring, and run `pnpm test`, `pnpm check`, `pnpm build`.

**Checkpoints:**
- [x] Checkpoint 1 (After Step 3): Collection pages generate static HTML routes.
- [x] Checkpoint 2 (After Step 5): `pnpm test` passes 100% and `pnpm build` outputs 16 static pages.

## Test Plan
- **Unit Tests (`collection-detail.test.ts`, `collection-resolver.test.ts`):**
  - [x] `resolveCollection` resolves canonical projects and skips missing/draft gracefully when configured.
  - [x] `CollectionDetail.astro` contains back-link to catalog and mirrored arrow (`rtl:rotate-180`).
  - [x] `CollectionDetail.astro` renders canonical `<ProjectCard />` components.
  - [x] `[id].astro` routes generate static paths for all published collections.
- **Build Verification:**
  - [x] `pnpm check` produces 0 diagnostics.
  - [x] `pnpm build` builds 16 static pages cleanly.
