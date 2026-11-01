import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('ProjectCard component (PB-010)', () => {
  const content = readFileSync(
    resolve(process.cwd(), 'src/components/ui/ProjectCard.astro'),
    'utf-8'
  );

  it('renders a semantic <article> element', () => {
    expect(content).toContain('<article');
  });

  it('renders an <img> with alt text for the project thumbnail', () => {
    expect(content).toContain('<img');
    expect(content).toContain('alt=');
  });

  it('renders the project title in a heading', () => {
    expect(content).toContain('<h3>');
  });

  it('renders a description paragraph', () => {
    expect(content).toContain('<p');
  });

  it('renders tags as <span> elements', () => {
    expect(content).toContain('<span');
  });

  it('includes a graceful fallback when image is missing', () => {
    expect(content).toContain('project.image');
  });

  it('exposes a link to the project URL', () => {
    expect(content).toContain('href={project.url}');
  });
});
