# UI Specifications

## 1. Purpose

This document defines the user-interface components, visual behavior, interaction states, and implementation expectations for My Portfolio.

It translates the product requirements, information architecture, design system, and responsive behavior into specifications that can guide implementation and validation.

This document complements:

- `design-system.md` — visual foundations, design tokens, typography, colors, spacing, and visual direction.
- `responsive-behavior.md` — viewport behavior and responsive layout rules.
- `information-architecture.md` — pages, navigation hierarchy, and content organization.
- `requirements.md` — functional and non-functional requirements.
- `user-flows.md` — user journeys and interaction sequences.
- `architecture-overview.md` — technical architecture and implementation boundaries.

When a detailed value or behavior is already defined in one of these documents, that document remains the primary reference.

## 2. UI Design Principles

### 2.1 Visual Direction

The interface follows a combination of:

- **Minimalist Editorial:** content-led layouts, clear hierarchy, generous whitespace, and restrained decoration.
- **Swiss-inspired design:** structured grids, consistent alignment, deliberate typography, and strong information hierarchy.
- **Dark Minimalism:** monochrome visual language, subtle contrast, and restrained interface decoration.
- **Subtle Wabi-Sabi:** occasional understated irregularities in selected imagery or decorative details, without compromising usability.

The interface must prioritize the projects and their evidence rather than visual effects.

### 2.2 Core Principles

1. Content must remain more prominent than decoration.
2. Interactive elements must look interactive.
3. Related components must behave consistently.
4. The interface must support Arabic RTL and English LTR.
5. Light and dark themes must provide equivalent functionality.
6. Important information must never depend exclusively on hover.
7. Empty, loading, error, and disabled states must be considered explicitly.
8. Components should be reused when they represent the same concept and behavior.
9. Visual complexity should be justified by a real user need.
10. The interface must remain usable without JavaScript for content that can be rendered statically.

## 3. Global Interface Structure

### 3.1 Shared Layout

The proposed shared layout contains:

- Site header.
- Primary navigation.
- Main content region.
- Optional contextual navigation, such as breadcrumbs.
- Footer.

Not every page needs every element. Shared components should not force unnecessary visual sections onto individual pages.

### 3.2 Header

**Purpose:** Provide site identity and access to primary navigation and global controls.

**Elements:**

- Site name or logo.
- Primary navigation links.
- Theme switcher.
- Language switcher.
- Mobile navigation control when required.

**Behavior:**

- Navigation links lead to their corresponding pages.
- The current page is indicated visually and accessibly.
- Theme and language controls remain discoverable at supported viewport sizes.
- Mobile navigation exposes a clear open/closed state.
- The header must not obscure content or keyboard focus.

**States:**

- Default.
- Current navigation item.
- Keyboard focused.
- Hovered, where applicable.
- Mobile menu expanded.
- Mobile menu collapsed.

**Acceptance criteria:**

- Every navigation destination is reachable by keyboard.
- Current-page state is conveyed beyond color alone.
- Long translated labels do not overlap adjacent controls.
- The header works in both themes and both text directions.

### 3.3 Footer

**Purpose:** Provide secondary navigation and relevant portfolio information.

Potential content includes:

- Links to important portfolio sections.
- GitHub or other public profiles.
- Contact information, if approved for inclusion.
- Copyright information.

These content items are proposals, not confirmed requirements.

**Behavior:**

- Links must have clear labels.
- External links must have appropriate destinations.
- Footer content must wrap naturally on narrow screens.
- The footer must not rely on a multi-column desktop layout.

## 4. Typography and Content Components

### 4.1 Page Title

**Purpose:** Establish the subject of the current page.

**Rules:**

- Use the heading hierarchy defined in `design-system.md`.
- Keep titles visually prominent without overwhelming smaller screens.
- Allow long titles to wrap.
- Use semantic heading elements.
- Each page should have one clear primary heading.

