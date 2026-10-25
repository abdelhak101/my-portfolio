import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveCollection } from '../../../src/content/queries/collections';
import { collectionSchema } from '../../../src/content/schemas/collection';
import { projectSchema, type Project } from '../../../src/content/schemas/project';

function loadJsonDir(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.json'))
    .map((e) => {
      const fullPath = path.join(dirPath, e.name);
      return {
        file: e.name,
        data: JSON.parse(fs.readFileSync(fullPath, 'utf-8')),
      };
    });
}

describe('Representative Content Fixtures Integrity (PB-007)', () => {
  const projectsDir = path.resolve(process.cwd(), 'src/content/projects');
  const collectionsDir = path.resolve(process.cwd(), 'src/content/collections');

  const rawProjects = loadJsonDir(projectsDir);
  const rawCollections = loadJsonDir(collectionsDir);

  it('all project fixtures parse cleanly with projectSchema', () => {
    expect(rawProjects.length).toBeGreaterThanOrEqual(4);
    for (const item of rawProjects) {
      const parsed = projectSchema.safeParse(item.data);
      expect(parsed.success, `Failed to parse ${item.file}`).toBe(true);
    }
  });

  it('all collection fixtures parse cleanly with collectionSchema', () => {
    expect(rawCollections.length).toBeGreaterThanOrEqual(2);
    for (const item of rawCollections) {
      const parsed = collectionSchema.safeParse(item.data);
      expect(parsed.success, `Failed to parse ${item.file}`).toBe(true);
    }
  });

  it('multiple project types are represented across the fixtures', () => {
    const allParsedProjects = rawProjects.map(
      (p) => projectSchema.parse(p.data)
    );
    const uniqueTypes = new Set(allParsedProjects.flatMap((p) => p.types));

    expect(uniqueTypes.has('software')).toBe(true);
    expect(uniqueTypes.has('design')).toBe(true);
    expect(uniqueTypes.has('ui-ux')).toBe(true);
    expect(uniqueTypes.has('automation')).toBe(true);
    expect(uniqueTypes.has('ai')).toBe(true);
  });

  it('at least one project has multiple types', () => {
    const multiTypeProjects = rawProjects.filter(
      (p) => p.data.types && p.data.types.length > 1
    );
    expect(multiTypeProjects.length).toBeGreaterThanOrEqual(1);
  });

  it('all optional content sections are represented across the project set', () => {
    const allParsedProjects: Project[] = rawProjects.map(
      (p) => projectSchema.parse(p.data)
    );

    const hasRole = allParsedProjects.some((p) => p.role && p.role.en);
    const hasSkills = allParsedProjects.some((p) => p.skills && p.skills.length > 0);
    const hasDate = allParsedProjects.some((p) => p.date);
    const hasCover = allParsedProjects.some((p) => p.cover && p.cover.src);
    const hasLinks = allParsedProjects.some((p) => p.links && p.links.length > 0);
    const hasOutcomes = allParsedProjects.some(
      (p) => p.outcomes && p.outcomes.length > 0
    );
    const hasRelated = allParsedProjects.some(
      (p) => p.relatedProjects && p.relatedProjects.length > 0
    );

    expect(hasRole).toBe(true);
    expect(hasSkills).toBe(true);
    expect(hasDate).toBe(true);
    expect(hasCover).toBe(true);
    expect(hasLinks).toBe(true);
    expect(hasOutcomes).toBe(true);
    expect(hasRelated).toBe(true);
  });

  it('public collections resolve successfully to canonical project content', () => {
    const projects = rawProjects.map((p) => ({
      id: p.data.id,
      ...p.data,
    }));

    for (const col of rawCollections) {
      const parsedCol = collectionSchema.parse(col.data);
      const resolved = resolveCollection(
        { id: parsedCol.id, data: parsedCol },
        projects
      );

      expect(resolved.id).toBe(parsedCol.id);
      expect(resolved.projects).toHaveLength(parsedCol.projects.length);
      // Ensure the resolved project order matches the collection membership order
      for (let i = 0; i < parsedCol.projects.length; i++) {
        expect(resolved.projects[i].id).toBe(parsedCol.projects[i]);
      }
    }
  });

  it('all text content has non-empty English and Arabic strings', () => {
    for (const p of rawProjects) {
      expect(p.data.title.en.trim().length).toBeGreaterThan(0);
      expect(p.data.title.ar.trim().length).toBeGreaterThan(0);
      expect(p.data.summary.en.trim().length).toBeGreaterThan(0);
      expect(p.data.summary.ar.trim().length).toBeGreaterThan(0);
    }

    for (const c of rawCollections) {
      expect(c.data.title.en.trim().length).toBeGreaterThan(0);
      expect(c.data.title.ar.trim().length).toBeGreaterThan(0);
      expect(c.data.summary.en.trim().length).toBeGreaterThan(0);
      expect(c.data.summary.ar.trim().length).toBeGreaterThan(0);
    }
  });
});
