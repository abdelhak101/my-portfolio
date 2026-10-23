# Design Decisions

## 1. Purpose

This document records the design decisions that shape My Portfolio's visual identity, user experience, interaction patterns, and interface structure.

Its purpose is to:

- Preserve the reasoning behind important decisions.
- Distinguish confirmed decisions from proposals and unresolved questions.
- Prevent contradictory decisions across project documents.
- Make future design changes easier to evaluate.
- Keep the implementation aligned with the product's actual needs.

This document records decisions and their rationale. Detailed implementation specifications remain in their respective documents.

## 2. Decision Status

Each decision uses one of the following statuses:

| Status | Meaning |
|---|---|
| Accepted | Explicitly confirmed by the product owner |
| Proposed | Recommended but not yet confirmed |
| Open | Requires a decision |
| Superseded | Replaced by a later decision |
| Rejected | Considered and intentionally not selected |

A proposed decision must not be treated as accepted merely because it appears in another document.

## 3. Design Goals

My Portfolio should communicate professional competence through the quality, clarity, and evidence of the work presented.

The design should:

1. Make projects easy to discover and evaluate.
2. Establish a clear hierarchy between project titles, summaries, metadata, and evidence.
3. Use a restrained visual language that does not compete with project content.
4. Support Arabic and English as first-class languages.
5. Provide equivalent functionality in light and dark themes.
6. Adapt to mobile and desktop without fragmenting the experience.
7. Remain maintainable by a single developer.
8. Avoid unnecessary design-system complexity.

## 4. Confirmed Design Decisions

### DD-001: Primary Visual Direction

**Status:** Accepted

**Decision:** Use a combination of Minimalist Editorial, Swiss-inspired design, Dark Minimalism, and very subtle Wabi-Sabi details.

**Rationale:**

- Editorial layouts support reading and evaluating project information.
- Swiss-inspired structure provides consistent alignment and hierarchy.
- Minimal decoration helps technical content remain the focus.
- Subtle Wabi-Sabi details can introduce character without overwhelming the interface.

**Consequences:**

- Typography and spacing carry much of the visual hierarchy.
- Borders and layout structure are preferred over excessive shadows.
- Decorative elements must remain secondary to content.
- Project imagery may introduce restrained irregularity, but the interface must remain clear and professional.

**References:** `design-system.md`, `ui-specifications.md`

### DD-002: Monochrome Visual Language

**Status:** Accepted

**Decision:** Use a primarily black, white, and gray color palette.

**Rationale:**

A monochrome palette reinforces the editorial direction and allows project screenshots, diagrams, and other evidence to provide visual variation.

**Consequences:**

- Use semantic color tokens instead of arbitrary color values.
- Preserve sufficient contrast in both themes.
- Avoid introducing accent colors without a documented reason.
- Do not use color alone to communicate state or meaning.

**References:** `design-system.md`, `accessibility.md`

### DD-003: Light and Dark Themes

**Status:** Accepted

**Decision:** Support both light and dark themes, with a user-accessible theme switcher.

**Rationale:**

Both themes are part of the intended visual experience and allow visitors to choose a comfortable presentation.

**Consequences:**

- Components must work in both themes.
- Text, borders, images, code blocks, and focus indicators must remain legible.
- Theme switching must not introduce unnecessary layout shifts.

**Still open:** The exact persistence policy and precedence between a saved selection, system preference, and the default theme.

**References:** `design-system.md`, `ui-specifications.md`, `accessibility.md`

### DD-004: Mixed Corner-Radius Strategy

**Status:** Accepted

**Decision:** Use different corner radii according to the type and purpose of each component rather than applying one universal radius.

**Rationale:**

A mixed approach supports the editorial direction and allows components to retain a deliberate, restrained appearance.

**Consequences:**

- Images may use square or nearly square corners.
- Cards and controls may use modest rounding.
- Circular shapes may be used where semantically appropriate, such as avatars.
- Larger radii should be reserved for elements that justify them.

**Still open:** Final radius token values and the exact mapping between component types and tokens.

**Reference:** `design-system.md`

## 5. Confirmed Product Decisions That Affect Design

These decisions are primarily product decisions, but they constrain the interface.

### DD-005: Bilingual Interface

**Status:** Accepted

**Decision:** Support Arabic and English.

**Rationale:**

The portfolio must serve visitors using either language.

**Consequences:**

- Layouts must support RTL and LTR.
- Typography must be suitable for both scripts.
- Controls must tolerate different label lengths.
- Language changes must preserve orientation and usability.

