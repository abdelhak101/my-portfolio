# Feature PB-020 - Implement Bidirectional Layout Support

## User Story
*As a visitor viewing the portfolio in Arabic or English, I want the layout, navigation, cards, form controls, and technical text to follow natural bidirectional reading rules (RTL for Arabic, LTR for English), so that reading flows smoothly, mixed Latin code and numbers stay legible, and visual controls align logically.*

## Requirements

### Core Functionality
- **Document Direction**:
  - Arabic pages (`/ar`, `/ar/projects/:id`, `/ar/404`) use `dir="rtl"` and `lang="ar"`.
  - English pages (`/`, `/projects/:id`, `/404`) use `dir="ltr"` and `lang="en"`.
- **CSS Logical Properties**:
  - All spacing, insets, borders, and text alignment in UI components must use logical Tailwind properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, `text-end`).
  - No physical directional utilities (`pl-*`, `pr-*`, `ml-*`, `mr-*`, `left-*`, `right-*`, `text-left`, `text-right`).
- **Directional Navigation Mirroring**:
  - "Back to projects" arrow correctly mirrors according to reading direction (e.g. `inline-block rtl:rotate-180` or locale-specific arrow).
  - Outbound link indicators (`↗`) remain standard diagonal glyphs across both locales.
- **BiDi Isolation for Mixed Technical Text**:
  - Monospace code tokens, `<time>` dates, numbers, and hostnames are isolated (`unicode-bidi: isolate`, `dir="ltr"`) so Latin names (e.g. `TypeScript`, `Docker`) and dates don't flip surrounding punctuation.

### Edge Cases
- Mixed English/Arabic text in project titles, descriptions, and outcomes: isolates Latin strings naturally without breaking Arabic sentence structure.
- Search input: magnifying glass and clear button position correctly at inline-start and inline-end in both directions.
- Skip link: positions at `focus:start-4` regardless of document direction.

### Constraints
- Zero external UI libraries or runtime styling dependencies.
- Pure Tailwind CSS and Astro.
- 100% test pass rate across the Vitest suite.

## Open Questions
*None — all resolved in design session.*

## Acceptance Criteria
- [x] Arabic pages render with `dir="rtl"` and `lang="ar"`.
- [x] English pages render with `dir="ltr"` and `lang="en"`.
- [x] CSS logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) are used instead of physical directional classes.
- [x] Mixed Arabic and Latin technical text, dates, and code remain readable and directionally isolated.
- [x] Directional navigation arrows mirror correctly in RTL.
- [x] Dedicated unit test `tests/unit/theme/bidi-layout.test.ts` passes.
- [x] Full static build (`pnpm build`) succeeds cleanly.

## Technical Details

### Modified Files
- `src/styles/globals.css` — add `unicode-bidi: isolate` base styling.
- `src/components/project/ProjectDetail.astro` — mirror back navigation arrow, isolate `<time>` and URLs.
- `src/components/ui/ProjectCard.astro` — isolate `<time>` and monospace badges.

### New Files
- `tests/unit/theme/bidi-layout.test.ts` — static analysis audit for physical CSS classes and directional rules.

## Implementation Plan

- [x] **Step 1 — BiDi Isolation & Logical Styles in CSS** (`src/styles/globals.css`)
  - Add base layer isolation rules for code, monospace, and `[dir="ltr"]`.

- [x] **Step 2 — Directional Arrow & Technical Badge Adjustments** (`src/components/project/ProjectDetail.astro`, `src/components/ui/ProjectCard.astro`)
  - Update back-to-catalog arrow to mirror in RTL.
  - Add `dir="ltr"` and BiDi isolation to `<time>` dates and URLs.

- [x] **Step 3 — Bidirectional Layout Unit Test Suite** (`tests/unit/theme/bidi-layout.test.ts`)
  - Create test suite auditing templates for physical CSS classes and verifying document direction binding.

- [x] **Step 4 — Build & Test Verification**
  - Run `pnpm test`, `pnpm check`, and `pnpm build`.

**Checkpoints:**
- [x] Checkpoint 1 (After Step 3): `pnpm test` passes for new BiDi audit.
- [x] Checkpoint 2 (After Step 4): `pnpm check` and `pnpm build` pass with 12 static pages.

## Test Plan
- **Unit Tests (`bidi-layout.test.ts`):**
  - [x] Assert no physical CSS classes in any `.astro` component/page.
  - [x] Assert `BaseLayout.astro` correctly computes `dir="rtl"` / `dir="ltr"`.
  - [x] Assert `ProjectDetail.astro` handles RTL arrow orientation.
  - [x] Assert `globals.css` contains `unicode-bidi: isolate`.
- **Build Verification:**
  - [x] `pnpm check` produces 0 diagnostics.
  - [x] `pnpm build` successfully outputs static HTML.
