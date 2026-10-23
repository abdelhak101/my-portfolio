# Product Backlog

## 1. Purpose

This document tracks the work required to design, implement, validate, and release the personal developer portfolio.

The backlog is intended for a solo developer. Items should be small enough to implement and verify independently, while larger capabilities may be split into smaller tasks.

This document is a planning artifact, not evidence that any item has been implemented.

## 2. Project Context

The portfolio is built with Astro and presents software projects, designs, UI/UX work, automations, and AI projects.

The intended experience includes:

- Arabic and English content.
- Light and dark themes.
- Search and filtering across projects.
- Project details, technical explanations, and available evidence.
- Public collections containing selected projects.
- Related projects configured through project IDs.
- Content managed through repository files.
- Static generation and deployment without an initial database, CMS, or application backend.

The visual direction is Minimalist Editorial with Swiss-inspired design and Dark Minimalism, using a monochrome palette and restrained Wabi-Sabi details.

## 3. Backlog Conventions

### Priority

| Priority | Meaning |
|---|---|
| P0 | Required for the first usable release |
| P1 | Important improvement after core functionality |
| P2 | Optional enhancement or future consideration |

Priorities in this document are proposed planning priorities, not previously approved delivery commitments.

### Status

| Status | Meaning |
|---|---|
| Proposed | Candidate work awaiting confirmation |
| Ready | Scope and acceptance criteria are sufficiently clear |
| In Progress | Implementation has started |
| Blocked | Work depends on an unresolved decision or dependency |
| Done | Implemented and verified against acceptance criteria |
| Deferred | Deliberately postponed |

**Initial status:** Proposed, unless explicitly changed during implementation.

### Estimation

No estimates are assigned initially. Effort should be estimated after the scope and technical dependencies are sufficiently clear.

---

## 4. Epic Overview

| Epic | Description | Initial priority |
|---|---|---|
| EPIC-01 | Project foundation and tooling | P0 |
| EPIC-02 | Content model and validation | P0 |
| EPIC-03 | Shared layout and visual system | P0 |
| EPIC-04 | Portfolio discovery and project listing | P0 |
| EPIC-05 | Project detail pages | P0 |
| EPIC-06 | Arabic and English support | P0 |
| EPIC-07 | Theme switching | P1 |
| EPIC-08 | Public project collections | P0 |
| EPIC-09 | Related projects | P1 |
| EPIC-10 | Accessibility and responsive behavior | P0 |
| EPIC-11 | SEO and metadata | P0 |
| EPIC-12 | Privacy, legal pages, and analytics | P1 |
| EPIC-13 | Testing and release | P0 |
| EPIC-14 | Future enhancements | P2 |

These priorities are a proposed first-release plan. Dependencies and open decisions may change them.

---

## 5. Detailed Backlog

## EPIC-01 — Project Foundation and Tooling

### PB-001: Confirm project setup

**Priority:** P0  
**Status:** Proposed

**Description**

Inspect the existing repository and establish the actual Astro project structure before making implementation changes.

**Acceptance criteria**

- [ ] Existing files and project configuration are reviewed.
- [ ] The current Astro version and package manager are identified.
- [ ] Existing scripts and dependencies are documented.
- [ ] No existing work is overwritten without review.
- [ ] A baseline build can be run or existing build failures are documented.

### PB-002: Establish development scripts

**Priority:** P0  
**Status:** Proposed

**Description**

Ensure the project has clear commands for development, production builds, and relevant validation.

**Acceptance criteria**

- [ ] Development server starts successfully.
- [ ] Production build can be executed.
- [ ] Available validation commands are documented.
- [ ] Commands work with the repository's chosen package manager.

### PB-003: Establish code-quality conventions

**Priority:** P1  
**Status:** Proposed

**Acceptance criteria**

- [ ] Formatting and linting requirements are documented.
- [ ] Type-checking expectations are defined where applicable.
- [ ] Validation commands are reproducible.
- [ ] Additional tooling is introduced only when it provides clear value.

## EPIC-02 — Content Model and Validation

### PB-004: Define project content schema

**Priority:** P0  
**Status:** Proposed

**Description**

Define the project content model using Astro Content Collections and Zod in `src/content.config.ts`.

**Acceptance criteria**

- [ ] Each project has a stable unique identifier.
- [ ] Project titles and summaries follow the approved schema.
- [ ] Project types support multiple values.
- [ ] Technologies and skills are represented consistently.
- [ ] Optional sections can be omitted when irrelevant.
- [ ] External links and dates have defined formats.
- [ ] Arabic and English content can be represented according to the approved localization model.
- [ ] Invalid content produces understandable validation errors.

