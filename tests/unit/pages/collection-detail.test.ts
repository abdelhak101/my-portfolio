import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Collection Detail Pages & Component (PB-022)', () => {
  const rootDir = process.cwd();
  const collectionDetailPath = resolve(rootDir, 'src/components/collection/CollectionDetail.astro');
  const enPagePath = resolve(rootDir, 'src/pages/collections/[id].astro');
  const arPagePath = resolve(rootDir, 'src/pages/ar/collections/[id].astro');
  const landingCollectionSectionPath = resolve(rootDir, 'src/components/landing/CollectionSection.astro');

  const detailContent = readFileSync(collectionDetailPath, 'utf-8');
  const enPageContent = readFileSync(enPagePath, 'utf-8');
  const arPageContent = readFileSync(arPagePath, 'utf-8');
  const landingSectionContent = readFileSync(landingCollectionSectionPath, 'utf-8');

  it('CollectionDetail renders back navigation with mirrored arrow in RTL', () => {
    expect(detailContent).toContain('href={t.catalogHref}');
    expect(detailContent).toContain('rtl:rotate-180');
    expect(detailContent).toContain('{t.backToCatalog}');
  });

  it('CollectionDetail renders canonical ProjectCard and handles empty states', () => {
    expect(detailContent).toContain("import ProjectCard from '../ui/ProjectCard.astro'");
    expect(detailContent).toContain('<ProjectCard project={project} lang={lang} />');
    expect(detailContent).toContain("import Placeholder from '../ui/Placeholder.astro'");
    expect(detailContent).toContain('<Placeholder type="empty" message={t.emptyProjects}');
  });

  it('CollectionDetail renders link to full portfolio in footer', () => {
    expect(detailContent).toContain('{t.exploreAllAction}');
    expect(detailContent).toContain('href={t.catalogHref}');
  });

  it('English collection page configures getStaticPaths and BaseLayout', () => {
    expect(enPageContent).toContain("getCollection('collections'");
    expect(enPageContent).toContain("getCollection('projects'");
    expect(enPageContent).toContain('filterMissing: true');
    expect(enPageContent).toContain('<BaseLayout title={pageTitle} description={pageDescription} lang="en" dir="ltr">');
    expect(enPageContent).toContain('<CollectionDetail collection={collection} projects={projects} lang="en" />');
  });

  it('Arabic collection page configures getStaticPaths and BaseLayout', () => {
    expect(arPageContent).toContain("getCollection('collections'");
    expect(arPageContent).toContain("getCollection('projects'");
    expect(arPageContent).toContain('filterMissing: true');
    expect(arPageContent).toContain('<BaseLayout title={pageTitle} description={pageDescription} lang="ar" dir="rtl">');
    expect(arPageContent).toContain('<CollectionDetail collection={collection} projects={projects} lang="ar" />');
  });

  it('Landing CollectionSection links cards to dedicated collection routes', () => {
    expect(landingSectionContent).toContain("lang === 'ar' ? `/ar/collections/${col.id}` : `/collections/${col.id}`");
    expect(landingSectionContent).toContain('href={collectionHref}');
  });
});
