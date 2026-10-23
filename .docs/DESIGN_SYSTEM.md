# My Portfolio Design System

## 0. Design Intent

**My Portfolio** is an evidence-driven personal developer portfolio built with Astro to showcase practical work across software development, UI/UX design, automation, and artificial intelligence.

**Visual Influences & Mood:**
- **Minimalist Editorial (Primary Visual Direction):** Typography-led layouts, generous whitespace, and content-first presentation.
- **Swiss-Inspired (Layout Foundation):** Grid-based composition, alignment, consistent spacing, and clear information hierarchy.
- **Dark Minimalism (Color & Atmosphere):** Restrained monochrome palette (black, white, neutral grays) across both light and dark themes.
- **Subtle Wabi-Sabi (Character Details):** Occasional understated natural texture or imperfection in selected project imagery or composition, never dominating the UI.

**Target Visitors:**
- Recruiters & Hiring Managers (evaluating role, contribution, and code quality)
- Potential Clients (evaluating problem-solving, project scope, and verified outcomes)
- Technical Collaborators (evaluating architecture, technology choices, and test suites)

**✅ Design Techniques:**
- Thin, neutral 1px borders to establish grouping before adding shadows
- Restrained elevation; shadows used selectively only for floating popovers or dropdowns
- Monochrome first: black, white, and neutral grays carry the interface; color is reserved for functional states (focus, status) and project screenshot previews
- Badge components for skills, technologies, and project types
- Explicit visual badges for evidence status (Source Code, Live Demo, Tests, Case Study)
- Full symmetrical adaptation for Arabic (RTL) and English (LTR)

**❌ Avoid:**
- Decorative accent gradients or non-functional color splashes
- Universal pill-shapes or aggressive rounded bubbles
- Full-page skeuomorphic textures (no raw paper textures or grunge borders across the layout)
- Asymmetrical layouts that break or feel awkward when flipped to RTL

---

## 1. Brand & UX Principles

### Core Principles
- **Content Before Decoration**: Projects, technical decisions, outcomes, and evidence are primary.
- **Monochrome First**: Avoid decorative colors; let project screenshots provide visual variety.
- **Strong Editorial Hierarchy**: Typography, spacing, scale, and alignment guide the reading experience.
- **Evidence First**: Connect claims directly to verified repositories, tests, and live demos.
- **Attribution Transparency**: Clearly delineate personal contributions versus team work.
- **Discoverability**: Fast, frictionless filtering by technology, skill, and discipline.

---

## 2. Color System & Design Tokens

### Variable Architecture
A two-tier variable architecture is used for full Tailwind CSS integration and native alpha channel support:
1. **Raw HSL (`--color-[token]-hsl`)**: Base HSL components without wrapper.
2. **Functional Variable (`--color-[token]`)**: Direct usage wrapped in `hsl()`.

### Monochrome Design Tokens

#### Light Theme (Default)
```css
:root {
  /* Canvas & Backgrounds */
  --color-bg-hsl: 0 0% 100%;                  /* #FFFFFF */
  --color-bg: hsl(var(--color-bg-hsl));
  --color-surface-hsl: 0 0% 97%;             /* #F7F7F7 */
  --color-surface: hsl(var(--color-surface-hsl));
  --color-surface-raised-hsl: 0 0% 100%;      /* #FFFFFF */
  --color-surface-raised: hsl(var(--color-surface-raised-hsl));

  /* Foreground & Typography */
  --color-text-hsl: 0 0% 7%;                  /* #111111 */
  --color-text: hsl(var(--color-text-hsl));
  --color-text-muted-hsl: 0 0% 37%;           /* #5E5E5E */
  --color-text-muted: hsl(var(--color-text-muted-hsl));
  --color-text-subtle-hsl: 0 0% 44%;          /* #707070 */
  --color-text-subtle: hsl(var(--color-text-subtle-hsl));

  /* Borders & Dividers */
  --color-border-hsl: 0 0% 89%;               /* #E2E2E2 */
  --color-border: hsl(var(--color-border-hsl));
  --color-border-strong-hsl: 0 0% 74%;        /* #BDBDBD */
  --color-border-strong: hsl(var(--color-border-strong-hsl));

  /* High-Contrast Inverse (Calls to action, intentional emphasis) */
  --color-inverse-bg-hsl: 0 0% 7%;            /* #111111 */
  --color-inverse-bg: hsl(var(--color-inverse-bg-hsl));
  --color-inverse-text-hsl: 0 0% 100%;        /* #FFFFFF */
  --color-inverse-text: hsl(var(--color-inverse-text-hsl));

  /* Functional States (Strictly functional, not decorative) */
  --color-focus-hsl: 223 71% 49%;             /* #2457D6 Accessible Focus Blue */
  --color-focus: hsl(var(--color-focus-hsl));
  --color-success-hsl: 142 71% 45%;
  --color-success: hsl(var(--color-success-hsl));
  --color-warning-hsl: 38 92% 50%;
  --color-warning: hsl(var(--color-warning-hsl));
  --color-danger-hsl: 0 84% 60%;
  --color-danger: hsl(var(--color-danger-hsl));
  --color-info-hsl: 199 89% 48%;
  --color-info: hsl(var(--color-info-hsl));
}
```

