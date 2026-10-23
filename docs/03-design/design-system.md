# Design System — My Portfolio

## 1. Purpose

This document defines the visual and interaction principles for **My Portfolio — Projects, Skills & Proof of Work**, a bilingual Arabic and English developer portfolio built with Astro.

The design should communicate technical competence, clarity, precision, and personality without visual noise.

The system combines four compatible influences:

- **Minimalist Editorial — Primary visual direction:** typography-led layouts, generous whitespace, and content-first presentation.
- **Swiss-inspired — Layout foundation:** grid-based composition, alignment, consistent spacing, and clear information hierarchy.
- **Dark Minimalism — Color and atmosphere:** a restrained monochrome palette with both light and dark themes.
- **Wabi-Sabi — Subtle visual character:** minimal natural texture or imperfection in selected imagery and details, never as a dominant interface treatment.

The result should feel like a carefully designed digital product, not a generic portfolio template.

## 2. Design Principles

### 2.1 Content before decoration

Projects, technical decisions, outcomes, and evidence are the primary content. Visual elements must support understanding rather than compete with it.

### 2.2 Monochrome first

Black, white, and neutral grays form the core palette. Color should not be used decoratively.

Functional colors may be introduced where needed for errors, success states, or accessibility, provided they remain restrained and sufficiently contrasted.

### 2.3 Strong editorial hierarchy

Use typography, spacing, scale, and alignment to distinguish headings, summaries, metadata, and technical details.

Avoid excessive font weights, unnecessary labels, and multiple competing display styles.

### 2.4 Structured but not mechanical

Use a consistent grid and spacing system. Featured projects may use deliberate asymmetry or varied image proportions, but the underlying alignment should remain intentional.

### 2.5 Subtle imperfection

Wabi-Sabi may appear in selected project imagery, a lightly textured visual, or a carefully chosen composition. Do not apply paper textures, grain, rough borders, or irregular shapes across the entire interface.

### 2.6 Consistency across languages and themes

Arabic and English must receive equal design attention. Both light and dark themes must preserve hierarchy, contrast, component behavior, and readability.

---

## 3. Color System

### 3.1 Theme strategy

**Decision: both light and dark themes are supported, with a manual theme switch.**

The implementation should use semantic design tokens rather than hardcoded colors inside individual components.

The proposed initial behavior is:

1. Use the saved user preference when one exists.
2. Otherwise, use the operating system's color-scheme preference.
3. If no preference is available, default to the light theme.
4. Allow the user to switch themes manually.

Persisting the manual choice is the proposed behavior and should be confirmed during implementation. Avoid a flash of the wrong theme on page load where practical.

### 3.2 Initial monochrome tokens

These are starting values, not final color approvals. Test them against actual typography, screenshots, and interactive states.

| Token | Light theme | Dark theme |
|---|---|---|
| `--color-bg` | `#FFFFFF` | `#111111` |
| `--color-surface` | `#F7F7F7` | `#191919` |
| `--color-surface-raised` | `#FFFFFF` | `#222222` |
| `--color-text` | `#111111` | `#F5F5F5` |
| `--color-text-muted` | `#5E5E5E` | `#B8B8B8` |
| `--color-text-subtle` | `#707070` | `#A0A0A0` |
| `--color-border` | `#E2E2E2` | `#343434` |
| `--color-border-strong` | `#BDBDBD` | `#555555` |
| `--color-inverse-bg` | `#111111` | `#F5F5F5` |
| `--color-inverse-text` | `#FFFFFF` | `#111111` |
| `--color-focus` | `#2457D6` | `#8EADFF` |

Use the inverse tokens for selected high-contrast sections, prominent calls to action, or other intentional emphasis. Do not turn every project card into a black or white block.

Functional states may use additional semantic tokens:

- `--color-success`
- `--color-warning`
- `--color-danger`
- `--color-info`

Their final values remain subject to contrast testing and the monochrome visual direction.

### 3.3 Color rules

