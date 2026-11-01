import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('SearchInput component (PB-013)', () => {
  const content = readFileSync(
    resolve(process.cwd(), 'src/components/ui/SearchInput.astro'),
    'utf-8'
  );

  it('renders a search input element with accessible role and attributes', () => {
    expect(content).toContain('type="search"');
    expect(content).toContain('role="search"');
    expect(content).toContain('<label for={id}');
    expect(content).toContain('class="sr-only"');
  });

  it('contains search SVG icon', () => {
    expect(content).toContain('<svg');
    expect(content).toContain('m21 21-5.197-5.197');
  });

  it('contains clear button with accessible aria-label and icon', () => {
    expect(content).toContain('<button');
    expect(content).toContain('aria-label={clearAriaLabel}');
    expect(content).toContain('id={`${id}-clear`}');
  });

  it('uses design system monochrome tokens for borders, surfaces, and focus ring', () => {
    expect(content).toContain('bg-surface');
    expect(content).toContain('border-border');
    expect(content).toContain('text-text');
    expect(content).toContain('focus-visible:ring-focus');
  });
});
