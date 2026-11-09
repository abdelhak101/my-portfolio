# Feature PB-016 - Present Technical Evidence

## User Story
*As a technical reviewer, hiring manager, or engineering peer, I want to inspect verifiable technical evidence, concrete test suites, source artifacts, and honest engineering trade-offs, so that I can evaluate engineering capabilities based on real proof rather than unsubstantiated claims.*

## Requirements

### Core Functionality
- **Verifiable Technical Evidence & Artifacts**:
  - Distinguish evidence link types (`repo`, `demo`, `test`, `case-study`, `review`, `other`) with dedicated badges and context.
  - Present evidence links with secure attributes (`rel="noopener noreferrer" target="_blank"`).
  - Extract and display the hostname domain preview (e.g., `github.com`) so visitors know the destination before clicking.
- **Engineering Limitations & Known Trade-offs**:
  - Support an optional `limitations` field in `projectSchema` representing technical boundaries, trade-offs, or constraints.
  - Render an honest, structured "Engineering Constraints & Trade-Offs" callout section when `limitations` are supplied.
  - Omit the section entirely when no limitations are defined (no empty boxes or broken layout).
- **Anti-Fabrication & Confidentiality Safeguards**:
  - Disallow placeholder or fake URLs (e.g. `example.com`, `localhost`, `TODO`, `TBD`) in published projects during schema validation.
  - Document strict editorial standards in `.docs/STANDARDS.md` regarding non-fabrication of metrics, prohibition of leaking confidential secrets, proprietary internal APIs, or client IP.

### Edge Cases
- Project with no external links: Evidence section is omitted entirely.
- Project with no limitations: Constraints section is omitted entirely without broken headers.
- Invalid link URLs or placeholder domains: Build fails with clear diagnostic error message.

### Constraints
- Pure Astro SSG + Tailwind CSS design system tokens.
- Fully bilingual (English and Arabic with RTL).
- TypeScript strict mode, zero `any`.

## Open Questions
*None — all resolved during design session.*

## Acceptance Criteria
- [x] Available technical evidence and external proof links are presented clearly with dedicated artifact badges.
- [x] External evidence links use secure attributes (`rel="noopener noreferrer"` and `target="_blank"`).
- [x] Published projects cannot contain placeholder or fabricated URLs (`example.com`, `localhost`, `TODO`, `TBD`).
- [x] Engineering limitations and known trade-offs can be documented in project content and render cleanly.
- [x] Missing limitations or links do not produce empty sections or broken layout.
- [x] Confidentiality and non-fabrication policies are codified in project standards documentation.
- [x] Unit and schema tests pass with 100% success.
- [x] Full static build (`pnpm build`) succeeds.

## Technical Details

### Modified Files
- `src/content/schemas/project.ts` — add `limitations` field, refine link schema to prevent placeholder domains on published projects
- `src/components/project/ProjectDetail.astro` — enhance Technical Evidence section and add Engineering Limitations section
- `src/content/projects/portfolio.json` — add real-world evidence links and limitations
- `src/content/projects/ai-summarizer.json` — add genuine links and limitations
- `.docs/STANDARDS.md` — add Section 8 on Technical Evidence & Confidentiality Policy
- `tests/unit/content/project-schema.test.ts` — test `limitations` schema validation and placeholder URL rejection
- `tests/unit/pages/project-detail.test.ts` — test evidence section rendering, badges, secure attributes, and conditional limitations

## Implementation Plan

- [x] **Step 1 — Codify Technical Evidence & Confidentiality Standards** (`.docs/STANDARDS.md`)
  - Document policies against metric fabrication, mandatory artifact classification, trade-off disclosure, and confidentiality boundaries

- [x] **Step 2 — Update Project Schema with Limitations & Anti-Placeholder Validation** (`src/content/schemas/project.ts`)
  - Add `limitations: z.array(localizedStringSchema).default([])`
  - Add validation rule rejecting placeholder domains (`example.com`, `localhost`, `TODO`) for published projects

- [x] **Step 3 — Update Fixture Projects with Realistic Evidence & Limitations** (`src/content/projects/*.json`)
  - Update `portfolio.json` with genuine repository link and realistic limitations
  - Update other published project fixtures to satisfy anti-placeholder validation

- [x] **Step 4 — Enhance ProjectDetail Component with Evidence & Limitations Sections** (`src/components/project/ProjectDetail.astro`)
  - Enhance "Technical Evidence & Artifacts" section with hostname previews, localized artifact badges, and secure links
  - Add "Engineering Constraints & Trade-Offs" section rendered conditionally when `limitations` exist
  - Add bilingual translation dictionaries

- [x] **Step 5 — Update Schema & Integration Test Suites** (`tests/unit/content/project-schema.test.ts`, `tests/unit/pages/project-detail.test.ts`)
  - Test valid parsing of `limitations`
  - Test rejection of placeholder URLs on published projects
  - Test rendering of evidence artifacts and conditional limitations in `ProjectDetail.astro`

**Checkpoints:**
- [x] Checkpoint 1 (After Step 3): `pnpm validate:content` passes cleanly
- [x] Checkpoint 2 (After Step 5): `pnpm test` passes with 100% success
- [x] Checkpoint 3 (Final): `pnpm build` completes with 0 errors

## Implementation Workflow
*For each step above, the AI will:*
1. State which files it plans to change and the approach
2. Wait for approval
3. Apply the change
4. Run or update tests
5. Summarize files changed, behavior modified, and follow-up TODOs

## Test Plan
- **Unit Tests:**
  - [ ] `project-schema.test.ts` — validates `limitations` field
  - [ ] `project-schema.test.ts` — rejects placeholder domains in published project links
  - [ ] `project-detail.test.ts` — verifies Evidence & Artifacts section with type badges and `rel="noopener noreferrer"`
  - [ ] `project-detail.test.ts` — verifies Engineering Constraints & Trade-Offs section is conditional
- **Verification:**
  - [ ] `pnpm check` produces 0 errors
  - [ ] `pnpm validate:content` succeeds
  - [ ] `pnpm build` creates all static pages with zero errors

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Limitations representation | Structured `limitations` array in `projectSchema` | Cleanly typed, bilingual, and conditionally rendered |
| Evidence links formatting | Dedicated "Technical Evidence & Artifacts" card section with badges and hostname | Distinguishes repos from demos, test suites, and case studies clearly |
| Integrity enforcement | Schema disallows placeholder URLs + Standards policy | Prevents dummy/unverified data while keeping build fully offline-capable |
