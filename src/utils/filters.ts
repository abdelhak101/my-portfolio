/**
 * Project type filter utilities.
 * Pure functions — no astro:content import — safe to use in Vitest unit tests.
 */

import type { ProjectType } from '../content/schemas/project';

/** Ordered list of all valid project type slugs. */
export const ALL_PROJECT_TYPES: ProjectType[] = [
  'software',
  'design',
  'ui-ux',
  'automation',
  'ai',
  'other',
];

/**
 * Returns true if the card's types satisfy the active type filter.
 *
 * Logic:
 * - If no types are active (empty set), all projects are visible → return true.
 * - Otherwise, return true only if the card has at least one type in common
 *   with the active set (OR within category).
 *
 * @param types      - The project card's type array (from data-types attribute).
 * @param activeTypes - The set of currently active filter type slugs.
 */
export function matchesTypeFilter(
  types: string[],
  activeTypes: Set<string>
): boolean {
  if (activeTypes.size === 0) return true;
  return types.some((t) => activeTypes.has(t));
}