**Dependency:** Minimum required project fields and localization strategy must be confirmed.

### PB-005: Define collection content schema

**Priority:** P0  
**Status:** Proposed

**Description**

Represent public collections as content files containing curated project identifiers and appropriate collection metadata.

**Acceptance criteria**

- [ ] Each collection has a stable unique identifier.
- [ ] Collection membership references project IDs.
- [ ] Missing project references are detected.
- [ ] Duplicate project IDs are handled according to the approved rule.
- [ ] Collection metadata supports the approved language model.
- [ ] Collection details are resolved from canonical project content.

### PB-006: Validate cross-content references

**Priority:** P0  
**Status:** Proposed

**Description**

Validate relationships between projects and collections during content validation or the build process.

**Acceptance criteria**

- [ ] Related-project IDs must exist.
- [ ] A project cannot reference itself as a related project.
- [ ] Collection references must resolve to existing projects.
- [ ] Errors identify the affected content file and invalid reference.
- [ ] The behavior for invalid references is documented.

### PB-007: Prepare representative content fixtures

**Priority:** P0  
**Status:** Proposed

**Description**

Create representative project and collection content for development and testing.

**Acceptance criteria**

- [ ] Multiple project types are represented.
- [ ] At least one project has multiple types.
- [ ] Optional content sections are represented.
- [ ] Related projects can be demonstrated.
- [ ] A public collection can be rendered.
- [ ] Arabic and English content can be tested.
- [ ] Placeholder content is clearly identified and does not imply fabricated professional achievements.

## EPIC-03 — Shared Layout and Visual System

### PB-008: Implement design tokens

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Monochrome color tokens are defined.
- [ ] Semantic tokens support light and dark themes.
- [ ] Typography tokens are documented.
- [ ] Spacing and layout tokens are consistent.
- [ ] Component radii follow the mixed-radius direction.
- [ ] Borders are preferred over unnecessary shadows, subject to final approval.
- [ ] Token names are semantic rather than tied only to visual appearance.

### PB-009: Implement global page layout

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Shared header and footer are available.
- [ ] Page content uses a consistent responsive container.
- [ ] Navigation links have meaningful labels.
- [ ] Keyboard users can reach all navigation controls.
- [ ] A skip link or equivalent mechanism is available.
- [ ] The layout supports both right-to-left and left-to-right content.

### PB-010: Implement reusable UI components

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Buttons and links have consistent styles.
- [ ] Project cards have a reusable presentation.
- [ ] Empty and error states have reusable patterns.
- [ ] Focus, hover, and disabled states are defined where applicable.
- [ ] Components use semantic HTML.
- [ ] Component behavior is consistent with `ui-specifications.md`.

## EPIC-04 — Portfolio Discovery and Project Listing

### PB-011: Build the portfolio landing page

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] The page communicates the portfolio's purpose.
- [ ] Visitors can discover the project catalogue.
- [ ] Project links lead to the correct details.
- [ ] The layout supports Arabic and English.
- [ ] The page works on mobile and desktop.
- [ ] Content is sourced from the canonical project collection.

### PB-012: Implement project listing

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Projects are rendered from content files.
- [ ] Project cards display approved summary information.
- [ ] Multiple project types are represented correctly.
- [ ] Missing optional images do not break the layout.
- [ ] Project ordering follows a documented rule.
- [ ] Empty catalogue behavior is defined.

### PB-013: Implement project search

**Priority:** P0  
**Status:** Proposed

**Description**

Allow visitors to find projects using the approved searchable fields.

**Acceptance criteria**

- [ ] Search updates the visible project results.
- [ ] Empty and no-results states are handled.
- [ ] Search works with supported Arabic and English text.
- [ ] Search does not require a backend for the initial static catalogue.
- [ ] The searchable fields are explicitly defined.
- [ ] Search controls are keyboard accessible.

**Dependency:** Searchable fields and normalization behavior remain open decisions.

### PB-014: Implement project filters

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Visitors can filter by approved project metadata.
- [ ] Active filters are visible.
- [ ] Filters can be cleared.
- [ ] Search and filters work together.
- [ ] Result counts and empty states are consistent.
- [ ] Filter behavior is documented and tested.

**Dependency:** The combination rules within and across filter categories must be decided.

## EPIC-05 — Project Detail Pages

