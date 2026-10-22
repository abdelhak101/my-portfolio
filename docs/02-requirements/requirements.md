# Requirements

## My Portfolio — Projects, Skills & Proof of Work

## 1. Purpose

This document defines the functional and non-functional requirements for My Portfolio, a bilingual personal portfolio built with Astro.

It translates the product vision, problem statement, and product scope into requirements that can guide domain modeling, architecture design, implementation, and testing.

Each requirement has a unique identifier so that it can be referenced in design documents, development tasks, and acceptance tests.

## 2. Product Context
k
My Portfolio enables one developer to present projects, skills, technologies, and supporting evidence through a public website.

The product supports:

- Project discovery through browsing, search, and filtering.
- Individual project pages.
- Public collections containing selected projects.
- Manually configured links between related projects.
- Arabic and English content.
- File-based content management and static site generation.

The initial implementation uses Astro and structured content files stored in the repository. Project changes become visible after a successful build and deployment.

## 3. Stakeholders and Actors

| Actor | Description |
|---|---|
| Portfolio Owner | Maintains project content, case studies, and public collections. |
| Visitor | Browses the portfolio, searches for projects, and opens project or collection pages. |
| Build Process | Loads, validates, and generates website pages from the content files. |
| Deployment Platform | Publishes the generated static website. |

The portfolio has one owner. Visitors do not need accounts to access public content.

## 4. Functional Requirements

### 4.1 Portfolio Navigation

**FR-001 — Homepage**

The system shall provide a homepage that introduces the portfolio and provides access to the project catalogue.

**FR-002 — Project Catalogue**

The system shall provide a catalogue of published projects.

**FR-003 — Project Detail Pages**

The system shall provide a dedicated page for each published project.

**FR-004 — Navigation Between Pages**

The system shall allow visitors to navigate between the homepage, project catalogue, project details, case studies, and public collections where applicable.

**FR-005 — Full Portfolio Access**

The system shall provide a way for visitors arriving through a public collection to explore the full portfolio.

### 4.2 Project Content

**FR-006 — Stable Project Identifier**

Each project shall have a unique, stable identifier that is independent of its localized titles.

**FR-007 — Localized Project Information**

Each published project shall provide a title and summary in Arabic and English.

**FR-008 — Project Role**

A project may include a description of the portfolio owner's role and contribution.

**FR-009 — Multiple Project Types**

A project shall support one or more project types.

The initial supported types shall be:

- `software`
- `design`
- `ui-ux`
- `automation`
- `ai`
- `other`

**FR-010 — Skills and Technologies**

A project may reference zero or more skills and technologies.

**FR-011 — Project Date**

A project may include a project date in a defined, validated format.

**FR-012 — Project Cover**

A project may include an optional cover image.

**FR-013 — Evidence Links**

A project may include links to supporting resources, such as source code, live demos, tests, case studies, reviews, or other relevant evidence.

**FR-014 — Outcomes**

A project may include documented outcomes, metrics, or client feedback when available.

**FR-015 — Optional Information**

The system shall not require optional evidence, results, or client feedback when those items are unavailable.

The system shall not fabricate evidence, metrics, ratings, or personal contributions.

**FR-016 — Project Publication Status**

Each project shall have a publication status of `draft` or `published`.

Only published projects shall be exposed through public portfolio pages and collections.

**FR-017 — Project Content Validation**

The build process shall validate required project fields and supported field values.

Invalid project content shall produce an actionable build error.

### 4.3 Search and Filtering

**FR-018 — Project Search**

Visitors shall be able to search the project catalogue using relevant project metadata.

The initial search scope shall include project titles and summaries in supported languages, with other searchable fields added where practical.

**FR-019 — Filter by Project Type**

Visitors shall be able to filter projects by project type.

**FR-020 — Filter by Skill**

Visitors shall be able to filter projects by skill.

**FR-021 — Filter by Technology**

Visitors shall be able to filter projects by technology.

**FR-022 — Filter by Evidence Type**

Visitors shall be able to filter projects by evidence type if this filter is included in the initial catalogue interface.

**FR-023 — Combined Search and Filters**

The system shall support combining search and filter criteria.

The exact behavior when multiple filters are selected shall be consistent and documented. The initial implementation should use AND logic between different filter categories and OR logic between multiple selected values within the same category.

