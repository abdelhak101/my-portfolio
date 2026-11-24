import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

function getAstroFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAstroFiles(fullPath));
    } else if (entry.endsWith('.astro')) {
      files.push(fullPath);
    }
  }

  return files;
}

describe('Bidirectional Layout & Logical Properties (PB-020)', () => {
  const rootDir = process.cwd();
  const componentsDir = resolve(rootDir, 'src/components');
  const pagesDir = resolve(rootDir, 'src/pages');
  const globalsCssPath = resolve(rootDir, 'src/styles/globals.css');
  const baseLayoutPath = resolve(rootDir, 'src/layouts/BaseLayout.astro');
  const projectDetailPath = resolve(rootDir, 'src/components/project/ProjectDetail.astro');

  it('prohibits physical directional Tailwind classes across all components and pages', () => {
    const allFiles = [...getAstroFiles(componentsDir), ...getAstroFiles(pagesDir)];
    const physicalPattern = /\b(pl-\d+|pr-\d+|ml-\d+|mr-\d+|left-\d+|right-\d+|text-left|text-right)\b/g;

    const violations: Array<{ file: string; matches: string[] }> = [];

    for (const file of allFiles) {
      const content = readFileSync(file, 'utf-8');
      const matches = content.match(physicalPattern);
      if (matches && matches.length > 0) {
        violations.push({ file, matches });
      }
    }

    expect(
      violations,
      `Found forbidden physical directional classes: ${JSON.stringify(violations, null, 2)}`
    ).toEqual([]);
  });

  it('BaseLayout derives resolvedDir as rtl for Arabic and ltr for English', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');
    expect(content).toContain("const resolvedDir = dir ?? (lang === 'ar' ? 'rtl' : 'ltr');");
    expect(content).toContain('<html lang={lang} dir={resolvedDir}');
  });

  it('globals.css includes unicode-bidi isolate for mixed code and text', () => {
    const content = readFileSync(globalsCssPath, 'utf-8');
    expect(content).toContain('unicode-bidi: isolate;');
  });

  it('ProjectDetail mirrors navigational back arrow in RTL', () => {
    const content = readFileSync(projectDetailPath, 'utf-8');
    expect(content).toContain('rtl:rotate-180');
    expect(content).toContain('<span class="inline-block rtl:rotate-180 me-1.5" aria-hidden="true">←</span>');
  });

  it('ProjectDetail and ProjectCard isolate timestamps with dir="ltr"', () => {
    const detailContent = readFileSync(projectDetailPath, 'utf-8');
    const cardContent = readFileSync(resolve(rootDir, 'src/components/ui/ProjectCard.astro'), 'utf-8');

    expect(detailContent).toContain('<time datetime={project.date} dir="ltr"');
    expect(cardContent).toContain('<time datetime={date} dir="ltr"');
  });
});
