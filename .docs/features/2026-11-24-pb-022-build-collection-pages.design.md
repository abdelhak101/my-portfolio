# Design Document: PB-022 Build Collection Pages

## 1. Overview & Goal
Build dedicated, standalone collection routes (`/collections/[id]` and `/ar/collections/[id]`) that resolve and display thematically curated projects from canonical project content. Provide smooth bidirectional navigation back to the full portfolio, SEO canonical/hreflang links, and robust 404 handling for unknown collection IDs.

---

## 2. Architecture & Decisions

### 2.1 Route Structure & Resolution
- English routes: `src/pages/collections/[id].astro` → `/collections/:id`
- Arabic routes: `src/pages/ar/collections/[id].astro` → `/ar/collections/:id`
- `getStaticPaths()` queries published collections (`status === 'published'`) and published projects (`status === 'published'`).
- Unknown slugs automatically route to Astro's static 404 handlers (`/404.html` and `/ar/404/index.html`).

### 2.2 Canonical Project Resolution
- Reuses `resolveCollection()` from `src/content/queries/collections.ts`.
- Projects are resolved in the exact order specified in `collection.projects`.
- Draft projects are filtered out gracefully so only published canonical projects are displayed.

### 2.3 Navigation & Breadcrumbs
- Top back-link:
  - English: `← Back to all projects` (`href="/"`)
  - Arabic: `العودة إلى جميع المشاريع` (`href="/ar"`) with mirrored arrow (`rtl:rotate-180`).
- Bottom link: link back to the full portfolio catalog.

### 2.4 Bilingual Language Support
- Automatically integrated into `BaseLayout.astro` via `getAlternatePath(pathname, targetLang)`:
  - `/collections/featured` ↔ `/ar/collections/featured`
  - Canonical and alternate hreflang meta links generated automatically.

---

## 3. Component Architecture

### `src/components/collection/CollectionDetail.astro`
- Accepts `collection: Collection`, `projects: Project[]`, and `lang: 'en' | 'ar'`.
- Renders:
  - Back navigation breadcrumb with mirrored arrow in RTL.
  - Collection header (title, summary, project count badge, optional featured badge and cover).
  - Project grid using canonical `<ProjectCard project={project} lang={lang} />`.
  - Empty state using `<Placeholder />` if no published projects exist in the collection.
  - Call-to-action link to return to the full portfolio catalog.

### `src/pages/collections/[id].astro` & `src/pages/ar/collections/[id].astro`
- Astro page templates wrapping `CollectionDetail` in `BaseLayout`.

### `src/components/landing/CollectionSection.astro`
- Updates collection preview cards on the landing page to link directly to their dedicated collection page.

---

## 4. Test Strategy
- Unit test suite: `tests/unit/pages/collection-detail.test.ts`:
  - Validates `resolveCollection` project ordering and filtering.
  - Validates `CollectionDetail.astro` template structure (back-links, RTL arrow, project cards, empty state).
  - Validates page routes and static path generation.
- Full verification: `pnpm test`, `pnpm check`, and `pnpm astro build` (16 total static pages generated).
