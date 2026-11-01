import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import tailwindConfig from '../../../tailwind.config.mjs';

describe('Design Tokens Architecture', () => {
  const globalsCss = readFileSync(resolve(process.cwd(), 'src/styles/globals.css'), 'utf-8');

  it('defines required root CSS color variables', () => {
    const requiredRootTokens = [
      '--color-bg-hsl',
      '--color-bg',
      '--color-surface-hsl',
      '--color-surface',
      '--color-surface-raised-hsl',
      '--color-surface-raised',
      '--color-text-hsl',
      '--color-text',
      '--color-text-muted-hsl',
      '--color-text-muted',
      '--color-text-subtle-hsl',
      '--color-text-subtle',
      '--color-border-hsl',
      '--color-border',
      '--color-border-strong-hsl',
      '--color-border-strong',
      '--color-inverse-bg-hsl',
      '--color-inverse-bg',
      '--color-inverse-text-hsl',
      '--color-inverse-text',
      '--color-focus-hsl',
      '--color-focus',
      '--color-success-hsl',
      '--color-warning-hsl',
      '--color-danger-hsl',
      '--color-info-hsl',
    ];

    for (const token of requiredRootTokens) {
      expect(globalsCss).toContain(token);
    }
  });

  it('defines required mixed radii variables in globals.css', () => {
    const requiredRadii = [
      '--radius-none: 0px;',
      '--radius-sm: 4px;',
      '--radius-md: 8px;',
      '--radius-lg: 12px;',
      '--radius-pill: 9999px;',
    ];

    for (const radius of requiredRadii) {
      expect(globalsCss).toContain(radius);
    }
  });

  it('defines dark theme overrides inside .dark selector', () => {
    expect(globalsCss).toContain('.dark {');
    const darkSection = globalsCss.split('.dark {')[1];
    expect(darkSection).toBeDefined();

    expect(darkSection).toContain('--color-bg-hsl: 0 0% 7%;');
    expect(darkSection).toContain('--color-surface-hsl: 0 0% 10%;');
    expect(darkSection).toContain('--color-text-hsl: 0 0% 96%;');
    expect(darkSection).toContain('--color-border-hsl: 0 0% 20%;');
  });

  it('configures Tailwind with class darkMode and design token extensions', () => {
    expect(tailwindConfig.darkMode).toBe('class');
    expect(tailwindConfig.theme?.extend?.colors).toBeDefined();

    const colors = tailwindConfig.theme.extend.colors;
    expect(typeof colors.bg).toBe('function');
    expect(typeof colors.surface.DEFAULT).toBe('function');
    expect(typeof colors.surface.raised).toBe('function');
    expect(typeof colors.text.DEFAULT).toBe('function');
    expect(typeof colors.text.muted).toBe('function');
    expect(typeof colors.border.DEFAULT).toBe('function');
    expect(typeof colors.inverse.bg).toBe('function');

    const radii = tailwindConfig.theme.extend.borderRadius;
    expect(radii).toEqual({
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      pill: '9999px',
    });

    const fonts = tailwindConfig.theme.extend.fontFamily;
    expect(fonts.sans).toBeDefined();
    expect(fonts.serif).toBeDefined();
    expect(fonts.mono).toBeDefined();
    expect(fonts.arabic).toBeDefined();
  });
});