#### Dark Theme
```css
.dark {
  /* Canvas & Backgrounds */
  --color-bg-hsl: 0 0% 7%;                    /* #111111 */
  --color-bg: hsl(var(--color-bg-hsl));
  --color-surface-hsl: 0 0% 10%;              /* #191919 */
  --color-surface: hsl(var(--color-surface-hsl));
  --color-surface-raised-hsl: 0 0% 13%;       /* #222222 */
  --color-surface-raised: hsl(var(--color-surface-raised-hsl));

  /* Foreground & Typography */
  --color-text-hsl: 0 0% 96%;                 /* #F5F5F5 */
  --color-text: hsl(var(--color-text-hsl));
  --color-text-muted-hsl: 0 0% 72%;           /* #B8B8B8 */
  --color-text-muted: hsl(var(--color-text-muted-hsl));
  --color-text-subtle-hsl: 0 0% 63%;          /* #A0A0A0 */
  --color-text-subtle: hsl(var(--color-text-subtle-hsl));

  /* Borders & Dividers */
  --color-border-hsl: 0 0% 20%;               /* #343434 */
  --color-border: hsl(var(--color-border-hsl));
  --color-border-strong-hsl: 0 0% 33%;        /* #555555 */
  --color-border-strong: hsl(var(--color-border-strong-hsl));

  /* High-Contrast Inverse */
  --color-inverse-bg-hsl: 0 0% 96%;           /* #F5F5F5 */
  --color-inverse-bg: hsl(var(--color-inverse-bg-hsl));
  --color-inverse-text-hsl: 0 0% 7%;          /* #111111 */
  --color-inverse-text: hsl(var(--color-inverse-text-hsl));

  /* Functional States */
  --color-focus-hsl: 224 100% 78%;            /* #8EADFF High-contrast Focus */
  --color-focus: hsl(var(--color-focus-hsl));
}
```

---

## 3. Typography & Bilingual Type Scales

- **English / Latin Interface & Body**: `Inter`, system-ui, -apple-system, sans-serif
- **Arabic Interface & Body**: `Noto Sans Arabic` or `Cairo`, system-ui, sans-serif
- **Code & Technical Metadata**: `JetBrains Mono`, monospace

### Responsive Type Scale
| Token | Size | Typical Use |
|---|---:|---|
| `--text-xs` | 12px (0.75rem) | Small metadata, date stamps, evidence pills |
| `--text-sm` | 14px (0.875rem) | Secondary text, filter options, captions |
| `--text-base` | 16px (1.0rem) | Default body text, card summaries |
| `--text-lg` | 18px (1.125rem) | Introductory text, lead paragraphs |
| `--text-xl` | 20px (1.25rem) | Supporting headings |
| `--text-2xl` | 24px (1.5rem) | Section subheadings |
| `--text-3xl` | 32px (2.0rem) | Section headings |
| `--text-4xl` | 40px (2.5rem) | Major page headings |
| `--text-display` | 56–80px (3.5–5rem) | Hero headline and editorial highlights |

---

## 4. Layout, Spacing & Corner Radii

### Layout Structure
- **Maximum Content Width**: `1200px` (`max-w-[1200px]`)
- **Horizontal Gutters**: Mobile `20px` (`px-5`), Desktop `40px` (`px-10`)
- **Main Section Spacing**: Larger screens `96–144px`, mobile `56–88px`
- **Breakpoints**: Small mobile (<480px), Large mobile (480–767px), Tablet (768–1023px), Desktop (1024–1439px), Large desktop (>=1440px)

### Mixed Corner Radii Strategy
Corners express purpose rather than uniform rounding:
- `0–4px` (`rounded-none` / `rounded-sm`): Large editorial images, featured media
- `4–8px` (`rounded-sm` / `rounded-md`): Project cards, inputs, buttons, tooltips
- `4px` or `pill` (`rounded-sm` / `rounded-full`): Small tags, filter chips, evidence badges
- `8–12px` (`rounded-lg`): Large overlays, dialogs, dropdown panels
- `50%` (`rounded-full`): Avatars