- Use backgrounds and borders to establish grouping before adding shadows.
- Maintain sufficient contrast for text, icons, focus indicators, and controls.
- Do not communicate status through color alone.
- Avoid gradients and decorative accent colors unless a specific project preview requires them.
- Project screenshots may contain their own colors; the surrounding interface should remain visually restrained.
- Check the contrast of muted text instead of assuming that a gray is accessible.

---

## 4. Typography

### 4.1 Typography direction

Typography should carry much of the visual identity. Use a strong editorial display style for major headings and a highly readable sans-serif for interface text.

The Arabic and English systems must feel related without forcing both languages into identical typography.

### 4.2 Proposed font stacks

| Purpose | Initial proposal |
|---|---|
| English interface and body | `Inter`, system sans-serif |
| Arabic interface and body | `Noto Sans Arabic` or `Cairo` |
| Code and technical metadata | `JetBrains Mono`, monospace |

These are proposals, not final font selections. Compare the Arabic options using actual headings, paragraphs, numbers, punctuation, and mixed Arabic-English technical terms.

Prefer self-hosted font files when licensing and performance permit. Load only the weights and character subsets required.

### 4.3 Type scale

Use a responsive scale rather than assigning unrelated sizes to every component.

| Token | Initial size | Typical use |
|---|---:|---|
| `--text-xs` | 12px | Small metadata |
| `--text-sm` | 14px | Secondary information |
| `--text-base` | 16px | Default body text |
| `--text-lg` | 18px | Introductory text |
| `--text-xl` | 20px | Supporting headings |
| `--text-2xl` | 24px | Section subheadings |
| `--text-3xl` | 32px | Section headings |
| `--text-4xl` | 40px | Major headings |
| `--text-display` | 56–80px | Hero and selected editorial headings |

Large headings must scale down on mobile. The final scale and line wrapping require visual testing in both languages.

### 4.4 Hierarchy and readability

- Use a small, consistent set of font weights.
- Keep body text comfortable to read and avoid long, excessively wide paragraphs.
- Use line-height appropriate to the script; Arabic often needs more vertical room.
- Use tabular numerals where alignment of dates, metrics, or statistics matters.
- Reserve monospace for code, technical labels, or compact data—not long body paragraphs.
- Avoid uppercase styling for content where it harms Arabic or English readability.

---

## 5. Layout and Grid

### 5.1 Global layout

Initial layout values:

- Maximum content width: `1200px`
- Mobile horizontal gutter: `20px`
- Desktop horizontal gutter: `40px`
- Main section spacing: `96–144px` on larger screens
- Smaller-screen section spacing: `56–88px`

Use fluid sizing where it improves responsiveness. The values above are defaults to validate, not rigid requirements for every page.

### 5.2 Grid principles

- Use a consistent column grid for the main content.
- Align headings, project information, and page sections to shared edges.
- Use whitespace to separate content before adding extra containers.
- Allow selected featured projects to break the regular rhythm intentionally.
- Keep repeated project listings consistent enough to support scanning and comparison.

### 5.3 Editorial composition

The homepage may feature a large introduction and a curated selection of projects. Project detail pages should prioritize project context, contribution, technical decisions, and evidence.

Use asymmetry selectively—for example, a large image beside compact project metadata. Do not make every section asymmetrical merely to demonstrate a visual style.

---

## 6. Spacing System

Use a predictable spacing scale based on a 4px foundation.

| Token | Value |
|---|---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

Use the scale for component padding, gaps, and section spacing. Prefer consistent tokens over arbitrary values, while allowing exceptions for typography and media composition.

---

## 7. Borders, Corners, and Elevation

### 7.1 Corner-radius strategy

**Decision: use mixed corner radii according to component purpose.**

The system should not force every element to be square or round. Corners should express hierarchy and component function.

Initial guidance:

