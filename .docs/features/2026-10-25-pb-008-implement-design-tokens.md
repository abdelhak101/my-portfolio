# Feature PB-008 - Implement Design Tokens

## User Story
*As a developer and visitor, I want a consistent, semantic design token architecture for colors, typography, spacing, and radii across light and dark themes, so that the portfolio presents a cohesive Swiss-inspired minimalist editorial aesthetic with high contrast and accessibility.*

## Requirements
- **Core Functionality**:
  - Define monochrome color tokens with semantic naming for canvas backgrounds, surfaces, text hierarchy, and borders.
  - Support two-tier CSS variables (`--color-[token]-hsl` and `--color-[token]`) to enable Tailwind opacity modifier syntax (e.g., `bg-bg/80`).
  - Provide full theme adaptation for `:root` (light mode) and `.dark` (dark mode).
  - Define functional state tokens (`focus`, `success`, `warning`, `danger`, `info`) strictly for state feedback.
  - Define typography tokens with strict font family fallbacks (sans, serif display, mono, and Arabic fallbacks) and type scales.
  - Implement mixed-radius scale (`none`, `sm`, `md`, `lg`, `pill`) with standard UI elements adhering to `radius-md` and 1px borders rather than unnecessary box shadows.
  - Integrate Tailwind CSS v3 via `@astrojs/tailwind` without introducing third-party component libraries.
- **Edge Cases**:
  - CSS opacity values must compose reliably with HSL variables without syntax errors in modern browsers.
  - Absence of `.dark` class must cleanly fall back to `:root` light mode variables.
  - Custom font stacks must render gracefully using system fallbacks when custom web fonts are not yet locally loaded.
- **Constraints**:
  - No external UI component frameworks (strict adherence to project constitution).
  - Respect existing Tailwind / Astro standards documented in `.docs/DESIGN_SYSTEM.md` and `.docs/THEME_SYSTEM.md`.

## Open Questions
*All open questions resolved during brainstorming session.*

## Acceptance Criteria
- [x] Monochrome color tokens are defined across `:root` and `.dark`.
- [x] Semantic tokens support light and dark themes.
- [x] Typography tokens (font families and modular scale) are configured and documented.
- [x] Spacing and layout tokens are consistent.
- [x] Component radii follow the mixed-radius direction (`sm: 4px`, `md: 8px`, `lg: 12px`, `pill: 9999px`).
- [x] Borders are preferred over unnecessary shadows, subject to final approval.
- [x] Token names are semantic rather than tied only to visual appearance (e.g. `surface`, `border`, `text-muted` rather than `gray-100`).
- [x] Tailwind CSS configuration correctly integrates with Astro and exposes all semantic tokens.
- [x] Automated tests verify the presence and integrity of design tokens and Tailwind configuration.

## Technical Details
- **Dependencies**:
  - Add `@astrojs/tailwind` and `tailwindcss` as devDependencies.
- **Files Affected**:
  - `package.json`: Add `@astrojs/tailwind` and `tailwindcss`.
  - `astro.config.mjs`: Integrate `tailwind()`.
  - `tailwind.config.mjs`: Create configuration with custom theme extensions mapped to CSS custom variables.
  - `src/styles/globals.css`: Define base layer with `:root` and `.dark` design tokens.
  - `src/pages/index.astro`: Import `globals.css`.
  - `test/design-tokens.test.ts`: Automated tests validating token definitions.

## Implementation Plan
- [x] Step 1 - Install `@astrojs/tailwind` and `tailwindcss` dependencies.
- [x] Step 2 - Configure Astro integration in `astro.config.mjs`.
- [x] Step 3 - Create `tailwind.config.mjs` with semantic color mappings, typography, radii, and dark mode class strategy.
- [x] Step 4 - Create `src/styles/globals.css` with `@tailwind` directives and `:root` / `.dark` CSS custom properties.
- [x] Step 5 - Update `src/pages/index.astro` to include global stylesheet import and basic token rendering.
- [x] Step 6 - Add automated tests in `test/design-tokens.test.ts` to assert token definitions and theme availability.
- [x] Step 7 - Run type check (`pnpm check`), linting (`pnpm lint`), tests (`pnpm test`), and build (`pnpm build`).

**Checkpoints**
- [x] Verify Tailwind classes compile correctly during `pnpm build`.
- [x] Verify light and dark mode variables reflect accurately in unit tests.

## Implementation Workflow
*For each TODO above, the AI should:*
1. Show which files it plans to change.
2. Explain the approach.
3. Wait for approval.
4. Apply the change.
5. Run or update tests.

## Test Plan
- **Unit Tests**:
  - [ ] `test/design-tokens.test.ts`: Validate that `globals.css` contains all required color, typography, and radius custom properties for `:root` and `.dark`.
  - [ ] `test/design-tokens.test.ts`: Validate `tailwind.config.mjs` properly exports theme extensions and sets `darkMode: 'class'`.
- **Integration/E2E**:
  - [ ] Run `pnpm build` to verify that Tailwind CSS compiles into Astro static bundle without CSS syntax errors.
- **Manual Verification**:
  - [ ] Verify that background, text, borders, and rounded corners render properly when running `pnpm dev`.

## Decisions
- **Tailwind v3 via `@astrojs/tailwind`**: Chosen to strictly match existing project documentation in `.docs/THEME_SYSTEM.md`.
- **Two-tier HSL variables**: Enables alpha opacity modifiers (`bg-bg/80`) while retaining semantic CSS variable access.
- **Border-first hierarchy**: Shadows are minimized to floating elements only, prioritizing 1px subtle borders in keeping with minimalist editorial and Swiss-inspired design.
