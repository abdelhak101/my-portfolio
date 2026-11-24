export interface ReferenceError {
  type: 'project' | 'collection';
  id: string;
  file: string;
  invalidRef: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ReferenceError[];
}

export interface ProjectReferenceInput {
  id: string;
  status?: 'draft' | 'published';
  relatedProjects?: string[];
  file?: string;
}

export interface CollectionReferenceInput {
  id: string;
  status?: 'draft' | 'published';
  projects?: string[];
  file?: string;
}

export function validateCrossReferences(input: {
  projects: ProjectReferenceInput[];
  collections: CollectionReferenceInput[];
}): ValidationResult {
  const errors: ReferenceError[] = [];
  const projectMap = new Map<string, ProjectReferenceInput>(
    input.projects.map((p) => [p.id, p])
  );
  const knownProjectIds = Array.from(projectMap.keys()).sort();
  const knownProjectIdSet = new Set(knownProjectIds);

  const availableIdsNotice = `Available projects: [${knownProjectIds.join(', ')}]`;

  // 1. Validate relatedProjects references in project files
  for (const project of input.projects) {
    const file = project.file ?? `src/content/projects/${project.id}.json`;
    const related = project.relatedProjects ?? [];

    for (const refId of related) {
      if (!knownProjectIdSet.has(refId)) {
        errors.push({
          type: 'project',
          id: project.id,
          file,
          invalidRef: refId,
          message: `Project "${project.id}" references non-existent related project "${refId}" in ${file}. ${availableIdsNotice}`,
        });
      }
    }
  }

  // 2. Validate collection membership references
  for (const collection of input.collections) {
    const file =
      collection.file ?? `src/content/collections/${collection.id}.json`;
    const projects = collection.projects ?? [];
    const isCollectionPublished = (collection.status ?? 'published') === 'published';

    for (const refId of projects) {
      const referencedProject = projectMap.get(refId);

      if (!referencedProject) {
        errors.push({
          type: 'collection',
          id: collection.id,
          file,
          invalidRef: refId,
          message: `Collection "${collection.id}" references non-existent project "${refId}" in ${file}. ${availableIdsNotice}`,
        });
        continue;
      }

      // Check draft privacy: published collection cannot expose draft project
      if (isCollectionPublished && referencedProject.status === 'draft') {
        const projectFile =
          referencedProject.file ?? `src/content/projects/${refId}.json`;
        errors.push({
          type: 'collection',
          id: collection.id,
          file,
          invalidRef: refId,
          message: `Published collection "${collection.id}" references draft project "${refId}". Collections cannot expose unpublished content. Fix: Set "status": "published" in ${projectFile} or remove "${refId}" from ${file}.`,
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function formatReferenceErrors(errors: ReferenceError[]): string {
  if (errors.length === 0) {
    return 'All cross-content references are valid.';
  }

  const lines = [
    `Found ${errors.length} invalid cross-content reference(s):`,
    '',
  ];

  for (const err of errors) {
    lines.push(`  - [${err.type.toUpperCase()}] ${err.file}`);
    lines.push(`    ID: "${err.id}" -> Invalid Reference: "${err.invalidRef}"`);
    lines.push(`    ${err.message}`);
    lines.push('');
  }

  return lines.join('\n');
}
