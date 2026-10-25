import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Link component (PB-010)', () => {
  const content = readFileSync(
    resolve(process.cwd(), 'src/components/ui/Link.astro'),
    'utf-8'
  );

  it('renders a semantic <a> element', () => {
    expect(content).toContain('<a');
  });

  it('supports inline and cta variants', () => {
    expect(content).toContain('inline');
    expect(content).toContain('cta');
  });

  it('adds target="_blank" for external links', () => {
    expect(content).toContain("target={external ? '_blank' : undefined}");
  });

  it('adds rel="noopener noreferrer" for external links', () => {
    expect(content).toContain("rel={external ? 'noopener noreferrer' : undefined}");
  });

  it('renders a <span> with aria-disabled for disabled state', () => {
    expect(content).toContain('<span');
    expect(content).toContain('aria-disabled="true"');
  });

  it('includes focus-visible ring for accessibility', () => {
    expect(content).toContain('focus-visible:ring-2');
  });

  it('exposes a slot for link content', () => {
    expect(content).toContain('<slot />');
  });
});
