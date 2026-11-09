import type { Project } from '../schemas/project';

export interface ProjectDataHolder {
  id: string;
  data: Project;
}

/**
 * Sorts an array of projects in descending chronological order (newest first).
 * Supports ISO date formats: YYYY, YYYY-MM, YYYY-MM-DD.
 */
export function sortProjectsByDateDesc<T extends { data: { date?: string } }>(
  projects: T[]
): T[] {
  return [...projects].sort((a, b) => {
    const dateA = a.data.date ?? '';
    const dateB = b.data.date ?? '';
    // Normalizing string comparison since ISO date strings (YYYY-MM-DD) sort lexicographically
    return dateB.localeCompare(dateA);
  });
}

/**
 * Filters for published projects and sorts them chronologically (newest first).
 */
export function filterAndSortPublishedProjects<T extends { data: { status: 'draft' | 'published'; date?: string } }>(
  projects: T[]
): T[] {
  const published = projects.filter((p) => p.data.status === 'published');
  return sortProjectsByDateDesc(published);
}
