# PB-014: Implement Project Filters — Design

**Date:** 2026-11-01
**Status:** Validated
**Feature:** Filter the project catalog by project type

---

## Decisions

| Question | Decision | Rationale |
|---|---|---|
| Which fields are filterable? | Project Types only | YAGNI; types are enum-controlled, skills are free-form strings |
| Within-category logic | OR — match ANY selected type | Natural for browsing; avoids zero-result traps |
| Filter + Search logic | AND — must match both | Predictable intersection; consistent with standard filter+search UIs |
| UI pattern | Toggle pills + "Clear all" button | Self-documenting active state; familiar pattern |
| Filter placement | Above the search input | Filters are the primary discovery tool; search refines further |

---

## Section 1: Architecture & Data Flow

### State Model (client-side only)
- `activeTypes: Set<string>` — currently selected type slugs
- `searchQuery: string` — existing state from PB-013 search

### Filter Logic (pure function)
```
matchesTypeFilter(cardTypes, activeTypes) →
  activeTypes.size === 0  ||  cardTypes includes ANY activeType
```

Combined with search:
```
visible = matchesSearch(card, query) AND matchesTypeFilter(card.types, activeTypes)
```

### Data Flow
1. **Build time:** `ProjectCatalog.astro` renders each card with `data-types='["software","ai"]'` (JSON array of type slugs), mirroring the existing `data-search` pattern from PB-013.
2. **Runtime:** The existing client `<script>` in `ProjectCatalog.astro` is extended to:
   - Listen for pill click events and maintain `activeTypes` state
   - Re-run visibility logic combining `matchesSearch` + `matchesTypeFilter`
   - Toggle `aria-pressed` on pills, show/hide "Clear all" button
3. **No new routes or server logic** — purely DOM + vanilla JS, SSG-compatible.

### New Utility
`src/utils/filters.ts` exports:
```typescript
export function matchesTypeFilter(types: string[], activeTypes: Set<string>): boolean
```
Pure function, no `astro:content` import — fully testable in Vitest.

---

## Section 2: Component Design & UI

### New Component: `FilterBar.astro`
**Path:** `src/components/ui/FilterBar.astro`

**Props:**
```typescript
interface Props {
  types: string[];       // all available type slugs
  lang?: 'en' | 'ar';   // for bilingual labels
}
```

**Structure:**
```html
<div role="group" aria-label="Filter by type">
  <button data-filter-type="software" aria-pressed="false">Software</button>
  <button data-filter-type="ai" aria-pressed="false">AI</button>
  <!-- ... one per type -->
  <button data-filter-clear hidden>Clear all</button>
</div>
```

**Styling (Tailwind design tokens):**
- Default pill: `bg-surface border border-border text-text rounded-pill`
- Active pill: `bg-inverse-bg text-inverse-text border-inverse-bg` (toggled via JS class swap)
- "Clear all": appears only when `activeTypes.size > 0`

**Bilingual type labels:**
```typescript
const typeLabels = {
  en: { software: 'Software', ai: 'AI', 'ui-ux': 'UI/UX', design: 'Design', automation: 'Automation', other: 'Other' },
  ar: { software: 'برمجيات', ai: 'ذكاء اصطناعي', 'ui-ux': 'واجهات', design: 'تصميم', automation: 'أتمتة', other: 'أخرى' }
}
```

### Changes to `ProjectCatalog.astro`
- Import and render `<FilterBar types={allTypes} lang={lang} />` above `<SearchInput />`
- Add `data-types={JSON.stringify(project.data.types ?? [])}` to each card wrapper
- Extend client `<script>` to handle pill clicks and apply combined filter+search logic
- Result count badge and no-results empty state remain unchanged (already in place)

---

## Section 3: Testing Strategy

### `tests/unit/utils/filters.test.ts`
Pure unit tests for `matchesTypeFilter`:
- Returns `true` when `activeTypes` is empty (no filter active — show all)
- Returns `true` when card types overlap with ANY active type (OR logic)
- Returns `false` when card types have no overlap with `activeTypes`
- Handles empty card `types` array without throwing

### `tests/unit/ui/FilterBar.test.ts`
Component render tests:
- Renders one pill button per type slug with correct `data-filter-type`
- Each pill has `aria-pressed="false"` initially
- "Clear all" button is present in DOM
- Correct bilingual labels rendered for `lang="ar"`

### `tests/unit/pages/landing-page.test.ts` (updates)
- `FilterBar` is rendered inside `ProjectCatalog`
- Each project card wrapper has a `data-types` attribute
- Existing count badge and no-results assertions remain passing

### Out of Scope (YAGNI)
- No Playwright E2E tests — client-script interaction deferred
- No snapshot tests
