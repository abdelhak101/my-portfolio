import { describe, expect, it } from 'vitest';
import { collectionSchema } from '../../../src/content/schemas/collection';

describe('collectionSchema', () => {
  const validFullCollection = {
    id: 'featured-works',
    status: 'published',
    title: {
      en: 'Featured Works',
      ar: 'أعمال مميزة',
    },
    summary: {
      en: 'A hand-picked selection of top projects and achievements.',
      ar: 'مجموعة مختارة بعناية لأبرز المشاريع والإنجازات.',
    },
    projects: ['portfolio', 'design-system'],
    featured: true,
    order: 1,
    cover: {
      src: '/images/collections/featured.webp',
      alt: {
        en: 'Featured works showcase cover',
        ar: 'صورة غلاف معرض الأعمال المميزة',
      },
    },
  };

  it('validates a complete, valid collection entry', () => {
    const result = collectionSchema.safeParse(validFullCollection);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('featured-works');
      expect(result.data.projects).toEqual(['portfolio', 'design-system']);
      expect(result.data.featured).toBe(true);
      expect(result.data.order).toBe(1);
    }
  });

  it('validates a minimal valid collection entry and applies defaults', () => {
    const minimalCollection = {
      id: 'open-source',
      status: 'draft',
      title: {
        en: 'Open Source',
        ar: 'مشاريع مفتوحة المصدر',
      },
      summary: {
        en: 'Public libraries and tools.',
        ar: 'مكتبات وأدوات عامة.',
      },
    };

    const result = collectionSchema.safeParse(minimalCollection);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.projects).toEqual([]);
      expect(result.data.featured).toBe(false);
      expect(result.data.order).toBeUndefined();
      expect(result.data.cover).toBeUndefined();
    }
  });

  it('fails when duplicate project IDs exist in projects array', () => {
    const duplicateProjects = {
      ...validFullCollection,
      projects: ['portfolio', 'design-system', 'portfolio'],
    };

    const result = collectionSchema.safeParse(duplicateProjects);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(
        messages.some((msg) =>
          msg.includes('Duplicate project ID detected: "portfolio"')
        )
      ).toBe(true);
    }
  });

  it('fails when collection ID is not kebab-case lowercase', () => {
    const invalidIds = [
      'FeaturedWorks',
      'featured_works',
      'featured works',
      'featured!',
      '',
    ];

    for (const id of invalidIds) {
      const result = collectionSchema.safeParse({
        ...validFullCollection,
        id,
      });
      expect(result.success).toBe(false);
    }
  });

  it('fails when any project ID in projects is not kebab-case lowercase', () => {
    const invalidProjectIds = [
      ['InvalidProject'],
      ['valid-proj', 'bad_proj'],
      ['valid-proj', 'has space'],
    ];

    for (const projects of invalidProjectIds) {
      const result = collectionSchema.safeParse({
        ...validFullCollection,
        projects,
      });
      expect(result.success).toBe(false);
    }
  });

  it('fails when title missing en or ar text', () => {
    const missingEn = {
      ...validFullCollection,
      title: { ar: 'عنوان' },
    };
    const missingAr = {
      ...validFullCollection,
      title: { en: 'Title' },
    };

    expect(collectionSchema.safeParse(missingEn).success).toBe(false);
    expect(collectionSchema.safeParse(missingAr).success).toBe(false);
  });

  it('fails when summary missing en or ar text', () => {
    const missingEn = {
      ...validFullCollection,
      summary: { ar: 'ملخص' },
    };
    const missingAr = {
      ...validFullCollection,
      summary: { en: 'Summary' },
    };

    expect(collectionSchema.safeParse(missingEn).success).toBe(false);
    expect(collectionSchema.safeParse(missingAr).success).toBe(false);
  });

  it('fails on invalid status value', () => {
    const invalidStatus = {
      ...validFullCollection,
      status: 'archived',
    };

    expect(collectionSchema.safeParse(invalidStatus).success).toBe(false);
  });
});
