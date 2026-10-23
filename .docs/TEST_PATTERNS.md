# Test Patterns

This document describes how we write tests: organization, mocking, approach, and quality standards for **My Portfolio**.

## 1. Testing Strategy

Given that My Portfolio is a **bilingual static site with file-based content**, our testing strategy focuses on:

| Type | Tool | Scope | Priority |
|---|---|---|---|
| **Unit & Schema** | Vitest | Zod schemas, i18n helpers, search/filter algorithms, date formatters | High |
| **Component** | Vitest + Astro Container API | Static component rendering, LTR/RTL attribute propagation | Medium |
| **E2E** | Playwright | User flows, language switching, search/filter interaction, catalogue navigation | High |

### What We Test
- **Content Collection Schemas**: Ensure valid frontmatter parses accurately, reject missing required bilingual fields, validate URL formats for evidence links.
- **Search & Filter Logic**: Verify search query matching, multi-criteria filtering (skills, project types, technologies), empty states.
- **BiDi / i18n Integration**: Verify correct `dir="rtl"` / `dir="ltr"` and `lang` attribute propagation.
- **Navigation & Routing**: Critical flows identified in user flow specs (Catalogue -> Project Detail -> Evidence Links, Collection Views).

### What We DON'T Test
- Internal Astro framework mechanics.
- External third-party websites linked in evidence sections (mock or verify link presence only).
- Raw CSS styling (visual regression testing handled via selective Playwright snapshots if required).

---

## 2. Tooling & Commands

| Category | Tool | Purpose |
|---|---|---|
| **Test Runner** | [Vitest](https://vitest.dev) | Fast, TypeScript-native unit & schema testing |
| **Assertions** | Vitest built-in | `expect()` API |
| **E2E Testing** | [Playwright](https://playwright.dev) | Cross-browser & responsive end-to-end testing |
| **Component Testing** | Astro Container API | Render `.astro` components in isolated unit tests |

### Commands
```bash
npm test            # Run Vitest unit & schema tests
npm run test:e2e    # Run Playwright E2E tests
npm run test:watch  # Watch mode for unit tests during development
```

---

## 3. Test Organization

### File Locations
- Unit and helper tests live **side-by-side** with source code.
- End-to-end user flow tests live in `tests/e2e/`.

```
src/
├── content/
│   ├── config.ts
│   └── config.test.ts          # Schema validation tests
├── lib/
│   ├── search.ts
│   ├── search.test.ts          # Search & filter tests
│   ├── i18n.ts
│   └── i18n.test.ts            # Translation & locale tests
└── components/
    ├── project/
    │   ├── ProjectCard.astro
    │   └── ProjectCard.test.ts # Astro component test

tests/
└── e2e/
    ├── navigation.spec.ts      # Page navigation & language toggle
    ├── catalogue.spec.ts       # Search, filter, and project cards
    └── collections.spec.ts     # Curated public collections
```

---

## 4. Test Examples

### 4.1 Testing Zod Content Schemas
```typescript
// src/content/config.test.ts
import { describe, it, expect } from 'vitest';
import { projectSchema } from './config';

describe('Project Content Schema', () => {
  it('validates a complete bilingual project definition', () => {
    const validProject = {
      id: 'task-runner-cli',
      title: { en: 'Task Runner CLI', ar: 'مشغل مهام سطر الأوامر' },
      summary: { en: 'A fast command runner.', ar: 'مشغل سريع للمهام.' },
      types: ['software', 'automation'],
      skills: ['TypeScript', 'Node.js'],
      evidence: {
        repository: 'https://github.com/example/repo',
        demo: 'https://demo.example.com',
      },
      published: true,
    };

    const parsed = projectSchema.safeParse(validProject);
    expect(parsed.success).toBe(true);
  });

  it('rejects a project missing Arabic title', () => {
    const invalidProject = {
      id: 'task-runner-cli',
      title: { en: 'Task Runner CLI' }, // missing 'ar'
      summary: { en: 'Summary', ar: 'ملخص' },
      types: ['software'],
      published: true,
    };

    const parsed = projectSchema.safeParse(invalidProject);
    expect(parsed.success).toBe(false);
  });
});
```

### 4.2 Testing Search & Filter Utilities
```typescript
// src/lib/search.test.ts
import { describe, it, expect } from 'vitest';
import { filterProjects } from './search';

describe('filterProjects', () => {
  const mockProjects = [
    { id: 'p1', types: ['software'], skills: ['TypeScript', 'Astro'] },
    { id: 'p2', types: ['design'], skills: ['Figma', 'UI/UX'] },
  ];

  it('filters by skill', () => {
    const result = filterProjects(mockProjects, { skill: 'TypeScript' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('p1');
  });

  it('returns all projects when filter criteria are empty', () => {
    const result = filterProjects(mockProjects, {});
    expect(result).toHaveLength(2);
  });
});
```

### 4.3 Playwright E2E Test Example
```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Bilingual Navigation & Catalogue', () => {
  test('switches language from English to Arabic with correct dir attribute', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Click language switcher
    await page.click('[data-testid="locale-switcher-ar"]');

    await expect(page).toHaveURL(/\/ar/);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  });
});
```
