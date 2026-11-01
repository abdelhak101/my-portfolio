# Feature PB-010 - Implement reusable UI components

## User Story
*As a visitor to my portfolio site, I want consistently styled buttons, links, project cards, and placeholder states so that the UI feels cohesive, accessible, and easy to maintain.*

## Requirements
- **Core Functionality**
  - Provide a `Button` component with primary, secondary, and danger variants.
  - Provide a `Link` component with inline and CTA styles.
  - Provide a `ProjectCard` component that displays a project thumbnail, title, description, and tags.
  - Provide a `Placeholder` component for empty and error states (including ARIA roles).
- **Edge Cases**
  - Disabled state for buttons/links with appropriate opacity and focus handling.
  - Responsive layout for `ProjectCard` on mobile, tablet, desktop.
  - Graceful fallback when image URL is missing.
- **Constraints**
  - No external UI libraries; use Astro components with Tailwind CSS only.
  - Follow existing design tokens (colors, spacing, focus rings) defined in `THEME_SYSTEM.md`.
  - Keep components **semantic** (e.g., `<button>`, `<a>`, `<article>`).

## Open Questions
- None at this time (all clarified).

## Acceptance Criteria
- [ ] Buttons and links have consistent styles, focus, hover, and disabled states.
- [ ] Project cards have a reusable presentation and are responsive.
- [ ] Empty and error states are rendered via a reusable `Placeholder` component.
- [ ] All components use semantic HTML and pass accessibility checks.
- [ ] Component behavior aligns with `ui-specifications.md`.

## Technical Details
- **File Layout**  
  ```
  src/components/ui/
    Button.astro
    Link.astro
    ProjectCard.astro
    Placeholder.astro
  ```
- **Props Interfaces** (TypeScript) will be defined in each component file.
- **Styling**: Tailwind utility classes plus CSS variables from `THEME_SYSTEM.md`. Focus-visible ring uses `ring-focus` class. Disabled state uses `opacity-50` and `pointer-events-none`.
- **Accessibility**: `aria-disabled`, `role="status"` for placeholders, `sr-only` text where needed.
- **Testing**: Vitest unit tests located in `tests/unit/ui/`.

## Implementation Plan
- [ ] **Step 1 – Button**: Create `src/components/ui/Button.astro` with `variant`, `size`, `disabled` props; add Tailwind classes; export a TypeScript `ButtonProps` interface.
- [ ] **Step 2 – Link**: Create `src/components/ui/Link.astro` supporting `href`, `variant`, `external` props; ensure proper `rel`/`target` handling.
- [ ] **Step 3 – ProjectCard**: Create `src/components/ui/ProjectCard.astro` that consumes a `Project` type (title, description, image, tags, link). Include responsive grid classes.
- [ ] **Step 4 – Placeholder**: Create `src/components/ui/Placeholder.astro` with `type` prop (`empty` | `error`) and optional `message`.
- [ ] **Step 5 – Tests**: Add Vitest unit tests for each component in `tests/unit/ui/` covering rendering, variant classes, disabled handling, and accessibility attributes.
- [ ] **Step 6 – Documentation**: Update `.docs/DESIGN_SYSTEM.md` UI Components section with brief usage examples and link to this spec.

## Test Plan
- **Unit Tests**
  - `Button` renders correct variant class, respects `disabled`, emits `type="button"` by default.
  - `Link` adds `target="_blank"` and `rel="noopener noreferrer"` for `external` links.
  - `ProjectCard` outputs an `<article>` with image alt, title, description, and tags.
  - `Placeholder` renders appropriate ARIA role and visually hidden label.
- **Integration / Manual**
  - Verify components render correctly in a dev build (`pnpm dev`).
  - Run accessibility audit (focus ring, color contrast) on pages that use them.

## Design & Diagrams
*Mermaid diagram placeholder – will be added once components are wired together.*

## Decisions
- Chose **Component‑First** approach (already confirmed).
- Using Tailwind utilities directly keeps the component library lightweight (YAGNI > DRY).
- No separate CSS modules; styling lives in the component via Tailwind for simplicity.