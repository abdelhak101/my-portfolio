/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsl(var(${variableName}) / ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: withOpacity('--color-bg-hsl'),
        surface: {
          DEFAULT: withOpacity('--color-surface-hsl'),
          raised: withOpacity('--color-surface-raised-hsl'),
        },
        text: {
          DEFAULT: withOpacity('--color-text-hsl'),
          muted: withOpacity('--color-text-muted-hsl'),
          subtle: withOpacity('--color-text-subtle-hsl'),
        },
        border: {
          DEFAULT: withOpacity('--color-border-hsl'),
          strong: withOpacity('--color-border-strong-hsl'),
        },
        inverse: {
          bg: withOpacity('--color-inverse-bg-hsl'),
          text: withOpacity('--color-inverse-text-hsl'),
        },
        focus: withOpacity('--color-focus-hsl'),
        success: withOpacity('--color-success-hsl'),
        warning: withOpacity('--color-warning-hsl'),
        danger: withOpacity('--color-danger-hsl'),
        info: withOpacity('--color-info-hsl'),
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        arabic: ['Tajawal', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
