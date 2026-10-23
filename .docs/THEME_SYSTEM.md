# Theme System

This document defines the theming architecture for **My Portfolio**, translating the [Design System](./DESIGN_SYSTEM.md) and design specifications into technical implementation details utilizing Tailwind CSS, CSS custom properties, and bilingual layout rules.

## 1. Principles

- **Source of Truth**: All design values (colors, typography, spacing, radii) are derived from `DESIGN_SYSTEM.md` and `docs/03-design/`.
- **Monochrome-First Tokens**: Neutral grays, pure blacks, and clean whites form the foundation; functional accents (focus, alert) remain strictly utility-driven.
- **System & User Preference**: Support system color scheme detection and manual toggle persisted via `localStorage`.
- **Directional Agility**: Fully responsive layout rules accommodating both LTR (`ltr`) and RTL (`rtl`) writing directions.

## 2. Design Tokens & CSS Variables

We use a **two-tier variable system** for colors. This allows global theming, dark mode transitions, and native CSS opacity modifiers (`hsl(var(--color-bg-hsl) / 0.8)`).

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Canvas & Surfaces */
    --color-bg-hsl: 0 0% 100%;                  /* #FFFFFF */
    --color-bg: hsl(var(--color-bg-hsl));
    --color-surface-hsl: 0 0% 97%;             /* #F7F7F7 */
    --color-surface: hsl(var(--color-surface-hsl));
    --color-surface-raised-hsl: 0 0% 100%;      /* #FFFFFF */
    --color-surface-raised: hsl(var(--color-surface-raised-hsl));

    /* Typography / Foreground */
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

    /* High-Contrast Inverse */
    --color-inverse-bg-hsl: 0 0% 7%;            /* #111111 */
    --color-inverse-bg: hsl(var(--color-inverse-bg-hsl));
    --color-inverse-text-hsl: 0 0% 100%;        /* #FFFFFF */
    --color-inverse-text: hsl(var(--color-inverse-text-hsl));

    /* Functional States */
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

    /* Radii */
    --radius-none: 0px;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-pill: 9999px;
  }

  .dark {
    /* Canvas & Surfaces */
    --color-bg-hsl: 0 0% 7%;                    /* #111111 */
    --color-bg: hsl(var(--color-bg-hsl));
    --color-surface-hsl: 0 0% 10%;              /* #191919 */
    --color-surface: hsl(var(--color-surface-hsl));
    --color-surface-raised-hsl: 0 0% 13%;       /* #222222 */
    --color-surface-raised: hsl(var(--color-surface-raised-hsl));

    /* Typography / Foreground */
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
    --color-focus-hsl: 224 100% 78%;            /* #8EADFF */
    --color-focus: hsl(var(--color-focus-hsl));
  }
}
```

## 3. Tailwind Configuration

Integrate design tokens within `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'hsl(var(--color-bg-hsl) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'hsl(var(--color-surface-hsl) / <alpha-value>)',
          raised: 'hsl(var(--color-surface-raised-hsl) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'hsl(var(--color-text-hsl) / <alpha-value>)',
          muted: 'hsl(var(--color-text-muted-hsl) / <alpha-value>)',
          subtle: 'hsl(var(--color-text-subtle-hsl) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'hsl(var(--color-border-hsl) / <alpha-value>)',
          strong: 'hsl(var(--color-border-strong-hsl) / <alpha-value>)',
        },
        inverse: {
          bg: 'hsl(var(--color-inverse-bg-hsl) / <alpha-value>)',
          text: 'hsl(var(--color-inverse-text-hsl) / <alpha-value>)',
        },
        focus: 'hsl(var(--color-focus-hsl) / <alpha-value>)',
        success: 'hsl(var(--color-success-hsl) / <alpha-value>)',
        warning: 'hsl(var(--color-warning-hsl) / <alpha-value>)',
        danger: 'hsl(var(--color-danger-hsl) / <alpha-value>)',
        info: 'hsl(var(--color-info-hsl) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Cairo', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};
```

## 4. Theme & Direction Management

### Theme Initialization Script (Flash Prevention)
Injected in the `<head>` of `BaseLayout.astro`:
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

### Layout Direction Binding
Set `dir` and `lang` dynamically on root HTML in `BaseLayout.astro`:
```astro
---
const { lang = 'en' } = Astro.props;
const dir = lang === 'ar' ? 'rtl' : 'ltr';
---
<html lang={lang} dir={dir} class="scroll-smooth">
  <head>
    ...
  </head>
  <body class={`bg-bg text-text min-h-screen ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
    <slot />
  </body>
</html>
```
