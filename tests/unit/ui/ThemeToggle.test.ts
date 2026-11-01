import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('ThemeToggle component and theme switching (PB-021)', () => {
  const togglePath = resolve(process.cwd(), 'src/components/common/ThemeToggle.astro');
  const layoutPath = resolve(process.cwd(), 'src/layouts/BaseLayout.astro');
  const headerPath = resolve(process.cwd(), 'src/components/common/Header.astro');
  const globalsCssPath = resolve(process.cwd(), 'src/styles/globals.css');

  const toggleContent = readFileSync(togglePath, 'utf-8');
  const layoutContent = readFileSync(layoutPath, 'utf-8');
  const headerContent = readFileSync(headerPath, 'utf-8');
  const globalsCssContent = readFileSync(globalsCssPath, 'utf-8');

  it('renders a button element with correct ID and accessibility attributes', () => {
    expect(toggleContent).toContain('<button');
    expect(toggleContent).toContain('id="theme-toggle"');
    expect(toggleContent).toContain('type="button"');
    expect(toggleContent).toContain('aria-label=');
    expect(toggleContent).toContain('focus-visible:ring-focus');
  });

  it('contains both sun and moon SVG icons with Tailwind dark visibility classes', () => {
    expect(toggleContent).toContain('dark:block');
    expect(toggleContent).toContain('dark:hidden');
    expect(toggleContent).toContain('<svg');
    const svgCount = (toggleContent.match(/<svg/g) || []).length;
    expect(svgCount).toBe(2);
  });

  it('contains client script for toggling theme and persisting to localStorage', () => {
    expect(toggleContent).toContain('document.documentElement.classList.toggle');
    expect(toggleContent).toContain("localStorage.setItem('theme'");
    expect(toggleContent).toContain('updateAriaLabel');
    expect(toggleContent).toContain('astro:after-swap');
  });

  it('BaseLayout includes inline script in <head> for flash prevention', () => {
    expect(layoutContent).toContain('<script is:inline>');
    expect(layoutContent).toContain("localStorage.getItem('theme')");
    expect(layoutContent).toContain('prefers-color-scheme: dark');
    expect(layoutContent).toContain("document.documentElement.classList.toggle('dark'");
  });

  it('globals.css defines smooth transition on html for color and background-color', () => {
    expect(globalsCssContent).toContain('transition: color 150ms ease, background-color 150ms ease;');
  });

  it('Header component renders ThemeToggle in navigation', () => {
    expect(headerContent).toContain("import ThemeToggle from './ThemeToggle.astro'");
    expect(headerContent).toContain('<ThemeToggle />');
  });
});
