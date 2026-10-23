# Product Roadmap

## 1. Purpose

This document describes the proposed evolution of **My Portfolio — Projects, Skills & Proof of Work**.

The roadmap organizes product development around user value, technical dependencies, and release readiness. It is a planning document, not a commitment to specific dates.

**Project status:** Planning  
**Current release:** Not yet established  
**Target platform:** Web  
**Primary implementation framework:** Astro  
**Content management:** Repository-based content files  
**Languages:** Arabic and English  
**Deployment status:** Not yet verified

Related documents:
- [`product-vision.md`](./product-vision.md)
- [`product-scope.md`](./product-scope.md)
- [`requirements.md`](./requirements.md)
- [`backlog.md`](./backlog.md)
- [`milestones.md`](./milestones.md)
- [`sprint-goals.md`](./sprint-goals.md)

---

## 2. Product Direction

The portfolio should help visitors understand the developer's capabilities through real projects and supporting evidence, rather than relying only on a list of skills or technologies.

The product will evolve in this order:

1. Establish reliable content and a working technical foundation.
2. Deliver the core portfolio browsing experience.
3. Make the experience bilingual and accessible.
4. Improve project discovery and curated sharing.
5. Strengthen quality, search visibility, privacy, and production readiness.
6. Add further capabilities only when there is a demonstrated need.

The initial architecture should remain simple. Astro, repository-managed content, and static generation are the baseline approach; a database, CMS, or backend should not be introduced without a clear requirement.

---

## 3. Roadmap Overview

| Phase | Theme | Expected outcome | Priority |
|---|---|---|---|
| P0 | Foundation | Verified repository and validated content model | Critical |
| P1 | Core Portfolio | Working listing and project detail pages | Critical |
| P2 | Bilingual Experience | Consistent Arabic and English experience | High |
| P3 | Discovery & Sharing | Search, filters, public collections, related projects | High |
| P4 | Quality & Visibility | Accessibility, SEO, testing, and responsive quality | Critical before release |
| P5 | Production Release | Deployed portfolio with verified operational behavior | High |
| P6 | Future Improvements | Evidence-driven enhancements after initial release | Deferred |

Priority describes planning importance, not a guarantee of delivery order or a calendar commitment.

---

## 4. Phase Details

### P0 — Foundation

**Objective:** Establish a reliable and maintainable foundation.

**Planned capabilities**
- Verify the current repository and Astro configuration.
- Establish the development and production build workflow.
- Define project content requirements.
- Implement Astro Content Collections and schema validation.
- Define stable project identifiers and slugs.
- Define project, skill, technology, and collection relationships.
- Document unresolved architectural and product decisions.

**Success criteria**
- The repository's actual state is understood.
- Content can be validated consistently.
- Invalid references can be detected.
- The project can be built reproducibly.
- Subsequent features can rely on a documented content model.

**Related milestone:** M0–M1.

**Release gate:** Do not build extensive UI around a content model whose fundamental fields and relationships remain unclear.

---

### P1 — Core Portfolio

**Objective:** Deliver the minimum useful portfolio experience.

**Planned capabilities**
- Portfolio listing page.
- Reusable project cards.
- Project detail pages.
- Project roles, technologies, skills, and available evidence.
- GitHub, demo, and case-study links when available.
- Defined behavior for missing or invalid content.

**Success criteria**
- Visitors can browse projects.
- Each published project has a usable detail page.
- Content comes from the canonical project data.
- Missing optional information does not produce misleading content.
- The application builds successfully.

**Related milestone:** M2–M3.

**Release gate:** At least one representative project can be followed from the listing to its detail page.

---

### P2 — Bilingual Experience

**Objective:** Make the portfolio usable in Arabic and English.

**Planned capabilities**
- Arabic and English content.
- RTL and LTR layout support.
- Language switcher.
- Browser-language-based initial selection for language-neutral share links.
- Documented missing-translation behavior.
- Localized navigation and metadata.

**Success criteria**
- Both languages render correctly.
- Directionality is correct.
- Language switching is predictable.
- The URL and localization strategy is consistent.
- Search engines can distinguish localized pages where applicable.

**Related milestone:** M4.

**Release gate:** The core portfolio experience is verified in both languages.

---

### P3 — Discovery & Sharing

**Objective:** Help visitors find relevant work and share a tailored selection.

**Planned capabilities**
- Client-side search, if appropriate for the catalogue size.
- Filters for project type, technology, skill, and agreed evidence categories.
- Support for projects with multiple types.
- Public curated collections based on project IDs.
- Links from collections to the full portfolio.
- Related-project navigation.

**Success criteria**
- Search and filters behave according to documented rules.
- Visitors can find projects using the supported metadata.
- Collection membership is explicit and validated.
- Collection pages use canonical project data.
- Project content updates appear after a successful build and deployment.
- Public collections are not represented as private or access-controlled.

**Related milestone:** M5–M6.

**Release gate:** Search, filters, and sharing are verified against representative projects and collections.

**Scope note:** These capabilities may be included in the first public release or delivered immediately afterward, depending on implementation effort and user value.

---

### P4 — Quality & Visibility

