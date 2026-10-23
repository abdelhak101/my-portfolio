# Responsive Behavior

## 1. Purpose

This document defines how My Portfolio adapts its layout, navigation, content, and interactions across mobile, tablet, laptop, and large desktop screens.

The goal is to preserve a consistent, accessible, and intentional experience without treating smaller screens as reduced versions of the desktop interface.

## 2. Design Principles

### 2.1 Content First

- Prioritize project titles, summaries, technologies, and evidence.
- Preserve the information hierarchy across all viewport sizes.
- Avoid hiding important project information solely to simplify mobile layouts.
- Allow long content to flow naturally instead of forcing fixed heights.

### 2.2 Responsive, Not Device-Specific

- Use content-driven layouts rather than targeting specific device models.
- Prefer CSS Grid, Flexbox, fluid sizing, and intrinsic sizing.
- Introduce breakpoints when the layout no longer works comfortably, not merely because a device category changes.

### 2.3 Minimalist Editorial

- Preserve generous spacing where it improves readability.
- Reduce decorative spacing when screen space is limited.
- Keep borders, dividers, and monochrome surfaces visually consistent.
- Avoid unnecessary animation, oversized decoration, and excessive card styling.

### 2.4 Functional Consistency

- Preserve access to navigation, project filters, search, theme switching, language switching, and project details at every supported viewport.
- Adapt interaction patterns when necessary without removing essential functionality.
- Ensure all interactive elements remain usable with touch, mouse, and keyboard input.

## 3. Responsive Breakpoints

The following breakpoints are initial implementation proposals, not finalized product requirements.

| Breakpoint | Viewport width | Intended layout |
|---|---:|---|
| Small mobile | Below 480px | Single-column layouts and compact controls |
| Large mobile | 480–767px | Single-column content with more flexible spacing |
| Tablet | 768–1023px | Flexible grids and expanded content regions |
| Desktop | 1024–1439px | Full navigation and multi-column layouts |
| Large desktop | 1440px and above | Wider surrounding space with a constrained content container |

Implementation should be driven by content fit. Additional breakpoints may be introduced when a specific component requires them.

Use mobile-first CSS wherever practical.

## 4. Global Layout

### 4.1 Page Container

- Use a centered content container on larger screens.
- Allow the container to occupy nearly the full available width on mobile.
- Apply responsive horizontal padding.
- Prevent content from touching the viewport edges.
- Use a maximum content width to preserve readable line lengths on large displays.

Initial sizing proposal:

| Property | Proposed value |
|---|---|
| Maximum content width | 1200px |
| Mobile horizontal padding | 16–20px |
| Tablet horizontal padding | 24–32px |
| Desktop horizontal padding | 32–48px |

These values should be implemented as design tokens so they can be adjusted consistently.

### 4.2 Vertical Rhythm

- Maintain a consistent spacing scale across breakpoints.
- Reduce large section gaps on smaller screens.
- Preserve enough separation between distinct content sections.
- Avoid using viewport height as a fixed content-height constraint.
- Keep page titles visually distinct without allowing them to dominate small screens.

### 4.3 Overflow

- Prevent horizontal page scrolling under normal content conditions.
- Allow long URLs, code snippets, and technical strings to wrap or scroll within their own containers.
- Use responsive image sizing to prevent overflow.
- Avoid fixed-width components that exceed their parent containers.
- Ensure tables and other wide technical content have an intentional mobile presentation.

## 5. Navigation

### 5.1 Desktop Navigation

On wider screens:

- Display the primary navigation horizontally.
- Keep the site identity visually distinct from navigation links.
- Provide access to the theme switcher and language switcher.
- Use consistent alignment and spacing.
- Avoid introducing additional navigation items without an established information-architecture decision.

### 5.2 Mobile Navigation

On narrow screens:

- Replace the horizontal navigation with a compact navigation pattern when necessary.
- Use a menu button with an accessible name and a clear expanded/collapsed state.
- Keep the site identity visible where practical.
- Make navigation items large enough to interact with comfortably.
- Ensure the menu can be operated using a keyboard.
- Close the menu after navigation when appropriate.
- Prevent the menu from obscuring content without providing a clear way to dismiss it.

The exact mobile navigation pattern remains open: a dropdown, drawer, or compact expandable menu may be selected during implementation.

### 5.3 Persistent Header Behavior

A sticky header is not a confirmed requirement.

Prefer a normal document-flow header initially. If a sticky header is introduced, verify that it does not obscure headings, anchor destinations, or focused elements.

## 6. Homepage

### 6.1 Hero Section