### 4.2 Section Heading

**Purpose:** Divide page content into meaningful sections.

**Rules:**

- Use consistent spacing above and below headings.
- Preserve logical heading order.
- Avoid using heading levels only to obtain a particular font size.
- Use secondary headings for content such as technologies, implementation details, results, and related projects when those sections exist.

### 4.3 Body Text

**Rules:**

- Maintain readable line length and line height.
- Allow content to grow naturally.
- Support Arabic and English typography.
- Wrap long words and technical identifiers where appropriate.
- Distinguish links from ordinary text.

### 4.4 Metadata

Examples include:

- Project role.
- Date.
- Project type.
- Technologies.
- Skills.
- Evidence availability.

**Rules:**

- Metadata must remain visually secondary to the project title.
- Use consistent labels and formatting.
- Avoid excessive badges that reduce readability.
- Support wrapping on narrow screens.
- Do not display unavailable information as an empty label.

## 5. Buttons and Links

### 5.1 Primary Button

**Purpose:** Represent the main available action within a local context.

Examples may include a primary project action or submission of a filter panel.

**Rules:**

- Use a consistent visual treatment.
- Provide readable text and sufficient contrast.
- Include visible hover, focus, active, and disabled states where relevant.
- Prevent labels from clipping in either language.
- Avoid using a button for ordinary navigation.

### 5.2 Secondary Button

**Purpose:** Provide a useful alternative action without competing with the primary action.

**Rules:**

- Use a restrained visual treatment consistent with the monochrome design system.
- Maintain the same interaction and accessibility standards as primary buttons.
- Do not rely on color alone to communicate hierarchy.

### 5.3 Text Link

**Purpose:** Navigate to another page or external destination.

**Rules:**

- Use a consistent link treatment.
- Ensure links are distinguishable from ordinary text.
- Provide visible keyboard focus.
- Avoid vague labels when a descriptive label is practical.
- Use semantic anchors for navigation.

### 5.4 External Links

Examples include GitHub repositories, live demos, and external case studies.

**Rules:**

- Identify the destination through clear link text.
- Use valid URLs.
- Indicate external navigation when it improves clarity.
- If opening a new tab, communicate that behavior accessibly.
- Do not render an action when its destination is unavailable.

### 5.5 Button States

Each interactive button must support applicable states:

| State | Expected behavior |
|---|---|
| Default | Clearly identifiable and usable |
| Hover | Subtle visual feedback |
| Focus | Visible keyboard focus indicator |
| Active | Feedback while being activated |
| Disabled | Visibly unavailable and not actionable |
| Loading | Used only for genuinely asynchronous operations |

Static links and buttons should not display a loading state unnecessarily.

## 6. Project Card

### 6.1 Purpose

Present a project summary and provide a clear path to its detail page.

### 6.2 Content

A project card may contain:

- Project image or visual.
- Project title.
- Short summary.
- Project types.
- Selected technologies or skills.
- Date or role, when relevant.
- A clear detail-page link.

Not every field is mandatory. The card should show only the information that helps visitors decide whether to explore the project.

### 6.3 Visual Behavior

- Use a consistent card structure across listings.
- Apply the mixed corner-radius strategy defined in `design-system.md`.
- Prefer subtle borders and spacing over prominent shadows.
- Keep images proportional and avoid unintended cropping.
- Avoid fixed heights that clip variable content.
- Keep card decoration restrained in both themes.

### 6.4 Interaction

- The project title must link to the project detail page.
- The card must not contain nested interactive elements that create invalid or confusing interactions.
- Hover effects must be subtle and must not be required to reveal essential information.
- Keyboard users must be able to identify and activate the project link.

### 6.5 States

- Default.
- Hovered.
- Keyboard focused.
- Missing optional image.
- Missing optional metadata.

A published project must not become visually broken because an optional field is absent.

## 7. Project Listing Controls

