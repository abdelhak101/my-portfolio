# Milestones

## 1. Purpose

This document defines the proposed development milestones for **My Portfolio — Projects, Skills & Proof of Work**.

Milestones group related backlog items into meaningful delivery stages. Each milestone has a goal, scope, completion criteria, and dependencies.

Milestone completion indicates that its acceptance criteria have been met and verified. It does not merely mean that the associated code has been written.

**Project status:** Planning  
**Implementation status:** Not yet verified  
**Backlog reference:** [`backlog.md`](./backlog.md)

---

## 2. Milestone Overview

| ID | Milestone | Goal | Priority |
|---|---|---|---|
| M0 | Project Baseline | Confirm the repository, tooling, and initial decisions | P0 |
| M1 | Content Model & Validation | Define and validate portfolio content | P0 |
| M2 | Design Foundation & Layout | Establish the design system and shared layout | P0 |
| M3 | Portfolio & Project Pages | Publish the project listing and detail pages | P0 |
| M4 | Bilingual Experience | Support Arabic and English correctly | P0 |
| M5 | Search, Filters & Collections | Enable project discovery and curated sharing | P1 |
| M6 | Related Projects & Navigation | Connect related work and improve navigation | P1 |
| M7 | Quality, Accessibility & SEO | Validate usability, accessibility, and search metadata | P0 |
| M8 | Analytics, Privacy & Release | Verify operational requirements and publish the portfolio | P1 |

Priority labels are planning proposals, not commitments to a release date.

---

## 3. Milestones

### M0 — Project Baseline

**Goal:** Establish a reliable starting point before implementing features.

**Scope**
- Inspect the existing repository and current Astro setup.
- Confirm the package manager, scripts, dependencies, and deployment assumptions.
- Identify existing components, routes, styles, and configuration.
- Review open product and architecture decisions.
- Establish a reproducible development and build workflow.

**Completion criteria**
- [ ] The current repository structure and implementation status are documented.
- [ ] Development and production build commands are known and working.
- [ ] Existing functionality is distinguished from planned functionality.
- [ ] High-impact open decisions are documented.
- [ ] The initial implementation sequence is agreed upon.

**Dependencies:** None.

**Exit condition:** Development can proceed without relying on an unverified understanding of the repository.

---

### M1 — Content Model & Validation

**Goal:** Establish a consistent source of truth for projects and collections.

**Scope**
- Define Astro Content Collections and schemas.
- Define stable project IDs and slugs.
- Support multiple project types.
- Model roles, technologies, skills, dates, links, evidence, and case-study content.
- Define the Arabic and English content representation.
- Validate references between projects and collections.

**Completion criteria**
- [ ] Project schemas reflect the agreed content requirements.
- [ ] Invalid content produces actionable validation errors.
- [ ] Project IDs and slugs follow documented rules.
- [ ] Multiple project types are supported.
- [ ] Related-project references cannot point to nonexistent projects or the same project.
- [ ] Collection references cannot point to nonexistent projects.
- [ ] The behavior for missing translations is documented and tested.
- [ ] Sample content validates successfully.

**Dependencies:** M0.

**Open decisions:** Minimum required project fields, translation completeness, and draft/published content behavior.

**Exit condition:** The content model is sufficiently stable to build the user-facing pages.

---

### M2 — Design Foundation & Layout

**Goal:** Implement the shared visual foundation of the portfolio.

**Scope**
- Establish monochrome design tokens.
- Implement typography and spacing rules.
- Implement responsive containers and shared layout components.
- Build reusable buttons, links, cards, and form controls as needed.
- Implement light and dark themes.
- Establish direction-aware styling for Arabic RTL and English LTR.

**Completion criteria**
- [ ] Design tokens are centralized and consistently used.
- [ ] Shared layout components work across the initial routes.
- [ ] Light and dark themes are visually coherent.
- [ ] Theme switching works.
- [ ] Text direction and layout direction follow the active language.
- [ ] Focus, hover, disabled, and other relevant interactive states are defined.
- [ ] Responsive behavior is verified on representative screen sizes.

**Dependencies:** M0. M1 should provide the content assumptions needed for component design.

**Open decisions:** Exact typography, token values, theme persistence, and theme-preference precedence.

**Exit condition:** New pages can be assembled from a consistent set of reusable design foundations.

---

### M3 — Portfolio & Project Pages

**Goal:** Deliver the core portfolio browsing and project presentation experience.

