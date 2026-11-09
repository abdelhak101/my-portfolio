# PB-018: Decide and Implement Localized Routing — Design

**Date:** 2026-11-09
**Status:** Validated
**Feature:** Finalized bilingual routing strategy, canonical & hreflang alternate metadata generation, and pure path localization utilities.

---

## Decisions

| Question | Decision | Rationale |
|---|---|---|
| URL Strategy | Default prefix-less English (`/`, `/projects/:id`, `/404`) + `/ar` prefix for Arabic (`/ar`, `/ar/projects/:id`, `/ar/404`) | Symmetrical parity without breaking existing routes or introducing unnecessary redirects |
| SEO Metadata | Automatic canonical + hreflang (`en`, `ar`, `x-default`) rendered in `BaseLayout.astro` | Conforms to Google SEO and WCAG standards for bilingual static sites |
| Path Localization Logic | Pure utility functions in `src/utils/i18n.ts` | Zero external dependencies; completely testable in Vitest |
| Site Configuration | `site: 'https://portfolio.dev'` in `astro.config.mjs` | Provides base URL for generating absolute canonical and alternate links |

---

## Section 1: URL Strategy & Routing Architecture

### Symmetrical Route Matrix

| Route Type | English (Default) | Arabic (`/ar`) |
|---|---|---|
| Landing / Catalog | `/` | `/ar` |
| Project Detail | `/projects/:id` | `/ar/projects/:id` |
| Not Found (404) | `/404` (`/404.html`) | `/ar/404` (`/ar/404/index.html`) |

### Core Architectural Rules
1. **Unambiguous Routes**: Every route belongs strictly to one language, identifiable by the `/ar` prefix or its absence.
2. **Directionality & Language**:
   - Prefix-less routes strictly render `<html lang="en" dir="ltr">`.
   - `/ar` routes strictly render `<html lang="ar" dir="rtl">`.
3. **Internal Links**: Internal links on Arabic pages must route through `/ar` using `localizePath(path, 'ar')`.

---

## Section 2: Utilities & Metadata Generation

### 1. New Utility: `src/utils/i18n.ts`
- `DEFAULT_LANG = 'en'`
- `SUPPORTED_LANGUAGES = ['en', 'ar'] as const`
- `localizePath(path: string, lang: 'en' | 'ar'): string`
- `getAlternatePath(currentPath: string, targetLang: 'en' | 'ar'): string`
- `getCanonicalUrl(pathname: string, siteUrl?: string): string`
- `getHreflangLinks(pathname: string, siteUrl?: string): Array<{ lang: string; url: string }>`

### 2. Layout Integration: `src/layouts/BaseLayout.astro`
Injects SEO link elements into `<head>`:
- `<link rel="canonical" href={canonicalUrl} />`
- `<link rel="alternate" hreflang="en" href={hreflangEn} />`
- `<link rel="alternate" hreflang="ar" href={hreflangAr} />`
- `<link rel="alternate" hreflang="x-default" href={hreflangDefault} />`

### 3. Documentation
- Document the URL strategy in `.docs/ARCHITECTURE.md` and `.docs/STANDARDS.md`.

---

## Section 3: Testing Strategy & Verification

### 1. `tests/unit/utils/i18n.test.ts`
- Test `localizePath` with root, nested routes, and varying language inputs.
- Test `getAlternatePath` reciprocal conversion between EN and AR paths.
- Test `getCanonicalUrl` and `getHreflangLinks` formatting and trailing slashes.

### 2. `tests/unit/layout/base-layout.test.ts`
- Verify `<link rel="canonical">` is present.
- Verify `<link rel="alternate" hreflang="...">` tags are present for `en`, `ar`, and `x-default`.

### 3. Build & Diagnostics Verification
- `pnpm test`: all unit tests green.
- `pnpm check`: 0 errors, 0 warnings.
- `pnpm build`: all 12 static HTML routes generated with proper canonical tags.