### PB-015: Build project detail pages

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Each published project has a detail page.
- [ ] The page displays available summary and metadata fields.
- [ ] Optional sections are rendered only when relevant content exists.
- [ ] GitHub, demo, and case-study links appear only when supplied.
- [ ] Technical explanations use readable headings and code formatting where appropriate.
- [ ] Missing optional data does not produce broken UI.
- [ ] Page metadata is generated from project content.

### PB-016: Present technical evidence

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Available evidence is presented clearly.
- [ ] Tests and results are not fabricated.
- [ ] External evidence links are identifiable.
- [ ] Limitations can be documented when relevant.
- [ ] Confidential or unauthorized material is not published.

### PB-017: Implement not-found behavior

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Unknown project routes return the appropriate not-found response.
- [ ] The not-found page provides a path back to the portfolio.
- [ ] Missing optional content is not confused with a missing project.
- [ ] Invalid internal references are caught by the validation process.

## EPIC-06 — Arabic and English Support

### PB-018: Decide and implement localized routing

**Priority:** P0  
**Status:** Blocked

**Description**

Choose a stable URL structure for Arabic and English pages and implement the corresponding Astro routing.

**Acceptance criteria**

- [ ] The URL strategy is documented.
- [ ] Localized pages have unambiguous routes.
- [ ] Internal links use the correct language.
- [ ] Language metadata is correct.
- [ ] Canonical and alternate-language metadata follow the approved strategy.

**Blocker:** Localized URL structure has not been finalized.

### PB-019: Implement language selection

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] The initial language follows the approved browser-language behavior.
- [ ] Visitors can switch languages manually.
- [ ] Language switching preserves the equivalent page when available.
- [ ] Missing translations follow an explicitly approved fallback rule.
- [ ] Language choice persistence follows the approved precedence rules.

**Dependency:** Persistence, precedence, and missing-translation behavior remain open.

### PB-020: Implement bidirectional layout support

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Arabic pages use correct RTL document direction.
- [ ] English pages use correct LTR document direction.
- [ ] CSS logical properties are used where appropriate.
- [ ] Mixed Arabic and Latin technical text remains readable.
- [ ] Navigation, cards, controls, and layouts are tested in both directions.

## EPIC-07 — Theme Switching

### PB-021: Implement light and dark themes

**Priority:** P1  
**Status:** Proposed

**Acceptance criteria**

- [ ] Both themes use the approved monochrome design system.
- [ ] Text and controls remain readable in each theme.
- [ ] Theme switching updates the visible interface.
- [ ] Theme choice behavior is consistent across navigation.
- [ ] The initial theme and persistence behavior follow an approved decision.
- [ ] Theme changes do not create unacceptable flashes or layout shifts.

**Dependency:** Initial theme precedence and persistence remain open.

## EPIC-08 — Public Project Collections

### PB-022: Build collection pages

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] A collection route resolves from its stable identifier.
- [ ] The page displays its configured projects.
- [ ] Collection project details come from canonical project content.
- [ ] The page links to the full portfolio.
- [ ] The collection supports the approved language behavior.
- [ ] Unknown collection identifiers return the appropriate not-found response.

### PB-023: Validate collection membership

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Collection project IDs are validated during the build.
- [ ] Invalid IDs produce actionable errors.
- [ ] Duplicate membership behavior is defined.
- [ ] Collections cannot expose content that is not intended for public publication.
- [ ] Updated project content is reflected after a successful build and deployment.

### PB-024: Document public sharing behavior

**Priority:** P1  
**Status:** Proposed

**Acceptance criteria**

- [ ] Collection URLs are treated as public.
- [ ] No claim is made that an unguessable URL provides access control.
- [ ] Collection pages offer a link to the full portfolio.
- [ ] Content changes follow the static build and deployment lifecycle.

## EPIC-09 — Related Projects

### PB-025: Implement related-project rendering

**Priority:** P1  
**Status:** Proposed

**Acceptance criteria**

- [ ] Related projects are configured using project IDs.
- [ ] Details are resolved from canonical project data.
- [ ] Missing references are rejected or handled according to the approved validation rule.
- [ ] Self-references are prohibited.
- [ ] Relationships remain directional unless reciprocity is explicitly configured.
- [ ] The component handles projects with no related items.

### PB-026: Improve relationship quality

**Priority:** P2  
**Status:** Proposed

**Acceptance criteria**

- [ ] Related projects have a meaningful technical or product relationship.
- [ ] The relationship does not rely on duplicated project descriptions.
- [ ] Automated similarity recommendations are not introduced without a separate decision.

## EPIC-10 — Accessibility and Responsive Behavior

