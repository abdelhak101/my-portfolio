import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Button component (PB-010)', () => {
  const content = readFileSync(
    resolve(process.cwd(), 'src/components/ui/Button.astro'),
    'utf-8'
  );

  it('renders a semantic <button> element', () => {
    expect(content).toContain('<button');
  });

  it('uses type="button" by default', () => {
    expect(content).toContain('type={type}');
    expect(content).toContain("type = 'button'");
  });

  it('applies disabled attribute and aria-disabled', () => {
    expect(content).toContain('disabled={disabled}');
    expect(content).toContain('aria-disabled={disabled}');
  });

  it('includes disabled:opacity-50 utility class', () => {
    expect(content).toContain('disabled:opacity-50');
  });

  it('supports primary, secondary, and danger variants', () => {
    expect(content).toContain('primary');
    expect(content).toContain('secondary');
    expect(content).toContain('danger');
  });

  it('includes focus-visible ring for accessibility', () => {
    expect(content).toContain('focus-visible:ring-2');
  });

  it('exposes a slot for button content', () => {
    expect(content).toContain('<slot />');
  });
});