**Objective:** Ensure the portfolio is usable, discoverable, and reliable.

**Planned capabilities**
- Responsive layout verification.
- Keyboard navigation and visible focus states.
- Accessible names and appropriate semantic structure.
- Contrast and other accessibility checks.
- Page titles and descriptions.
- Canonical URLs and localized metadata.
- Sitemap and robots configuration.
- Internal-link and asset checks.
- Automated and manual tests for core journeys.

**Success criteria**
- Critical visitor journeys pass.
- Important accessibility issues are resolved or explicitly documented.
- SEO metadata follows the chosen URL strategy.
- Production builds and relevant tests pass.
- No known release-blocking defects remain.

**Related milestone:** M7.

**Release gate:** Core quality checks are complete. WCAG 2.2 AA is a target to verify, not a claim of automatic compliance.

---

### P5 — Production Release

**Objective:** Publish the portfolio and verify the live experience.

**Planned capabilities**
- Production hosting and deployment.
- Domain and canonical URL configuration, if applicable.
- Production smoke tests.
- Analytics configuration if the provider is selected.
- Privacy and cookie disclosures matching actual behavior.
- Consent controls where legally required.
- Final review of confidential content and external links.

**Success criteria**
- The deployed portfolio is accessible.
- Core routes work in production.
- Build and deployment behavior is repeatable.
- Analytics is verified or explicitly deferred.
- Privacy disclosures reflect actual data collection.
- No secrets or confidential project information are exposed.

**Related milestone:** M8.

**Release gate:** Production checks are complete and release-critical defects are resolved.

---

### P6 — Future Improvements

**Objective:** Improve the product based on actual use rather than speculative complexity.

Potential candidates:
- Improved search relevance.
- More advanced filtering.
- Additional project evidence formats.
- A dedicated Skills or About page.
- Contact-form integration, if needed.
- Better automated content-quality checks.
- Performance improvements based on measurements.
- Analytics-informed content improvements.
- A CMS only if repository-based editing becomes a genuine bottleneck.
- A backend only if a concrete requirement cannot be met well with static generation.

**Success criteria**
- Each enhancement addresses an identified user need or observed problem.
- The benefit justifies the additional maintenance and complexity.
- Existing core behavior remains stable.

**Status:** Deferred; candidates are not approved commitments.

---

## 5. Release Strategy

### Initial public release

The proposed minimum release should include:

- A working portfolio listing.
- Project detail pages.
- Validated project content.
- Arabic and English support.
- Responsive layout and essential accessibility.
- Basic SEO configuration.
- A successful production deployment.

Search, filters, and public collections can be included if they are feasible without delaying the core experience substantially.

### Post-release improvements

Prioritize improvements based on:
- Actual visitor questions or feedback.
- Missing evidence in important project pages.
- Observed navigation problems.
- Search and discovery limitations.
- Accessibility findings.
- Performance measurements.
- Real maintenance costs.

Avoid adding features merely because they are technically interesting.

---

## 6. Dependencies

The main delivery dependencies are:

1. **Content model before data-driven pages:** project fields and references must be sufficiently stable.
2. **Design foundation before broad UI implementation:** shared tokens and layout prevent inconsistent page implementations.
3. **Core pages before discovery features:** search, filters, collections, and related projects depend on the content model and project routes.
4. **Localization strategy before final route and SEO configuration:** language URLs affect routing, canonical URLs, and localized metadata.
5. **Quality checks before release:** accessibility, SEO, and production verification should be based on the implemented product.
6. **Actual implementation before final privacy disclosures:** analytics and storage behavior must be verified rather than assumed.

Some activities can overlap, but dependencies should not be bypassed without an explicit reason.

---

## 7. Roadmap Governance

- This roadmap describes direction and sequencing, not fixed delivery dates.
- Milestones define verifiable outcomes within each phase.
- Backlog items describe the work required to achieve those outcomes.
- Sprint goals define the short-term outcome selected for active development.
- A roadmap phase should not be marked complete until its exit criteria have been verified.
- New requirements should be assessed for user value, cost, and architectural impact.
- Changes to scope should be reflected in the backlog and relevant planning documents.
- Calendar estimates should be introduced only after the repository and task sizes have been assessed.

---

## 8. Open Decisions

The following decisions may change the roadmap's scope or sequence:

| Decision | Impact |
|---|---|
| Required project fields | Content model and core pages |
| Arabic/English URL strategy | Localization and SEO |
| Translation fallback policy | Content validation and language switching |
| Searchable fields and filter semantics | Discovery features |
| Collection indexing requirements | Sharing and SEO |
| About, Skills, and Contact pages | Initial release scope |
| Analytics provider | Production configuration and privacy |
| Consent requirements | Cookie and analytics implementation |
| Hosting and deployment platform | Release workflow |
| Theme and language preference persistence | User experience and implementation |

These remain open until explicitly decided.

---

## 9. Definition of Roadmap Success

The roadmap succeeds when it produces a maintainable, bilingual portfolio that presents real work clearly, allows visitors to explore relevant projects, and can be published reliably without unnecessary architectural complexity.

The roadmap should be revised as the implementation reveals new constraints or as real visitor needs become clearer.