**FR-024 — Empty Search Results**

The system shall provide a clear empty state when no projects match the current search and filter criteria.

### 4.4 Public Collections

**FR-025 — Collection Identifier**

Each collection shall have a unique, stable identifier used in its public URL.

**FR-026 — Collection Content**

A collection shall reference an explicitly configured list of project identifiers.

**FR-027 — Public Collection URL**

Each published collection shall be accessible through a public, shareable URL without authentication.

**FR-028 — Collection Project Display**

A collection page shall display its configured projects in the defined order, subject to publication and reference validation.

**FR-029 — Reuse of Project Data**

A collection shall reference the original project content instead of maintaining duplicated project descriptions.

**FR-030 — Collection Localization**

Collection titles and descriptions shall support Arabic and English.

**FR-031 — Collection Reference Validation**

The build process shall validate that every project identifier referenced by a collection exists.

A collection shall not be published if its required references are invalid.

**FR-032 — Draft Projects in Collections**

Draft projects shall not be displayed in public collections.

The build process shall detect invalid collection references to draft projects and report an actionable error for the content owner.

**FR-033 — Collection Updates**

Changes to collection membership shall take effect after the next successful build and deployment.

Changes to project details shall be reflected in the collection after the next successful build and deployment, without requiring the project details to be copied into the collection file.

**FR-034 — Collection-to-Portfolio Navigation**

A public collection shall provide a link to the full portfolio.

### 4.5 Related Projects

**FR-035 — Manual Related-Project References**

A project may reference other projects through a list of stable project identifiers.

**FR-036 — Related-Project Display**

A project page shall display links to its configured related projects when eligible related projects exist.

**FR-037 — Related-Project Validation**

The build process shall validate that every related-project identifier references an existing project.

**FR-038 — No Self-Reference**

A project shall not reference itself as a related project.

**FR-039 — Publication Eligibility**

Only published related projects shall be displayed publicly.

Invalid references shall be reported during the build rather than silently ignored.

**FR-040 — Relationship Direction**

Related-project relationships shall be directional by default. If project A references project B, project B shall not automatically reference project A.

**FR-041 — Reuse of Related-Project Data**

Related-project cards shall use the referenced project's current content rather than duplicated titles, summaries, or technology lists.

Automatic recommendations based on similarity are outside the initial MVP.

### 4.6 Case Studies

**FR-042 — Case-Study Content**

A project may have one or more case studies documenting its context, problem, approach, implementation, testing, results, or lessons learned.

**FR-043 — Case-Study Language**

Each case study shall declare its language as Arabic or English.

**FR-044 — Case-Study Project Reference**

Each case study shall reference an existing project using its stable identifier.

**FR-045 — Case-Study Navigation**

Where a case study is available, visitors shall be able to navigate to it from the associated project page.

Case studies are optional; projects without a case study shall remain valid.

### 4.7 Language and Direction

**FR-046 — Supported Languages**

The system shall support Arabic (`ar`) and English (`en`).

**FR-047 — Initial Language Selection**

On an initial visit without a saved manual preference, the system shall choose the language using the visitor's browser language preferences.

Arabic preferences shall select Arabic. Other unsupported preferences shall fall back to English.

**FR-048 — Manual Language Switching**

Visitors shall be able to switch between Arabic and English manually.

**FR-049 — Language Preference Persistence**

If a manual language preference is saved, the system shall use that preference on subsequent visits until the visitor changes it or clears the saved preference.

**FR-050 — Correct Text Direction**

Arabic pages shall use right-to-left text direction, and English pages shall use left-to-right text direction.

**FR-051 — Language-Neutral Share URLs**

A public collection shall have a language-neutral share URL. The page shall select and display the appropriate localized content according to the active language preference.

**FR-052 — Consistent Project Identity Across Languages**

Changing the active language shall not change project identifiers, collection membership, or project relationships.

### 4.8 Content Management and Build

**FR-053 — File-Based Content Management**

The portfolio owner shall manage project, collection, and case-study content through files in the repository.

**FR-054 — Static Generation**

The system shall generate the public website from validated content during the build process.

**FR-055 — Rebuild-Based Publication**

