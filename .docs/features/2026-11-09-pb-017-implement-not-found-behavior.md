# Feature PB-017 - Implement Not-Found Behavior

## User Story
*As a visitor who clicks an outdated link or enters an incorrect project URL, I want to see a clear, bilingual not-found error page with direct recovery links back to the portfolio and project catalog, so that I am never stuck at a dead end.*

## Requirements

### Core Functionality
- **Dedicated 404 Pages**:
  - Standard root 404 page: `src/pages/404.astro` (compiles to `/404.html` for static hosting).
  - Dedicated Arabic 404 page: `src/pages/ar/404.astro` (compiles to `/ar/404/index.html`).
- **Clear Recovery Navigation**:
  - Prominent primary button linking back to portfolio home (`/` or `/ar`).
  - Secondary link jumping directly to project catalogue (`/#projects` or `/ar#projects`).
  - Persistent Header with language switcher (`/404` ↔ `/ar/404`) and theme toggle.
- **Graceful Optional Content Degradation**:
  - Missing optional fields in published projects (`role`, `cover`, `links`, `limitations`, `outcomes`, `skills`, `relatedProjects`) render cleanly without throwing errors or displaying broken UI placeholders.
  - Non-existent or draft projects are excluded from static generation and route to 404.
- **Internal Cross-Reference Integrity**:
  - Content validation script (`scripts/validate-content.ts`) catches invalid `relatedProjects` and collection `projects` IDs during build.

### Edge Cases
- Visitor enters an invalid language prefix (e.g. `/fr/projects/foo`): routes to root `/404.html`.
- Visitor clicks language switcher on `/404`: redirects to `/ar/404`, and vice versa.

### Constraints
- Pure Astro SSG + Tailwind design tokens.
- Fully bilingual (English and Arabic with RTL).

## Open Questions
*None — all resolved during design session.*

## Acceptance Criteria
- [x] Unknown project routes and draft projects return the appropriate not-found response (`/404.html`).
- [x] The not-found page provides clear paths back to the portfolio home and project catalog.
- [x] Missing optional content in published projects renders gracefully without triggering 404 or broken UI.
- [x] Invalid internal cross-references are caught by the build-time validation process with non-zero exit code.
- [x] Bilingual support is implemented for 404 views in English and Arabic.
- [x] Unit and page integration tests pass with 100% success.
- [x] Static build (`pnpm build`) succeeds and produces `/404.html` and `/ar/404/index.html`.

## Technical Details

### New Files
- `src/components/common/NotFoundView.astro` — reusable error hero view
- `src/pages/404.astro` — English 404 page generating `/404.html`
- `src/pages/ar/404.astro` — Arabic 404 page generating `/ar/404/index.html`
- `tests/unit/pages/not-found.test.ts` — test suite for 404 routes and recovery links

### Modified Files
- `tests/unit/pages/project-detail.test.ts` — verify minimal project rendering vs. non-existent slug exclusion

## Implementation Plan

- [x] **Step 1 — Create Reusable NotFoundView Component** (`src/components/common/NotFoundView.astro`)
  - Status badge, localized heading, helpful description, and recovery action buttons (home & catalog links)

- [x] **Step 2 — Create English and Arabic 404 Pages** (`src/pages/404.astro`, `src/pages/ar/404.astro`)
  - Wrap with `BaseLayout` (`lang`, `dir`, `title`, `description`)
  - Render `Header` with reciprocal `switchTarget` (`/ar/404` ↔ `/404`)
  - Render `<NotFoundView lang={lang} />`

- [x] **Step 3 — Create 404 Test Suite** (`tests/unit/pages/not-found.test.ts`)
  - Test presence of both 404 pages
  - Test recovery action links (`/`, `/#projects`, `/ar`, `/ar#projects`)
  - Test reciprocal language switcher links

- [x] **Step 4 — Verify Missing Optional Content vs. Unknown Slugs** (`tests/unit/pages/project-detail.test.ts`)
  - Test that published projects with only required fields render without error
  - Test that non-existent IDs are strictly absent from `getStaticPaths()`

**Checkpoints:**
- [x] Checkpoint 1 (After Step 2): `pnpm check` passes with 0 errors
- [x] Checkpoint 2 (After Step 4): `pnpm test` passes with 100% success
- [x] Checkpoint 3 (Final): `pnpm build` creates `/404.html` and `/ar/404/index.html`

## Implementation Workflow
*For each step above, the AI will:*
1. State which files it plans to change and the approach
2. Wait for approval
3. Apply the change
4. Run or update tests
5. Summarize files changed, behavior modified, and follow-up TODOs

## Test Plan
- **Unit & Page Tests:**
  - [ ] `not-found.test.ts` — asserts 404 pages exist for EN and AR
  - [ ] `not-found.test.ts` — asserts recovery CTAs to home and catalogue
  - [ ] `not-found.test.ts` — asserts reciprocal language switcher
  - [ ] `project-detail.test.ts` — asserts missing optional content does not break detail rendering
  - [ ] `cross-references.test.ts` — validates all reference integrity checks
- **Build Verification:**
  - [ ] `pnpm check` produces 0 errors
  - [ ] `pnpm validate:content` succeeds
  - [ ] `pnpm build` outputs `/404.html` and `/ar/404/index.html`

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| 404 page architecture | Dedicated `src/pages/404.astro` + `src/pages/ar/404.astro` | Guarantees standard `/404.html` for static hosting + native RTL Arabic experience |
| Component reuse | `NotFoundView.astro` | Eliminates markup duplication across English and Arabic 404 pages |
| Distinction handling | Schema optionality + dynamic route filtering | Clear separation: missing fields degrade visually, missing projects route to 404 |
