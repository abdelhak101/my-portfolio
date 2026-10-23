# Sprint Goals

## 1. Purpose

This document defines the proposed sprint goals for **My Portfolio — Projects, Skills & Proof of Work**.

Each sprint should produce a small, verifiable outcome that moves the project toward its next milestone.

The sprint plan is intentionally lightweight because the project is currently in the planning stage and the existing repository state has not yet been verified.

**Project status:** Planning  
**Current sprint:** Not started  
**Sprint duration:** To be decided  
**Related documents:**
- [`backlog.md`](./backlog.md)
- [`milestones.md`](./milestones.md)

---

## 2. Sprint Planning Principles

- Each sprint has one primary goal.
- Tasks are selected from the backlog according to dependencies and value.
- Sprint goals describe outcomes, not merely activities.
- Work should be small enough to verify independently.
- Unresolved decisions should be investigated before dependent implementation begins.
- A sprint is not considered complete simply because all planned coding tasks were attempted.
- If new information changes the plan, update the sprint scope and document the reason.
- Do not commit to dates or effort estimates before assessing the repository and available working time.

For this single-developer project, sprint planning can be informal. A written goal, a small set of tasks, and a clear completion condition are sufficient.

---

## 3. Proposed Sprint Sequence

The following sequence is a proposal, not a record of completed work.

| Sprint | Primary goal | Related milestone |
|---|---|---|
| S0 | Verify the current repository and establish the baseline | M0 |
| S1 | Finalize project content requirements and data validation | M1 |
| S2 | Establish the design foundation and shared layout | M2 |
| S3 | Deliver the portfolio listing and project detail pages | M3 |
| S4 | Deliver the bilingual experience | M4 |
| S5 | Implement search, filters, and public collections | M5 |
| S6 | Complete related-project navigation and core quality checks | M6–M7 |
| S7 | Verify production readiness and publish the portfolio | M8 |

The sequence may change after inspecting the existing codebase. Some goals can be combined if their scope is small, or split if they prove too large.

---

## 4. Sprint Goal Details

### S0 — Repository Baseline

**Goal**

Establish an accurate understanding of the existing project and a reproducible development workflow.

**Planned work**
- Inspect the repository structure and current implementation.
- Check Astro, dependencies, package manager, and scripts.
- Run the available development and production build commands.
- Identify existing features, missing features, and technical blockers.
- Review unresolved decisions that could affect implementation.

**Acceptance criteria**
- [ ] Current implementation status is documented.
- [ ] The development workflow is understood.
- [ ] Build errors and existing blockers are recorded.
- [ ] Planned features are distinguished from implemented features.
- [ ] The next sprint can begin without relying on guesses about the repository.

**Completion evidence:** Repository inspection notes and recorded build/test results.

---

### S1 — Content Requirements & Validation

**Goal**

Define a reliable content model before building the portfolio pages around it.

**Planned work**
- Decide which project fields are required.
- Define project identifiers, slugs, types, skills, and technologies.
- Decide how Arabic and English content are represented.
- Define collection and related-project references.
- Implement Astro Content Collections and schema validation.
- Add a small set of representative sample projects.

**Acceptance criteria**
- [ ] Required and optional fields are documented.
- [ ] Valid sample projects pass validation.
- [ ] Invalid data produces understandable errors.
- [ ] Multiple project types are supported.
- [ ] Invalid project references are detected.
- [ ] Translation behavior is documented.

**Completion evidence:** Content schema, sample content, and successful validation/build results.

**Dependency:** S0.

---

### S2 — Design Foundation & Shared Layout

**Goal**

Create the reusable visual foundation for the portfolio.

**Planned work**
- Define monochrome design tokens.
- Implement shared typography and spacing rules.
- Create the main page layout and navigation.
- Establish reusable project-card and link styles.
- Implement light and dark themes.
- Add RTL/LTR-aware styling.

**Acceptance criteria**
- [ ] Shared design tokens are centralized.
- [ ] Common layout components render correctly.
- [ ] Theme switching works.
- [ ] Arabic and English text directions are supported.
- [ ] Keyboard focus states are visible.
- [ ] Layout behavior is checked at representative viewport widths.

**Completion evidence:** Working layout and reusable components demonstrated in the running application.

**Dependencies:** S0; S1 for the content structures needed by components.

---

### S3 — Core Portfolio Pages

**Goal**

Allow visitors to browse the portfolio and inspect individual projects.

**Planned work**
- Implement the portfolio listing.
- Render project cards from validated content.
- Implement project detail pages.
- Display available project metadata and evidence links.
- Handle missing or invalid project routes.

**Acceptance criteria**
- [ ] The listing is generated from canonical project data.
- [ ] Each published project has a working detail page.
- [ ] Optional fields are handled without broken or empty links.
- [ ] Content is not duplicated unnecessarily between pages.
- [ ] Invalid routes have defined behavior.
- [ ] The production build succeeds.

**Completion evidence:** A working listing page and at least one representative project detail page.

**Dependencies:** S1 and S2.

---

### S4 — Bilingual Experience

**Goal**

Make the core portfolio usable in Arabic and English.

