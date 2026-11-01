# PB-008: Implement Design Tokens - Design

## 1. Problem Statement & Scope

To establish the visual foundation for **My Portfolio** in line with the editorial minimalist aesthetic, dark minimalism, and Swiss-inspired grid layout defined in `.docs/DESIGN_SYSTEM.md` and `.docs/THEME_SYSTEM.md`. We need to implement design tokens as first-class citizens in code using CSS custom properties and Tailwind CSS v3 integration via `@astrojs/tailwind`.

### Key Goals
- Implement monochrome color tokens with semantic naming for light and dark themes.
- Support functional color tokens (focus, success, warning, danger, info) reserved strictly for system states.
- Configure typography scales and font families (sans, serif display, mono, and Arabic fallbacks).
- Establish mixed-radius direction and border-first elevation.
- Provide a two-tier CSS variable architecture (`--color-[token]-hsl` and `--color-[token]`) allowing Tailwind opacity modifier support (e.g. `bg-bg/80`).

---

## 2. Architecture & Approach

### Integration Strategy
- Integrate Tailwind CSS v3 using `@astrojs/tailwind` inside `astro.config.mjs`.
- Store base variables in `src/styles/globals.css` within `@layer base` for `:root` (light) and `.dark` (dark).
- Define theme extensions in `tailwind.config.mjs` referencing the CSS variables using standard Tailwind color functions:
  ```js
  function withOpacity(variableName) {
    return ({ opacityValue }) => {
      if (opacityValue !== undefined) {
        return `hsl(var(${variableName}) / ${opacityValue})`;
      }
      return `hsl(var(${variableName}))`;
    };
  }
  ```

---

## 3. Token Definitions

### A. Color Tokens
| Semantic Token | Light Mode Value (HSL) | Dark Mode Value (HSL) | Purpose |
|---|---|---|---|
| `bg` | `0 0% 100%` (`#FFFFFF`) | `0 0% 7%` (`#111111`) | Page canvas background |
| `surface` | `0 0% 97%` (`#F7F7F7`) | `0 0% 10%` (`#191919`) | Neutral cards, subtle sections |
| `surface-raised` | `0 0% 100%` (`#FFFFFF`) | `0 0% 13%` (`#222222`) | Elevated panels, popovers |
| `text` | `0 0% 7%` (`#111111`) | `0 0% 96%` (`#F5F5F5`) | Primary headlines and body copy |
| `text-muted` | `0 0% 37%` (`#5E5E5E`) | `0 0% 72%` (`#B8B8B8`) | Secondary descriptions, subheads |
| `text-subtle` | `0 0% 44%` (`#707070`) | `0 0% 63%` (`#A0A0A0`) | Metadata, timestamps, captions |
| `border` | `0 0% 89%` (`#E2E2E2`) | `0 0% 20%` (`#343434`) | Default dividing lines and card borders |
| `border-strong` | `0 0% 74%` (`#BDBDBD`) | `0 0% 33%` (`#555555`) | Interactive borders and active states |
| `inverse-bg` | `0 0% 7%` (`#111111`) | `0 0% 96%` (`#F5F5F5`) | High-contrast call-to-actions |
| `inverse-text` | `0 0% 100%` (`#FFFFFF`) | `0 0% 7%` (`#111111`) | Text within inverse elements |

#### Functional States
- `focus`: `223 71% 49%` (`#2457D6`)
- `success`: `142 71% 45%`
- `warning`: `38 92% 50%`
- `danger`: `0 84% 60%`
- `info`: `199 89% 48%`

### B. Typography Tokens
- **Font Families**:
  - `sans`: `["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]`
  - `serif`: `["Newsreader", "Playfair Display", "Georgia", "serif"]`
  - `mono`: `["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"]`
  - `arabic`: `["Tajawal", "-apple-system", "BlinkMacSystemFont", "sans-serif"]`
- **Scale**:
  - `xs`: `0.75rem` / line-height `1rem`
  - `sm`: `0.875rem` / line-height `1.25rem`
  - `base`: `1rem` / line-height `1.5rem`
  - `lg`: `1.125rem` / line-height `1.75rem`
  - `xl`: `1.25rem` / line-height `1.75rem`
  - `2xl`: `1.5rem` / line-height `2rem`
  - `3xl`: `1.875rem` / line-height `2.25rem`
  - `4xl`: `2.25rem` / line-height `2.5rem`

### C. Radii (Mixed-Radius System)
- `radius-none`: `0px`
- `radius-sm`: `4px` (Tags, chips, small badges)
- `radius-md`: `8px` (Buttons, inputs, content cards)
- `radius-lg`: `12px` (Modal dialogues, feature overlays)
- `radius-pill`: `9999px` (Status badges, pill indicators)

### D. Borders vs Elevation
- Default cards use `border border-border` with `shadow-none`.
- Restrained elevation tokens:
  - `shadow-subtle`: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
  - `shadow-raised`: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`

---

## 4. Implementation Steps

1. **Install Dependencies**:
   - Install `@astrojs/tailwind` and `tailwindcss` as dev dependencies.
2. **Configure Tailwind & Astro**:
   - Add `tailwind()` integration to `astro.config.mjs`.
   - Create `tailwind.config.mjs` with `darkMode: "class"`, mapping semantic tokens to CSS variables.
3. **Define CSS Variables**:
   - Create `src/styles/globals.css` with `@tailwind` directives and `:root` / `.dark` design variables.
4. **Automated Verification**:
   - Add unit/integration test validating token definitions in `globals.css` and `tailwind.config.mjs`.
   - Run `pnpm check`, `pnpm test`, `pnpm build`, and lint/formatting.
