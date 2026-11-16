# Feature PB-019 - Implement Language Selection

## User Story
*As a portfolio visitor, I want to switch between English and Arabic using a header link that takes me to the equivalent page in the other language, so that I can read content in my preferred language without losing my place.*

## Requirements

### Core Functionality
- **Language switch link in `Header`**: The header renders an `<a>` link that navigates to the exact equivalent page in the alternate language (e.g. `/projects/portfolio` ↔ `/ar/projects/portfolio`).
- **Equivalent-page routing**: The switch target is computed at build time using `getAlternatePath(pathname, targetLang)` from `src/utils/i18n.ts`.
- **Automatic wiring in `BaseLayout`**: `BaseLayout.astro` derives `switchTarget` from `Astro.url.pathname` and the `lang` prop, then passes `lang` and `switchTarget` to `<Header />`. Individual pages require no changes.

### Edge Cases
- **Root path**: `/` → switch → `/ar`; `/ar` → switch → `/`.
- **404 pages**: `/404` → `/ar/404`; `/ar/404` → `/404`.
- **Trailing slashes / double prefixes**: handled cleanly by `normalizePath` and `stripLangPrefix` in `i18n.ts` (already tested).
- **Missing Arabic translation**: Arabic project pages render English content silently — no banner, no redirect. This is already the case in the SSG build.

### Constraints
- Pure Astro SSG — no server-side `Accept-Language` detection.
- No `localStorage` or cookie persistence — URL is the sole source of truth.
- No auto-redirect on first visit — visitors start on English at `/` always.
- No new packages or external dependencies.
- No changes to individual page files (`index.astro`, `ar/index.astro`, `projects/[id].astro`, etc.).

## Open Questions
*None — all resolved during design session.*

## Acceptance Criteria
- [x] Visiting `/projects/portfolio` and clicking the language link navigates to `/ar/projects/portfolio`.
- [x] Visiting `/ar/projects/portfolio` and clicking the language link navigates to `/projects/portfolio`.
- [x] Visiting `/` and clicking the language link navigates to `/ar`.
- [x] Visiting `/ar` and clicking the language link navigates to `/`.
- [x] No `localStorage`, cookie, or auto-redirect logic is introduced.
- [x] `pnpm check` reports 0 errors.
- [x] `pnpm test` passes (all existing + new layout assertions).
- [x] `pnpm build` succeeds and generates all 12 static pages.

## Technical Details

- **Modified files**: `src/layouts/BaseLayout.astro` only.
- **New files**: none.
- **New dependencies**: none.
- **Key logic** (added to `BaseLayout.astro` frontmatter):
  ```ts
  const targetLang = lang === 'ar' ? 'en' : 'ar';
  const switchTarget = getAlternatePath(pathname, targetLang);
  ```
  `<Header />` becomes `<Header lang={lang} switchTarget={switchTarget} />`.
- **`getAlternatePath`** is already imported in `BaseLayout.astro` (added in PB-018).
- **`Header.astro`**: already accepts `lang` and `switchTarget` props — no changes needed.

## Implementation Plan

- [x] **Step 1 — Wire `switchTarget` in `BaseLayout.astro`**
  - Derive `targetLang` and `switchTarget` from `Astro.url.pathname` and `lang` prop
  - Pass `lang={lang}` and `switchTarget={switchTarget}` to `<Header />`
  - File: `src/layouts/BaseLayout.astro`

- [x] **Step 2 — Update layout test suite & verify build**
  - Add assertions to `tests/unit/layout/base-layout.test.ts`:
    - `BaseLayout` passes `switchTarget` to `<Header />`
    - `switchTarget` is derived from `getAlternatePath`
  - Run `pnpm test` → all tests pass
  - Run `pnpm build` → 12 pages built
  - Commit: `feat(i18n): wire equivalent-page language switch into BaseLayout (PB-019)`

**Checkpoints:**
- [x] Checkpoint 1 (After Step 2): `pnpm test` passes and `pnpm build` succeeds

## Implementation Workflow
*For each step above, the AI will:*
1. State which files it plans to change and the approach.
2. Wait for approval.
3. Apply the change.
4. Run or update tests.
5. Summarize files changed, behavior modified, and follow-up TODOs.

## Test Plan
- **Unit Tests:**
  - [x] `base-layout.test.ts` — asserts `switchTarget={switchTarget}` is passed to `<Header />`
  - [x] `base-layout.test.ts` — asserts `getAlternatePath` is used to derive `switchTarget`
  - [x] `base-layout.test.ts` — asserts `lang={lang}` is passed to `<Header />`
- **Build Verification:**
  - [x] `pnpm check` → 0 errors
  - [x] `pnpm build` → 12 pages built cleanly

## Design & Diagrams

```
┌─────────────────────────────────────────────────┐
│  BaseLayout.astro                               │
│                                                 │
│  Astro.url.pathname ──┐                         │
│  lang prop        ────┼──► getAlternatePath()   │
│                       │         │               │
│                       └─────────▼               │
│                            switchTarget         │
│                                 │               │
│                   <Header lang switchTarget />  │
└─────────────────────────────────────────────────┘
```

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Initial language | No detection — always EN at `/` | SSG constraint; avoids flash-of-redirect; URL is source of truth |
| Persistence | None — URL only | YAGNI; no requirement for cross-session memory |
| Missing translation | Silent EN fallback | Avoids UI noise; all 12 pages already build correctly |
| Switch target | Equivalent page via `getAlternatePath()` | Preserves context; reuses existing tested utility |
| Wiring location | `BaseLayout.astro` only | Single source of truth; zero changes to individual pages |
