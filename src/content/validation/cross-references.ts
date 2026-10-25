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
  relatedProjects?: string[];
  file?: string;
}

export interface CollectionReferenceInput {
  id: string;
  projects?: string[];
  file?: string;
}

export function validateCrossReferences(input: {
  projects: ProjectReferenceInput[];
  collections: CollectionReferenceInput[];
}): ValidationResult {
  const errors: ReferenceError[] = [];
  const knownProjectIds = new Set(input.projects.map((p) => p.id));

  // 1. Validate relatedProjects references in project files
  for (const project of input.projects) {
    const file = project.file ?? `src/content/projects/${project.id}.json`;
    const related = project.relatedProjects ?? [];

    for (const refId of related) {
      if (!knownProjectIds.has(refId)) {
        errors.push({
          type: 'project',
          id: project.id,
          file,
          invalidRef: refId,
          message: `Project "${project.id}" references non-existent related project "${refId}" in ${file}`,
        });
      }
    }
  }

  // 2. Validate collection membership references
  for (const collection of input.collections) {
    const file =
      collection.file ?? `src/content/collections/${collection.id}.json`;
    const projects = collection.projects ?? [];

    for (const refId of projects) {
      if (!knownProjectIds.has(refId)) {
        errors.push({
          type: 'collection',
          id: collection.id,
          file,
          invalidRef: refId,
          message: `Collection "${collection.id}" references non-existent project "${refId}" in ${file}`,
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
