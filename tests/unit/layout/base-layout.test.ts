import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Global Page Layout Architecture (PB-009)', () => {
  const skipLinkPath = resolve(process.cwd(), 'src/components/common/SkipLink.astro');
  const headerPath = resolve(process.cwd(), 'src/components/common/Header.astro');
  const footerPath = resolve(process.cwd(), 'src/components/common/Footer.astro');
  const baseLayoutPath = resolve(process.cwd(), 'src/layouts/BaseLayout.astro');

  const skipLinkContent = readFileSync(skipLinkPath, 'utf-8');
  const headerContent = readFileSync(headerPath, 'utf-8');
  const footerContent = readFileSync(footerPath, 'utf-8');
  const baseLayoutContent = readFileSync(baseLayoutPath, 'utf-8');

  it('SkipLink targets main-content with accessible focus and logical coordinates', () => {
    expect(skipLinkContent).toContain('href={`#${targetId}`}');
    expect(skipLinkContent).toContain("targetId = 'main-content'");
    expect(skipLinkContent).toContain('sr-only');
    expect(skipLinkContent).toContain('focus:not-sr-only');
    expect(skipLinkContent).toContain('focus:fixed');
    expect(skipLinkContent).toContain('focus:start-4');
    expect(skipLinkContent).toContain('focus:ring-focus');
  });

  it('Header contains semantic header, max-w-[1200px] container, and labeled navigation', () => {
    expect(headerContent).toContain('<header');
    expect(headerContent).toContain('border-b');
    expect(headerContent).toContain('max-w-[1200px]');
    expect(headerContent).toContain('<nav aria-label="Main navigation">');
    expect(headerContent).toContain('aria-label="Portfolio Home"');
    expect(headerContent).toContain('focus-visible:ring-focus');
    expect(headerContent).toContain('Projects');
    expect(headerContent).toContain('Collections');
    expect(headerContent).toContain('About');
  });

  it('Footer contains semantic footer and responsive container with evidence statement', () => {
    expect(footerContent).toContain('<footer');
    expect(footerContent).toContain('border-t');
    expect(footerContent).toContain('max-w-[1200px]');
    expect(footerContent).toContain('href="#main-content"');
    expect(footerContent).toContain('Evidence-driven');
    expect(footerContent).toContain('focus-visible:ring-focus');
  });

  it('BaseLayout composes layout components, handles RTL derivation, and wraps main container', () => {
    expect(baseLayoutContent).toContain("import SkipLink from '../components/common/SkipLink.astro'");
    expect(baseLayoutContent).toContain("import Header from '../components/common/Header.astro'");
    expect(baseLayoutContent).toContain("import Footer from '../components/common/Footer.astro'");
    expect(baseLayoutContent).toContain("import '../styles/globals.css'");

    expect(baseLayoutContent).toContain('<SkipLink />');
    expect(baseLayoutContent).toContain('<Header />');
    expect(baseLayoutContent).toContain('<main');
    expect(baseLayoutContent).toContain('id="main-content"');
    expect(baseLayoutContent).toContain('tabindex="-1"');
    expect(baseLayoutContent).toContain('max-w-[1200px]');
    expect(baseLayoutContent).toContain('<slot />');
    expect(baseLayoutContent).toContain('<Footer />');

    expect(baseLayoutContent).toContain("dir ?? (lang === 'ar' ? 'rtl' : 'ltr')");
    expect(baseLayoutContent).toContain('<html lang={lang} dir={resolvedDir}');
  });
});
