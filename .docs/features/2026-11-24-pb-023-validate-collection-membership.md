# Feature PB-023 - Validate Collection Membership

## User Story
*As a site maintainer and content author, I want build-time validation that strictly checks collection membership, prevents unpublished draft content from leaking into public collections, provides actionable errors for invalid IDs, and ensures updated project content immediately reflects in collections upon build, so that the portfolio maintains absolute content integrity.*

## Requirements

### Core Functionality
- **Build-Time ID Validation**:
  - All project IDs listed in collection files are validated during the build (`pnpm validate:content`).
  - Missing project IDs trigger a build failure.
- **Actionable Error Diagnostics**:
  - When an invalid project ID is referenced, the error diagnostic indicates the exact collection file, the missing ID, and lists known valid project IDs to help the author fix typos.
- **Unpublished Content Protection**:
  - A published collection (`status: 'published'`) **cannot** reference any project with `status: 'draft'`.
  - The build fails with an actionable message prescribing either publishing the referenced project or removing it from the collection.
  - A draft collection (`status: 'draft'`) may reference draft projects for staging.
- **Duplicate Membership Rules**:
  - Duplicate project IDs within a single collection are prohibited (enforced via schema validation).
  - A single project may belong to multiple distinct collections.
- **Content Freshness**:
  - Collections only reference project IDs and resolve full canonical project content dynamically. Updating a project file updates all collection views upon rebuild.

### Edge Cases
- All projects in a collection are draft: if the collection is published, the build fails; if the collection is draft, validation passes.
- Typo in project ID: actionable error lists available IDs.
- A project is published in multiple collections: valid, resolves cleanly in both.

### Constraints
- Pure TypeScript validation functions with zero runtime browser overhead.
- Integrates seamlessly with existing `pnpm build` pipeline (`scripts/validate-content.ts`).
- 100% test coverage.

## Open Questions
*None — all resolved during design session.*

## Acceptance Criteria
- [x] Collection project IDs are validated during the build.
- [x] Invalid IDs produce actionable errors listing known project IDs.
- [x] Duplicate membership behavior is defined and tested (disallowed within a collection, allowed across collections).
- [x] Collections cannot expose content that is not intended for public publication (published collections cannot reference draft projects).
- [x] Updated project content is reflected after a successful build and deployment.
- [x] All unit tests pass (`pnpm test`).
- [x] `pnpm validate:content` and `pnpm build` succeed cleanly.

## Technical Details

### Modified Files
- `src/content/validation/cross-references.ts` — add status checking and actionable suggestions to cross-reference validation.
- `scripts/validate-content.ts` — pass status fields to validator.
- `src/pages/collections/[id].astro` — add build guard for unpublished projects.
- `src/pages/ar/collections/[id].astro` — add build guard for unpublished projects.
- `tests/unit/content/cross-references.test.ts` — add comprehensive test cases for PB-023.

## Implementation Plan

- [x] **Step 1 — Enhance Cross-Reference Validation Logic** (`src/content/validation/cross-references.ts`)
  - Accept `status` on projects and collections.
  - Fail when a published collection references a draft project.
  - Include known project IDs in missing ID errors.

- [x] **Step 2 — Update Content Validation CLI Script** (`scripts/validate-content.ts`)
  - Pass `status` from parsed projects and collections into `validateCrossReferences()`.

- [x] **Step 3 — Add Route Generation Guards** (`src/pages/collections/[id].astro`, `src/pages/ar/collections/[id].astro`)
  - Verify during `getStaticPaths` that all projects resolved for published collections are published.

- [x] **Step 4 — Add Unit Tests & Verify Validation Pipeline** (`tests/unit/content/cross-references.test.ts`)
  - Add tests for draft privacy violation, actionable suggestions, and cross-collection sharing.
  - Run `pnpm validate:content`, `pnpm test`, and `pnpm build`.

**Checkpoints:**
- [x] Checkpoint 1 (After Step 2): `pnpm validate:content` validates project statuses.
- [x] Checkpoint 2 (After Step 4): `pnpm test` and `pnpm build` pass 100%.

## Test Plan
- **Unit Tests (`cross-references.test.ts`):**
  - [x] Validates that published collection referencing draft project fails with actionable message.
  - [x] Validates that draft collection referencing draft project passes.
  - [x] Validates that non-existent project ID lists available valid project IDs.
  - [x] Validates that a project can belong to multiple distinct collections.
- **Build Verification:**
  - [x] `pnpm validate:content` exits with code 0 on existing fixtures.
  - [x] `pnpm build` generates all static HTML pages.
