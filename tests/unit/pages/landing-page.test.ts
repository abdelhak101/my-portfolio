import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Landing Page Architecture & i18n (PB-011 & PB-012)', () => {
  const enPagePath = resolve(process.cwd(), 'src/pages/index.astro');
  const arPagePath = resolve(process.cwd(), 'src/pages/ar/index.astro');
  const heroPath = resolve(process.cwd(), 'src/components/landing/LandingHero.astro');
  const collectionsPath = resolve(process.cwd(), 'src/components/landing/CollectionSection.astro');
  const catalogPath = resolve(process.cwd(), 'src/components/landing/ProjectCatalog.astro');
  const headerPath = resolve(process.cwd(), 'src/components/common/Header.astro');

  const enContent = readFileSync(enPagePath, 'utf-8');
  const arContent = readFileSync(arPagePath, 'utf-8');
  const heroContent = readFileSync(heroPath, 'utf-8');
  const collectionsContent = readFileSync(collectionsPath, 'utf-8');
  const catalogContent = readFileSync(catalogPath, 'utf-8');
  const headerContent = readFileSync(headerPath, 'utf-8');

  it('provides both English and Arabic landing page entry points', () => {
    expect(existsSync(enPagePath)).toBe(true);
    expect(existsSync(arPagePath)).toBe(true);
  });

  it('configures proper lang and dir attributes on BaseLayout for EN and AR', () => {
    expect(enContent).toContain('lang="en"');
    expect(enContent).toContain('dir="ltr"');
    expect(arContent).toContain('lang="ar"');
    expect(arContent).toContain('dir="rtl"');
  });

  it('queries canonical collections and resolves project references', () => {
    expect(enContent).toContain("getCollection('projects'");
    expect(enContent).toContain("getCollection('collections'");
    expect(enContent).toContain('resolveCollection');

    expect(arContent).toContain("getCollection('projects'");
    expect(arContent).toContain("getCollection('collections'");
    expect(arContent).toContain('resolveCollection');
  });

  it('LandingHero communicates portfolio purpose and provides jump links', () => {
    expect(heroContent).toContain('href="#projects"');
    expect(heroContent).toContain('href="#collections"');
    expect(heroContent).toContain('Evidence-Driven Software');
    expect(heroContent).toContain('أنظمة برمجية وهندسة ذكاء اصطناعي');
  });

  it('CollectionSection defines section anchor and renders curated collections', () => {
    expect(collectionsContent).toContain('id="collections"');
    expect(collectionsContent).toContain('<ProjectCard');
    expect(collectionsContent).toContain('col.data.summary');
  });

  it('ProjectCatalog defines section anchor and renders responsive project grid and empty state', () => {
    expect(catalogContent).toContain('id="projects"');
    expect(catalogContent).toContain('grid');
    expect(catalogContent).toContain('<ProjectCard');
    expect(catalogContent).toContain('emptyTitle');
    expect(catalogContent).toContain('emptyDescription');
    expect(catalogContent).toContain('border-dashed');
  });

  it('Header contains accessible language switcher linking between / and /ar', () => {
    expect(headerContent).toContain("switchTarget = lang === 'ar' ? '/' : '/ar'");
    expect(headerContent).toContain("switchLabel = lang === 'ar' ? 'English' : 'العربية'");
    expect(headerContent).toContain('href={switchTarget}');
  });
});