**Scope**
- Implement the portfolio landing or listing page.
- Render project cards from validated content.
- Implement project detail pages.
- Present roles, technologies, skills, links, and available evidence.
- Support case-study content where provided.
- Handle invalid or unavailable project routes.

**Completion criteria**
- [ ] The portfolio listing is generated from the canonical project data.
- [ ] Each published project has a working detail page.
- [ ] Project pages display available metadata without fabricating missing information.
- [ ] GitHub, demo, and case-study links appear only when configured.
- [ ] Empty, missing, and invalid content states are handled.
- [ ] Pages build successfully using the intended Astro rendering strategy.

**Dependencies:** M1 and M2.

**Exit condition:** Visitors can browse the portfolio and inspect individual projects.

---

### M4 — Bilingual Experience

**Goal:** Provide a coherent Arabic and English experience.

**Scope**
- Implement the agreed URL and localization strategy.
- Render the correct language and text direction.
- Add a manual language switcher.
- Select the initial language according to browser language preferences for language-neutral share links.
- Define behavior for unavailable translations.
- Verify localized metadata and navigation.

**Completion criteria**
- [ ] Arabic and English pages render correctly.
- [ ] Arabic uses RTL and English uses LTR where appropriate.
- [ ] The language switcher works predictably.
- [ ] Language-neutral share links choose an initial language using browser preferences.
- [ ] Visitors can manually change the language.
- [ ] Missing translations follow the documented fallback or unavailable-content policy.
- [ ] Language-specific page metadata and canonical/hreflang behavior follow the chosen URL strategy.

**Dependencies:** M1, M2, and M3.

**Open decisions:** URL strategy, translation fallback, language preference persistence, and the behavior of the switcher on equivalent pages.

**Exit condition:** Both languages are usable, navigable, and consistent with the localization rules.

---

### M5 — Search, Filters & Collections

**Goal:** Help visitors find relevant work and share curated selections.

**Scope**
- Implement project search.
- Implement filters for the agreed project attributes.
- Support projects with multiple types.
- Create public collection pages based on project IDs.
- Link collection pages to the full portfolio.
- Ensure collections use canonical project data.

**Completion criteria**
- [ ] Search covers the agreed searchable fields.
- [ ] Filters use a documented combination rule.
- [ ] Projects with multiple types behave correctly in filters.
- [ ] Collection membership is determined by configured project IDs.
- [ ] Invalid collection references are detected during validation or build.
- [ ] Collection pages display the latest project content after a successful build and deployment.
- [ ] Collection pages are public and are not presented as access-controlled or private.
- [ ] Empty results and invalid collections have defined behavior.

**Dependencies:** M1, M3, and M4.

**Open decisions:** Searchable fields, filter combination semantics, collection indexing, and collection metadata requirements.

**Exit condition:** Visitors can discover relevant projects and open shareable collections.

---

### M6 — Related Projects & Navigation

**Goal:** Improve exploration between related pieces of work.

**Scope**
- Configure related projects through project IDs.
- Render related-project sections on project pages.
- Implement navigation between listing, detail, collection, and other approved pages.
- Ensure references use canonical project content.

**Completion criteria**
- [ ] Related projects are configured explicitly.
- [ ] Invalid and self-referencing relationships are rejected.
- [ ] Relationships are directional by default unless reciprocal links are configured separately.
- [ ] Related projects render correctly when valid.
- [ ] Missing or empty relationships do not break project pages.
- [ ] Navigation links point to valid routes.

**Dependencies:** M1, M3, and M4.

**Exit condition:** Visitors can move between related projects without duplicated content or broken links.

---

### M7 — Quality, Accessibility & SEO

**Goal:** Verify the quality of the complete visitor experience before release.

**Scope**
- Test core user journeys.
- Verify responsive behavior.
- Audit keyboard navigation and accessible naming.
- Check color contrast and visible focus states.
- Validate page titles, descriptions, canonical URLs, and localized metadata.
- Verify sitemap, robots directives, and structured data where applicable.
- Check internal links, assets, and production builds.

**Completion criteria**
- [ ] Core user journeys pass documented tests.
- [ ] Critical interactions work with keyboard navigation.
- [ ] Accessibility issues are reviewed against the intended WCAG 2.2 AA target.
- [ ] Arabic and English pages have appropriate metadata.
- [ ] Canonical URLs and language alternates follow the chosen URL strategy.
- [ ] Sitemap and robots behavior match the indexing requirements.
- [ ] No known release-blocking broken links or build errors remain.
- [ ] Production output has been checked on representative screen sizes and browsers.

