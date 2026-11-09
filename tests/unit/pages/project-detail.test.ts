import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Project Detail Pages & Technical Evidence (PB-015, PB-016)', () => {
  const enDetailPath = resolve(process.cwd(), 'src/pages/projects/[id].astro');
  const arDetailPath = resolve(process.cwd(), 'src/pages/ar/projects/[id].astro');
  const componentPath = resolve(process.cwd(), 'src/components/project/ProjectDetail.astro');
  const headerPath = resolve(process.cwd(), 'src/components/common/Header.astro');

  const enContent = readFileSync(enDetailPath, 'utf-8');
  const arContent = readFileSync(arDetailPath, 'utf-8');
  const componentContent = readFileSync(componentPath, 'utf-8');
  const headerContent = readFileSync(headerPath, 'utf-8');

  it('provides dynamic route entrypoints for both English and Arabic', () => {
    expect(existsSync(enDetailPath)).toBe(true);
    expect(existsSync(arDetailPath)).toBe(true);
  });

  it('filters getStaticPaths for published status only', () => {
    expect(enContent).toContain("getCollection('projects'");
    expect(enContent).toContain("status === 'published'");
    expect(arContent).toContain("getCollection('projects'");
    expect(arContent).toContain("status === 'published'");
  });

  it('dynamically sets BaseLayout title, description, and directional attributes', () => {
    expect(enContent).toContain('title={pageTitle}');
    expect(enContent).toContain('description={pageDescription}');
    expect(enContent).toContain('lang="en"');
    expect(enContent).toContain('dir="ltr"');

    expect(arContent).toContain('title={pageTitle}');
    expect(arContent).toContain('description={pageDescription}');
    expect(arContent).toContain('lang="ar"');
    expect(arContent).toContain('dir="rtl"');
  });

  it('configures reciprocal switchTarget on Header for bilingual deep linking', () => {
    expect(enContent).toContain('switchTarget = `/ar/projects/${project.id}`');
    expect(enContent).toContain('switchTarget={switchTarget}');
    expect(arContent).toContain('switchTarget = `/projects/${project.id}`');
    expect(arContent).toContain('switchTarget={switchTarget}');
    expect(headerContent).toContain('switchTarget?: string');
  });

  it('renders breadcrumb back-navigation to catalog', () => {
    expect(componentContent).toContain('backToCatalog');
    expect(componentContent).toContain('catalogHref');
  });

  it('conditionally renders optional metadata and evidence sections without broken UI', () => {
    // Role is conditional
    expect(componentContent).toContain('role &&');
    // Links are conditional
    expect(componentContent).toContain('project.links.length > 0');
    // Cover is conditional
    expect(componentContent).toContain('project.cover &&');
    // Outcomes are conditional
    expect(componentContent).toContain('project.outcomes.length > 0');
    // Limitations are conditional (PB-016)
    expect(componentContent).toContain('project.limitations && project.limitations.length > 0');
    // Skills are conditional
    expect(componentContent).toContain('project.skills.length > 0');
    // Related projects are conditional
    expect(componentContent).toContain('relatedProjects.length > 0');
  });

  it('renders technical evidence artifacts with badges, hostname, and rel="noopener noreferrer" (PB-016)', () => {
    expect(componentContent).toContain('t.evidenceHeading');
    expect(componentContent).toContain('getHostFromUrl');
    expect(componentContent).toContain('linkTypeLabel');
    expect(componentContent).toContain('rel="noopener noreferrer"');
    expect(componentContent).toContain('target="_blank"');
  });

  it('provides Arabic localization dictionary for project detail sections including evidence and limitations', () => {
    expect(componentContent).toContain('العودة إلى المشاريع');
    expect(componentContent).toContain('الأدلة التقنية والوثائق');
    expect(componentContent).toContain('القيود الهندسية والمفاضلات');
    expect(componentContent).toContain('النتائج الرئيسية والأدلة');
    expect(componentContent).toContain('التقنيات والأدوات');
    expect(componentContent).toContain('مشاريع ذات صلة');
  });
});