### 7.1 Search Input

**Purpose:** Find projects using supported searchable fields.

**Elements:**

- Accessible label.
- Text input.
- Optional clear action.

**Behavior:**

- Search results update according to the behavior defined in `requirements.md`.
- Clearing the input restores the unsearched result set, subject to active filters.
- Search must not depend on placeholder text as its only label.
- Input content must remain readable on narrow screens.
- Search behavior must remain consistent across viewport sizes.

The exact searchable fields, matching rules, and debounce behavior must be defined in the functional requirements or implementation specification.

### 7.2 Filter Control

**Purpose:** Narrow the project list by supported attributes.

Potential filter categories include:

- Project type.
- Technology.
- Skill.
- Evidence type.

**Behavior:**

- Available options must come from supported project data or an explicitly defined configuration.
- Multiple project types must be represented correctly.
- Active selections must be discoverable.
- Users must have a way to clear individual selections and reset all filters.
- Filtering must preserve the integrity of the project dataset.

The meaning of combining different filter categories must follow the rules defined in `requirements.md`. If those rules are not finalized, they must not be silently assumed in implementation.

### 7.3 Active Filter Indicator

**Purpose:** Show which constraints are currently applied.

**Rules:**

- Use clear text labels.
- Provide an accessible way to remove an individual filter.
- Provide a reset action when filters are active.
- Allow indicators to wrap on mobile.
- Do not communicate active state by color alone.

### 7.4 Result Count

If enabled, the result count should communicate the number of matching projects.

**Rules:**

- Update when search or filters change.
- Use correct singular and plural forms in Arabic and English.
- Avoid announcing every keystroke excessively to assistive technology.
- Do not display a misleading count while results are stale.

Whether the result count is required remains an open decision.

### 7.5 Empty Results State

**Content:**

- A short explanation that no projects match.
- An action to clear filters or revise the search.

**Rules:**

- Keep the message concise.
- Avoid blaming the user.
- Preserve access to search and filtering controls.
- Do not display an empty-results message when projects are still being initialized or loaded.

## 8. Project Detail Components

### 8.1 Project Introduction

Contains the project title and summary, with optional metadata and a primary action.

**Rules:**

- Establish the project's purpose before presenting extensive technical detail.
- Keep important actions visible near the introduction.
- Support long titles and translated content.
- Avoid requiring users to scroll past decorative content before understanding the project.

### 8.2 Project Metadata

Potential fields include role, date, project type, skills, and technologies.

**Rules:**

- Render only available and valid values.
- Use consistent labels.
- Keep the information scannable.
- Support wrapping and RTL/LTR layouts.
- Avoid duplicating metadata in multiple sections without a clear purpose.

### 8.3 Project Actions

Potential actions include:

- Open GitHub repository.
- Open live demo.
- Read case study.

**Rules:**

- Display only actions supported by available project data.
- Use clear labels that describe the destination.
- Distinguish internal navigation from external links when helpful.
- Do not display non-functional placeholder buttons.

### 8.4 Technical Explanation

**Rules:**

- Use headings to divide substantial technical content.
- Render inline code and code blocks appropriately.
- Preserve code whitespace where necessary.
- Provide horizontal scrolling for long code blocks instead of causing page-level overflow.
- Maintain sufficient contrast in light and dark themes.

### 8.5 Results and Evidence

Potential evidence includes tests, measured results, screenshots, repository links, demos, or client feedback.

**Rules:**

- Display only evidence that is available and authorized for publication.
- Distinguish verified results from qualitative descriptions.
- Do not fabricate ratings, metrics, or testimonials.
- Preserve meaningful captions and alternative text for evidence images.
- Avoid empty evidence sections.

### 8.6 Related Projects

**Rules:**

- Resolve related project references from canonical project data.
- Display only valid published project references.
- Avoid self-references.
- Follow the configured relationship direction and order.
- Use the shared project card component unless a documented requirement justifies a variation.

