# Product Scope

## My Portfolio — Projects, Skills & Proof of Work

## 1. Purpose

This document defines the scope and boundaries of My Portfolio, a bilingual personal portfolio designed to showcase projects, skills, and evidence of work.

It establishes what the initial Minimum Viable Product (MVP) will include, what is explicitly excluded, and which constraints and assumptions should guide implementation.

The purpose is to keep development focused on the core product value while avoiding unnecessary complexity.

## 2. Product Overview

My Portfolio enables a single developer to present professional work across multiple disciplines, including:

- Software development.
- UI/UX design.
- Automation.
- Artificial intelligence.
- Other relevant project types.

The portfolio organizes projects using structured content, provides search and filtering, and allows the owner to share curated public collections with different audiences.

The website will be built with Astro, with project information maintained in repository files and pages generated from that content.

## 3. Scope Principles

The following principles guide scope decisions:

1. **MVP first:** Prioritize the minimum capabilities needed to present, discover, and share projects.
2. **Static by default:** Prefer static generation over a custom backend unless a concrete requirement justifies additional infrastructure.
3. **Single source of truth:** Store project information once and reference it from collections and related-project links.
4. **Evidence-based presentation:** Show available evidence and outcomes without inventing missing information.
5. **Bilingual from the beginning:** Support Arabic and English in the initial product design.
6. **Explicit boundaries:** Defer features that do not directly support the core product goals.
7. **Validated content:** Detect invalid project references and malformed content during the build where practical.

## 4. MVP Scope

The following capabilities are included in the intended MVP.

### 4.1 Portfolio and Navigation

- A responsive personal portfolio.
- A homepage introducing the developer and providing access to projects.
- Navigation between the homepage, project catalogue, and individual project pages.
- A consistent layout and visual system.
- Appropriate right-to-left and left-to-right layouts.

### 4.2 Project Management Through Files

The owner can add, update, and remove projects by editing files in the repository.

Each project has a stable identifier independent of its translated titles.

Project information may include:

- Title and summary in Arabic and English.
- Role and personal contribution.
- One or more project types.
- Skills and technologies.
- Project date.
- Optional cover image.
- Evidence links, such as source code, demos, tests, and case studies.
- Outcomes or client feedback when available.
- References to related projects.

Not all optional fields are required for every project.

A project must contain the minimum required information defined by the content schema before it can be published.

### 4.3 Project Catalogue

Visitors can browse published projects through a dedicated catalogue.

The catalogue supports:

- Project cards or equivalent summaries.
- Navigation to individual project pages.
- Search across relevant project metadata.
- Filtering by project type, skill, and technology.
- Filtering by evidence category where supported by the available data.

Search and filtering will initially operate in the browser, provided the catalogue remains small enough for this approach.

### 4.4 Individual Project Pages

Each published project has a dedicated page.

The page presents available information in a consistent structure, including:

- Project overview.
- Role and contribution.
- Types, skills, and technologies.
- Relevant evidence links.
- Results or outcomes when supported.
- Case-study content when available.
- Related projects when configured.

Missing optional information should be omitted rather than represented by fabricated or misleading values.

### 4.5 Curated Public Collections

The owner can create collections containing selected project identifiers.

A collection can be tailored to an audience or purpose, such as a job application, client proposal, or particular technical specialization.

Each published collection has a public, shareable URL.

The collection page:

- Displays the selected published projects.
- Uses the original project data rather than duplicating project descriptions.
- Provides links to individual project pages.
- Provides a way to explore the full portfolio.

Collection membership is explicitly configured in the collection's content file.

Changes to project information are reflected after the next successful build and deployment. Changes to collection membership require updating the collection definition and redeploying.

### 4.6 Related Projects

Project pages can display links to other relevant projects.

The initial implementation supports manually configured relationships using project identifiers.

Validation must ensure that:

- Referenced projects exist.
- A project does not reference itself.
- Only eligible published projects are displayed to visitors.

Automatic recommendations based on similarities between skills, technologies, or project types are excluded from the initial MVP.

### 4.7 Internationalization

The MVP supports Arabic and English.

It includes:

- Localized project titles and summaries.
- Localized interface labels.
- Appropriate text direction for each language.
- Initial language selection based on the visitor's browser preferences.
- A manual language switch.
- Consistent project identities across languages.

A previously saved manual language preference may take precedence over the browser preference on subsequent visits.

Public share URLs remain language-neutral. The selected language determines which localized content is displayed.

### 4.8 Content Validation

The build process should validate:

- Required project fields.
- Supported project types and statuses.
- Valid dates and URLs.
- Collection references to existing projects.
- Related-project references.
- Case-study references where applicable.

Invalid content or references should produce actionable build errors rather than silently generating broken pages.

## 5. Out of Scope for the MVP

The following capabilities are explicitly excluded from the initial release.

| Excluded capability | Reason |
|---|---|
| User accounts and authentication | The product serves one owner and public visitors. |
| Multi-user portfolio management | Not required for a personal portfolio. |
| Database or custom backend | File-based content and static generation are sufficient for the initial scope. |
| Administration dashboard or visual CMS | Content is managed through repository files. |
| Private or password-protected collections | Collections are public by design. |
| Automatic related-project recommendations | Manual relationships are sufficient initially. |
| Automatic synchronization with GitHub or other platforms | External synchronization adds complexity beyond the core MVP. |
| Visitor analytics dashboard | Not necessary to validate the initial core experience. |
| Comments, messaging, or contact-management workflows | These are separate product capabilities. |
| Automated evaluation of a developer's skills | The portfolio presents evidence but does not score candidates. |
| Runtime content editing without a rebuild | Content updates follow the build-and-deploy workflow. |
| Guaranteed verification of all external evidence | The owner remains responsible for the accuracy and public availability of submitted links. |