**Still open:** URL structure and behavior when the equivalent translation is unavailable.

**References:** `information-architecture.md`, `responsive-behavior.md`, `accessibility.md`

### DD-006: Public Curated Collections

**Status:** Accepted

**Decision:** Support public links to curated subsets of projects.

**Rationale:**

Visitors can be directed to work relevant to a particular role, client, or opportunity without losing access to the complete portfolio.

**Consequences:**

- Collection pages need a clear identity and scope.
- The full portfolio must remain discoverable from a collection.
- Project membership must be presented consistently.
- Public collection content must not expose confidential information.

**References:** `information-architecture.md`, `ui-specifications.md`

### DD-007: Projects Can Have Multiple Types

**Status:** Accepted

**Decision:** A project may belong to more than one project type.

**Rationale:**

Real projects can span multiple categories, and forcing a single classification would reduce discoverability.

**Consequences:**

- Project cards and detail pages must support multiple types.
- Filters must account for multiple category memberships.
- Filter-combination behavior must be documented consistently.

**Still open:** The exact logical rules for combining filters from different categories.

**References:** `requirements.md`, `ui-specifications.md`

### DD-008: Project Relationships Use Canonical Data

**Status:** Accepted

**Decision:** Related projects are configured using project IDs and resolved from the original project data rather than duplicated.

**Rationale:**

This avoids inconsistent copies of project metadata and supports maintainable content.

**Consequences:**

- Related-project links must resolve to valid projects.
- Self-references must be rejected or handled according to the validation policy.
- Relationship direction and ordering must be preserved.
- The interface must handle unavailable related content without broken cards.

**References:** `architecture-overview.md`, `ui-specifications.md`

## 6. Proposed Design Decisions

The following are recommendations, not confirmed decisions.

### DD-P01: Prefer Borders Over Shadows

**Status:** Proposed

**Decision:** Use subtle borders, dividers, and spacing as the primary means of separating components.

**Rationale:**

This supports the minimalist editorial direction and avoids making the interface feel overly layered.

**Validation:** Review project cards, filter controls, and navigation in both themes.

### DD-P02: Keep the Header in Normal Document Flow

**Status:** Proposed

**Decision:** Use a non-sticky header initially.

**Rationale:**

A normal-flow header is simpler and avoids obscuring content, especially on mobile.

**Trade-off:** Visitors must scroll to the top to access header controls unless alternative access is provided.

**Validation:** Test navigation and theme/language switching on long project pages.

### DD-P03: Use Responsive Project Grids

**Status:** Proposed

**Decision:** Use a single-column layout on narrow screens and increase the number of columns as available space permits.

**Rationale:**

This preserves readable card widths and avoids unnecessarily dense layouts.

**Validation:** Test real project titles, summaries, images, and metadata at intermediate viewport widths.

### DD-P04: Use Explicit Project Actions

**Status:** Proposed

**Decision:** Prefer clearly labeled project links over making every part of a card interactive when the card contains multiple actions.

**Rationale:**

Explicit links reduce ambiguity and avoid nested interactive elements.

**Trade-off:** A smaller clickable area may require more deliberate interaction.

**Validation:** Test with keyboard, touch, and mouse users.

### DD-P05: Keep Wabi-Sabi Details Restrained

**Status:** Accepted at the visual-direction level; implementation details remain open.

**Decision:** Limit Wabi-Sabi-inspired irregularities to subtle imagery or selected details.

**Rationale:**

The style should provide character without reducing consistency, readability, or perceived professionalism.

**Constraints:**

- No decorative irregularity that impairs text legibility.
- No unpredictable interaction behavior.
- No essential information conveyed only through decorative imagery.

**Reference:** `design-system.md`

## 7. Open Decisions

The following decisions should be resolved before the corresponding implementation becomes difficult to change.

### DD-O01: URL Structure for Arabic and English

**Status:** Open

Decide how language is represented in URLs and how visitors move between equivalent localized pages.

Consider:

- SEO and canonical URLs.
- Shareable project and collection links.
- Missing translations.
- Language-switching behavior.
- Browser-language preference on initial entry.

**Affected documents:** `information-architecture.md`, `architecture-overview.md`, `requirements.md`

### DD-O02: Standalone Skills Page

**Status:** Open

Decide whether skills deserve a dedicated page or should be discoverable only through project metadata, search, and filters.

Evaluate whether a standalone page provides enough value to justify another navigation destination.

### DD-O03: About and Contact Pages

