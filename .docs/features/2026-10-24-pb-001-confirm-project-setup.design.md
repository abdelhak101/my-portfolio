# Design: PB-001 Confirm Project Setup & Baseline

## 1. Problem Statement & Context
The repository currently contains architecture guidelines, agent specifications, and design documents in `.docs/`, `.agents/`, and `docs/`, but no application codebase exists yet. There is no `package.json`, `astro.config.mjs`, or lockfile present in the repository root.

To fulfill **PB-001 (Confirm project setup)** safely without overwriting any existing documentation or configs:
1. Document the current repository state and available runtimes.
2. Scaffold an Astro 5.x baseline with TypeScript (strict) and pnpm in the project root.
3. Verify that zero existing files in `.docs/`, `.agents/`, `.git/`, or `docs/` are modified or deleted.
4. Establish standard scripts (`pnpm dev`, `pnpm build`, `pnpm check`) and verify a clean baseline build.

---

## 2. Technical Decisions & Trade-offs

- **Package Manager**: `pnpm` (v9.15.4 installed, with Node v22.13.1).
- **Astro Version**: Astro 5 (latest stable via `create-astro@latest --template minimal --install --no-git --no-ai`).
- **TypeScript**: Strict mode (`tsconfig.json` extending `astro/tsconfigs/strict`).
- **Dependencies & Tailwind**: Minimal initial setup; Tailwind integration can follow project standards without bloat.
- **Verification**: Run `pnpm build` and verify output in `dist/`, establishing the clean baseline.

---

## 3. Architecture & File Structure

Files to be created in repository root:
- `package.json` (Astro core scripts & deps)
- `astro.config.mjs`
- `tsconfig.json`
- `pnpm-lock.yaml`
- `src/` directory:
  - `src/pages/index.astro`
  - `src/env.d.ts`

Files protected (MUST NOT be overwritten):
- `.docs/**`
- `.agents/**`
- `docs/**`
- `README.md`
- `LICENSE`

---

## 4. Verification & Validation Plan
1. Run `pnpm install`.
2. Run `pnpm build` to confirm static build generation (`dist/`).
3. Run `git status` to ensure all existing documentation files remain untouched.
4. Record baseline build status in the feature spec.