These exclusions may be reconsidered if future evidence demonstrates a clear need.

## 6. Content and Publication Rules

### 6.1 Project Identity

Every project has a stable identifier that does not depend on its Arabic or English title.

Changing a localized title must not change the project's identity.

Changing or deleting an identifier requires updating all references to that project.

### 6.2 Project Types

A project may belong to multiple types.

The initial supported types are:

- `software`
- `design`
- `ui-ux`
- `automation`
- `ai`
- `other`

The supported list may be extended deliberately as new requirements emerge.

### 6.3 Publication Status

Projects and collections may have draft or published status.

Only eligible published content should appear in public catalogues, project pages, and share collections.

Draft content must not become publicly accessible through unintended routes or references.

### 6.4 Evidence and Outcomes

Evidence and outcomes are optional.

The portfolio must not fabricate:

- Client ratings.
- Performance improvements.
- Business results.
- Test results.
- Links to repositories or demos.
- Personal contributions that were not actually made.

Where a result cannot be verified or is unavailable, the relevant field may be omitted.

### 6.5 Public Information

All published project content, evidence links, and collection contents must be suitable for public disclosure.

Confidential client information, private credentials, and restricted project materials must not be published.

## 7. Non-Functional Scope

The MVP should meet the following quality expectations.

### Performance

- Prefer static page generation.
- Avoid unnecessary client-side JavaScript.
- Keep search and filtering lightweight.
- Optimize images and other static assets.

### Accessibility

- Use semantic HTML.
- Provide meaningful link labels and image alternative text where appropriate.
- Support keyboard navigation.
- Maintain readable contrast and responsive layouts.
- Respect language direction and text readability.

### Maintainability

- Use structured, schema-validated content.
- Keep project data separate from presentation components.
- Reuse project data across catalogue, detail, and collection pages.
- Validate references during builds.

### Reliability

- Broken content references should be detectable before deployment.
- Public pages should not depend on a runtime database.
- A successful production build should generate a consistent set of pages from the same content source.

### Search Engine Discoverability

- Generate meaningful page titles and descriptions.
- Provide stable project URLs.
- Use appropriate language metadata.
- Avoid exposing draft content through public navigation or generated routes.

## 8. Technical Constraints

The initial architecture is constrained by the following decisions:

- **Framework:** Astro.
- **Content source:** Files in the Git repository.
- **Project data:** Structured JSON content.
- **Long-form case studies:** Markdown content.
- **Content validation:** Astro Content Collections and schemas.
- **Rendering approach:** Static generation.
- **Languages:** Arabic and English.
- **Audience model:** One portfolio owner and public visitors.
- **Collection access:** Public.
- **Content updates:** Rebuild and redeploy after repository changes.

The hosting provider, deployment platform, final URL conventions, and exact dependency versions remain implementation decisions unless explicitly confirmed elsewhere.

## 9. Assumptions and Open Decisions

The following assumptions should be validated during implementation:

| Item | Current assumption | Validation method |
|---|---|---|
| Catalogue size | Browser-side search and filtering will be sufficient initially. | Test with realistic project content. |
| Content maintenance | Editing files directly is acceptable. | Add and update several projects using the proposed workflow. |
| Collection structure | Collections will reference stable project IDs. | Test invalid and missing references. |
| Related projects | Manual relationships provide sufficient initial control. | Review how the project catalogue is used. |
| Language preference | Browser preference plus a manual switch provides a suitable experience. | Test both languages and repeat visits. |
| Hosting | A static hosting service will meet the deployment requirements. | Confirm the chosen provider's capabilities. |

These assumptions should not be treated as permanent requirements without validation.

## 10. MVP Acceptance Criteria

The MVP can be considered ready for initial release when the following conditions are met:

- [ ] The website builds successfully using the documented workflow.
- [ ] Published projects appear in the project catalogue.
- [ ] Each published project has a dedicated page.
- [ ] Search and supported filters return relevant projects.
- [ ] Project pages display available evidence without inventing missing data.
- [ ] Public collections display their configured published projects.
- [ ] Collection pages link to individual projects and the full portfolio.
- [ ] Related-project links work and invalid references are detected.
- [ ] Arabic and English content render with the correct text direction.
- [ ] Visitors can switch languages manually.
- [ ] Draft content is excluded from public pages and collections.
- [ ] Invalid content and broken internal references are detected during the build.
- [ ] The website is usable on common mobile and desktop screen sizes.
- [ ] No confidential information is included in public content.

## 11. Scope Change Policy

New features should be evaluated against three questions:

1. Does this feature directly improve project presentation, discovery, evidence, or sharing?
2. Is it necessary for the MVP, or can it be deferred?
3. Does its implementation introduce infrastructure or maintenance costs that exceed its immediate value?

Features that are useful but not essential should be recorded for later evaluation rather than added automatically to the MVP.

Any change to the MVP scope should also trigger a review of affected requirements, content schemas, architecture, and acceptance criteria.

## 12. Scope Summary

The initial MVP is a static, bilingual, single-owner portfolio that enables structured project presentation, search and filtering, evidence-based project pages, manually curated public collections, and manually configured related-project links.

It prioritizes clarity, discoverability, maintainability, and simple deployment while excluding unnecessary backend infrastructure, authentication, private sharing, and automated recommendations.

**The MVP is complete when the owner can maintain and publish projects reliably, and visitors can discover, understand, and share relevant work through a consistent bilingual experience.**