# Design: PB-002 Establish Development Scripts

## 1. Problem Statement & Context
The project foundation has been initialized with Astro 5 and TypeScript using `pnpm`. To ensure a reliable and ergonomic developer experience:
1. Standard lifecycle scripts (`dev`, `build`, `preview`, `check`) must be clearly configured in `package.json`.
2. The `build` script should ensure validation (`astro check`) runs as part of the compilation step.
3. Each script must be verified to execute successfully in the repository using `pnpm`.
4. Commands must be accurately documented in project guidance (`.agents/AGENTS.md` and related docs) to reflect `pnpm` usage.

---

## 2. Technical Decisions & Trade-offs
- **Package Manager**: Strictly `pnpm` across all lifecycle commands.
- **Validation Scope (YAGNI)**: Confining validation to `astro check` (via `@astrojs/check` and TypeScript). Linters (ESLint/Prettier/Biome) and test frameworks (Vitest/Playwright) will be introduced in subsequent dedicated stages.
- **Build Pipeline**: Enforce `astro check && astro build` to catch type or template issues prior to static output generation.

---

## 3. Architecture & Script Configuration
In `package.json`:
- `"dev": "astro dev"`
- `"build": "astro check && astro build"`
- `"preview": "astro preview"`
- `"check": "astro check"`

---

## 4. Verification & Validation Plan
1. Test `pnpm dev`: Validate dev server starts up cleanly.
2. Test `pnpm check`: Validate zero type/template errors.
3. Test `pnpm build`: Validate that type check runs and production assets generate cleanly in `dist/`.
4. Documentation update: Align documentation command references to `pnpm run <script>`.
