# Content Guidelines

## 1. Purpose

This document defines how portfolio content should be written, structured, maintained, and reviewed before publication.

The goals are to:

- Present projects clearly to recruiters, clients, and technical reviewers.
- Demonstrate skills through evidence rather than unsupported claims.
- Maintain consistent content quality across projects and languages.
- Support search, filtering, related projects, and public collections.
- Keep content maintainable through repository files and version control.
- Avoid publishing confidential, misleading, or unverifiable information.

These guidelines describe content expectations. They do not replace the technical content schemas or validation rules implemented in Astro.

## 2. Core Principles

### 2.1 Evidence over claims

Prefer concrete evidence over broad statements.

Avoid:
- "Built a highly scalable application."
- "Improved performance significantly."
- "Expert in AI and cloud technologies."

Prefer statements supported by implementation details, measurements, tests, demonstrations, or documented outcomes.

When evidence is unavailable, describe the work accurately without inventing results.

### 2.2 Clarity over complexity

- Explain the problem before describing the solution.
- Use direct language and short paragraphs.
- Explain specialized terminology when the intended audience may not know it.
- Include technical depth when it helps readers evaluate the work.
- Avoid unnecessary buzzwords and exaggerated marketing language.

### 2.3 Accuracy and transparency

Clearly distinguish between:
- Completed work.
- Work in progress.
- Planned features.
- Personal contributions.
- Team contributions.
- Measured results.
- Estimates or qualitative observations.

Never imply that a planned feature was implemented or that a team achievement was solely an individual achievement.

### 2.4 Consistency without forcing uniformity

Projects should follow a common structure, but optional sections should appear only when relevant. A design project, an automation, and a backend system may require different kinds of evidence.

## 3. Audience and Writing Style

The portfolio serves three primary audiences.

| Audience | Primary question | Content emphasis |
|---|---|---|
| Recruiters and hiring managers | What can this developer do? | Role, skills, outcomes, and project relevance |
| Potential clients | Can this developer solve my problem? | Problem, solution, delivery, and practical value |
| Technical reviewers | How was this built, and how good is the implementation? | Architecture, decisions, technologies, tests, and trade-offs |

Write for a technically informed but not necessarily specialist reader.

### Tone

Use a professional, direct, factual, and confident tone.

Avoid:
- Inflated claims.
- Unexplained acronyms.
- Long introductions that delay the main point.
- Generic descriptions that could apply to any project.
- Repeated keyword lists inserted only for search visibility.

Use first person when clarifying personal contributions, such as "I designed the API" or "I implemented the deployment pipeline."

## 4. Project Content Structure

A project may use the following sections, depending on the nature and maturity of the work.

### 4.1 Core project information

| Field | Guideline |
|---|---|
| Title | Specific, concise, and recognizable |
| Slug or ID | Stable identifier used for references and URLs |
| Summary | One or two sentences explaining the project and its purpose |
| Project types | One or more accurate categories |
| Role | Actual responsibility and contribution |
| Date | Relevant development, release, or completion period |
| Technologies | Technologies materially used in the project |
| Skills | Skills demonstrated by the work |
| Thumbnail or cover | Representative, appropriately licensed visual |
| Visibility or publication status | Must follow the implemented content model |

The exact required fields are subject to the final content schema. Do not treat every field in this table as a confirmed technical requirement.

### 4.2 Recommended narrative sections

#### Overview

Explain what the project is, who it serves, and why it exists.

A reader should understand its purpose without needing to inspect the source code.

#### Problem

Describe the original need, limitation, or opportunity.

Include context only when it helps explain why the work mattered. Do not invent a client problem or imply that a personal experiment had real users when it did not.

#### Solution

Explain what was built and how it addresses the problem.

Focus on the meaningful functionality and the reasoning behind the approach rather than listing every implementation detail.

#### My role

State which parts you personally designed, implemented, tested, deployed, or maintained.

For collaborative projects, identify the boundary between individual and team contributions whenever possible.

#### Technical implementation

Explain the most important engineering choices, such as:
- Architecture and component boundaries.
- Data models and storage.
- APIs and integrations.
- Authentication and authorization, where relevant.
- Performance and reliability considerations.
- Deployment and infrastructure.
- Security and privacy considerations.

Include only the topics that materially apply to the project.

#### Challenges and decisions

Describe meaningful technical or product challenges.

For each important decision, explain:
1. The problem or constraint.
2. The alternatives considered, if known.
3. The selected approach.
4. The reason for selecting it.
5. Any trade-offs or limitations.

Do not invent alternatives or retrospective reasoning that was never part of the project.

#### Testing and quality

Describe the verification actually performed, such as:
- Unit or integration tests.
- End-to-end tests.
- Manual testing.
- Accessibility checks.
- Performance measurements.
- Error handling or reliability checks.

Distinguish between tests that exist in the repository and tests that were manually performed.

#### Results and impact

Report outcomes only when supported by available evidence.