**Status:** Open

Decide whether the portfolio requires dedicated About and Contact pages.

Do not add these pages solely because they are common in other portfolios. Confirm their purpose and required content first.

### DD-O04: Mobile Filter Interaction

**Status:** Open

Choose between:

- Inline expandable filters.
- A popover.
- A dedicated filter panel or drawer.

Evaluate usability, keyboard behavior, screen space, and implementation complexity.

### DD-O05: Filter Combination Semantics

**Status:** Open

Define whether multiple selected values within a category use OR logic and whether different categories use AND logic, or whether another model is intended.

The interface must communicate the behavior clearly and consistently.

### DD-O06: Searchable Fields

**Status:** Open

Define whether search covers project titles, summaries, technologies, skills, descriptions, or other fields.

The search interface and empty-state messaging depend on this decision.

### DD-O07: Translation Fallback

**Status:** Open

Define what happens when a visitor switches language on a page that has no equivalent translation.

Possible strategies include keeping the current language, redirecting to a localized parent page, or displaying a clearly communicated fallback.

### DD-O08: Project Card Media

**Status:** Open

Define whether project images are optional and whether projects without imagery use a neutral placeholder, a text-led card, or another treatment.

Avoid requiring decorative images when the available project evidence is better communicated through text.

### DD-O09: Initial Theme Selection and Persistence

**Status:** Open

Confirm how the initial theme is selected and whether the visitor's choice persists across sessions.

The chosen behavior must be documented consistently in `design-system.md` and implemented without unnecessary visual flashing.

### DD-O10: Minimum Requirements for Publishing a Project

**Status:** Open

Define which fields are required before a project can be published.

This affects:

- Card completeness.
- Project detail structure.
- Missing-content states.
- Search and filter reliability.
- Evidence presentation.

## 8. Decision-Making Criteria

When evaluating a new design decision, consider:

1. **User value:** Does it help visitors discover or evaluate projects?
2. **Clarity:** Does it reduce ambiguity?
3. **Accessibility:** Can it be used by keyboard and assistive technology?
4. **Localization:** Does it work in Arabic RTL and English LTR?
5. **Responsive behavior:** Does it remain usable across screen sizes?
6. **Consistency:** Does it fit the existing visual direction?
7. **Maintainability:** Is the implementation appropriate for a single developer?
8. **Complexity:** Does the benefit justify the additional code and behavior?
9. **Reversibility:** Can the decision be changed without substantial rework?
10. **Evidence:** Can the decision be validated through requirements, testing, or observed user behavior?

A visually appealing option should not automatically win if it makes the portfolio harder to use or maintain.

## 9. Decision Record Template

Use the following template for significant future decisions.

### DD-XXX: Decision Title

**Status:** Open / Proposed / Accepted / Superseded / Rejected

**Date:** YYYY-MM-DD

**Context:** What problem or uncertainty requires a decision?

**Decision:** What was selected?

**Rationale:** Why was it selected?

**Alternatives considered:**
- Alternative A.
- Alternative B.

**Consequences:** What changes in the design, implementation, or user experience?

**Affected documents:**
- Document names.

**Validation:** How will the decision be checked?

**Supersedes:** Previous decision ID, if applicable.

## 10. Change Management

When a design decision changes:

1. Update its status in this document.
2. Record the new decision and its rationale.
3. Mark the previous decision as superseded when applicable.
4. Update affected requirements and design documents.
5. Identify implementation or content migrations that may be necessary.
6. Retest affected user journeys.
7. Avoid maintaining contradictory specifications.

Small visual adjustments do not always need a separate decision record. Use this document for choices that materially affect the user experience, architecture, consistency, or future implementation.

## 11. Current Design Direction Summary

The following points are confirmed:

- Minimalist Editorial combined with Swiss-inspired design.
- Dark Minimalism as part of the visual direction.
- Very subtle Wabi-Sabi details.
- A monochrome black, white, and gray palette.
- Both light and dark themes with a user-accessible switcher.
- Mixed corner radii depending on the component.
- Arabic and English support.
- Public curated project collections.
- Multiple project types per project.
- Related projects configured by IDs and resolved from canonical project data.

The following are not yet fully decided:

- Exact design-token values.
- Localized URL strategy.
- Dedicated Skills, About, and Contact pages.
- Mobile filter interaction.
- Search and filter semantics.
- Missing-translation behavior.
- Theme persistence policy.
- Minimum content required to publish a project.

These open decisions should remain explicit until confirmed.
