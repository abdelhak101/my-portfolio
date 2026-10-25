# Design: PB-003 Establish Code-Quality Conventions

## 1. Problem Statement & Context

The repository foundation has been verified with Astro 5 and TypeScript. However:

1. Linting and formatting standards are mentioned in `.docs/CODING_STANDARDS.md` and `.agents/AGENTS.md` as "Planned", but lack real configurations and scripts.
2. We need consistent, reproducible code quality verification across TypeScript and Astro files.
3. Tooling must strictly add value without bloat, utilizing modern standards (Prettier with Astro plugin, ESLint flat config with TypeScript and Astro plugins).

---

## 2. Technical Decisions & Trade-offs

- **Formatter**: Prettier with `prettier-plugin-astro` for unified formatting of Astro, TypeScript, JavaScript, Markdown, and JSON files.
- **Linter**: ESLint (Flat Config `eslint.config.js`) with `typescript-eslint` and `eslint-plugin-astro` for linting `.astro` and `.ts` files.
- **Type Checking**: Maintained via `astro check` (`@astrojs/check` + TypeScript strict config).
- **Scripts**:
  - `pnpm lint`: Run ESLint check on `src`.
  - `pnpm lint:fix`: Run ESLint auto-fix on `src`.
  - `pnpm format`: Run Prettier check on `src`.
  - `pnpm format:fix`: Run Prettier format write on `src`.
  - `pnpm check`: Run Astro type/template diagnostic check.

---

## 3. Architecture & File Structure

- **New Files**:
  - `.prettierrc.mjs`: Prettier configuration with Astro plugin.
  - `.prettierignore`: Ignore build artifacts (`dist/`, `.astro/`, node modules, lockfiles).
  - `eslint.config.js`: ESLint flat configuration.
- **Modified Files**:
  - `package.json`: Add linting/formatting scripts and devDependencies.
  - `.agents/AGENTS.md`: Update commands section with active `lint` and `format` scripts.
  - `.docs/CODING_STANDARDS.md`: Align script and configuration names with `pnpm`.

---

## 4. Verification & Validation Plan

1. Install devDependencies via `pnpm add -D`.
2. Execute `pnpm format:fix` followed by `pnpm format` (exit code 0).
3. Execute `pnpm lint` (exit code 0).
4. Execute `pnpm check` and `pnpm build` to guarantee zero regressions.
5. Review working tree changes.
