# Feature PB-003 - Establish Code-Quality Conventions

## User Story

_As a developer working on the portfolio, I want documented, reproducible formatting, linting, and type-checking tools and scripts, so that the codebase maintains high standards of consistency, readability, and defect prevention._

## Requirements

- **Core Functionality**:
  - Prettier configured for consistent formatting across `.astro`, `.ts`, `.js`, `.json`, and `.md` files.
  - ESLint configured using modern flat config with TypeScript and Astro plugins.
  - Type-checking expectations integrated with `pnpm check`.
  - Quality scripts (`lint`, `lint:fix`, `format`, `format:fix`, `check`) executable and reproducible.
- **Constraints**:
  - Adhere to `CODING_STANDARDS.md` and `AGENTS.md`.
  - Use `pnpm` exclusively.
  - Avoid unnecessary dependencies outside the standard Astro/TS/Prettier/ESLint toolchain.

## Open Questions

- None.

## Acceptance Criteria

- [x] Formatting and linting requirements are documented.
- [ ] Type-checking expectations are defined and enforced via `pnpm check`.
- [ ] Validation commands are reproducible (`pnpm lint`, `pnpm format`, `pnpm check`, `pnpm build`).
- [x] Additional tooling is introduced only when it provides clear value (Prettier + ESLint + plugins).

## Technical Details

- **Dependencies (`devDependencies`)**:
  - `prettier`, `prettier-plugin-astro`
  - `eslint`, `typescript-eslint`, `eslint-plugin-astro`
- **Configuration Files**:
  - `.prettierrc.mjs`
  - `.prettierignore`
  - `eslint.config.js`
- **Scripts in `package.json`**:
  - `"lint": "eslint src"`
  - `"lint:fix": "eslint src --fix"`
  - `"format": "prettier --check src"`
  - `"format:fix": "prettier --write src"`

## Implementation Plan

- [x] Step 1 - Install devDependencies (`prettier`, `prettier-plugin-astro`, `eslint`, `typescript-eslint`, `eslint-plugin-astro`) with `pnpm`.
- [x] Step 2 - Create `.prettierrc.mjs` and `.prettierignore`.
- [x] Step 3 - Create `eslint.config.js` with TypeScript and Astro support.
- [x] Step 4 - Update `package.json` scripts (`lint`, `lint:fix`, `format`, `format:fix` targeting `src`).
- [x] Step 5 - Run `pnpm format:fix` and `pnpm format` to verify formatting on `src`.
- [x] Step 6 - Run `pnpm lint` and `pnpm check` to verify zero lint and type errors.
- [ ] Step 7 - Update `.agents/AGENTS.md` and `.docs/CODING_STANDARDS.md` documentation.

**Checkpoints**

- [x] Checkpoint 1: Formatting and linting configurations active and passing on `src`.
- [x] Checkpoint 2: All validation commands verified and documentation synchronized.

## Implementation Workflow

_For each TODO above, the AI should:_

1. Show which files it plans to change.
2. Explain the approach.
3. Wait for approval.
4. Apply the change.
5. Run or update tests.

## Test Plan

- **Verification Commands**:
  - [ ] Run `pnpm format` -> Exit code 0, all files formatted.
  - [ ] Run `pnpm lint` -> Exit code 0, no ESLint errors or warnings.
  - [ ] Run `pnpm check` -> Exit code 0, no Astro/TS diagnostic errors.
  - [ ] Run `pnpm build` -> Exit code 0, static output generated cleanly.

## Decisions

- Used ESLint Flat Config (`eslint.config.js`) matching ESLint v9 standards and Astro's official recommended practices.
- Used `prettier-plugin-astro` to ensure seamless formatting of Astro component frontmatter and template markup.
