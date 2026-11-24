import { describe, expect, it } from 'vitest';
import {
  formatReferenceErrors,
  validateCrossReferences,
} from '../../../src/content/validation/cross-references';

describe('validateCrossReferences (PB-006)', () => {
  it('returns valid: true when all references point to known project IDs', () => {
    const result = validateCrossReferences({
      projects: [
        { id: 'proj-a', relatedProjects: ['proj-b'] },
        { id: 'proj-b', relatedProjects: ['proj-a'] },
        { id: 'proj-c' },
      ],
      collections: [
        { id: 'coll-1', projects: ['proj-a', 'proj-b'] },
        { id: 'coll-2', projects: ['proj-c'] },
      ],
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(formatReferenceErrors(result.errors)).toBe(
      'All cross-content references are valid.'
    );
  });

  it('detects missing project references in relatedProjects', () => {
    const result = validateCrossReferences({
      projects: [
        { id: 'proj-a', relatedProjects: ['unknown-proj'] },
      ],
      collections: [],
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toEqual({
      type: 'project',
      id: 'proj-a',
      file: 'src/content/projects/proj-a.json',
      invalidRef: 'unknown-proj',
      message:
        'Project "proj-a" references non-existent related project "unknown-proj" in src/content/projects/proj-a.json. Available projects: [proj-a]',
    });
  });

  it('detects missing project references in collections', () => {
    const result = validateCrossReferences({
      projects: [{ id: 'proj-a' }],
      collections: [
        { id: 'featured', projects: ['proj-a', 'missing-proj'] },
      ],
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toEqual({
      type: 'collection',
      id: 'featured',
      file: 'src/content/collections/featured.json',
      invalidRef: 'missing-proj',
      message:
        'Collection "featured" references non-existent project "missing-proj" in src/content/collections/featured.json. Available projects: [proj-a]',
    });
  });

  it('aggregates multiple invalid references across projects and collections', () => {
    const result = validateCrossReferences({
      projects: [
        { id: 'proj-1', relatedProjects: ['broken-1', 'broken-2'] },
        { id: 'proj-2', relatedProjects: ['proj-1'] },
      ],
      collections: [
        { id: 'coll-a', projects: ['proj-1', 'broken-3'] },
        { id: 'coll-b', projects: ['broken-4'] },
      ],
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4);

    const invalidRefs = result.errors.map((e) => e.invalidRef);
    expect(invalidRefs).toEqual(['broken-1', 'broken-2', 'broken-3', 'broken-4']);

    const formatted = formatReferenceErrors(result.errors);
    expect(formatted).toContain('Found 4 invalid cross-content reference(s):');
    expect(formatted).toContain('src/content/projects/proj-1.json');
    expect(formatted).toContain('src/content/collections/coll-a.json');
    expect(formatted).toContain('src/content/collections/coll-b.json');
  });

  it('supports custom file paths in error diagnostics', () => {
    const result = validateCrossReferences({
      projects: [
        {
          id: 'proj-custom',
          relatedProjects: ['non-existent'],
          file: 'custom/path/proj.json',
        },
      ],
      collections: [],
    });

    expect(result.errors[0].file).toBe('custom/path/proj.json');
    expect(result.errors[0].message).toContain('custom/path/proj.json');
  });

  describe('collection membership validation (PB-023)', () => {
    it('fails when a published collection references a draft project', () => {
      const result = validateCrossReferences({
        projects: [
          { id: 'proj-published', status: 'published' },
          { id: 'proj-draft', status: 'draft', file: 'src/content/projects/proj-draft.json' },
        ],
        collections: [
          {
            id: 'featured',
            status: 'published',
            projects: ['proj-published', 'proj-draft'],
            file: 'src/content/collections/featured.json',
          },
        ],
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toContain(
        'Published collection "featured" references draft project "proj-draft"'
      );
      expect(result.errors[0].message).toContain(
        'Fix: Set "status": "published" in src/content/projects/proj-draft.json or remove "proj-draft" from src/content/collections/featured.json.'
      );
    });

    it('passes when a draft collection references a draft project', () => {
      const result = validateCrossReferences({
        projects: [
          { id: 'proj-draft', status: 'draft' },
        ],
        collections: [
          {
            id: 'draft-collection',
            status: 'draft',
            projects: ['proj-draft'],
          },
        ],
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('lists available project IDs when an invalid reference is encountered', () => {
      const result = validateCrossReferences({
        projects: [
          { id: 'alpha-proj' },
          { id: 'beta-proj' },
        ],
        collections: [
          {
            id: 'featured',
            projects: ['gamma-proj'],
          },
        ],
      });

      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toContain('Available projects: [alpha-proj, beta-proj]');
    });

    it('permits a project to belong to multiple distinct collections', () => {
      const result = validateCrossReferences({
        projects: [
          { id: 'shared-proj', status: 'published' },
        ],
        collections: [
          { id: 'featured', status: 'published', projects: ['shared-proj'] },
          { id: 'open-source', status: 'published', projects: ['shared-proj'] },
        ],
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
