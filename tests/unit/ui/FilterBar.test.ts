import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('FilterBar component (PB-014)', () => {
  const content = readFileSync(
    resolve(process.cwd(), 'src/components/ui/FilterBar.astro'),
    'utf-8'
  );

  it('renders one pill button per type using data-filter-type', () => {
    // Template iterates over `types` prop and emits data-filter-type per item
    expect(content).toContain('data-filter-type={type}');
    expect(content).toContain('types.map');
  });

  it('each pill has aria-pressed="false" initially', () => {
    expect(content).toContain('aria-pressed="false"');
  });

  it('renders a Clear all button with data-filter-clear', () => {
    expect(content).toContain('data-filter-clear');
    // Button is hidden by default
    expect(content).toContain('hidden');
  });

  it('renders bilingual labels — Arabic label map is present', () => {
    // Arabic labels for each type must be in the source
    expect(content).toContain('برمجيات');   // software
    expect(content).toContain('تصميم');      // design
    expect(content).toContain('واجهات');     // ui-ux
    expect(content).toContain('أتمتة');      // automation
    expect(content).toContain('ذكاء اصطناعي'); // ai
    expect(content).toContain('أخرى');       // other
  });

  it('uses accessible group role and design system tokens', () => {
    expect(content).toContain('role="group"');
    expect(content).toContain('aria-label={groupLabel}');
    expect(content).toContain('bg-surface');
    expect(content).toContain('border-border');
    expect(content).toContain('focus-visible:ring-focus');
  });
});
