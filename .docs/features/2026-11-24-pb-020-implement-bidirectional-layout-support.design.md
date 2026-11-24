# Design Document: PB-020 Implement Bidirectional Layout Support

## 1. Overview & Goal
Enable comprehensive, natural bidirectional (LTR and RTL) layout support across the portfolio. English pages render in LTR mode, while Arabic pages render in RTL mode. All components, navigation, form controls, cards, directional arrows, and mixed technical text must maintain readability, alignment, and visual hierarchy without physical CSS overrides.

---

## 2. Key Architecture & Decisions

### 2.1 Document Direction Resolution
- Managed centrally in `BaseLayout.astro`:
  ```astro
  const resolvedDir = dir ?? (lang === 'ar' ? 'rtl' : 'ltr');
  <html lang={lang} dir={resolvedDir} class="scroll-smooth">
  ```
- All pages in `src/pages/ar/` supply `lang="ar"` and resolve to `dir="rtl"`.
- Root and English pages supply `lang="en"` and resolve to `dir="ltr"`.

### 2.2 CSS Logical Properties Enforcement
- Strict prohibition of physical directional classes:
  - Disallowed: `pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`, `text-left`, `text-right`.
  - Required: `ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`, `text-start`, `text-end`.
- Layout containers utilize standard CSS writing-mode flow (`flex-row` naturally places items from inline-start without manual `flex-row-reverse`).

### 2.3 Navigational Arrow Mirroring
- **Back Navigation**: In `ProjectDetail.astro`, back arrows must mirror according to reading direction:
  - English: points left (`← Back to projects`).
  - Arabic: points right (`→ العودة إلى المشاريع`), or utilizes `inline-block rtl:rotate-180`.
- **External Links**: Universal diagonal indicator (`↗`) remains consistent across both locales per modern international web conventions.

### 2.4 Bidirectional Isolation for Technical Content
- Add base layer isolation in `src/styles/globals.css`:
  ```css
  code, kbd, samp, pre, [dir="ltr"] {
    unicode-bidi: isolate;
  }
  ```
- Technical tokens, URLs, hostnames, and `<time>` tags are isolated or marked with `dir="ltr"` and `font-mono` to prevent digit flipping and punctuation distortion when embedded inside Arabic sentences.

---

## 3. Component Updates

| Component | Changes Required |
|---|---|
| `src/styles/globals.css` | Add `unicode-bidi: isolate` rules for `code`, `kbd`, `samp`, `pre`, and `[dir="ltr"]`. |
| `src/components/project/ProjectDetail.astro` | Update back navigation to mirror arrow (`rtl:rotate-180` or `t.backArrow`), mark `<time>` and URLs with `dir="ltr"`. |
| `src/components/ui/ProjectCard.astro` | Mark `<time>` and hostnames with `dir="ltr"`. |
| Templates across `src/components/` & `src/pages/` | Verify zero physical directional classes (`pl-`, `pr-`, `ml-`, `mr-`, `left-`, `right-`). |

---

## 4. Test Strategy
Create `tests/unit/theme/bidi-layout.test.ts` to assert:
1. Absence of forbidden physical Tailwind spacing and alignment classes across all components and pages.
2. `BaseLayout.astro` correctly computes `dir="rtl"` for Arabic and `dir="ltr"` for English.
3. Proper arrow mirroring on back links.
4. BiDi isolation styles present in `globals.css`.
5. Run `pnpm test`, `pnpm check`, and `pnpm build`.
