# My Portfolio — Projects, Skills & Proof of Work

A personal developer portfolio showcasing projects, technical skills, and evidence of work across software development, UI/UX design, automation, and artificial intelligence.

The portfolio is designed to present projects in a structured, searchable, and transparent way, helping visitors understand not only what was built, but also the technologies used, the developer's role, and the available evidence of the work.

**Repository:** [github.com/abdelhak101/my-portfolio](https://github.com/abdelhak101/my-portfolio)

## Overview

My Portfolio is a bilingual personal portfolio built with **Astro**. It organizes projects into structured entries that can be explored through search, filters, and dedicated project pages.

Each project can include its description, role, skills, technologies, supporting evidence, results, case studies, and links to related projects.

The portfolio also supports curated public collections that highlight selected projects for a specific audience, such as a potential client, employer, or collaborator.

The initial MVP focuses on a bilingual, searchable project portfolio with curated public collections, using Astro's static generation capabilities and file-based content management.

## Goals

- Showcase projects across multiple disciplines in one place.
- Demonstrate skills through practical work rather than claims alone.
- Make projects easy to discover through search and filtering.
- Present technical decisions, personal contributions, and outcomes clearly.
- Create tailored project collections for different audiences.
- Support Arabic and English content.
- Keep content maintainable through version-controlled project files.

## Features

### Project Showcase

Each project can contain:

- Title and summary in Arabic and English.
- Project role and personal contribution.
- One or more project categories.
- Skills and technologies used.
- Project date and optional cover image.
- Links to source code, live demos, tests, and case studies.
- Results, metrics, or client feedback when available.
- Links to related projects.

### Search and Filtering

Explore projects using search and filters based on available metadata, including:

- Project type.
- Skills.
- Technologies.
- Evidence and supporting resources.

### Curated Project Collections

Create public collections containing selected projects for a particular purpose, such as:

- A job application.
- A client proposal.
- A specific technical specialization.
- A selection of relevant case studies.

Each collection has its own shareable URL and links to the full portfolio.

Collections define which projects are included, while project details are maintained in their original content files.

### Related Projects

Project pages can link to other relevant projects, making it easier to explore connected work, technologies, and areas of expertise.

### Bilingual Experience

The portfolio supports:

- Arabic (`ar`).
- English (`en`).
- Automatic language selection based on the visitor's browser preferences.
- Manual language switching.
- Right-to-left layout for Arabic and left-to-right layout for English.

### Content Management

Project content is maintained in files within the repository rather than through a separate administration dashboard.

This approach keeps content version-controlled, reviewable, and manageable alongside the source code.

## Technology Stack

| Technology | Purpose |
|---|---|
| [Astro](https://astro.build/) | Website framework |
| TypeScript | Type safety and maintainability |
| Astro Content Collections | Structured content and schema validation |
| JSON | Project and collection data |
| Markdown | Case studies and long-form project documentation |
| CSS | Responsive layouts and visual styling |
| Git and GitHub | Version control and source hosting |

The implementation may evolve as the project develops.

## Project Structure

The intended structure separates content, reusable components, page routing, and shared utilities.

```text
my-portfolio/
├── public/
│   ├── images/
│   │   └── projects/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── content.config.ts
│   ├── content/
│   │   ├── projects/
│   │   ├── collections/
│   │   └── case-studies/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── [lang]/
│   │   │   ├── index.astro
│   │   │   ├── projects/
│   │   │   └── case-studies/
│   │   └── share/
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

This structure describes the planned organization and may differ from the current repository until implementation is complete.

## Content Model

### Projects

Projects use stable identifiers that do not depend on translated titles. Each project can belong to multiple categories and reference related projects.

Example:

```json
{
  "title": {
    "ar": "عنوان المشروع",
    "en": "Project Title"
  },
  "summary": {
    "ar": "وصف مختصر للمشروع",
    "en": "A short project description"
  },
  "types": ["software", "ai"],
  "skills": ["system-design"],
  "technologies": ["TypeScript", "Astro"],
  "status": "draft",
  "featured": false,
  "date": "2026-08-15",
  "evidence": [],
  "outcomes": [],
  "relatedProjects": []
}
```

This is an illustrative example of the proposed content format, not a claim about an existing project entry.

### Collections

Collections reference project identifiers rather than duplicating project content. This keeps project details consistent across the full portfolio and shared collections.

### Case Studies

Case studies use Markdown to document project context, challenges, approaches, implementation details, testing, outcomes, and lessons learned.

## Architecture

The initial architecture favors a simple, statically generated website:

1. Project and collection files act as the source of truth.
2. Astro loads and validates structured content during the build.
3. Pages and public share pages are generated from that content.
4. Visitors browse the resulting website in their browsers.

The initial design does not require a database, a custom backend, or a multi-user content management system.

### Content Updates

Changes to project files become visible on the deployed website after the site is rebuilt and redeployed.

Public collection URLs remain associated with their configured project selections. The displayed project details reflect the latest successfully deployed content.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) — use a version compatible with the project's Astro dependencies.
- npm, or another package manager supported by the repository.
- Git.

### Installation

Clone the repository:

```bash
git clone https://github.com/abdelhak101/my-portfolio.git
cd my-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

These commands assume the corresponding scripts are defined in `package.json`.

## Adding or Updating a Project

1. Create or edit a project file in the projects content directory.
2. Provide the required metadata and localized text.
3. Add evidence links only when valid resources are available.
4. Add related project identifiers when relevant.
5. Create or update the case study if the project needs detailed documentation.
6. Add the project identifier to any relevant collections.
7. Run the build and resolve validation errors.
8. Commit and deploy the changes.

Project identifiers referenced by collections and related-project links should correspond to existing projects.

## Design Principles

- **Evidence over claims:** Prefer demonstrable work, source code, tests, and verifiable outcomes.
- **Clear attribution:** Distinguish personal contributions from team achievements.
- **Structured content:** Use consistent fields and validated schemas.
- **No fabricated results:** Include metrics, ratings, and outcomes only when supported.
- **Simple architecture:** Avoid introducing infrastructure that the portfolio does not need.
- **Bilingual by design:** Treat Arabic and English as first-class content languages.
- **Maintainability:** Keep project data easy to update, review, and version.

## Roadmap

The following items represent potential development work, not necessarily completed features.

- [ ] Establish the initial Astro project and content schemas.
- [ ] Build the bilingual portfolio layout and navigation.
- [ ] Implement project cards and individual project pages.
- [ ] Add search and filtering.
- [ ] Implement public, curated project collections.
- [ ] Add related-project navigation.
- [ ] Support Arabic RTL and English LTR layouts.
- [ ] Validate project and collection references during builds.
- [ ] Add responsive design and accessibility checks.
- [ ] Configure automated build checks and deployment.

## Contributing

This repository is primarily intended for a personal portfolio. Suggestions, bug reports, and technical feedback are welcome through GitHub Issues.

## License

No license has been specified yet. Unless a license is added to the repository, reuse and redistribution of the code remain subject to applicable copyright law.

---

**Repository:** [abdelhak101/my-portfolio](https://github.com/abdelhak101/my-portfolio)