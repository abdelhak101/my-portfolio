import fs from 'node:fs';
import path from 'node:path';
import { collectionSchema } from '../src/content/schemas/collection';
import { projectSchema } from '../src/content/schemas/project';
import {
  formatReferenceErrors,
  validateCrossReferences,
  type CollectionReferenceInput,
  type ProjectReferenceInput,
} from '../src/content/validation/cross-references';

function readJsonFiles(dirPath: string): Array<{ filePath: string; data: any }> {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const results: Array<{ filePath: string; data: any }> = [];

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      const fullPath = path.join(dirPath, entry.name);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      try {
        const parsed = JSON.parse(raw);
        results.push({ filePath: fullPath, data: parsed });
      } catch (err) {
        console.error(`Error parsing JSON in ${fullPath}:`, err);
        process.exit(1);
      }
    }
  }

  return results;
}

function main(): void {
  const root = process.cwd();
  const projectsDir = path.join(root, 'src', 'content', 'projects');
  const collectionsDir = path.join(root, 'src', 'content', 'collections');

  const rawProjects = readJsonFiles(projectsDir);
  const rawCollections = readJsonFiles(collectionsDir);

  const projects: ProjectReferenceInput[] = [];
  const collections: CollectionReferenceInput[] = [];

  // Parse and validate schemas
  for (const { filePath, data } of rawProjects) {
    const parseResult = projectSchema.safeParse(data);
    const relPath = path.relative(root, filePath).replace(/\\/g, '/');
    if (!parseResult.success) {
      console.error(`Schema validation failed in ${relPath}:`);
      console.error(parseResult.error.format());
      process.exit(1);
    }
    const validProject = parseResult.data;
    projects.push({
      id: validProject.id,
      relatedProjects: validProject.relatedProjects,
      file: relPath,
    });
  }

  for (const { filePath, data } of rawCollections) {
    const parseResult = collectionSchema.safeParse(data);
    const relPath = path.relative(root, filePath).replace(/\\/g, '/');
    if (!parseResult.success) {
      console.error(`Schema validation failed in ${relPath}:`);
      console.error(parseResult.error.format());
      process.exit(1);
    }
    const validCollection = parseResult.data;
    collections.push({
      id: validCollection.id,
      projects: validCollection.projects,
      file: relPath,
    });
  }

  // Cross-reference validation
  const validationResult = validateCrossReferences({ projects, collections });

  if (!validationResult.valid) {
    console.error(formatReferenceErrors(validationResult.errors));
    process.exit(1);
  }

  console.log(
    `✓ Cross-content reference validation passed (${projects.length} projects, ${collections.length} collections).`
  );
}

main();