- Use a clear, responsive heading hierarchy.
- Allow large headings to wrap naturally.
- Use fluid typography within defined minimum and maximum sizes.
- Stack supporting text and calls to action on narrow screens when needed.
- Prevent buttons and links from overflowing when labels are translated.
- Avoid requiring a large empty hero area on mobile.

### 6.2 Featured Projects

| Viewport | Proposed layout |
|---|---|
| Small mobile | One column |
| Large mobile | One column by default |
| Tablet | Two columns when content fits |
| Desktop | Two or three columns depending on card width |
| Large desktop | Preserve readable card widths rather than maximizing column count |

Featured-project selection and ordering should remain consistent unless a future product decision explicitly defines responsive-specific ordering.

## 7. Project Listing and Discovery

### 7.1 Project Grid

- Use CSS Grid with responsive column sizing.
- Ensure project cards have a usable minimum width.
- Avoid fixed card heights when project titles and summaries vary.
- Keep card alignment and spacing consistent.
- Preserve the same project data and sorting rules across viewport sizes.

The number of columns is a presentation decision and must not change the underlying search or filtering results.

### 7.2 Search

- Keep search accessible near the project listing.
- Allow the search input to occupy the available width on mobile.
- Prevent the search field from shrinking until its contents become unusable.
- Provide a visible label or an accessible name.
- Ensure keyboard focus remains visible.

### 7.3 Filters

On desktop, filters may appear in a horizontal toolbar or a sidebar if the information architecture supports one.

On mobile:

- Prefer a compact filter panel, expandable section, or clearly labeled filter control.
- Avoid allowing a large number of filter options to dominate the initial viewport.
- Keep active filters visible or provide an obvious way to inspect them.
- Provide a clear way to remove individual filters and reset all filters.
- Ensure filter controls remain usable with touch input.
- Preserve selected filter state when the user opens a project and returns to the listing, where practical.

The mobile filter interaction pattern and whether filters use a drawer, popover, or inline panel remain open.

### 7.4 Empty Results

When search or filters return no projects:

- Display a concise explanation.
- Provide a clear action to reset filters or revise the search.
- Keep the empty state within the normal content flow.
- Avoid oversized illustrations or decorative elements that conflict with the visual direction.

## 8. Project Detail Pages

### 8.1 Content Layout

On desktop, project content may use a main content column with a secondary information region when this improves scanning.

On mobile:

- Stack project information vertically.
- Place the title, summary, and primary project actions near the beginning.
- Keep technologies, role, date, and evidence easy to locate.
- Allow technical explanations and case studies to use the available width.
- Avoid making important metadata dependent on hover interactions.

### 8.2 Project Media

- Scale images proportionally within their containers.
- Preserve their intended aspect ratios unless a deliberate crop is specified.
- Avoid oversized media that delays access to essential project information.
- Use responsive image sources and suitable dimensions where supported.
- Lazy-load below-the-fold media when appropriate.
- Provide meaningful alternative text for informative images.

Wabi-Sabi-inspired visual imperfections should remain subtle and must not reduce image clarity or content legibility.

### 8.3 Technical Content

- Wrap long inline code where appropriate.
- Place long code blocks in horizontally scrollable containers.
- Preserve syntax readability and sufficient contrast in both themes.
- Avoid shrinking technical text excessively to fit narrow screens.
- Ensure code containers do not create page-level horizontal overflow.

### 8.4 Related Projects

- Display related projects in a responsive grid.
- Use one column on narrow screens and additional columns as space permits.
- Preserve the configured relationship and ordering across viewport sizes.
- Ensure related-project links remain easy to distinguish from surrounding content.

## 9. Public Collection Pages

Public collections present a curated subset of portfolio projects.

- Adapt collection project grids using the same responsive rules as the main project listing.
- Display the collection title and description before the project list.
- Keep the link to the full portfolio discoverable.
- Allow long collection titles and descriptions to wrap naturally.
- Ensure language switching and theme switching remain available.
- Handle empty or invalid collections with a clear, responsive message.

Collection membership must not change according to viewport width.

## 10. Typography and Internationalization

### 10.1 Fluid Typography

- Use `rem` units for most text sizing.
- Use `clamp()` for fluid headings where appropriate.
- Define sensible minimum and maximum sizes.
- Avoid fixed typography values that cause clipping or excessive wrapping.
- Preserve a clear distinction between headings, body text, metadata, and technical labels.

### 10.2 Arabic and English

- Support right-to-left layout for Arabic and left-to-right layout for English.
- Use CSS logical properties such as `margin-inline-start` and `padding-inline-end`.
- Avoid hard-coded left/right positioning when the layout should adapt to text direction.
- Test navigation, grids, breadcrumbs, metadata, and icon placement in both directions.
- Handle mixed-direction content such as URLs, code, technology names, and Latin identifiers deliberately.
- Allow translated text to wrap without clipping or overlapping controls.

