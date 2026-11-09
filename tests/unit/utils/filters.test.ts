import { describe, it, expect } from 'vitest';
import { matchesTypeFilter, ALL_PROJECT_TYPES } from '../../../src/utils/filters';

describe('matchesTypeFilter', () => {
  it('returns true when activeTypes is empty (no filter active)', () => {
    expect(matchesTypeFilter(['software', 'ai'], new Set())).toBe(true);
    expect(matchesTypeFilter([], new Set())).toBe(true);
  });

  it('returns true when card types overlap with ANY active type (OR logic)', () => {
    const active = new Set(['ai', 'design']);
    expect(matchesTypeFilter(['software', 'ai'], active)).toBe(true);
    expect(matchesTypeFilter(['design'], active)).toBe(true);
  });

  it('returns false when card types have no overlap with activeTypes', () => {
    const active = new Set(['ai']);
    expect(matchesTypeFilter(['software', 'design'], active)).toBe(false);
    expect(matchesTypeFilter(['automation'], active)).toBe(false);
  });

  it('returns false when card types array is empty and a filter is active', () => {
    const active = new Set(['software']);
    expect(matchesTypeFilter([], active)).toBe(false);
  });
});

describe('ALL_PROJECT_TYPES', () => {
  it('contains all 6 expected project type slugs', () => {
    expect(ALL_PROJECT_TYPES).toHaveLength(6);
    expect(ALL_PROJECT_TYPES).toContain('software');
    expect(ALL_PROJECT_TYPES).toContain('design');
    expect(ALL_PROJECT_TYPES).toContain('ui-ux');
    expect(ALL_PROJECT_TYPES).toContain('automation');
    expect(ALL_PROJECT_TYPES).toContain('ai');
    expect(ALL_PROJECT_TYPES).toContain('other');
  });
});
