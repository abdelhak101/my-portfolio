# AI Rules & Context

This file serves as the primary entry point for AI agents Gemini to understand the project context, rules, and workflow.

## Project State
*Current status of the project.*
- **Phase**: Planning/Development
- **Current Focus**: Stage 1: Static Foundation (Astro + Markdown): Initial project setup, component architecture, and marketing content.

## User Preferences
*Specific constraints or preferences from the user.*
- **Communication**: Concise, Technical
- **Language**: English
- **Tech Constraints**: No external UI libraries. Use Tailwind CSS and Astro scoped styles.
- **Role Definition**: "AI generates code and suggestions, but humans own commits and architecture decisions. AI should not introduce new frameworks, services, or patterns without an explicit request."
- **Communication**: "For any non-trivial change, AI must restate the problem, propose an approach, and wait for confirmation before editing files."
- **Validation**: "At the end of each step, AI summarizes the files changed, the behavior modified, and any follow-up TODOs before we move on."
- **Quality**: "Any change to business logic must include at least one test update (unit or integration) and a brief explanation of the behavior change."
- **Priorities**: "When DRY, SOLID, KISS, and YAGNI conflict, prioritize YAGNI > KISS > SOLID > DRY. Apply DRY only after 3+ stable repetitions, and favor simple, well-factored code over perfect abstraction."

## Core Documentation
*Note: Links below point to the expected live files.*
- **Constitution**: [CONSTITUTION.md](.docs/CONSTITUTION.md)
- **Project Standards**: [STANDARDS.md](.docs/STANDARDS.md)
- **Collaboration Rules**: [WORKING_TOGETHER.md](.docs/WORKING_TOGETHER.md)
- **Coding Standards**: [CODING_STANDARDS.md](.docs/CODING_STANDARDS.md)
- **Architecture**: [ARCHITECTURE.md](.docs/ARCHITECTURE.md)
- **Test Patterns**: [TEST_PATTERNS.md](.docs/TEST_PATTERNS.md) (Vitest/Playwright)
- **Theme System**: [THEME_SYSTEM.md](.docs/THEME_SYSTEM.md)
- **Design System**: [DESIGN_SYSTEM.md](.docs/DESIGN_SYSTEM.md)

## Commands
*Common commands for development, testing, and building.*
- **Dev Server**: `pnpm dev`
- **Build**: `pnpm build`
- **Preview**: `pnpm preview`
- **Type/Template Check**: `pnpm check`
- **Test**: `pnpm test` (Planned)
- **Lint**: `pnpm lint` (Planned)
- **Format**: `pnpm format` (Planned)

## Style Guidelines
*Concise rules for code style and structure.*
- **Naming**: camelCase for variables/functions, PascalCase for classes/components.
- **Components**: Keep components simple and focused.
- **Styling**: Tailwind/CSS Modules/etc.
- **Types**: Strong typing required (TypeScript).

## Workflow
1. **Read-First**: Always check `.docs/WORKING_TOGETHER.md` before starting significant work.
2. **Feature Specs**: Ensure a feature file exists in `.docs/features/` before implementation.
3. **Tests**: Follow patterns in `.docs/TEST_PATTERNS.md`.
4. **Commits**: Use conventional commits (feat, fix, docs, style, refactor, test, chore).

## Tech Stack
- **Frontend**: Astro
- **Backend**: None (SSG)
- **Database**: None (Markdown-based)
- **Testing**: Vitest/Playwright

## Thinking Process
*Guidelines for AI reasoning.*
1. **Context First**: Before suggesting code, check `.docs/features` and `.docs/ARCHITECTURE.md` to understand where the change fits.
2. **Step-by-Step**: Break down complex tasks into smaller definitions.
3. **No Hallucinations**: Verify file paths and names before citing them.