Useful evidence may include:
- Measured performance changes.
- Completed deliverables.
- Demonstrable functionality.
- Usage statistics, when legitimately available.
- Client feedback or ratings, when permission exists.
- Before-and-after comparisons with a documented measurement method.

If results were not measured, state the delivered outcome without manufacturing numerical improvements.

#### Limitations and future work

Mention important constraints, unfinished functionality, or known limitations when they materially affect how the project should be evaluated.

Planned improvements must not be presented as completed features.

## 5. Evidence and Links

Each project should provide the strongest available evidence for its claims.

Possible evidence includes:
- Source repository.
- Live demo.
- Case study.
- Screenshots or recordings.
- Technical documentation.
- Tests or test reports.
- Architecture diagrams.
- Performance reports.
- Client feedback, where authorized.

### Evidence rules

- Every link must point to the intended resource.
- Clearly distinguish a live demo from a source repository.
- Do not link to private repositories or restricted resources as though they were publicly accessible.
- Verify external links before publishing.
- Explain when a demo requires authentication, has limited functionality, or is no longer available.
- Never fabricate client ratings, testimonials, metrics, downloads, or user counts.
- Do not publish credentials, access tokens, private endpoints, or confidential source code.

If a project has no public demo, a repository, screenshots, or a technical explanation may still provide useful evidence.

## 6. Project Types, Skills, and Technologies

### 6.1 Project types

A project may belong to multiple types when each category accurately describes the work.

Examples include:
- Web Application
- Backend System
- API
- Automation
- AI Project
- UI/UX Design
- Developer Tool
- Data Platform

These are illustrative examples, not a finalized category taxonomy.

Assign categories based on the project's actual purpose and implementation, not on technologies mentioned incidentally.

### 6.2 Technologies

Include technologies that played a meaningful role in implementation.

For example, do not list Docker merely because a sample configuration exists if Docker was not meaningfully used in the project.

Use consistent names and capitalization. Avoid treating related but distinct technologies as interchangeable.

### 6.3 Skills

Skills should describe demonstrated capabilities, not merely interests.

Examples:
- API Design
- Data Modeling
- System Architecture
- Automated Testing
- Performance Optimization
- Interface Design

A skill can be associated with multiple projects. Keep the underlying skill name consistent to make filtering reliable.

### 6.4 Taxonomy maintenance

Before introducing a new category, technology label, or skill:
1. Check whether an existing label already represents the concept.
2. Prefer the established canonical name.
3. Add a new label only when it improves meaningful classification.
4. Review its relevance to search and filtering.

The final taxonomy and any controlled vocabulary remain implementation decisions.

## 7. Arabic and English Content

The portfolio supports Arabic and English.

### Writing rules

- Write each language naturally rather than translating word for word.
- Preserve the technical meaning across both versions.
- Keep project facts, dates, links, metrics, and responsibilities consistent.
- Use established technical terminology in each language.
- Keep product names, programming languages, libraries, and technology names unchanged where appropriate.
- Review Arabic text for readability, punctuation, and right-to-left presentation.
- Review English text for grammar, clarity, and natural phrasing.

### Translation completeness

Do not assume that the presence of one language means the other version is complete.

Before publishing a translation, verify that it contains the same essential information and does not introduce claims absent from the original.

The following policies remain open until explicitly decided:
- Whether both languages are required for every published project.
- What visitors see when a translation is missing.
- Whether translation completeness is enforced during the build.

## 8. Search and Filtering Quality

Content must support meaningful discovery.

- Use descriptive project titles and summaries.
- Apply project types, technologies, and skills consistently.
- Include relevant terminology naturally in project descriptions.
- Avoid keyword stuffing.
- Do not duplicate hidden keyword lists in content.
- Ensure labels represent the actual project.
- Keep project identifiers stable so collections and related-project references remain valid.

The exact searchable fields and filter-combination behavior must be defined in the search and filtering specifications.

## 9. Related Projects

Related projects are configured using project identifiers and resolved from canonical project data.

Guidelines:
- Link only to projects that have a meaningful relationship.
- Explain the relationship through context where useful.
- Do not duplicate another project's title, summary, or technical details as a separate source of truth.
- Do not reference the current project as its own related project.
- Verify that referenced project identifiers exist.
- Treat relationships as directional unless reciprocal relationships are explicitly configured.

Examples of meaningful relationships include a shared technical problem, a continuation of earlier work, a related implementation, or complementary skills.

Automatic similarity-based recommendations are outside the initial content requirements.

## 10. Public Collections and Shared Pages

Public collections present a curated subset of projects for a particular audience or purpose.

Collection content should:
- Have a clear title and purpose.
- Contain only projects appropriate for public visibility.
- Use valid project identifiers.
- Avoid misleading claims about the included work.
- Remain understandable when viewed independently of the full portfolio.
- Provide a clear path to explore the complete portfolio.

Collection membership is based on configured project identifiers. Project details are resolved from their canonical content rather than copied into the collection.

A collection should reflect updated project content after the relevant successful build and deployment. It is not a runtime content-management system.

