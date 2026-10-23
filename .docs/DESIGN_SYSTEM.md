# My Portfolio Design System

## 0. Design Intent

**My Portfolio** is an evidence-driven developer showcase presenting practical work across software development, UI/UX design, automation, and artificial intelligence.

**Visual Mood & Aesthetic:**
- **Primary Mood:** Modern, Technical, Clean, and Credible
- **Maturity:** Professional, senior-level craftsmanship, transparent
- **Aesthetic:** Minimalist developer aesthetic with structured data presentation
- **Complexity:** Low cognitive load, high information density with clear visual hierarchy
- **Form:** Refined geometric lines, balanced rounded corners (8px–16px), subtle borders
- **Value Perception:** High engineering quality, detail-oriented, trustworthy
- **Bilingual Nature:** Equal visual weight and typographic elegance in both Arabic and English

**Target Visitors:**
- Recruiters & Hiring Managers (evaluating role, contribution, and code quality)
- Potential Clients (evaluating problem-solving, project scope, and outcomes)
- Technical Collaborators (evaluating architecture, technology choices, and tests)

**✅ Design Techniques:**
- Clean card-based grids with subtle 1px border definitions
- Subtle elevation and soft drop shadows on hover
- Badge components for skills, technologies, and project types
- Explicit visual badges for evidence status (Source Code, Live Demo, Tests, Case Study)
- Support for syntax highlighting and markdown documentation formatting
- Symmetrical layout adaptation for both LTR (English) and RTL (Arabic)

**❌ Avoid:**
- Overly flashy neon animations or distracting particle backgrounds
- Unverified marketing claims or vague metric visualizations
- Generic stock photography
- Asymmetric designs that break when mirrored in RTL mode

---

## 1. Brand & UX Principles

### Core Principles
- **Evidence First**: Connect claims directly to code repositories, test results, or live deployments.
- **Attribution Transparency**: Clearly delineate personal contributions versus team work.
- **Discoverability**: Provide immediate, zero-friction filtering by technology, skill, and discipline.
- **Cognitive Clarity**: Group related metadata logically (role, timeline, tech stack, evidence).

---

## 2. Color System & Design Tokens

### Variable Architecture
A two-tier variable architecture is used for full Tailwind CSS integration and native alpha channel support:
1. **Raw HSL (`--color-[token]-hsl`)**: Base HSL components without wrapper (e.g. `220 14% 96%`).
2. **Functional Variable (`--color-[token]`)**: Direct usage wrapped in `hsl()`.

### Theme Colors

#### Light Mode (Default)
```css
:root {
  /* Brand Accent */
  --color-primary-hsl: 221 83% 53%; /* Modern royal/indigo */
  --color-primary: hsl(var(--color-primary-hsl));
  --color-primary-foreground: hsl(0 0% 100%);

  /* Canvas & Surfaces */
  --color-background-hsl: 0 0% 100%;
  --color-background: hsl(var(--color-background-hsl));
  --color-surface-hsl: 210 20% 98%;
  --color-surface: hsl(var(--color-surface-hsl));
  --color-surface-card-hsl: 0 0% 100%;
  --color-surface-card: hsl(var(--color-surface-card-hsl));

  /* Foreground & Text */
  --color-foreground-hsl: 222 47% 11%;
  --color-foreground: hsl(var(--color-foreground-hsl));
  --color-muted-foreground-hsl: 215 16% 47%;
  --color-muted-foreground: hsl(var(--color-muted-foreground-hsl));

  /* Borders & Dividers */
  --color-border-hsl: 214 32% 91%;
  --color-border: hsl(var(--color-border-hsl));

  /* Status & Evidence Indicators */
  --color-success-hsl: 142 71% 45%;
  --color-success: hsl(var(--color-success-hsl));
  --color-info-hsl: 199 89% 48%;
  --color-info: hsl(var(--color-info-hsl));
}
```

#### Dark Mode
```css
.dark {
  --color-primary-hsl: 217 91% 60%;
  --color-primary: hsl(var(--color-primary-hsl));
  --color-primary-foreground: hsl(222 47% 11%);

  --color-background-hsl: 222 47% 10%;
  --color-background: hsl(var(--color-background-hsl));
  --color-surface-hsl: 222 47% 13%;
  --color-surface: hsl(var(--color-surface-hsl));
  --color-surface-card-hsl: 222 47% 15%;
  --color-surface-card: hsl(var(--color-surface-card-hsl));

  --color-foreground-hsl: 210 40% 98%;
  --color-foreground: hsl(var(--color-foreground-hsl));
  --color-muted-foreground-hsl: 215 20% 65%;
  --color-muted-foreground: hsl(var(--color-muted-foreground-hsl));

  --color-border-hsl: 217 33% 20%;
  --color-border: hsl(var(--color-border-hsl));
}
```

---

## 3. Typography & Bilingual Type Scales

- **English / Latin Font Family**: Inter, system-ui, -apple-system, sans-serif
- **Arabic Font Family**: Cairo, IBM Plex Sans Arabic, system-ui, sans-serif
- **Monospace (Code / Metadata)**: JetBrains Mono, Fira Code, ui-monospace, monospace

### Scale Definition
| Size | Tailwind Class | Rem / Px | Usage |
|---|---|---|---|
| `xs` | `text-xs` | 0.75rem (12px) | Metadata tags, date badges, evidence pills |
| `sm` | `text-sm` | 0.875rem (14px) | Secondary text, filter options, captions |
| `base` | `text-base` | 1.0rem (16px) | Body copy, card summaries |
| `lg` | `text-lg` | 1.125rem (18px) | Subheadings, card titles |
| `xl` | `text-xl` | 1.25rem (20px) | Section headings, modal titles |
| `2xl` | `text-2xl` | 1.5rem (24px) | Page sub-headers, collection titles |
| `3xl` | `text-3xl` | 1.875rem (30px) | Page titles, hero highlights |
| `4xl` | `text-4xl` | 2.25rem (36px) | Homepage main headline |

---

## 4. Layout & Spacing Tokens

- **Border Radius**:
  - `sm`: 0.25rem (4px) — inline tags, status dots
  - `md`: 0.375rem (6px) — filter buttons, input controls
  - `lg`: 0.5rem (8px) — evidence cards, project thumbnails
  - `xl`: 0.75rem (12px) — project cards, featured panels
  - `full`: 9999px — pill badges, avatar containers

- **Grid System**:
  - Catalogue: 1 column on mobile (`grid-cols-1`), 2 columns on tablet (`md:grid-cols-2`), 3 columns on desktop (`lg:grid-cols-3`).
  - Max container width: `max-w-7xl` (1280px) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
