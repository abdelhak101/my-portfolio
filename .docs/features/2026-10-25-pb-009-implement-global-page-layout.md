# Feature PB-009 - Implement Global Page Layout

## User Story
*As a visitor and keyboard user, I want a responsive, accessible global page layout with a consistent header, navigation, main container, skip link, and footer, supporting both English (LTR) and Arabic (RTL), so that I can easily navigate and read portfolio content across any device.*

## Requirements
- **Core Functionality**:
  - Implement a reusable `BaseLayout.astro` layout component providing the global HTML document structure, metadata, and theme styling.
  - Implement a `SkipLink.astro` component targeting `#main-content`, visually hidden until focused, positioned with logical CSS coordinates.
  - Implement a `Header.astro` component with brand link and semantic `<nav aria-label="Main navigation">` containing labeled navigation items.
  - Implement a `Footer.astro` component containing copyright, attribution, and evidence statements.
  - Enforce consistent layout constraints: maximum content width of `1200px` (`max-w-[1200px]`) and responsive horizontal gutters (`px-5 sm:px-10`).
  - Provide bidirectional support via `lang` and `dir` props on `BaseLayout.astro`, defaulting `lang="ar"` to `dir="rtl"` and `lang="en"` to `dir="ltr"`.
  - Refactor `src/pages/index.astro` to use `BaseLayout.astro`.
- **Edge Cases**:
  - If a user passes an explicit `dir` overriding `lang` (e.g. `lang="ar" dir="ltr"` for code samples), respect the explicit `dir`.
  - Ensure main container is keyboard accessible (`tabindex="-1"`) when focused via the skip link.
- **Constraints**:
  - Pure Astro, Tailwind CSS, and scoped styles (no external UI component libraries).
  - Use logical CSS properties (`start`, `end`, `ms`, `me`) to avoid asymmetrical RTL breakages.

## Open Questions
*All open questions resolved during brainstorming session.*

## Acceptance Criteria
- [x] Shared header and footer are available.
- [x] Page content uses a consistent responsive container (`max-w-[1200px]`, `px-5 sm:px-10`).
- [x] Navigation links have meaningful labels and accessible names.
- [x] Keyboard users can reach all navigation controls with visible focus rings.
- [x] A skip link or equivalent mechanism is available targeting `#main-content`.
- [x] The layout supports both right-to-left and left-to-right content with automatic direction derivation.
- [x] Automated tests verify layout structure, landmarks, accessibility attributes, and bidirectional direction handling.

## Technical Details
- **New Components & Files**:
  - `src/components/common/SkipLink.astro`
  - `src/components/common/Header.astro`
  - `src/components/common/Footer.astro`
  - `src/layouts/BaseLayout.astro`
  - `src/pages/index.astro` (refactored to use BaseLayout)
  - `tests/unit/layout/base-layout.test.ts` (test suite)

## Implementation Plan
- [x] Step 1 - Create `src/components/common/SkipLink.astro`.
- [x] Step 2 - Create `src/components/common/Header.astro`.
- [x] Step 3 - Create `src/components/common/Footer.astro`.
- [x] Step 4 - Create `src/layouts/BaseLayout.astro`.
- [x] Step 5 - Update `src/pages/index.astro` to use `BaseLayout`.
- [x] Step 6 - Add automated unit tests in `tests/unit/layout/base-layout.test.ts`.
- [x] Step 7 - Run type check (`pnpm check`), linting (`pnpm lint`), tests (`pnpm test`), and build (`pnpm build`).

**Checkpoints**
- [x] Verify keyboard accessibility and focus styles on navigation and skip link.
- [x] Verify static build succeeds and generates clean HTML with landmarks.

## Implementation Workflow
*For each TODO above, the AI should:*
1. Show which files it plans to change.
2. Explain the approach.
3. Wait for approval.
4. Apply the change.
5. Run or update tests.

## Test Plan
- **Unit Tests**:
  - [ ] `tests/unit/layout/base-layout.test.ts`: Verify `SkipLink.astro` contains `href="#main-content"` and screen reader focus classes.
  - [ ] `tests/unit/layout/base-layout.test.ts`: Verify `Header.astro` contains `<header>`, `<nav>`, and labeled links.
  - [ ] `tests/unit/layout/base-layout.test.ts`: Verify `Footer.astro` contains `<footer>` and responsive container.
  - [ ] `tests/unit/layout/base-layout.test.ts`: Verify `BaseLayout.astro` renders document shell, derives `dir="rtl"` for `lang="ar"`, and includes main container.
- **Integration/E2E**:
  - [ ] Run `pnpm build` to verify clean static site generation for `index.html`.
- **Manual Verification**:
  - [ ] Test tab-key navigation from skip link through header links.

## Decisions
- **Separate sub-components (`Header`, `Footer`, `SkipLink`)**: Enables modular maintenance, isolated unit testing, and reuse in specialized layouts (e.g., bare presentation or embed layouts) if needed.
- **Auto direction derivation**: `lang="ar"` automatically sets `dir="rtl"`, avoiding manual boilerplate in page routes while still allowing an explicit `dir` prop override.
- **Tailwind logical classes**: Using `start-4`, `end-4`, and flex `gap-` maintains symmetrical balance across LTR and RTL.