### PB-027: Implement responsive layouts

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Pages work across the approved mobile, tablet, and desktop ranges.
- [ ] Project grids adapt to available width.
- [ ] Search and filters remain usable on small screens.
- [ ] Text and controls do not create unintended horizontal overflow.
- [ ] RTL and LTR layouts are tested at representative widths.

### PB-028: Implement accessibility requirements

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Semantic landmarks and heading hierarchy are used.
- [ ] Keyboard navigation is supported.
- [ ] Focus indicators are visible.
- [ ] Interactive controls have accessible names.
- [ ] Informative images have appropriate alternative text.
- [ ] Color contrast is evaluated against the chosen WCAG 2.2 AA target.
- [ ] Reduced-motion preferences are respected where relevant.
- [ ] Automated and manual accessibility checks are performed.

### PB-029: Validate usability

**Priority:** P1  
**Status:** Proposed

**Acceptance criteria**

- [ ] Representative visitors can find a relevant project.
- [ ] Visitors can understand a project's role and evidence.
- [ ] Visitors can navigate a public collection.
- [ ] Language and theme controls are understandable.
- [ ] Major usability issues are recorded and prioritized.

## EPIC-11 — SEO and Metadata

### PB-030: Implement page metadata

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Each page has a descriptive title.
- [ ] Project pages use accurate descriptions.
- [ ] Canonical URLs follow the approved routing strategy.
- [ ] Language metadata is correct.
- [ ] Alternate-language links are implemented where appropriate.
- [ ] Social-sharing metadata is configured where relevant.

### PB-031: Implement indexing and sitemap behavior

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Public portfolio and project pages follow the approved indexing policy.
- [ ] Sitemap generation is configured if appropriate.
- [ ] Not-found routes are not treated as valid content pages.
- [ ] Collection indexing follows an explicit decision.
- [ ] No private or confidential content is published through generated output.

### PB-032: Optimize media and performance

**Priority:** P1  
**Status:** Proposed

**Acceptance criteria**

- [ ] Images are appropriately sized and optimized.
- [ ] Unnecessary client-side JavaScript is avoided.
- [ ] Layout shifts are minimized.
- [ ] Core pages are tested with an appropriate performance tool.
- [ ] Performance improvements are based on measurements rather than assumptions.

## EPIC-12 — Privacy, Legal Pages, and Analytics

### PB-033: Publish legal pages

**Priority:** P1  
**Status:** Proposed

**Description**

Prepare and publish the relevant legal pages, including:

- `terms-of-service.md`
- `privacy-policy.md`
- `cookie-policy.md`

**Acceptance criteria**

- [ ] Owner identity and contact details are accurate.
- [ ] Legal text reflects the actual Website and its functionality.
- [ ] Applicable Moroccan data-protection requirements have been reviewed.
- [ ] The pages are linked from the Website footer.
- [ ] No placeholder text remains in the published pages.

**Dependency:** Legal review and actual implementation details.

### PB-034: Decide analytics implementation

**Priority:** P1  
**Status:** Blocked

**Description**

Choose Google Analytics or another analytics service and document the intended measurement scope.

**Acceptance criteria**

- [ ] The analytics provider is selected.
- [ ] Required events and measurement goals are documented.
- [ ] Data collection settings are reviewed.
- [ ] Personal information is not intentionally sent through analytics fields.
- [ ] Retention and data-sharing settings are reviewed.
- [ ] The implementation matches the Privacy Policy.

**Blocker:** The specific analytics provider and configuration have not been finalized.

### PB-035: Implement consent behavior where required

**Priority:** P1  
**Status:** Blocked

**Description**

Determine and implement appropriate consent behavior for analytics cookies and similar technologies.

**Acceptance criteria**

- [ ] Applicable consent requirements are reviewed.
- [ ] Non-essential technologies respect the required consent state.
- [ ] Visitors can reject non-essential analytics where applicable.
- [ ] Visitors can change or withdraw their choice where required.
- [ ] The consent interface is keyboard accessible.
- [ ] The deployed implementation is tested, not just the interface.

**Blocker:** Final analytics configuration and applicable legal requirements need confirmation.

## EPIC-13 — Testing and Release

### PB-036: Add content validation tests

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Required-field validation is tested.
- [ ] Invalid project IDs are detected.
- [ ] Invalid collection references are detected.
- [ ] Invalid related-project references are detected.
- [ ] Representative Arabic and English content passes validation.

### PB-037: Add functional tests

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Project listing and detail routes are tested.
- [ ] Search and filtering are tested.
- [ ] Collection pages are tested.
- [ ] Language switching is tested.
- [ ] Theme switching is tested if implemented.
- [ ] Not-found behavior is tested.

