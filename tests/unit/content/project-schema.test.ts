import { describe, it, expect } from 'vitest';
import { projectSchema } from '../../../src/content/schemas/project';

describe('Project Content Schema (PB-004, PB-016)', () => {
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
        url: 'https://github.com/my-org/portfolio',
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
    limitations: [
      {
        en: 'Client-side search limited to in-memory datasets.',
        ar: 'البحث مقيد بالذاكرة للكتالوجات المحدودة.',
      },
    ],
  };

  describe('Positive Validation', () => {
    it('validates a complete project with all optional metadata', () => {
      const parsed = projectSchema.parse(validFullProject);
      expect(parsed.id).toBe('portfolio-v1');
      expect(parsed.status).toBe('published');
      expect(parsed.types).toEqual(['software', 'ui-ux']);
      expect(parsed.skills).toEqual(['Astro', 'TypeScript', 'Tailwind CSS']);
      expect(parsed.role?.en).toBe('Sole Designer & Developer');
      expect(parsed.date).toBe('2026-10-25');
      expect(parsed.links?.[0].url).toBe('https://github.com/my-org/portfolio');
      expect(parsed.outcomes?.[0].metric).toBe('100 Lighthouse score');
      expect(parsed.limitations?.[0].en).toBe('Client-side search limited to in-memory datasets.');
    });

    it('validates minimal required fields', () => {
      const parsed = projectSchema.parse(validMinimalProject);
      expect(parsed.id).toBe('portfolio-v1');
      expect(parsed.status).toBe('published');
      expect(parsed.skills).toEqual([]);
      expect(parsed.links).toEqual([]);
      expect(parsed.outcomes).toEqual([]);
      expect(parsed.limitations).toEqual([]);
      expect(parsed.relatedProjects).toEqual([]);
    });

    it('supports all valid project types enum values', () => {
      const types = [
        'software',
        'design',
        'ui-ux',
        'automation',
        'ai',
        'other',
      ] as const;

      for (const t of types) {
        const parsed = projectSchema.parse({
          ...validMinimalProject,
          types: [t],
        });
        expect(parsed.types).toEqual([t]);
      }
    });

    it('accepts valid date formats: YYYY, YYYY-MM, and YYYY-MM-DD', () => {
      const dates = ['2026', '2026-10', '2026-10-25'];
      for (const d of dates) {
        const parsed = projectSchema.parse({
          ...validMinimalProject,
          date: d,
        });
        expect(parsed.date).toBe(d);
      }
    });

    it('accepts draft status for projects', () => {
      const parsed = projectSchema.parse({
        ...validMinimalProject,
        status: 'draft',
      });
      expect(parsed.status).toBe('draft');
    });
  });

  describe('Negative Validation & Integrity', () => {
    it('fails when id is missing or empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          id: '',
        })
      ).toThrow('ID must be kebab-case lowercase alphanumeric');
    });

    it('fails when id contains uppercase characters or underscores', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          id: 'Portfolio_V1',
        })
      ).toThrow('ID must be kebab-case lowercase alphanumeric');
    });

    it('fails when title is missing in either language', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          title: { en: 'Only English' },
        })
      ).toThrow();
    });

    it('fails when summary is missing or empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          summary: { en: '', ar: 'عربي فقط' },
        })
      ).toThrow('English text is required');
    });

    it('fails when types array is empty', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          types: [],
        })
      ).toThrow('At least one project type is required');
    });

    it('fails when an invalid project type is provided', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          types: ['invalid-type'],
        })
      ).toThrow();
    });

    it('fails when an invalid URL is provided in links', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          links: [
            {
              url: 'not-a-valid-url',
              label: { en: 'Test', ar: 'اختبار' },
            },
          ],
        })
      ).toThrow('Must be a valid URL');
    });

    it('fails when published project contains placeholder or unverified URL (PB-016)', () => {
      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          status: 'published',
          links: [
            {
              url: 'https://example.com/repo',
              label: { en: 'Repo', ar: 'مستودع' },
            },
          ],
        })
      ).toThrow(/Published project cannot contain placeholder or unverified URL/);

      expect(() =>
        projectSchema.parse({
          ...validMinimalProject,
          status: 'published',
          links: [
            {
              url: 'http://localhost:3000',
              label: { en: 'Demo', ar: 'عرض' },
            },
          ],
        })
      ).toThrow(/Published project cannot contain placeholder or unverified URL/);
    });

    it('allows placeholder URL in draft projects (PB-016)', () => {
      const draft = projectSchema.parse({
        ...validMinimalProject,
        status: 'draft',
        links: [
          {
            url: 'https://example.com/wip',
            label: { en: 'WIP', ar: 'قيد العمل' },
          },
        ],
      });
      expect(draft.status).toBe('draft');
      expect(draft.links[0].url).toBe('https://example.com/wip');
    });

    it('fails when date format is invalid', () => {
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