| Component | Proposed radius |
|---|---:|
| Large editorial images and featured media | 0–4px |
| Project cards | 4–8px |
| Inputs and select controls | 4–8px |
| Buttons | 4–8px |
| Small tags and filter chips | 4px or pill-shaped where useful |
| Avatars | 50% |
| Tooltips and compact popovers | 4–8px |
| Large overlays or dialogs | 8–12px |

These are starting ranges. Choose a consistent value for each component type after implementation testing.

Rules:

- Use square or nearly square corners for the editorial visual language.
- Use more rounded shapes only when they improve recognition or interaction.
- Avoid combining many unrelated radius values within one component.
- Do not use pill shapes for every button, label, or filter.
- Keep decorative rounding subordinate to the content.

### 7.2 Borders

- Prefer thin, neutral borders for separation.
- Use stronger borders for active or selected states where necessary.
- Use borders instead of shadows to define most cards and panels.
- Ensure borders remain visible in both themes without becoming visually heavy.

### 7.3 Shadows and elevation

Shadows should be rare and restrained. Use them only when an element needs clear elevation, such as a popover or dropdown. Do not rely on shadows as the primary way to separate every card from its background.

---

## 8. Imagery and Wabi-Sabi

### 8.1 Agreed intensity

**Decision: Wabi-Sabi is very subtle and limited to imagery and details.**

The portfolio remains clean, professional, and product-oriented.

Appropriate uses include:

- A subtle grain or natural texture inside a specific featured image.
- Slightly imperfect crops or composition in selected editorial visuals.
- A restrained texture behind a special introduction or project cover, when it supports the content.

Avoid:

- Persistent paper textures across the entire site.
- Rough or irregular borders on every card.
- Decorative noise behind body text.
- Excessive asymmetry that makes navigation or scanning harder.
- Treating imperfection as a substitute for clear layout and typography.

### 8.2 Project media

Project images should show the actual work whenever possible: interfaces, dashboards, code-related visualizations, design work, or product screenshots.

- Preserve the original aspect ratio when it is important to the work.
- Use consistent image treatment within repeated components.
- Define deliberate crop behavior for thumbnails.
- Provide meaningful alternative text when an image communicates information.
- Avoid unnecessary image effects that obscure the work itself.

---

## 9. Component Principles

### 9.1 Navigation

- Keep the main navigation compact.
- Provide clear active and hover states.
- Include an accessible language switch and theme switch.
- Avoid adding navigation items solely for decoration.
- Ensure keyboard navigation and visible focus indicators.

### 9.2 Buttons and links

Establish clear primary, secondary, and text-link styles.

- Primary actions should be visually obvious without relying on bright color.
- Secondary actions should be quieter.
- Links must remain identifiable and usable in both themes.
- Interactive elements should have comfortable hit areas.
- Hover states must not be the only indication that something is interactive.

### 9.3 Project cards

Cards should prioritize:

1. Project name.
2. Short summary.
3. Relevant role, type, or technology metadata.
4. Evidence or destination link where available.

Use a consistent base layout, with optional featured variants. Avoid showing every possible field on the card; detailed information belongs on the project page.

### 9.4 Tags and filters

- Keep tags compact and readable.
- Use borders and background changes for selected states.
- Ensure the selected state is distinguishable in both themes.
- Support keyboard operation.
- Avoid using a different decorative color for every technology or category.

### 9.5 Code and technical content

- Use monospace typography for code and compact technical values.
- Preserve line breaks and syntax readability.
- Support horizontal overflow for long code lines without breaking the entire page.
- Ensure code blocks and inline code remain readable in both themes.

### 9.6 Theme switch

- Make the current theme and the action to change it understandable.
- Use an accessible label; do not rely on an icon alone.
- Respect the initial system preference unless a saved manual preference takes precedence.
- Prevent avoidable theme flicker on first render.
- Verify the switch works across navigation and shared project pages.

### 9.7 Language switch

- Support Arabic and English.
- Set the correct document language and text direction.
- Preserve the equivalent page or project when switching languages where a translation exists.
- Define a clear fallback when the equivalent translation is unavailable.
- Do not assume that translating the interface automatically translates project content.