Changes to repository content shall become publicly visible after a successful build and deployment.

**FR-056 — Reference Integrity**

The build process shall validate internal references between projects, collections, and case studies.

**FR-057 — Actionable Errors**

Content validation errors shall identify the invalid content and, where practical, the affected field or reference.

## 5. Non-Functional Requirements

### 5.1 Performance

**NFR-001 — Static Delivery**

The website shall use static generation for public pages wherever practical.

**NFR-002 — Minimal Client-Side JavaScript**

The implementation shall avoid unnecessary client-side JavaScript and runtime dependencies.

**NFR-003 — Efficient Assets**

Images and other static assets shall be optimized to avoid unnecessary page weight.

**NFR-004 — Responsive Rendering**

The website shall remain usable on common mobile, tablet, and desktop viewport sizes.

### 5.2 Accessibility

**NFR-005 — Semantic Structure**

Pages shall use appropriate semantic HTML elements.

**NFR-006 — Keyboard Navigation**

Core navigation, search, filters, and language switching shall be usable with a keyboard.

**NFR-007 — Accessible Labels**

Interactive controls shall have meaningful accessible names, and informative images shall have appropriate alternative text.

**NFR-008 — Readability**

The interface shall maintain readable text, sufficient contrast, and appropriate text direction in both supported languages.

### 5.3 Maintainability

**NFR-009 — Schema Validation**

Structured content shall use explicit schemas to validate required fields and supported values.

**NFR-010 — Separation of Content and Presentation**

Project data shall be kept separate from page components and visual presentation.

**NFR-011 — Reusable Data Sources**

Project details shall be reused across project pages, collections, and related-project sections rather than duplicated.

**NFR-012 — Reproducible Build**

The project shall document the commands required to install dependencies, run development mode, and build the website.

### 5.4 Reliability and Security

**NFR-013 — Build Failure on Invalid References**

The production build shall fail when required content references are invalid.

**NFR-014 — Public Content Safety**

The content owner shall ensure that published information and external evidence are appropriate for public disclosure.

**NFR-015 — No Secrets in Published Content**

Private credentials, access tokens, and confidential information shall not be included in public content or generated assets.

**NFR-016 — Draft Content Isolation**

Draft content shall not be accessible through public navigation or generated public pages.

### 5.5 Search Engine Discoverability

**NFR-017 — Page Metadata**

Public pages shall provide meaningful titles and descriptions.

**NFR-018 — Language Metadata**

Pages shall identify their active language and use the correct text direction.

**NFR-019 — Stable URLs**

Published projects and collections shall have stable URLs based on their identifiers.

## 6. Business Rules

| ID | Rule |
|---|---|
| BR-001 | Each project has a unique, stable identifier. |
| BR-002 | A project may belong to multiple project types. |
| BR-003 | A published project must contain all required fields defined by its schema. |
| BR-004 | Optional evidence and outcomes may be absent. |
| BR-005 | Evidence, ratings, metrics, and contributions must not be fabricated. |
| BR-006 | Collections reference project identifiers instead of duplicating project content. |
| BR-007 | Public collection membership is explicitly configured. |
| BR-008 | Project details and collection membership updates become visible after rebuild and deployment. |
| BR-009 | Public collections do not require authentication. |
| BR-010 | Only published projects may appear in public project lists and collections. |
| BR-011 | Project types support multiple values per project. |
| BR-012 | Related-project references must point to existing projects and cannot point to the same project. |
| BR-013 | Related-project relationships are directional unless explicitly configured in both directions. |
| BR-014 | Related-project displays use the original project's data. |
| BR-015 | Arabic and English share stable project identities. |
| BR-016 | Arabic pages use RTL direction; English pages use LTR direction. |
| BR-017 | Draft content must not be exposed publicly. |
| BR-018 | Public content must not include confidential or restricted information. |

## 7. Requirement Priorities

The following priorities indicate the intended MVP implementation order.

- **P0 — Essential:** Required for the MVP to provide its core value.
- **P1 — Important:** Expected in the MVP, but may follow the core implementation if necessary.
- **P2 — Deferred:** Not required for the initial release.

