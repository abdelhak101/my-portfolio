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
        'Project "proj-a" references non-existent related project "unknown-proj" in src/content/projects/proj-a.json',
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
        'Collection "featured" references non-existent project "missing-proj" in src/content/collections/featured.json',
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
});