---

## 10. Arabic, English, RTL, and LTR

Bilingual support is a core requirement, not a later visual enhancement.

### Arabic

- Set `dir="rtl"` for Arabic pages and appropriate content regions.
- Test alignment, punctuation, list markers, navigation, and form controls.
- Avoid manually reversing layouts where CSS logical properties can express the intended behavior.
- Test Arabic headings and body text with real project content.

### English

- Set `dir="ltr"` for English pages and content regions.
- Preserve the same visual hierarchy and spacing principles.

### Mixed-direction content

Technology names, URLs, code, version numbers, and Latin abbreviations may appear inside Arabic text.

- Use direction isolation where needed, such as `<bdi>` or appropriate CSS direction rules.
- Keep code and URLs legible without unintentionally reversing their contents.
- Test dates, numbers, punctuation, and inline technical terms in both directions.

### Layout implementation

Prefer logical CSS properties such as:

- `margin-inline`
- `padding-inline`
- `inset-inline-start`
- `border-inline-start`
- `text-align: start`

Avoid unnecessary `left`/`right` assumptions in shared components.

---

## 11. Responsive Behavior

The design must work on mobile, tablet, and desktop.

Initial breakpoint proposals:

- Small screens: below `640px`
- Medium screens: `640–1023px`
- Large screens: `1024px` and above

These breakpoints may be adjusted to the actual content rather than followed mechanically.

Requirements:

- Reduce oversized headings fluidly.
- Collapse multi-column layouts when content becomes cramped.
- Keep project images readable.
- Allow filters to wrap or use an appropriate compact interaction.
- Prevent horizontal overflow except where intentional, such as code blocks.
- Preserve the same content priority across viewport sizes.
- Test both themes and both writing directions at each important layout size.

---

## 12. Motion and Interaction

Motion should be restrained and purposeful.

Suitable uses:

- Short transitions for theme changes, hover states, and disclosure controls.
- Small opacity or position changes when they help explain an interaction.
- Clear feedback for selected filters and active controls.

Avoid:

- Large decorative entrance animations.
- Continuous motion without a functional purpose.
- Motion that delays access to project content.
- Animations that make navigation or reading harder.

Respect `prefers-reduced-motion` and provide a reduced-motion experience.

---

## 13. Accessibility

Target **WCAG 2.2 AA** as the baseline.

The implementation should include:

- Sufficient text and non-text contrast.
- Visible keyboard focus.
- Keyboard-accessible navigation, filters, menus, and theme controls.
- Semantic HTML and correct heading hierarchy.
- Accessible labels for interactive controls.
- Meaningful alternative text for informative images.
- Error and status messages that do not rely on color alone.
- Reduced-motion support.
- Responsive zoom and text resizing.
- Correct language and text direction metadata.

Run automated checks, but also test manually with keyboard navigation and representative Arabic and English content.

---

## 14. Technical Implementation Guidance

The portfolio uses Astro and is expected to be statically generated unless later requirements justify a different architecture.

### Design tokens

Keep global tokens centralized and use semantic names for component styling.

Initial CSS example:

```css
:root {
  color-scheme: light;

  --color-bg: #ffffff;
  --color-surface: #f7f7f7;
  --color-surface-raised: #ffffff;
  --color-text: #111111;
  --color-text-muted: #5e5e5e;
  --color-border: #e2e2e2;
  --color-focus: #2457d6;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  --radius-media: 4px;
  --radius-card: 8px;
  --radius-control: 6px;
  --radius-overlay: 8px;

  --content-width: 1200px;
}

[data-theme="dark"] {
  color-scheme: dark;

  --color-bg: #111111;
  --color-surface: #191919;
  --color-surface-raised: #222222;
  --color-text: #f5f5f5;
  --color-text-muted: #b8b8b8;
  --color-border: #343434;
  --color-focus: #8eadff;
}
```

