# Feature PB-018 - Decide and Implement Localized Routing

## User Story
*As a global visitor or search engine crawler, I want clear, unambiguous, and localized URL structures with proper canonical and hreflang metadata, so that I can reliably navigate between English and Arabic versions of any page and access correct localized content.*

## Requirements

### Core Functionality
- **Standardized URL Structure**:
  - English (default prefix-less): `/`, `/projects/:id`, `/404`
  - Arabic (`/ar` subpath prefix): `/ar`, `/ar/projects/:id`, `/ar/404`
- **Pure Localization Utilities** (`src/utils/i18n.ts`):
  - `localizePath(path: string, lang: 'en' | 'ar'): string`
  - `getAlternatePath(currentPath: string, targetLang: 'en' | 'ar'): string`
  - `getCanonicalUrl(pathname: string, siteUrl?: string): string`
  - `getHreflangLinks(pathname: string, siteUrl?: string): Array<{ lang: string; url: string }>`
- **SEO & Canonical Metadata** (`src/layouts/BaseLayout.astro`):
  - Canonical URL (`<link rel="canonical" href="...">`)
  - Reciprocal alternate links for `en`, `ar`, and `x-default` (`<link rel="alternate" hreflang="..." href="...">`)
- **Site Configuration** (`astro.config.mjs`):
  - Set canonical site base: `site: 'https://portfolio.dev'`
- **Documentation**:
  - Formally document the localized URL strategy and rules in `.docs/ARCHITECTURE.md` and `.docs/STANDARDS.md`.

### Edge Cases
- Root path handling: `localizePath('/', 'ar')` returns `'/ar'`, while `localizePath('/', 'en')` returns `'/'`.
- Redundant slashes or already prefixed paths: handles cleanly without creating `//` or `/ar/ar/`.
- Trailing slashes: normalized consistently across canonical URLs.

### Constraints
- Pure Astro SSG without external runtime dependencies.
- Fully bilingual (English and Arabic with proper `dir` attributes).
- 100% test coverage for pure utilities and layout metadata.

## Open Questions
*None — all resolved during design session.*

## Acceptance Criteria
- [x] The URL strategy is documented in `.docs/ARCHITECTURE.md` and `.docs/STANDARDS.md`.
- [x] Localized pages have unambiguous routes (prefix-less for English, `/ar` for Arabic).
- [x] Internal links use the correct language using pure `i18n` utilities.
- [x] Language metadata (`lang` and `dir`) is strictly applied to each localized page.
- [x] Canonical and alternate-language metadata (`rel="canonical"` and `rel="alternate" hreflang`) follow the approved strategy in `BaseLayout.astro`.
- [x] All unit and layout integration tests pass.
- [x] Full static build (`pnpm build`) succeeds.

## Technical Details

### New Files
- `src/utils/i18n.ts` — pure localization and canonical link helpers
- `tests/unit/utils/i18n.test.ts` — unit test suite for routing and hreflang helpers

### Modified Files
- `astro.config.mjs` — add canonical `site` property
- `src/layouts/BaseLayout.astro` — inject canonical and hreflang tags into `<head>`
- `.docs/ARCHITECTURE.md` — document the localized routing strategy
- `.docs/STANDARDS.md` — update SEO standards with hreflang guidelines
- `tests/unit/layout/base-layout.test.ts` — add tests for canonical and alternate link tags

## Implementation Plan

- [x] **Step 1 — Document Localized Routing Strategy** (`.docs/ARCHITECTURE.md`, `.docs/STANDARDS.md`)
  - Document the symmetrical URL strategy, route matrix, and canonical rules

- [x] **Step 2 — Implement i18n Routing Utilities** (`src/utils/i18n.ts`)
  - Implement `localizePath`, `getAlternatePath`, `getCanonicalUrl`, and `getHreflangLinks`

- [x] **Step 3 — Add Unit Tests for i18n Utilities** (`tests/unit/utils/i18n.test.ts`)
  - Test route normalization, prefixes, reciprocal switching, and hreflang generation

- [x] **Step 4 — Update astro.config.mjs and BaseLayout with Canonical & Hreflang Metadata** (`astro.config.mjs`, `src/layouts/BaseLayout.astro`)
  - Set `site: 'https://portfolio.dev'` in `astro.config.mjs`
  - Render canonical and hreflang alternate links in `BaseLayout.astro`

- [x] **Step 5 — Update Layout Test Suite & Verify Full Build** (`tests/unit/layout/base-layout.test.ts`)
  - Assert canonical and alternate tags are rendered in `BaseLayout`
  - Verify `pnpm check`, `pnpm test`, and `pnpm build`

**Checkpoints:**
- [x] Checkpoint 1 (After Step 3): `pnpm test` passes for i18n utilities
- [x] Checkpoint 2 (After Step 5): `pnpm test` passes 100% and `pnpm build` generates all static HTML pages with canonical tags

## Implementation Workflow
*For each step above, the AI will:*
1. State which files it plans to change and the approach
2. Wait for approval
3. Apply the change
4. Run or update tests
5. Summarize files changed, behavior modified, and follow-up TODOs

## Test Plan
- **Unit Tests:**
  - [ ] `i18n.test.ts` — `localizePath` handles root, nested, and edge cases
  - [ ] `i18n.test.ts` — `getAlternatePath` reciprocates between EN and AR
  - [ ] `i18n.test.ts` — `getHreflangLinks` produces `en`, `ar`, and `x-default`
  - [ ] `base-layout.test.ts` — verifies canonical link in `<head>`
  - [ ] `base-layout.test.ts` — verifies hreflang alternate links in `<head>`
- **Build Verification:**
  - [ ] `pnpm check` produces 0 errors
  - [ ] `pnpm build` generates static HTML with canonical metadata

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Routing structure | Default prefix-less English + `/ar` prefix for Arabic | Matches existing route architecture with zero breaking changes |
| SEO implementation | Canonical + Hreflang in `BaseLayout.astro` | Ensures complete Google/WCAG search engine indexing parity |
| Utility approach | Pure standalone functions in `src/utils/i18n.ts` | Testable in Vitest without Astro server runtime dependencies |