## 9. Public Collection Components

### 9.1 Collection Header

Contains the collection title and optional description.

**Rules:**

- Clearly identify the curated collection.
- Allow long titles and descriptions to wrap.
- Do not imply that a collection is a separate private portfolio if it is publicly accessible.
- Keep the full-portfolio link discoverable.

### 9.2 Collection Project List

- Reuse the standard project listing and card behavior where appropriate.
- Render projects in the configured collection order.
- Do not add or remove collection members based on viewport size.
- Resolve each project from its canonical content source.
- Handle invalid project references according to the build-validation policy.

### 9.3 Invalid or Empty Collection

The interface must not show broken cards or misleading collection content.

The exact behavior for invalid references should follow the content-validation rules in `architecture-overview.md` and `requirements.md`.

## 10. Theme Switcher

### 10.1 Purpose

Allow users to switch between light and dark themes.

### 10.2 Behavior

- Use the theme tokens defined in `design-system.md`.
- Communicate the current theme accessibly.
- Provide a clear control label or accessible name.
- Preserve the chosen theme according to the finalized persistence policy.
- Avoid visible layout shifts during switching.
- Ensure that the selected theme is applied consistently to all shared components and page content.

### 10.3 States

- Light theme active.
- Dark theme active.
- Keyboard focused.
- Hovered, where applicable.

Theme persistence, system-preference handling, and the initial theme-selection precedence remain governed by `design-system.md` until finalized.

## 11. Language Switcher

### 11.1 Purpose

Allow users to switch between Arabic and English.

### 11.2 Behavior

- Indicate the available language choices clearly.
- Make the current language identifiable.
- Support keyboard and touch interaction.
- Preserve access to the equivalent page when an appropriate translation exists.
- Use the language-routing and fallback rules defined by the finalized information architecture.
- Update document language and text direction when the language changes.

The switcher must not assume that every project has a complete translation until the translation policy is defined.

### 11.3 States

- Arabic selected.
- English selected.
- Keyboard focused.
- Hovered, where applicable.

The exact behavior when the current page has no translation remains an open decision.

## 12. Breadcrumbs and Contextual Navigation

Breadcrumbs may be used on nested pages if they improve orientation.

**Rules:**

- Reflect the actual information hierarchy.
- Use semantic navigation markup and an accessible label.
- Indicate the current page.
- Support RTL and LTR ordering.
- Wrap or simplify on narrow screens without introducing horizontal overflow.

Breadcrumbs are optional until their use is confirmed in `information-architecture.md`.

## 13. Images and Media

### 13.1 Project Images

- Use responsive dimensions.
- Preserve intended aspect ratios.
- Provide meaningful alternative text for informative images.
- Use empty alternative text for purely decorative images.
- Avoid unnecessary image borders or decoration.
- Keep Wabi-Sabi-inspired details subtle.

### 13.2 Missing Media

If an optional image is unavailable:

- Preserve the card or page layout.
- Avoid displaying a broken image icon as the final presentation.
- Use a neutral fallback only if a fallback is defined.
- Do not create a misleading preview of the project.

### 13.3 Loading

Prefer statically rendered content and known image dimensions.

Use loading indicators only where a real asynchronous operation requires them. Avoid skeleton interfaces for content already available at build time.

## 14. Feedback, Empty, and Error States

### 14.1 Empty State

Used when a valid view has no content to display.

Must include:

- A clear explanation.
- A relevant next action when possible.
- A layout consistent with the rest of the site.

### 14.2 Error State

Used when the requested page or content cannot be displayed.

Must:

- Explain the problem in plain language.
- Avoid exposing internal paths, stack traces, or implementation details.
- Offer a reasonable navigation path when possible.
- Remain visually consistent in both themes.

### 14.3 Not Found Page

The not-found page should:

