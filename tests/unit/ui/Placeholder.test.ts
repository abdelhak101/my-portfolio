import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Placeholder component (PB-010)', () => {
  const content = readFileSync(
    resolve(process.cwd(), 'src/components/ui/Placeholder.astro'),
    'utf-8'
  );

  it('renders a wrapping <div>', () => {
    expect(content).toContain('<div');
  });

  it('uses role="status" for empty state', () => {
    expect(content).toContain('role={role}');
    expect(content).toContain("role = type === 'error' ? 'alert' : 'status'");
  });

  it('uses role="alert" for error state', () => {
    expect(content).toContain("'alert'");
  });

  it('supports empty and error types', () => {
    expect(content).toContain('"empty"');
    expect(content).toContain('"error"');
  });

  it('provides default messages for both states', () => {
    expect(content).toContain('No content available');
    expect(content).toContain('Something went wrong');
  });

  it('renders an SVG icon', () => {
    expect(content).toContain('<svg');
    expect(content).toContain('aria-hidden="true"');
  });
});
