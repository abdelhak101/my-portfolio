# Design Document: PB-023 Validate Collection Membership

## 1. Overview & Goal
Ensure strict, actionable build-time validation for collection membership. Collections must reference valid project identifiers, strictly prevent draft or unpublished projects from leaking into published collections, clearly define duplicate membership semantics, and guarantee that updated project content automatically propagates to collections during static builds.

---

## 2. Key Architecture & Decisions

### 2.1 Multi-Layer Validation Model
1. **Pre-Build Validation Script & Pure Function (`src/content/validation/cross-references.ts` & `scripts/validate-content.ts`)**:
   - `ProjectReferenceInput` and `CollectionReferenceInput` accept `status: 'draft' | 'published'`.
   - **Existence Check**: Referenced project IDs must exist. If invalid, the error lists valid available IDs to be actionable.
   - **Privacy / Status Check**: A collection with `status: 'published'` cannot reference any project with `status: 'draft'`. A clear diagnostic explains how to fix it (publish the project or remove it from the collection).
2. **Astro Route Generation Guard (`getStaticPaths` in `src/pages/collections/[id].astro` & `src/pages/ar/collections/[id].astro`)**:
   - Verifies all referenced projects are published before generating pages.

### 2.2 Duplicate Membership Semantics
- **Within a single collection**: Strictly prohibited. Validated via Zod (`collectionSchema.superRefine`).
- **Across multiple collections**: Permitted and valid. A project may belong to multiple collections (e.g. `featured` and `open-source`).

### 2.3 Canonical Content Reflection
- Collections only store ID pointers (`projects: string[]`).
- Content is resolved dynamically at build time via `resolveCollection()`. Modifying any project file immediately propagates to all collections upon `pnpm build`.

---

## 3. Component & Module Changes

| File | Proposed Changes |
|---|---|
| `src/content/validation/cross-references.ts` | Add status fields to input interfaces, validate published-to-draft references, and format actionable error diagnostics listing available project IDs. |
| `scripts/validate-content.ts` | Pass project and collection `status` into `validateCrossReferences()`. |
| `src/pages/collections/[id].astro` & `src/pages/ar/collections/[id].astro` | Add runtime guard verifying all collection projects are published during `getStaticPaths`. |
| `tests/unit/content/cross-references.test.ts` | Add test cases for draft project references in published collections, actionable diagnostics, and cross-collection sharing. |

---

## 4. Test Strategy
1. **Unit Tests**:
   - Verify `validateCrossReferences` rejects draft projects in published collections.
   - Verify `validateCrossReferences` allows draft projects in draft collections.
   - Verify actionable error output contains available project IDs.
   - Verify duplicate IDs inside a single collection are caught by schema tests.
2. **End-to-End Pipeline**:
   - Run `pnpm validate:content`, `pnpm test`, and `pnpm build`.