**Planned work**
- Implement the agreed URL and localization strategy.
- Add the language switcher.
- Support RTL and LTR page layouts.
- Apply the agreed browser-language behavior to language-neutral share links.
- Implement the translation fallback or unavailable-content policy.
- Review localized page metadata.

**Acceptance criteria**
- [ ] Arabic and English pages render correctly.
- [ ] Language switching works.
- [ ] Text direction follows the active language.
- [ ] Browser-language selection behaves as specified.
- [ ] Missing translations follow a documented rule.
- [ ] Localized routes and metadata are consistent.

**Completion evidence:** Verified navigation and rendering in both languages.

**Dependencies:** S1, S2, and S3.

---

### S5 — Search, Filters & Public Collections

**Goal**

Help visitors find relevant projects and share curated project selections.

**Planned work**
- Implement search across the agreed fields.
- Implement the agreed project filters.
- Support projects with multiple types.
- Generate public collection pages from project IDs.
- Add links from collections to the full portfolio.
- Validate collection references.

**Acceptance criteria**
- [ ] Search returns matching projects.
- [ ] Filters follow the documented combination rules.
- [ ] Multiple project types behave correctly.
- [ ] Collection membership follows configured IDs.
- [ ] Invalid collection references are detected.
- [ ] Collection pages use canonical project data.
- [ ] Updated content appears after a successful build and deployment.
- [ ] Collections are not presented as private or access-controlled.

**Completion evidence:** Tested search/filter behavior and at least one representative public collection.

**Dependencies:** S1, S3, and S4.

---

### S6 — Related Projects & Quality Review

**Goal**

Improve exploration between projects and resolve important quality issues.

**Planned work**
- Render configured related projects.
- Verify internal navigation.
- Test the principal visitor journeys.
- Review keyboard navigation, focus states, and contrast.
- Check responsive layouts.
- Review page metadata and SEO fundamentals.

**Acceptance criteria**
- [ ] Valid related-project references render correctly.
- [ ] Self-references and invalid IDs are rejected.
- [ ] Core navigation paths work.
- [ ] Critical keyboard interactions are usable.
- [ ] Responsive behavior is checked.
- [ ] Titles, descriptions, and canonical metadata follow the agreed rules.
- [ ] No known release-blocking defects remain.

**Completion evidence:** Test results and a list of resolved or explicitly deferred issues.

**Dependencies:** S2–S5, depending on which features have been implemented.

---

### S7 — Production Readiness & Release

**Goal**

Publish the portfolio and verify that the deployed experience works as intended.

**Planned work**
- Confirm the hosting and deployment configuration.
- Run final validation and production builds.
- Configure analytics if the provider and requirements have been decided.
- Verify privacy and cookie disclosures against the actual implementation.
- Test consent behavior where required.
- Check public routes, external links, and assets in production.

**Acceptance criteria**
- [ ] Production deployment succeeds.
- [ ] Core portfolio and project routes work.
- [ ] Public collections work if included in the release.
- [ ] Analytics is tested or explicitly deferred.
- [ ] Privacy disclosures match the actual data collection behavior.
- [ ] Required consent controls work as intended.
- [ ] No secrets or confidential project information are exposed.
- [ ] Release checks are documented.

**Completion evidence:** Production URL, smoke-test results, and release checklist.

**Dependencies:** Release-critical work from S1–S6.

---

## 5. Sprint Execution Template

Copy this template when starting a new sprint.

### Sprint [ID] — [Short Name]

**Status:** Planned  
**Start date:** TBD  
**End date:** TBD

**Sprint goal**

Describe the single outcome that should exist by the end of the sprint.

**Selected backlog items**
- [ ] PB-XXX — Task title
- [ ] PB-XXX — Task title

**Dependencies and unresolved decisions**
- Dependency:
- Decision needed:
- Known risk:

**Acceptance criteria**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Verification**
- Tests:
- Manual checks:
- Build/deployment checks:

**Sprint review**
- Outcome achieved:
- Incomplete work:
- New findings:
- Follow-up backlog items:

**Status:** Planned / In Progress / Blocked / Complete

---

## 6. Sprint Completion Rules

A sprint is complete when its outcome has been reviewed against its acceptance criteria.

- **Goal achieved:** The intended outcome is verified.
- **Partially achieved:** Some useful work is complete, but the goal remains unmet.
- **Not achieved:** The intended outcome has not been delivered.
- **Blocked:** A dependency or unresolved decision prevented progress.

Incomplete tasks should return to the backlog or be explicitly rescheduled. They should not automatically be treated as completed in the next sprint.

A sprint review should record what changed in the actual product, not just what was worked on.

---

## 7. Planning Notes

Before committing to the sequence above:

1. Inspect the current repository.
2. Resolve the minimum required project fields and localization strategy.
3. Break the first selected backlog items into tasks small enough to complete and verify.
4. Estimate effort based on the actual codebase and available working time.
5. Select a sprint duration only if a fixed cadence is useful.

The sprint sequence is provisional. Existing code may allow several goals to be combined, while unexpected technical issues may require splitting them.

