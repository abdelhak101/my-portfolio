# Theme System

This document defines the theming architecture for **My Portfolio**, translating the [Design System](./DESIGN_SYSTEM.md) into technical implementation details utilizing Tailwind CSS, CSS custom properties, and bilingual layout rules.

## 1. Principles

- **Source of Truth**: All design values (colors, typography, spacing) are derived from `DESIGN_SYSTEM.md`.
- **Semantic Naming**: Use functional names (`primary`, `surface`, `foreground`, `border`) over literal color names.
- **System & User Preference**: Support system color scheme detection and manual toggle persisted via `localStorage`.
- **Directional Agility**: Fully responsive layout rules accommodating both LTR (`ltr`) and RTL (`rtl`) writing directions.

## 2. Design Tokens & CSS Variables

We use a **two-tier variable system** for colors. This allows global theming, dark mode transitions, and native CSS opacity modifiers (`hsl(var(--color-primary-hsl) / 0.8)`).

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Brand Accent */
    --color-primary-hsl: 221 83% 53%;
    --color-primary: hsl(var(--color-primary-hsl));
    --color-primary-foreground: hsl(0 0% 100%);

    /* Backgrounds & Surfaces */
    --color-background-hsl: 0 0% 100%;
    --color-background: hsl(var(--color-background-hsl));
    --color-surface-hsl: 210 20% 98%;
    --color-surface: hsl(var(--color-surface-hsl));
    --color-surface-card-hsl: 0 0% 100%;
    --color-surface-card: hsl(var(--color-surface-card-hsl));

    /* Typography / Foreground */
    --color-foreground-hsl: 222 47% 11%;
    --color-foreground: hsl(var(--color-foreground-hsl));
    --color-muted-foreground-hsl: 215 16% 47%;
    --color-muted-foreground: hsl(var(--color-muted-foreground-hsl));

    /* Borders & Inputs */
    --color-border-hsl: 214 32% 91%;
    --color-border: hsl(var(--color-border-hsl));
    --color-input-hsl: 214 32% 91%;
    --color-input: hsl(var(--color-input-hsl));

    /* Evidence & Status */
    --color-success-hsl: 142 71% 45%;
    --color-success: hsl(var(--color-success-hsl));
    --color-info-hsl: 199 89% 48%;
    --color-info: hsl(var(--color-info-hsl));

    /* Radii */
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-pill: 9999px;
  }

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
    --color-input-hsl: 217 33% 20%;
    --color-input: hsl(var(--color-input-hsl));
  }
}
```

## 3. Tailwind Configuration

Integrate design tokens seamlessly within `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary-hsl) / <alpha-value>)',
          foreground: 'var(--color-primary-foreground)',
        },
        background: 'hsl(var(--color-background-hsl) / <alpha-value>)',
        surface: {
          DEFAULT: 'hsl(var(--color-surface-hsl) / <alpha-value>)',
          card: 'hsl(var(--color-surface-card-hsl) / <alpha-value>)',
        },
        foreground: 'hsl(var(--color-foreground-hsl) / <alpha-value>)',
        muted: {
          foreground: 'hsl(var(--color-muted-foreground-hsl) / <alpha-value>)',
        },
        border: 'hsl(var(--color-border-hsl) / <alpha-value>)',
        input: 'hsl(var(--color-input-hsl) / <alpha-value>)',
        success: 'hsl(var(--color-success-hsl) / <alpha-value>)',
        info: 'hsl(var(--color-info-hsl) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
    },
  },
  plugins: [],
};
```

## 4. Theme & Locale Management

### Light / Dark Toggle Pattern
Store user selection in `localStorage` and synchronize before rendering to prevent FOUC (Flash of Unstyled Content):

```html
<script is:inline>
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  })();
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
</script>
```

### BiDi / Direction Management
Set `dir` and `lang` dynamically on root HTML in `BaseLayout.astro`:
```astro
---
const { lang = 'en' } = Astro.props;
const dir = lang === 'ar' ? 'rtl' : 'ltr';
---
<html lang={lang} dir={dir}>
  <head>
    ...
  </head>
  <body class={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
    <slot />
  </body>
</html>
```
