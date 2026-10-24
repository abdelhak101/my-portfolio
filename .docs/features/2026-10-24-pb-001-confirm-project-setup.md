# Feature PB-001 - Confirm Project Setup

## User Story
*As a developer, I want to establish and verify a baseline Astro project with pnpm and TypeScript, so that we have a clean, reproducible development and build foundation without risking existing documentation or configuration.*

## Requirements
- **Core Functionality**:
  - Inspect and document current environment (Node.js version, available package managers).
  - Scaffold a baseline Astro 5 project using `pnpm`.
  - Configure standard TypeScript settings matching project guidelines.
  - Establish standard npm scripts: `dev`, `build`, `preview`, `check`.
  - Verify that a baseline build succeeds and produces static output.
- **Edge Cases**:
  - Existing files and folders (`.docs/`, `.agents/`, `docs/`, `README.md`, `LICENSE`, `.git/`) must not be overwritten or corrupted during project scaffolding.
  - Scaffolding tool prompts must not block automated setup.
- **Constraints**:
  - Package manager: `pnpm` (v9.15.4).
  - Framework: Astro 5.x.
  - Zero external UI libraries. Pure Tailwind / CSS and Astro scoped styles per project constitution.

## Open Questions
- None. (Package manager confirmed as `pnpm`, Astro template confirmed as minimal baseline).

## Acceptance Criteria
- [x] Existing files and project configuration reviewed and documented.
- [x] Astro version (v5.x) and package manager (`pnpm`) confirmed and configured.
- [x] Dependencies and scripts (`dev`, `build`, `preview`, `check`) defined in `package.json`.
- [x] No existing documentation or repository assets overwritten without review.
- [x] Baseline build (`pnpm build`) runs successfully and creates `dist/`.

## Technical Details
- **Architecture**: Astro SSG minimal project structure.
- **Dependencies**:
  - `astro` (^5.x)
  - `@astrojs/check`
  - `typescript`
- **Configuration**:
  - `astro.config.mjs`
  - `tsconfig.json`
- **Output**: Static HTML bundle in `dist/`.

## Implementation Plan
- [x] Step 1 - Scaffold minimal Astro project structure in root without overwriting existing files:
  - Create/verify `package.json` with scripts and dependencies.
  - Create `astro.config.mjs`.
  - Create `tsconfig.json`.
- [x] Step 2 - Create baseline minimal source files:
  - Create `src/pages/index.astro`.
  - Create `src/env.d.ts`.
- [x] Step 3 - Install dependencies using `pnpm install` and verify lockfile generation (`pnpm-lock.yaml`).
- [x] Step 4 - Run `pnpm build` and verify that the build succeeds with exit code 0.
- [x] Step 5 - Run `git status` to verify integrity of all documentation files.

**Checkpoints**
- [x] Checkpoint 1: Files created and `pnpm install` completed cleanly.
- [x] Checkpoint 2: `pnpm build` completes successfully and existing documentation files are unmodified.

## Implementation Workflow
*For each TODO above, the AI should:*
1. Show which files it plans to change.
2. Explain the approach.
3. Wait for approval.
4. Apply the change.
5. Run or update tests / build verification.

## Test Plan
- **Unit Tests**:
  - None required for initial scaffold.
- **Integration/Build**:
  - [ ] Run `pnpm build` - must exit with code 0 and generate `dist/index.html`.
- **Manual Verification**:
  - [ ] Verify `git status` shows existing `.docs/`, `.agents/`, and `docs/` files untouched.
