import { describe, expect, it } from 'vitest';
import {
  sortProjectsByDateDesc,
  filterAndSortPublishedProjects,
} from '../../../src/content/queries/projects';

describe('Project Queries & Sorting (PB-012)', () => {
  it('sorts projects by date in descending order (newest first)', () => {
    const input = [
      { id: 'p1', data: { date: '2025-05' } },
      { id: 'p2', data: { date: '2026-10' } },
      { id: 'p3', data: { date: '2026-07-15' } },
      { id: 'p4', data: { date: '2024' } },
    ];

    const sorted = sortProjectsByDateDesc(input);

    expect(sorted.map((p) => p.id)).toEqual(['p2', 'p3', 'p1', 'p4']);
  });

  it('preserves order when dates are identical', () => {
    const input = [
      { id: 'a', data: { date: '2026-01' } },
      { id: 'b', data: { date: '2026-01' } },
    ];

    const sorted = sortProjectsByDateDesc(input);
    expect(sorted.map((p) => p.id)).toEqual(['a', 'b']);
  });

  it('filters out draft projects and sorts published ones chronologically', () => {
    const input = [
      { id: 'p1', data: { status: 'published' as const, date: '2025-05' } },
      { id: 'p2', data: { status: 'draft' as const, date: '2026-12' } },
      { id: 'p3', data: { status: 'published' as const, date: '2026-10' } },
    ];

    const result = filterAndSortPublishedProjects(input);
    expect(result.map((p) => p.id)).toEqual(['p3', 'p1']);
  });

  it('does not mutate the original array', () => {
    const input = [
      { id: 'old', data: { date: '2020' } },
      { id: 'new', data: { date: '2026' } },
    ];
    const copy = [...input];

    sortProjectsByDateDesc(input);
    expect(input).toEqual(copy);
  });
});
