# PB-017: Implement Not-Found Behavior — Design

**Date:** 2026-11-09
**Status:** Validated
**Feature:** Dedicated bilingual not-found (404) pages, recovery navigation, graceful degradation of optional content, and strict cross-reference validation.

---

## Decisions

| Question | Decision | Rationale |
|---|---|---|
| 404 Route Structure | Dedicated `src/pages/404.astro` (generates `/404.html`) + dedicated `src/pages/ar/404.astro` (generates `/ar/404/index.html`) | Standard static hosting platforms look for `/404.html`; dedicated Arabic route provides native RTL experience |
| Recovery Pathways | Branded error hero with status badge, explanation, primary home CTA, and secondary catalogue CTA | Clear recovery paths back to the portfolio without dead-ends |
| Missing Optional Content Handling | Distinction by design: missing optional metadata renders available fields without error; unknown IDs do not generate routes | Eliminates confusion between an incomplete project and a missing project |
| Internal Cross-References | Strict build-time validation via `validate-content.ts` + tests in `cross-references.test.ts` | Invalid internal references fail the build with clear diagnostics before reaching production |

---

## Section 1: Architecture & Route Handling

### 1. Static 404 Routes
- `src/pages/404.astro`:
  - Generates `/404.html` (root fallback for static hosting).
  - Uses `BaseLayout` (`lang="en"`, `dir="ltr"`).
  - Sets `Header` with `switchTarget="/ar/404"`.
- `src/pages/ar/404.astro`:
  - Generates `/ar/404/index.html`.
  - Uses `BaseLayout` (`lang="ar"`, `dir="rtl"`).
  - Sets `Header` with `switchTarget="/404"`.

### 2. Unknown Routes & Draft Projects
- In Astro SSG, only published projects returned in `getStaticPaths()` have generated HTML files.
- Unknown slugs or draft projects (e.g. `/projects/unknown-slug`) automatically resolve to `/404.html`.

---

## Section 2: UI Presentation & Component Design

### Reusable View: `src/components/common/NotFoundView.astro`
**Props:**
```typescript
interface Props {
  lang?: 'en' | 'ar';
}
```

**Structure:**
- Status Badge: `404 Error` (EN) / `خطأ 404` (AR) with design system mono badge.
- Heading: `Page Not Found` (EN) / `الصفحة غير موجودة` (AR).
- Description: Explains that the requested project, collection, or resource could not be found or is unpublished.
- Recovery CTAs:
  - Primary: Link to `/` or `/ar` (`Return to Portfolio Home` / `العودة إلى الصفحة الرئيسية`).
  - Secondary: Link to `/#projects` or `/ar#projects` (`Browse Project Catalogue` / `تصفح دليل المشاريع`).

---

## Section 3: Validation, Verification & Testing Strategy

### 1. 404 Page Tests (`tests/unit/pages/not-found.test.ts`)
- Verify `src/pages/404.astro` and `src/pages/ar/404.astro` exist.
- Verify reciprocal language switcher targets between `/404` and `/ar/404`.
- Verify primary and secondary recovery links point to `/` (or `/ar`) and `/#projects` (or `/ar#projects`).
- Verify semantic HTML, design system tokens, and proper directionality (`dir="rtl"` for AR).

### 2. Optional Content vs. Missing Project Verification
- Assert in `tests/unit/pages/project-detail.test.ts` that a published project with only required fields renders cleanly without throwing or triggering 404.
- Assert that only published project IDs are included in `getStaticPaths()`.

### 3. Cross-Reference Validation
- Verify `pnpm validate:content` blocks invalid references in `relatedProjects` and collection `projects`.
- Ensure all 5 tests in `tests/unit/content/cross-references.test.ts` pass.
