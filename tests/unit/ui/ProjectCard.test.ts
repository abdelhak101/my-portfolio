import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('ProjectCard component (PB-010, PB-011, PB-012)', () => {
  const content = readFileSync(
    resolve(process.cwd(), 'src/components/ui/ProjectCard.astro'),
    'utf-8'
  );

  it('renders a semantic <article> element', () => {
    expect(content).toContain('<article');
  });

  it('renders an <img> with alt text for the project thumbnail', () => {
    expect(content).toContain('<img');
    expect(content).toContain('alt={imageAlt}');
  });

  it('renders the project title in a heading', () => {
    expect(content).toContain('<h3>{title}</h3>');
  });

  it('renders a description paragraph', () => {
    expect(content).toContain('<p');
  });

  it('renders tags as <span> elements', () => {
    expect(content).toContain('<span');
  });

  it('invokes Placeholder component when image is missing', () => {
    expect(content).toContain("import Placeholder from './Placeholder.astro'");
    expect(content).toContain('<Placeholder type="empty" message={title}');
  });

  it('exposes a link to the project URL', () => {
    expect(content).toContain('href={url}');
  });

  it('renders project type badges and formatted date metadata', () => {
    expect(content).toContain('types.map');
    expect(content).toContain('typeLabels');
    expect(content).toContain('<time datetime={date}');
  });

  it('uses design system monochrome tokens instead of generic grays', () => {
    expect(content).toContain('bg-surface');
    expect(content).toContain('border-border');
    expect(content).toContain('text-text');
    expect(content).toContain('text-text-muted');
    expect(content).toContain('focus-visible:ring-focus');
    expect(content).not.toContain('text-gray-900');
    expect(content).not.toContain('bg-gray-100');
  });
});