**Dependencies:** M2, M3, M4, M5, and M6.

**Exit condition:** The portfolio meets the agreed release-quality criteria. The target does not imply automatic or certified WCAG compliance.

---

### M8 — Analytics, Privacy & Release

**Goal:** Publish the portfolio with verified operational and privacy behavior.

**Scope**
- Select and configure an analytics provider if required.
- Verify the actual cookies and browser storage used.
- Review the privacy policy, cookie policy, and terms of service.
- Implement any required consent and preference controls.
- Configure deployment and production environment settings.
- Perform a final production smoke test.

**Completion criteria**
- [ ] The production deployment completes successfully.
- [ ] The main portfolio, project, and collection routes work in production.
- [ ] Analytics is either configured and tested or explicitly deferred.
- [ ] Published privacy and cookie information matches the actual implementation.
- [ ] Any required consent mechanism is tested, including whether non-essential analytics is blocked until consent where applicable.
- [ ] No secrets or private project information are exposed in public output.
- [ ] Error handling and external links have been checked.
- [ ] A release checklist is completed.

**Dependencies:** M7 and all release-critical milestones.

**Open decisions:** Analytics provider, hosting platform, consent requirements, and final legal review.

**Exit condition:** The portfolio is deployed and its production behavior has been verified.

---

## 4. Proposed Delivery Order

The milestones describe logical outcomes, not necessarily separate releases. Some can overlap.

1. M0 — Project Baseline
2. M1 — Content Model & Validation
3. M2 — Design Foundation & Layout
4. M3 — Portfolio & Project Pages
5. M4 — Bilingual Experience
6. M5 — Search, Filters & Collections
7. M6 — Related Projects & Navigation
8. M7 — Quality, Accessibility & SEO
9. M8 — Analytics, Privacy & Release

A practical approach is to deliver a small working version early: a validated content model, a basic listing page, one project detail page, and a successful production build. Search, collections, and other enhancements can follow without blocking the first usable version.

---

## 5. Milestone Management Rules

- A milestone is **Planned** until work begins.
- A milestone is **In Progress** when implementation has started.
- A milestone is **Blocked** when a dependency or unresolved decision prevents meaningful progress.
- A milestone is **Complete** only when its completion criteria have been verified.
- Scope changes should be reflected in `backlog.md` and this document.
- Do not assign calendar dates until effort, dependencies, and available working time have been assessed.
- A completed milestone should reference the relevant commits, pull requests, tests, or deployment evidence where applicable.

Suggested status values:

`Planned` · `In Progress` · `Blocked` · `Complete`

---

## 6. Release Strategy

### Initial usable release

The first release should prioritize:

- Validated project content.
- Portfolio listing and project detail pages.
- Arabic and English support.
- Responsive layout and essential accessibility.
- Basic SEO and successful production deployment.

### Follow-up release

Add or complete:

- Search and filters.
- Public curated collections.
- Related-project navigation.
- Analytics and any required consent controls.
- Additional quality improvements identified during testing.

This release split is a proposal. Final release scope depends on the outstanding product decisions and the existing repository state.

---

## 7. Open Decisions Affecting Milestones

| Decision | Main impact |
|---|---|
| Minimum required project fields | M1, M3 |
| Translation completeness and fallback | M1, M4 |
| Language URL strategy | M4, M7 |
| Language preference persistence | M4 |
| Theme preference persistence and precedence | M2 |
| Searchable fields and filter combination rules | M5 |
| Collection indexing and metadata | M5, M7 |
| About, Skills, and Contact page scope | M3 |
| Analytics provider and consent requirements | M8 |
| Hosting and deployment platform | M0, M8 |

These decisions should be resolved when they affect implementation, rather than being treated as already approved.

---

## 8. Definition of Done

A backlog item is done when:

- [ ] Its acceptance criteria are met.
- [ ] Relevant tests or manual checks pass.
- [ ] Validation and production build succeed where applicable.
- [ ] Arabic and English behavior is checked when affected.
- [ ] Accessibility and responsive behavior are checked when affected.
- [ ] Documentation is updated when decisions or behavior change.
- [ ] No unresolved release-blocking issue remains.

A milestone is done only when all required items and milestone-specific completion criteria have been verified.
