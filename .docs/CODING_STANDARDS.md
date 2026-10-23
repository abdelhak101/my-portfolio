# Coding Standards

This document defines the coding standards, style guidelines, and quality best practices for **My Portfolio**.

## Core Principles

1. **Readability First**
   Code is read far more often than it is written.
   - Prefer explicit over clever
   - Use clear, intention-revealing names
   - Optimize for clarity and future maintainability

2. **Simplicity (KISS & YAGNI)**
   - Avoid over-engineering
   - Implement only what is required by current features and specifications
   - Defer abstractions until duplication is proven

3. **Consistency Over Preference**
   - Follow established project patterns consistently
   - Similar architectural problems should have identical solutions across the codebase
   - Consistency reduces cognitive load

4. **Single Responsibility (SOLID)**
   - Functions, components, and modules should do one thing well
   - Keep interfaces small, explicit, and focused
   - Keep project data, presentation, and routing cleanly separated

5. **Don’t Repeat Yourself (DRY)**
   - Extract shared logic only after multiple occurrences (rule of three)
   - Premature abstraction is worse than slight duplication

6. **Strict Type Safety**
   - Leverage TypeScript’s type system fully
   - Ban `any` in application code
   - Enforce schema validations at compile/build time with Zod

## Principle Conflict Resolution
**Priority Order**: YAGNI > KISS > SOLID > DRY

- **Early Development**: YAGNI > DRY (avoid premature abstraction).
- **Complex Features**: KISS > SOLID (favor simple, understandable designs).
- **Mature Code**: SOLID > DRY (good design over aggressive deduplication).
- **Apply DRY only when**: 3+ stable repetitions.

---

## Code Formatting & Tooling
- **Prettier**: Code formatting according to `.prettierrc` (`npm run format` / `npm run prettier:fix`).
- **ESLint**: Linting, import organization, and best-practice enforcement (`npm run lint` / `eslint.config.js`).
- **TypeScript**: Strict mode enabled (`strict: true`), strict null checks, and path aliases (see `tsconfig.json`).

---

## Language & Framework Conventions

### TypeScript / JavaScript
- **Strict Mode**: `strict: true` in `tsconfig.json`.
- **No `any`**: Disallowed. Use explicit types, generics, or `unknown` with type narrowing.
- **Async/Await**: Prefer `async/await` over `.then()` chains.
- **Immutability**: Always prefer `const` over `let`. Never use `var`.

### Astro Components (`.astro`)
- **File Structure**: Use `.astro` files for static page generation and layout components.
- **Naming**: PascalCase for component filenames (`ProjectCard.astro`, `LocaleSwitcher.astro`).
- **Explicit Props**: Every component accepting inputs must declare a strict `Props` interface in frontmatter.
- **Zero Client JS by Default**: Avoid client-side hydration unless explicit interactivity is required.

```astro
---
interface Props {
  title: string;
  lang: 'en' | 'ar';
  description?: string;
}

const { title, lang, description } = Astro.props;
---

<div class="project-entry">
  <h3>{title}</h3>
  {description && <p>{description}</p>}
</div>
```

### Content Collections & Schema Definitions
- Define all collections in `src/content/config.ts`.
- Every project must provide localized fields (`en` and `ar`) for title and summary.
- Enforce schema constraints with Zod (valid URLs for evidence links, valid date formats, allowed enum types).
