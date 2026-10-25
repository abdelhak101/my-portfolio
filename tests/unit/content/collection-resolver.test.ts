import { describe, expect, it } from 'vitest';
import { resolveCollection } from '../../../src/content/queries/collections';
import type { Collection } from '../../../src/content/schemas/collection';

describe('resolveCollection', () => {
  const mockCollectionData: Collection = {
    id: 'featured-works',
    status: 'published',
    title: {
      en: 'Featured Works',
      ar: 'أعمال مميزة',
    },
    summary: {
      en: 'A hand-picked selection of top projects.',
      ar: 'مجموعة مختارة بعناية لأبرز المشاريع.',
    },
    projects: ['proj-2', 'proj-1'],
    featured: true,
  };

  const mockProjects = [
    { id: 'proj-1', title: 'Project 1' },
    { id: 'proj-2', title: 'Project 2' },
    { id: 'proj-3', title: 'Project 3' },
  ];

  it('resolves canonical project records in the specified order', () => {
    const resolved = resolveCollection(
      { id: 'featured-works', data: mockCollectionData },
      mockProjects
    );

    expect(resolved.id).toBe('featured-works');
    expect(resolved.data.title.en).toBe('Featured Works');
    expect(resolved.projects).toHaveLength(2);
    expect(resolved.projects[0].id).toBe('proj-2');
    expect(resolved.projects[1].id).toBe('proj-1');
  });

  it('resolves an empty collection without error', () => {
    const emptyCollectionData: Collection = {
      ...mockCollectionData,
      id: 'empty-collection',
      projects: [],
    };

    const resolved = resolveCollection(
      { id: 'empty-collection', data: emptyCollectionData },
      mockProjects
    );

    expect(resolved.projects).toEqual([]);
  });

  it('throws descriptive error when referencing non-existent project ID', () => {
    const collectionWithMissingRef: Collection = {
      ...mockCollectionData,
      id: 'case-studies',
      projects: ['proj-1', 'non-existent-proj'],
    };

    expect(() =>
      resolveCollection(
        { id: 'case-studies', data: collectionWithMissingRef },
        mockProjects
      )
    ).toThrow(
      'Collection "case-studies" references non-existent project ID "non-existent-proj"'
    );
  });
});
