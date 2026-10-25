import type { Collection } from '../schemas/collection';

export interface ResolvedCollection<TProject> {
  id: string;
  data: Collection;
  projects: TProject[];
}

/**
 * Resolves a collection entry with canonical project content in the specified order.
 * Throws a descriptive error if any referenced project ID is missing.
 */
export function resolveCollection<TProject extends { id: string }>(
  collection: { id: string; data: Collection },
  availableProjects: TProject[]
): ResolvedCollection<TProject> {
  const projectMap = new Map<string, TProject>(
    availableProjects.map((p) => [p.id, p])
  );

  const resolvedProjects: TProject[] = [];
  for (const pid of collection.data.projects) {
    const project = projectMap.get(pid);
    if (!project) {
      throw new Error(
        `Collection "${collection.id}" references non-existent project ID "${pid}"`
      );
    }
    resolvedProjects.push(project);
  }

  return {
    id: collection.id,
    data: collection.data,
    projects: resolvedProjects,
  };
}
