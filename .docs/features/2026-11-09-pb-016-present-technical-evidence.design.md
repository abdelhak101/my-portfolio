# PB-016: Present Technical Evidence — Design

**Date:** 2026-11-09
**Status:** Validated
**Feature:** Present verified technical evidence, structured artifacts, honest engineering limitations, and confidentiality safeguards.

---

## Decisions

| Question | Decision | Rationale |
|---|---|---|
| Limitations representation | Structured `limitations: z.array(localizedStringSchema).default([])` in `projectSchema` | Cleanly typed, bilingual, conditional, and avoids unstructured text bloat |
| Evidence & proof links presentation | Dedicated "Technical Evidence & Artifacts" card section with badges and host indicator | Distinguishes source code from live demos, test suites, and case studies clearly |
| Truthfulness & confidentiality enforcement | Content validation rules in `validate-content.ts` + editorial standards in `.docs/STANDARDS.md` | Automated prevention of placeholder/fabricated URLs; clear organizational boundary against leaking secrets or client IP |

---

## Section 1: Schema & Data Model Updates

### 1. `src/content/schemas/project.ts`
- Add `limitations`:
  ```typescript
  limitations: z.array(localizedStringSchema).default([]),
  ```
- Project links refinement:
  - Disallow placeholder hosts (`localhost`, `TODO`, `TBD`, `example.com`) in published projects:
  ```typescript
  export const projectLinkSchema = z.object({
    url: z.string().url('Must be a valid URL'),
    label: localizedStringSchema,
    type: z.enum(['repo', 'demo', 'test', 'case-study', 'review', 'other']).optional(),
  });
  ```
- SuperRefine rule:
  - If `status === 'published'`, links must not point to `localhost`, `example.com`, or placeholder text.

### 2. Fixture Projects Update
- Update sample projects with genuine evidence links and honest technical limitations.

---

## Section 2: UI Presentation & Components

### 1. `src/components/project/ProjectDetail.astro`
- **Technical Evidence & Artifacts Section**:
  - Rendered when `project.links.length > 0`.
  - Heading: `Technical Evidence & Artifacts` (EN) / `الأدلة التقنية والوثائق` (AR).
  - Cards highlight:
    - Evidence type badge (`Source Code`, `Live Demo`, `Test Suite`, `Case Study`, `Architecture Review`).
    - Localized link label.
    - External arrow indicator (`↗`).
    - Domain hostname preview (e.g. `github.com`).
    - Strict `rel="noopener noreferrer"` and `target="_blank"`.
- **Engineering Constraints & Trade-Offs Section**:
  - Rendered when `project.limitations.length > 0`.
  - Heading: `Engineering Constraints & Trade-Offs` (EN) / `القيود الهندسية والمفاضلات` (AR).
  - Stylized callout box with structured list of technical boundaries.
  - Omitted completely when `limitations` is empty.

---

## Section 3: Validation, Standards & Testing Strategy

### 1. Standards Documentation (`.docs/STANDARDS.md`)
- Add Section 8: `Technical Evidence & Confidentiality Policy`.
  - Prohibits fabricated metrics and fake test results.
  - Requires verifiable artifact links with explicit types.
  - Recommends documenting trade-offs/limitations for non-trivial software.
  - Prohibits publishing internal secrets, unredacted PII, or confidential client proprietary assets.

### 2. Test Suite
- `tests/unit/content/project-schema.test.ts`:
  - Validate `limitations` parsing (empty, valid bilingual items).
  - Validate published project link rejection for placeholder domains (`example.com`, `localhost`).
- `tests/unit/pages/project-detail.test.ts`:
  - Verify "Technical Evidence & Artifacts" section renders with badges and `rel="noopener noreferrer"`.
  - Verify "Engineering Constraints & Trade-Offs" section renders conditionally.
  - Verify omitting `limitations` leaves no empty headers.
- `pnpm validate:content`, `pnpm check`, `pnpm test`, and `pnpm build` pass with 100% success.