- Clearly communicate that the requested page could not be found.
- Provide a link to the portfolio homepage.
- Avoid implying that the content will become available later unless that is known.
- Support Arabic and English according to the routing strategy.

### 14.4 Build-Time Validation Errors

Content validation errors are primarily a development and build concern, not an end-user interface state.

The build should report actionable information for invalid content according to the finalized validation policy. Internal diagnostic details should not be exposed in public pages.

## 15. Accessibility Requirements

All interactive components must follow these principles:

- Semantic HTML must be used where appropriate.
- Every input must have an accessible label.
- Keyboard focus must remain visible.
- Interactive controls must be operable without a mouse.
- Focus order must follow the visual and semantic order.
- Text and interface contrast must meet the accessibility target defined in `design-system.md`.
- Color must not be the only means of conveying meaning.
- Images must have appropriate alternative text.
- Motion must respect reduced-motion preferences.
- Expanded and collapsed controls must expose their state accessibly.
- Touch targets should aim for approximately 44 × 44 CSS pixels where practical.
- The interface must remain usable at increased text sizes and browser zoom.

Accessibility must be tested in Arabic RTL and English LTR, not only in the default language.

## 16. Component Reuse and Variants

Prefer a small set of reusable components with explicit variants.

Potential component families include:

- `Button`
- `TextLink`
- `SiteHeader`
- `SiteFooter`
- `ThemeSwitcher`
- `LanguageSwitcher`
- `ProjectCard`
- `ProjectGrid`
- `SearchInput`
- `FilterControl`
- `ActiveFilter`
- `EmptyState`
- `PageTitle`
- `ProjectMetadata`
- `ProjectActions`
- `RelatedProjects`

These names are proposed component concepts, not a finalized source-code contract.

### Reuse Rules

- Reuse components when the meaning and behavior are shared.
- Use variants for deliberate differences, such as primary and secondary buttons.
- Avoid creating separate components for trivial styling differences.
- Avoid building a general-purpose component system larger than the portfolio requires.
- Keep content-specific logic separate from purely presentational components.
- Use Astro components for primarily static UI.
- Introduce client-side interactivity only when required by user interaction.

## 17. UI Validation

A component is ready for release when the following applicable checks pass:

- [ ] Default state is visually consistent with the design system.
- [ ] Hover and focus states are implemented where relevant.
- [ ] Disabled and error states behave correctly where relevant.
- [ ] Arabic RTL and English LTR layouts are validated.
- [ ] Light and dark themes are validated.
- [ ] Mobile and desktop layouts are validated.
- [ ] Long text does not clip or overlap.
- [ ] Keyboard interaction works.
- [ ] Accessible names and states are provided.
- [ ] Optional content does not create broken layouts.
- [ ] Links and actions have valid destinations or behavior.
- [ ] The component does not introduce unnecessary client-side JavaScript.

## 18. Open Decisions

The following items require confirmation before they become fixed requirements:

1. Final button variants and exact token values.
2. Whether project cards are fully clickable or expose only explicit links.
3. Whether result counts are displayed in project listings.
4. Exact search matching rules and searchable fields.
5. Filter combination and reset behavior.
6. Whether breadcrumbs are used.
7. Mobile filter-panel interaction pattern.
8. Language-switching behavior when a translation is unavailable.
9. Whether a dedicated fallback image is required for projects without media.
10. Which optional project sections are displayed when content is absent.
11. Whether the header or any contextual navigation remains sticky.
12. Exact component names and folder organization in the Astro implementation.

These decisions should be resolved in the relevant product or architecture documents rather than silently settled through component styling.

## 19. Implementation Principle

Implement only the UI behavior supported by approved requirements and documented decisions.

Where a decision remains open, use the simplest reversible implementation that preserves accessibility, responsive behavior, and consistency with the established design system.

The objective is not to build a large design-system framework. It is to deliver a coherent, maintainable interface for the portfolio's actual pages and user journeys.
