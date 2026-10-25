# Feature PB-002 - Establish Development Scripts

## User Story
*As a developer on the portfolio project, I want clear, verified lifecycle commands for development, validation, and production builds using `pnpm`, so that I have a consistent, reliable development workflow.*

## Requirements
- **Core Functionality**:
  - `dev` script starts Astro development server.
  - `build` script runs validation and produces static output.
  - `preview` script starts local server to preview static build.
  - `check` script runs template and type validation via `@astrojs/check`.
- **Constraints**:
  - Use `pnpm` exclusively.
  - Avoid introducing unnecessary third-party linters or testing tools prematurely (YAGNI).
  - Adhere to project guidelines in `.agents/AGENTS.md`.

## Open Questions
- None.

## Acceptance Criteria
- [x] Development server starts successfully (`pnpm dev`).
- [x] Production build executes and outputs static assets (`pnpm build`).
- [x] Type and template validation script executes cleanly (`pnpm check`).
- [x] Available validation commands and scripts are clearly documented.
- [x] Commands work consistently with `pnpm`.

## Technical Details
- **Configuration File**: [`package.json`](file:///D:/10-26-2024/Projects/Personal/my-portfolio/package.json)
  - `"dev": "astro dev"`
  - `"build": "astro check && astro build"`
  - `"preview": "astro preview"`
  - `"check": "astro check"`
- **Dependencies**: No additional packages required beyond Astro core and `@astrojs/check`.

## Implementation Plan
- [x] Step 1 - Update `package.json` scripts to chain `astro check && astro build` for production builds.
- [x] Step 2 - Verify `pnpm check` executes cleanly without errors.
- [x] Step 3 - Verify `pnpm build` completes and outputs static site to `dist/`.
- [x] Step 4 - Verify `pnpm dev` launches development server.
- [x] Step 5 - Update `.agents/AGENTS.md` to reflect `pnpm` lifecycle commands.

**Checkpoints**
- [x] Checkpoint 1: Scripts configured and all `pnpm` commands verified.
- [x] Checkpoint 2: Documentation updated and working tree ready for commit.

## Implementation Workflow
*For each TODO above, the AI should:*
1. Show which files it plans to change.
2. Explain the approach.
3. Wait for approval.
4. Apply the change.
5. Run or update tests.

## Test Plan
- **Verification Commands**:
  - [ ] Run `pnpm check` -> Exit code 0, no diagnostic errors.
  - [ ] Run `pnpm build` -> Exit code 0, static output in `dist/`.
  - [ ] Run `pnpm dev` -> Dev server starts and binds port 4321.

## Decisions
- Chained `astro check && astro build` for the `build` script to guarantee that static builds are type-safe and template-verified before deployment.
- Kept lint/format/test tooling out of scope per YAGNI until their dedicated backlog stories.
