# Design: PB-021 — Implement Light and Dark Themes

## Summary

Add a fully functional light/dark theme system to the portfolio site. The CSS token infrastructure (`:root` and `.dark` variables) is already in place in `globals.css` and Tailwind is configured with `darkMode: 'class'`. This feature wires up the missing runtime pieces: flash prevention, smooth transitions, a toggle button in the Header, and `localStorage` persistence.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Initial theme | System `prefers-color-scheme` | Respects user OS preference on first visit |
| Persistence | `localStorage` key `'theme'` | Manual choice always wins after first toggle |
| System re-listen | No | Once stored, explicit choice wins — keeps logic simple (KISS) |
| Toggle placement | Header nav bar | Always visible, minimal footprint |
| Toggle icon | Single animated icon (sun ↔ moon) | Common pattern, inline SVG, no external library |
| Theme transition | CSS `transition` on `color` + `background-color` (~150ms) | Smooth cross-fade, zero layout shift |

---

## Architecture

Three responsibilities, each in isolation:

### 1. Flash Prevention — `BaseLayout.astro` `<head>`

A synchronous `<script is:inline>` runs before the browser paints:
```js
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = stored ?? (prefersDark ? 'dark' : 'light');
document.documentElement.classList.toggle('dark', theme === 'dark');
```
This eliminates the flash-of-wrong-theme on every page load (SSG-safe — reruns on full navigation).

### 2. CSS Transition — `globals.css`

```css
html {
  transition: color 150ms ease, background-color 150ms ease;
}
```
Only color properties transition. No layout properties are affected → zero layout shifts.

### 3. Toggle Component — `ThemeToggle.astro`

A self-contained `<button>` with:
- Two inline SVG icons (sun + moon); Tailwind `dark:block` / `dark:hidden` swaps them automatically via CSS — no JS needed for icon swap.
- A `rotate` CSS transition on the icon for a subtle animation.
- A client `<script>` (~10 lines): click → toggle `.dark` on `document.documentElement` → write to `localStorage` → update `aria-label`.
- Dynamic `aria-label` ("Switch to dark mode" ↔ "Switch to light mode") so screen readers announce the *next* action.
- Focus ring using existing `focus-visible:ring-2 focus-visible:ring-focus` design token.

---

## File Changes

| File | Type | Change |
|------|------|--------|
| `src/styles/globals.css` | Update | Add `html { transition: color 150ms ease, background-color 150ms ease }` |
| `src/layouts/BaseLayout.astro` | Update | Add inline flash-prevention `<script is:inline>` in `<head>` |
| `src/components/common/ThemeToggle.astro` | **New** | Button + SVG icons + client toggle script |
| `src/components/common/Header.astro` | Update | Import and render `<ThemeToggle />` as last nav item |

---

## Component Sketch

```astro
<!-- ThemeToggle.astro -->
<button
  id="theme-toggle"
  type="button"
  aria-label="Switch to dark mode"
  class="rounded-sm p-1.5 text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
>
  <!-- Sun: shown when in dark mode (action = switch to light) -->
  <svg id="icon-sun" aria-hidden="true" class="hidden h-5 w-5 transition-transform duration-150 dark:block">
    <!-- heroicon: sun path -->
  </svg>
  <!-- Moon: shown when in light mode (action = switch to dark) -->
  <svg id="icon-moon" aria-hidden="true" class="block h-5 w-5 transition-transform duration-150 dark:hidden">
    <!-- heroicon: moon path -->
  </svg>
</button>

<script>
  const btn = document.getElementById('theme-toggle');
  btn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  });
</script>
```

---

## Acceptance Criteria Mapping

| Criteria | How it's met |
|----------|-------------|
| Both themes use the monochrome design system | Already in `globals.css` — `:root` + `.dark` tokens |
| Text and controls remain readable | Existing contrast-validated tokens (7% / 96% lightness) |
| Theme switching updates the visible interface | `.dark` class toggle on `<html>` + Tailwind `dark:` utilities |
| Consistent across navigation | Flash-prevention script reruns on every full-page load |
| Initial theme + persistence follow approved decision | System preference → `localStorage` override |
| No unacceptable flashes or layout shifts | Inline script (pre-paint) + CSS-only color transitions |

---

## Out of Scope

- View Transitions API integration (separate concern)
- `MediaQueryList` live listener after first visit (YAGNI — explicit choice wins)
- Animated page-level fade on toggle
- Any third-party icon library