### PB-038: Perform pre-release review

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Production build succeeds.
- [ ] Critical internal links work.
- [ ] External links and media are checked.
- [ ] Responsive layouts are reviewed.
- [ ] RTL and LTR layouts are reviewed.
- [ ] Accessibility checks are performed.
- [ ] SEO metadata is checked.
- [ ] No secrets or unauthorized private content are included.
- [ ] Privacy and consent behavior matches the deployed implementation.

### PB-039: Deploy the first release

**Priority:** P0  
**Status:** Proposed

**Acceptance criteria**

- [ ] Hosting and deployment settings are configured.
- [ ] The production build is deployed successfully.
- [ ] The canonical domain and HTTPS are configured where applicable.
- [ ] Important routes are tested in production.
- [ ] A documented process exists for updating content and redeploying.
- [ ] The deployed version matches the reviewed release.

## EPIC-14 — Future Enhancements

### PB-040: Improve project discovery

**Priority:** P2  
**Status:** Proposed

Potential improvements:
- Advanced sorting.
- More sophisticated search.
- Additional filter categories.
- Saved filters or query-string-based filter state.

Each feature requires a separate decision based on actual user needs.

### PB-041: Consider additional portfolio pages

**Priority:** P2  
**Status:** Blocked

Potential pages:
- Dedicated Skills page.
- About page.
- Contact page.

**Blocker:** These pages have not been confirmed as part of the initial scope.

### PB-042: Consider automated related-project suggestions

**Priority:** P2  
**Status:** Deferred

Automatic recommendations based on shared technologies, skills, or project types are outside the initial scope.

They should be considered only if manual relationships prove insufficient.

---

## 6. Suggested Implementation Order

The following is a proposed dependency-aware sequence, not a fixed schedule.

1. Inspect the existing repository and establish the baseline.
2. Resolve the minimum project fields and localization model.
3. Implement project and collection schemas.
4. Add cross-content validation and representative content.
5. Implement design tokens and shared layout.
6. Build project listing and project detail pages.
7. Implement routing and Arabic/English behavior.
8. Implement search and filtering after confirming filter semantics.
9. Implement public collections and related projects.
10. Complete responsive behavior and accessibility.
11. Implement metadata and SEO.
12. Finalize analytics, privacy, and consent requirements.
13. Add automated tests and perform release checks.
14. Deploy and verify the first release.

Theme switching can be implemented alongside the shared layout, once theme precedence and persistence are decided.

## 7. Open Decisions That Affect the Backlog

The following decisions should be resolved before the corresponding tasks are marked Ready:

| Decision | Affected items |
|---|---|
| Minimum required project fields | PB-004, PB-007, PB-015 |
| Localized URL strategy | PB-018, PB-019, PB-030 |
| Missing-translation behavior | PB-019 |
| Language preference persistence | PB-019 |
| Initial theme and persistence precedence | PB-021 |
| Searchable fields | PB-013 |
| Filter-combination semantics | PB-014 |
| Final project-type taxonomy | PB-004, PB-012, PB-014 |
| Collection indexing policy | PB-031 |
| Skills, About, and Contact pages | PB-041 |
| Analytics provider and settings | PB-034 |
| Cookie and analytics consent behavior | PB-035 |
| Hosting and deployment provider | PB-001, PB-039 |
| Legal identity and applicable requirements | PB-033 |

## 8. Definition of Ready

A backlog item is Ready when:

- Its purpose and scope are clear.
- Dependencies are identified.
- Acceptance criteria are testable.
- Required product decisions have been made.
- The implementation approach is sufficiently understood.
- It can be worked on without silently making unrelated product decisions.

## 9. Definition of Done

A backlog item is Done only when:

- The implementation matches the approved scope.
- Its acceptance criteria have been verified.
- Relevant validation or tests pass.
- Accessibility, responsive behavior, and localization are checked where applicable.
- Documentation is updated when needed.
- No unresolved critical issue prevents the intended behavior.

A drafted document, an untested implementation, or a successful local build alone does not necessarily satisfy the Definition of Done.

## 10. Backlog Maintenance

Review the backlog as the project evolves.

- Add newly discovered work as separate items.
- Split tasks that are too large to implement or verify independently.
- Reprioritize based on user value, dependencies, and risk.
- Remove duplicates and outdated items.
- Record meaningful changes to scope.
- Do not mark proposed features as implemented.
- Keep implementation status separate from product decisions.

This backlog should remain a practical working document rather than a commitment to implement every proposed enhancement.