This is a starting token set, not a complete stylesheet. Add the remaining typography, spacing, border, focus, and functional-state tokens as the components are implemented.

### Implementation principles

- Prefer CSS custom properties for theme-dependent values.
- Keep shared component styles consistent.
- Avoid scattering hardcoded light and dark colors across components.
- Use a clear theme attribute or class consistently.
- If Tailwind CSS is selected, connect its theme utilities to the semantic tokens instead of duplicating the palette.
- Test the final setup against Astro's rendering and hydration behavior.
- Do not add a UI framework solely to implement a theme switch.

---

## 15. Page-Level Application

### Homepage

- Strong introductory typography.
- Clear summary of professional focus.
- Selected projects presented with editorial hierarchy.
- Direct paths to projects, skills, and supporting evidence.
- A clear visual rhythm without excessive decorative sections.

### Projects listing

- Search and filters should remain visually compact.
- Use consistent project cards.
- Prioritize scanability and useful metadata.
- Make empty and no-results states clear.

### Project detail

- Clear project title and summary.
- Role, contribution, technologies, and relevant dates.
- Links to source code, demo, or case study when available.
- Technical details and evidence organized into readable sections.
- Media that demonstrates the actual project.

### Public collection/share page

- Show the selected projects without introducing a separate visual identity.
- Explain the collection context when appropriate.
- Provide a clear path to the full portfolio.
- Support language switching and both themes.

---

## 16. Design Quality Checklist

Before considering a page ready, verify:

- [ ] The page follows the monochrome visual direction.
- [ ] Both light and dark themes are readable and complete.
- [ ] Text hierarchy is clear without excessive decoration.
- [ ] Spacing and alignment follow the shared system.
- [ ] Corner radii match component purpose.
- [ ] Wabi-Sabi details remain subtle and selective.
- [ ] Project imagery supports rather than obscures the work.
- [ ] Arabic RTL and English LTR layouts have both been tested.
- [ ] Mixed-direction text, URLs, and code remain readable.
- [ ] Keyboard focus and interaction states are visible.
- [ ] Contrast and accessibility requirements have been checked.
- [ ] Mobile layouts do not create unintended overflow.
- [ ] Reduced-motion preferences are respected.
- [ ] The theme and language switches have accessible labels.

---

## 17. Decisions and Open Questions

### Confirmed decisions

- **Color direction:** monochrome black, white, and neutral grays.
- **Theme:** both light and dark modes, with manual switching.
- **Visual foundation:** Minimalist Editorial with a Swiss-inspired grid and hierarchy.
- **Wabi-Sabi:** very subtle, restricted to selected imagery and details.
- **Corner radius:** mixed according to component purpose.
- **Languages:** Arabic and English, with RTL and LTR support.
- **Priority:** content clarity, technical evidence, readability, and professional presentation.

### Proposed but not yet validated

- Initial color values and semantic tokens.
- Exact font families and font weights.
- Type scale and responsive heading sizes.
- Content width, breakpoints, and spacing values.
- Radius values assigned to each component.
- Exact focus and functional-state colors.
- Theme initialization and persistence implementation details.

### Still unresolved

1. **Theme persistence:** confirm whether a manual theme selection should persist in `localStorage` across visits. Recommended: yes.
2. **Theme switch location:** decide whether it belongs in the main navigation, a compact utility area, or both desktop and mobile navigation.
3. **Arabic font:** choose between Noto Sans Arabic, Cairo, or another tested option after visual comparison.
4. **Display typography:** decide whether headings should use the same family as body text or a distinct editorial font.
5. **Final neutral shades:** validate actual contrast and appearance in real pages.
6. **Wabi-Sabi application:** identify which project covers or sections, if any, benefit from texture after actual project imagery is available.
7. **Tailwind integration:** confirm the exact token-to-utility implementation when the CSS setup is finalized.
8. **Visual references:** select the final reference examples for typography, project cards, and light/dark theme behavior.

These open questions should be resolved through implementation and visual testing rather than treated as settled requirements.
