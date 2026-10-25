# Project Standards

This file defines the high-level technical policies for Security, Testing, Performance, Accessibility, Bilingual Support, and Asset Conventions for **My Portfolio**.

## 1. Security Policy
- **Static Generation**: All content is statically rendered at build time; no client-exposed database or API keys.
- **Dependency Security**: Regularly audit packages (`npm audit`) and do not introduce unvetted third-party runtime libraries.
- **External Links**: All external evidence links (GitHub, live demos, external case studies) must use `rel="noopener noreferrer"` and `target="_blank"`.
- **Content Sanitization**: Validate all Markdown frontmatter and markdown body rendering against HTML injection vulnerabilities.

## 2. Testing Policy
- **Critical Path E2E Testing**:
  The following core flows must always be covered by Playwright E2E tests:
  - Homepage navigation and language switching (English LTR <-> Arabic RTL)
  - Project catalogue search, category/skill filtering, and result counter
  - Project detail page rendering with evidence links and metadata
  - Curated public collection page exploration and navigation back to full catalogue
  - 404 error page handling
- **Unit & Schema Testing**:
  - Content collections validation: 100% of project/collection schema definitions must be tested with valid and invalid mocks via Vitest.
  - Utility and helper functions (`src/lib/`): must maintain >80% test coverage.
- **Regression Policy**: Every bug fix requires an accompanying unit or E2E regression test.

## 3. Performance (Lighthouse & Core Web Vitals)
- **Target Score**: > 95 on Desktop, > 90 on Mobile (Lighthouse).
- **Core Web Vitals Thresholds**:
  - **LCP** (Largest Contentful Paint): < 1,200ms
  - **FCP** (First Contentful Paint): < 900ms
  - **CLS** (Cumulative Layout Shift): < 0.05
  - **TBT** (Total Blocking Time): < 100ms
  - **INP** (Interaction to Next Paint): < 200ms
- **Optimization Guidelines**:
  - Images must be processed through Astro's image optimization pipeline (`astro:assets`) with modern formats (AVIF/WebP) and explicit width/height dimensions.
  - Zero non-essential client-side JavaScript. Interactive components (search, theme toggle, filters) use Astro lightweight client directives (`client:idle` or vanilla custom elements).
  - Preload critical fonts for both Latin and Arabic typefaces.

## 4. Accessibility (a11y) & Bilingual (i18n / RTL)
- **Standard**: WCAG 2.2 AA compliance.
- **Directionality (BiDi)**:
  - Dynamic `dir` (`rtl` for Arabic, `ltr` for English) and `lang` attributes on the `<html>` root element.
  - Proper CSS logical properties (`margin-inline-start`, `padding-inline-end`, etc.) or Tailwind RTL variants (`rtl:` / `ltr:`) to ensure symmetric layouts.
- **Keyboard Navigation**:
  - Search input, filter buttons, project cards, and evidence links must be navigable and focusable via keyboard (`Tab`, `Enter`, `Escape`).
  - Visible focus indicators with high contrast.
- **Screen Readers**:
  - Semantic HTML (`main`, `nav`, `article`, `header`, `footer`, `section`).
  - Appropriate ARIA labels on icon-only buttons (e.g., language switchers, theme toggles, external links).
  - Meaningful `alt` text on project preview images; decorative icons marked with `aria-hidden="true"`.
- **Color Contrast**:
  - Minimum 4.5:1 contrast ratio for body text against backgrounds in both light and dark modes.

## 5. SEO & Social Sharing
- **Metadata**: Every page requires unique localized `<title>`, `<meta name="description">`, and Open Graph (`og:*`) tags.
- **Canonical & Hreflang**: Provide canonical URLs and `hreflang` alternate links for both `en` and `ar` versions of every route.
- **Structured Data**: JSON-LD schema (e.g., `Person`, `ProfilePage`, `CreativeWork`) embedded on key pages.
- **Sitemap & Robots**: Maintain auto-generated `sitemap.xml` and standard `robots.txt`.

## 6. Asset & File Naming Conventions
- **Standard Pattern**: All assets (covers, screenshots, diagrams) must follow kebab-case with category context:
  `portfolio-[category]-[project-slug]-[descriptor].[extension]`
  *(e.g., `portfolio-project-code-search-cover.webp`, `portfolio-case-study-task-diagram.png`)*
- **Source Formats**: Provide high-resolution source images, optimized to WebP or AVIF at build time.
- **No Spaces or Special Characters**: Keep file names ASCII-compatible, lowercase, and hyphen-delimited.

## 7. Content & Cross-Reference Integrity
- **Canonical Project Identifiers**:
  - Every project must have a unique, lowercase kebab-case identifier (`/^[a-z0-9]+(?:-[a-z0-9]+)*$/`).
- **Self-Reference Prevention**:
  - A project cannot reference itself in its `relatedProjects` array.
- **Duplicate Prevention**:
  - Duplicate project IDs are strictly prohibited in `relatedProjects` and collection `projects`.
- **Referential Integrity**:
  - All project IDs listed in `relatedProjects` must resolve to existing canonical project entries.
  - All project IDs listed in collection `projects` must resolve to existing canonical project entries.
- **Build & CI Enforcement**:
  - `pnpm validate:content` verifies cross-content references before every build.
  - Any missing reference or validation failure immediately aborts the build process with exit code `1`.
  - Diagnostics format:
    ```text
    - [PROJECT|COLLECTION] <file-path>
      ID: "<source-id>" -> Invalid Reference: "<missing-id>"
      <Detailed remediation message>
    ```

