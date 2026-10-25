import { describe, it, expect } from 'vitest';
import { projectSchema } from '../../../src/content/schemas/project';

describe('Project Content Schema (PB-004)', () => {
  const validMinimalProject = {
    id: 'portfolio-v1',
    status: 'published' as const,
    title: {
      en: 'Personal Portfolio',
      ar: 'الموقع الشخصي',
    },
    summary: {
      en: 'A fast, accessible bilingual personal portfolio.',
      ar: 'موقع شخصي سريع ومتاح ثنائي اللغة.',
    },
    types: ['software', 'ui-ux'] as const,
  };

  const validFullProject = {
    ...validMinimalProject,
    role: {
      en: 'Sole Designer & Developer',
      ar: 'المصمم والمطور الوحيد',
    },
    skills: ['Astro', 'TypeScript', 'Tailwind CSS'],
    date: '2026-10-25',
    cover: {
      src: '/images/projects/portfolio-cover.jpg',
      alt: {
        en: 'Screenshot of portfolio landing page',
        ar: 'لقطة شاشة للصفحة الرئيسية للموقع الشخصي',
      },
    },
    links: [
      {
        url: 'https://github.com/example/portfolio',
        label: {
          en: 'Source Code',
          ar: 'المصدر البرمجي',
        },
        type: 'repo' as const,
      },
    ],
    outcomes: [
      {
        metric: '100 Lighthouse score',
        description: {
          en: 'Achieved top scores across Performance, Accessibility, and SEO.',
          ar: 'تحقيق أعلى التقييمات في الأداء وسهولة الوصول ومحركات البحث.',
        },
      },
    ],
  };

  describe('Positive Validation', () => {
    it('validates a complete project with all optional metadata', () => {
      const parsed = projectSchema.parse(validFullProject);
      expect(parsed.id).toBe('portfolio-v1');
      expect(parsed.status).toBe('published');
      expect(parsed.types).toEqual(['software', 'ui-ux']);
      expect(parsed.skills).toHaveLength(3);
      expect(parsed.links).toHaveLength(1);
      expect(parsed.outcomes).toHaveLength(1);
    });

    it('validates a minimal project with only required fields and sets defaults', () => {
      const parsed = projectSchema.parse(validMinimalProject);
      expect(parsed.id).toBe('portfolio-v1');
      expect(parsed.skills).toEqual([]);
      expect(parsed.links).toEqual([]);
      expect(parsed.outcomes).toEqual([]);
      expect(parsed.role).toBeUndefined();
      expect(parsed.cover).toBeUndefined();
      expect(parsed.date).toBeUndefined();
    });

    it('accepts draft status', () => {
      const parsed = projectSchema.parse({
        ...validMinimalProject,
        status: 'draft',
      });
      expect(parsed.status).toBe('draft');
    });

    it('accepts valid date variations (YYYY, YYYY-MM, YYYY-MM-DD)', () => {
      expect(projectSchema.parse({ ...validMinimalProject, date: '2026' }).date).toBe('2026');
      expect(projectSchema.parse({ ...validMinimalProject, date: '2026-10' }).date).toBe('2026-10');
      expect(projectSchema.parse({ ...validMinimalProject, date: '2026-10-25' }).date).toBe('2026-10-25');
    });
  });

  describe('Identifier Validation', () => {
    it('rejects non-kebab-case or capitalized IDs', () => {
      expect(() => projectSchema.parse({ ...validMinimalProject, id: 'Portfolio_V1' })).toThrow();
      expect(() => projectSchema.parse({ ...validMinimalProject, id: 'portfolio v1' })).toThrow();
      expect(() => projectSchema.parse({ ...validMinimalProject, id: '-portfolio-' })).toThrow();
      expect(() => projectSchema.parse({ ...validMinimalProject, id: '' })).toThrow();
    });
  });

  describe('Localization Validation', () => {
    it('fails when Arabic title is missing or empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          title: { en: 'Title only', ar: '' },
        })
      ).toThrow(/Arabic text is required/);
    });

    it('fails when English title is missing or empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          title: { en: '', ar: 'عنوان فقط' },
        })
      ).toThrow(/English text is required/);
    });

    it('fails when Arabic summary is missing or empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          summary: { en: 'Summary', ar: '' },
        })
      ).toThrow(/Arabic text is required/);
    });

    it('fails when English summary is missing or empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          summary: { en: '', ar: 'ملخص' },
        })
      ).toThrow(/English text is required/);
    });
  });

  describe('Project Types Taxonomy', () => {
    it('fails when types array is empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          types: [],
        })
      ).toThrow(/At least one project type is required/);
    });

    it('fails when an unsupported project type is provided', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          types: ['software', 'unsupported-type' as any],
        })
      ).toThrow();
    });
  });

  describe('Links and URLs Validation', () => {
    it('fails when a link has an invalid URL', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          links: [
            {
              url: 'not-a-valid-url',
              label: { en: 'Demo', ar: 'عرض' },
            },
          ],
        })
      ).toThrow(/Must be a valid URL/);
    });

    it('fails when link label is missing a required language', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          links: [
            {
              url: 'https://example.com',
              label: { en: 'Demo' } as any,
            },
          ],
        })
      ).toThrow();
    });
  });

  describe('Date Format Validation', () => {
    it('fails on malformed date string', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          date: '25-10-2026',
        })
      ).toThrow(/Date must be YYYY, YYYY-MM, or YYYY-MM-DD/);

      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          date: 'invalid-date',
        })
      ).toThrow(/Date must be YYYY, YYYY-MM, or YYYY-MM-DD/);
    });
  });

  describe('Related Projects Validation (PB-006)', () => {
    it('defaults relatedProjects to an empty array', () => {
      const parsed = projectSchema.parse(validMinimalProject);
      expect(parsed.relatedProjects).toEqual([]);
    });

    it('validates valid related project IDs', () => {
      const parsed = projectSchema.parse({
        ...validMinimalProject,
        relatedProjects: ['other-project', 'design-system'],
      });
      expect(parsed.relatedProjects).toEqual([
        'other-project',
        'design-system',
      ]);
    });

    it('fails when project references itself in relatedProjects', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          id: 'portfolio-v1',
          relatedProjects: ['portfolio-v1'],
        })
      ).toThrow(/Project cannot reference itself in relatedProjects/);
    });

    it('fails when relatedProjects contains duplicates', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          relatedProjects: ['other-project', 'other-project'],
        })
      ).toThrow(/Duplicate project ID detected in relatedProjects/);
    });

    it('fails when relatedProjects contains invalid kebab-case IDs', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          relatedProjects: ['InvalidProjectID'],
        })
      ).toThrow('Related project ID must be kebab-case lowercase alphanumeric');
    });
  });
});