Responsive behavior must remain correct in both languages; Arabic must not be treated as a simple text replacement for English.

## 11. Light and Dark Themes

Both themes must work across all supported viewport sizes.

- Use semantic color tokens rather than viewport-specific hard-coded colors.
- Preserve text contrast, borders, focus indicators, and disabled states in both themes.
- Ensure theme switching does not cause layout shifts.
- Prevent theme controls from becoming inaccessible in compact navigation.
- Check icons, project imagery, code blocks, and embedded content in both themes.

Theme selection and persistence behavior are defined in `design-system.md` and the relevant implementation decisions.

## 12. Responsive Interaction and Accessibility

- Support keyboard navigation at all viewport sizes.
- Use visible focus indicators.
- Do not rely on hover as the only way to reveal content or actions.
- Keep interactive targets comfortably sized; aim for approximately 44 × 44 CSS pixels for primary touch controls where practical.
- Respect reduced-motion preferences.
- Ensure menus, filter panels, and dialogs have appropriate accessible states.
- Prevent focused controls from being obscured by overlays or sticky elements.
- Maintain readable contrast in both themes.
- Avoid animations that interfere with scrolling or interaction on lower-powered devices.

Responsive layouts must not remove information or functionality required to use the portfolio.

## 13. Performance Considerations

- Prefer CSS-based responsive layouts over JavaScript-driven layout calculations.
- Avoid loading large desktop-only assets on mobile when suitable alternatives exist.
- Use responsive images and appropriate image formats.
- Limit unnecessary client-side JavaScript.
- Keep search and filtering efficient for the expected project catalogue.
- Avoid loading below-the-fold media eagerly unless needed.
- Prevent layout shifts by reserving appropriate image dimensions.
- Test production builds rather than relying only on development-server behavior.

## 14. Implementation Guidance for Astro

- Implement global layout behavior in shared Astro layouts and components.
- Define breakpoints, spacing, and container sizing centrally where practical.
- Prefer CSS Grid and Flexbox for layout.
- Use CSS media queries for presentation changes.
- Introduce client-side JavaScript only when the interaction requires it.
- Keep content and responsive presentation separate.
- Test generated pages for both Arabic and English routes.
- Ensure static generation produces valid layouts for project details and public collections.

Responsive behavior should not require a database, server-side rendering, or a separate mobile application.

## 15. Validation Checklist

### Layout

- [ ] No unintended horizontal page overflow.
- [ ] Text wraps without clipping or overlapping.
- [ ] Project grids adapt to available space.
- [ ] Images scale without distortion.
- [ ] Long titles and metadata remain readable.
- [ ] Layouts work at intermediate widths, not only at named breakpoints.

### Navigation and Interaction

- [ ] Desktop and mobile navigation are usable.
- [ ] Search and filters remain accessible.
- [ ] Theme and language controls remain discoverable.
- [ ] Menus and panels can be opened and dismissed.
- [ ] Keyboard focus remains visible and unobstructed.
- [ ] Touch controls are comfortably usable.

### Content and Localization

- [ ] Project detail pages remain readable on mobile.
- [ ] Technical code blocks do not cause page-level overflow.
- [ ] Public collections work across viewport sizes.
- [ ] Arabic RTL and English LTR layouts are both tested.
- [ ] Long translated labels do not break controls.

### Themes and Accessibility

- [ ] Light and dark themes are validated at each major layout.
- [ ] Text and controls maintain sufficient contrast.
- [ ] Reduced-motion preferences are respected.
- [ ] Important information is not available only on hover.
- [ ] Responsive behavior remains usable with keyboard and touch input.

### Performance

- [ ] Images use appropriate dimensions and loading behavior.
- [ ] Layout shifts are minimized.
- [ ] Responsive changes do not introduce unnecessary client-side JavaScript.
- [ ] Production output is tested.

## 16. Open Decisions

The following decisions remain unresolved:

1. **Exact breakpoints:** The values in this document are initial proposals and should be validated against actual content.
2. **Container width:** Confirm whether 1200px is the appropriate maximum width.
3. **Mobile navigation:** Choose between a dropdown, drawer, or expandable menu.
4. **Filter interaction:** Choose between inline filters, a popover, or a dedicated panel on mobile.
5. **Sticky header:** Decide whether any header persistence is needed.
6. **Responsive typography:** Finalize the fluid type scale in conjunction with `design-system.md`.
7. **Project card behavior:** Decide whether card layouts need different media ratios at different widths.
8. **Testing targets:** Define the browser and viewport matrix for formal acceptance testing.

Until these decisions are finalized, implementation should use the proposed values as defaults without treating them as immutable requirements.