| Capability | Priority |
|---|---|
| Project content and individual project pages | P0 |
| Bilingual content and correct text direction | P0 |
| Public curated collections | P0 |
| Content schema and reference validation | P0 |
| Basic project catalogue | P0 |
| Search and project-type filtering | P0 |
| Skill and technology filtering | P1 |
| Manually configured related projects | P1 |
| Case-study pages | P1 |
| Evidence-type filtering | P1 |
| Automatic related-project recommendations | P2 |
| User accounts and private collections | P2 |
| Administration dashboard | P2 |
| Automated synchronization with external platforms | P2 |

Priorities should be reviewed if the product scope changes. P1 capabilities remain part of the intended MVP unless explicitly deferred through a scope decision.

## 8. Acceptance Criteria

The following conditions define the minimum release checks.

### AC-001 — Published Project

Given a valid published project, when the website is built, then the project appears in the public catalogue and has a working detail page.

### AC-002 — Invalid Project

Given a project missing a required field, when the production build runs, then validation reports the error and the build fails.

### AC-003 — Project Search

Given published projects with searchable metadata, when a visitor enters a matching query, then the catalogue displays matching projects.

### AC-004 — Combined Filters

Given projects with different types, skills, and technologies, when a visitor combines filters, then the results follow the documented filter-combination rules.

### AC-005 — Public Collection

Given a published collection referencing valid published projects, when a visitor opens its public URL, then the collection displays the configured projects.

### AC-006 — Invalid Collection Reference

Given a collection referencing a nonexistent project, when the production build runs, then validation reports the invalid reference and the build fails.

### AC-007 — Draft Project in Collection

Given a collection referencing a draft project, when the production build runs, then validation reports the invalid public reference and the collection is not published.

### AC-008 — Related Projects

Given a project referencing valid published related projects, when its detail page is generated, then the related projects are displayed with links to their detail pages.

### AC-009 — Self-Reference

Given a project referencing its own identifier as a related project, when the production build runs, then validation reports the invalid reference.

### AC-010 — Language Switching

Given a visitor viewing a project in Arabic, when the visitor switches to English, then the equivalent project content is displayed in English without changing the project identity.

### AC-011 — Language Direction

Given an Arabic page, when the page is rendered, then its document language and text direction are configured appropriately for Arabic. The equivalent English page uses English and LTR direction.

### AC-012 — Content Update

Given an existing project referenced by a public collection, when the project details are updated and the website is rebuilt and deployed, then the collection displays the updated details without duplicating the project content.

### AC-013 — Missing Optional Evidence

Given a valid project without a demo, client rating, or measurable outcome, when the project page is generated, then unavailable evidence and results are omitted rather than fabricated.

## 9. Dependencies

The requirements depend on the following implementation elements:

- Astro project configuration and build scripts.
- Content Collection schemas.
- Project, collection, and case-study content files.
- Shared project-resolution and localization utilities.
- Page routes for the homepage, catalogue, project details, case studies, and collections.
- A deployment process that publishes the generated static output.

The exact hosting provider and deployment configuration remain open implementation decisions.

## 10. Open Decisions

The following details should be confirmed before or during implementation:

1. Whether case studies are always stored as separate Markdown files for each language.
2. Whether evidence-type filtering is necessary for the initial release.
3. The exact URL structure for project and case-study pages.
4. Whether a missing translation should prevent publication or use a documented fallback.
5. The final deployment platform and canonical site domain.
6. The precise accessibility and performance targets to be used in testing.

These decisions should be recorded when resolved rather than silently assumed.

## 11. Traceability

Requirements should remain consistent with the other product documents:

- `README.md` — project overview, setup, and developer guidance.
- `product-vision.md` — product purpose and intended value.
- `problem-statement.md` — the problem being addressed.
- `product-scope.md` — MVP boundaries and exclusions.
- `requirements.md` — detailed functional and non-functional requirements.

The requirements should guide subsequent domain modeling, C4 architecture diagrams, implementation tasks, and automated tests.

## 12. Summary

The MVP requirements define a static, bilingual, single-owner portfolio that presents structured projects, supports search and filtering, provides public curated collections, and links manually related projects.

The implementation must preserve stable project identities, reuse project content, validate references, protect unpublished content from public exposure, and avoid unsupported claims.

**A requirement is complete when its specified behavior is implemented and verified against an appropriate acceptance criterion.**