Do not assume that a public collection URL is secret or access-controlled. Publicly available links should be treated as accessible to anyone who obtains them.

## 11. Privacy, Confidentiality, and Intellectual Property

Before publishing a project, verify that its content can legally and ethically be shared.

Never publish without authorization:
- Client confidential information.
- Personal information about users or customers.
- API keys, passwords, tokens, or private certificates.
- Proprietary code or internal documentation.
- Private analytics or business metrics.
- Screenshots containing sensitive information.
- Third-party assets without appropriate usage rights.

For client or employer work:
- Describe your contribution accurately.
- Respect contractual confidentiality.
- Obtain permission before publishing restricted material.
- Use sanitized examples or high-level explanations when full disclosure is not permitted.
- Do not imply ownership of work created by others.

A project being technically accessible does not automatically mean it is authorized for publication.

## 12. SEO and Metadata

Content should be useful to people first and understandable to search engines second.

- Use a unique, descriptive page title.
- Write a concise summary that accurately describes the project.
- Use a clear heading hierarchy.
- Provide meaningful alternative text for informative images.
- Use empty alternative text for purely decorative images where appropriate.
- Keep language metadata consistent with the displayed language.
- Avoid duplicate descriptions across unrelated projects.
- Ensure canonical URLs and localized metadata follow the finalized routing strategy.
- Do not promise search-engine indexing for pages that are configured not to be indexed.

The exact metadata fields and localized URL strategy should be defined in the SEO and routing specifications.

## 13. Image and Media Guidelines

Use media that helps readers understand the project.

- Prefer actual product screenshots, diagrams, interface designs, or representative demonstrations.
- Crop images consistently when they serve the same visual purpose.
- Avoid decorative imagery that misrepresents the project.
- Optimize file size and dimensions for the intended display.
- Use descriptive filenames where practical.
- Provide appropriate alternative text.
- Confirm usage rights for third-party media.
- Remove secrets, personal data, and confidential information from screenshots.
- Avoid presenting mockups as real production screenshots without labeling them.

If no suitable image exists, use an intentional fallback rather than a misleading placeholder.

## 14. Content Lifecycle

Content is maintained in repository files and published through the project's build and deployment workflow.

### Before adding a project

1. Create a stable, unique identifier.
2. Prepare the available language versions.
3. Write a factual summary.
4. Assign accurate project types, skills, and technologies.
5. Add only links and evidence that are ready to share.
6. Include relevant technical details and verified outcomes.
7. Configure related-project references where appropriate.
8. Check privacy, confidentiality, and publication rights.

### Before publishing changes

1. Validate the content against the implemented schema.
2. Check references to other projects.
3. Check required fields and internal consistency.
4. Verify links and media.
5. Review spelling, readability, and translation consistency.
6. Run the project's available validation and build commands.
7. Review the rendered pages in both languages and themes where relevant.
8. Confirm that no private information has been included.

The exact commands and automated checks belong in the repository's implementation documentation.

### Updating an existing project

- Preserve its stable identifier when updating the same project.
- Update the canonical project content instead of duplicating it.
- Recheck related-project and collection references when identifiers change.
- Update both languages when facts or explanations change.
- Revalidate links, screenshots, metrics, and claims.
- Confirm that the deployed build reflects the intended changes.

## 15. Content Quality Checklist

Use this checklist before publishing a project.

- [ ] The title and summary explain what the project is.
- [ ] The problem and solution are understandable.
- [ ] My role and contributions are accurately represented.
- [ ] Project types, skills, and technologies are relevant.
- [ ] Technical claims are accurate and appropriately scoped.
- [ ] Results and metrics have supporting evidence.
- [ ] Tests and verification activities are described truthfully.
- [ ] Links and media work as intended.
- [ ] Related-project references are valid.
- [ ] Arabic and English versions are consistent where both exist.
- [ ] Search and filtering metadata is meaningful.
- [ ] No confidential information or unauthorized material is exposed.
- [ ] The content passes schema validation and the production build.
- [ ] The rendered page is readable on mobile and desktop.
- [ ] Images, metadata, and accessibility information are appropriate.

## 16. Open Decisions

The following items must be decided or documented elsewhere before they become mandatory content rules:

1. Minimum fields required to publish a project.
2. Whether both Arabic and English versions are mandatory.
3. Behavior when a translation is missing.
4. Final project-type taxonomy and controlled vocabularies.
5. Exact fields indexed by search.
6. Whether projects need an explicit draft or publication status.
7. Whether any collection-level description or metadata is mandatory.
8. Automated validation rules for links, media, and cross-project references.
9. Whether build failures caused by content errors block deployment.
10. Required metadata for SEO and localized routes.

Until these decisions are accepted, treat the relevant recommendations as guidelines rather than finalized system constraints.

## 17. Guiding Rule

Every published project should help a reader understand **what was built, why it mattered, what I personally contributed, how it was implemented, and what evidence supports the claims**.

When information is unavailable, be transparent. A concise, honest project description is more valuable than a comprehensive description filled with unsupported claims.
