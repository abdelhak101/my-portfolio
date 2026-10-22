# User Flows — My Portfolio

## 1. Purpose

This document describes how visitors discover, explore, and share projects through the portfolio, as well as how the owner manages portfolio content through the repository.

The flows are intended to guide information architecture, page design, implementation, and acceptance testing.

## 2. Scope

The flows cover:

- Discovering the portfolio.
- Browsing and searching projects.
- Filtering projects by type, technology, skill, and available evidence.
- Viewing project details and supporting evidence.
- Reading an available case study.
- Exploring related projects.
- Opening and navigating public project collections.
- Switching between Arabic and English.
- Publishing content through the repository and deployment process.

Authentication, private collections, a CMS, comments, CRM features, and runtime content editing are outside the current scope.

## 3. Actors

| Actor | Description |
|---|---|
| Visitor | A person exploring the portfolio for professional or technical purposes. |
| Recruiter or Hiring Manager | A visitor evaluating skills, experience, and evidence of work. |
| Potential Client | A visitor assessing whether the owner's experience fits a project or business need. |
| Technical Reviewer | A visitor examining implementation details, architecture, tests, and technical decisions. |
| Portfolio Owner | The developer who edits content files, validates changes, and publishes updates. |

A visitor may belong to more than one audience.

## 4. Flow 1 — Discover the Portfolio

**Goal:** Understand the portfolio's purpose and quickly access relevant work.

### Preconditions

- The portfolio has been successfully built and deployed.
- The visitor opens the portfolio's main URL.

### Main flow

1. The visitor opens the portfolio.
2. The system displays the portfolio's main landing page.
3. The visitor sees a concise introduction and available navigation options.
4. The visitor chooses to browse all projects or open a relevant collection.
5. The system navigates to the selected destination.
6. The visitor continues exploring projects.

### Alternative flows

- If the visitor opens a project directly, the system displays that project's page.
- If the visitor opens a public collection directly, the system displays the collection and its selected projects.
- If a requested page does not exist, the system displays an appropriate not-found page with a route back to the portfolio.

### Expected outcome

The visitor can reach the project catalogue or a relevant collection without unnecessary navigation.

## 5. Flow 2 — Browse and Filter Projects

**Goal:** Find projects relevant to the visitor's interests or evaluation criteria.

### Preconditions

- Published projects are available in the portfolio catalogue.

### Main flow

1. The visitor opens the project catalogue.
2. The system displays published projects as a browsable list or grid.
3. The visitor optionally enters a search query.
4. The visitor optionally selects one or more filters:
   - Project type.
   - Technology.
   - Skill.
   - Evidence type, if included in the implemented MVP.
5. The system updates the displayed results to match the search and selected filters.
6. The visitor reviews the matching projects.
7. The visitor opens a project to inspect its details.

### Alternative flows

- If no projects match, the system displays a clear empty state.
- The visitor removes individual filters or clears all filters to broaden the results.
- If the search query is empty and no filters are selected, the system displays the full published catalogue.
- If a project belongs to multiple types, it can appear under each applicable type.

### Expected outcome

The visitor can narrow the catalogue and open a relevant project.

### Business rules

- Only published projects appear in public results.
- Search and filters operate on the available published project data.
- Applying multiple filters must follow a consistent, documented matching rule.
- The initial implementation is expected to use browser-side search and filtering, subject to catalogue size and performance testing.

## 6. Flow 3 — Inspect a Project

**Goal:** Understand what a project does, what the owner contributed, and what evidence supports the description.

### Preconditions

- The project exists and is published.

### Main flow

1. The visitor opens a project from the catalogue, a collection, a related-project link, or a direct URL.
2. The system displays the project's title and summary.
3. The system displays the available project information, such as:
   - Project type or types.
   - Owner's role and contribution.
   - Skills and technologies.
   - Relevant date or period.
   - Available evidence links.
   - Outcomes or client ratings, when available.
4. The visitor opens a GitHub repository, live demo, test report, or other available evidence.
5. The visitor returns to the project page or continues to another portfolio destination.
6. If a case study is available, the visitor may open it.
7. If related projects are available, the visitor may open one of them.

### Alternative flows

- If no demo or repository exists, the system omits the unavailable link rather than displaying a broken or fabricated link.
- If no outcome or client rating is available, the system omits that information.
- If no case study exists, the project remains accessible without one.
- If the visitor opens an invalid project ID, the system displays a not-found page.

### Expected outcome

The visitor can understand the project's purpose, the owner's contribution, and the available supporting evidence.

### Business rules

- Project IDs remain stable even when titles or translations change.
- The system must distinguish the owner's contribution from work completed by a team.
- Optional evidence and outcomes must not be invented or implied when unavailable.
- Only information approved for public disclosure may be published.

## 7. Flow 4 — Read a Case Study

**Goal:** Examine the reasoning, decisions, implementation, and results behind a project.

### Preconditions

- The project has at least one published case study.

### Main flow

1. The visitor opens the project page.
2. The visitor selects the case-study link.
3. The system displays the case study associated with that project.
4. The visitor reads the relevant sections, which may include:
   - Context and problem.
   - Goals and requirements.
   - Constraints.
   - Considered alternatives.
   - Architecture and design decisions.
   - Implementation.
   - Testing and validation.
   - Results and limitations.
   - Lessons learned.
5. The visitor follows relevant evidence links or returns to the project page.

### Alternative flows

- If the project has no case study, no case-study link is shown.
- If a case study exists in only one language, the system identifies the language that is actually available and provides a clear way to navigate to the available version.
- If the requested case study does not exist, the system displays an appropriate not-found page.

### Expected outcome

The visitor can examine the deeper technical and decision-making context without requiring every project to have a case study.

### Business rules

- A case study is optional.
- A case study is distinct from the project's short, structured description.
- Case-study content should reference the project rather than duplicate its core metadata unnecessarily.
- The system must not imply that an unavailable translation exists.

## 8. Flow 5 — Explore Related Projects

**Goal:** Move between projects that are relevant to one another.

### Preconditions

- The current project references one or more related projects.

### Main flow

1. The visitor opens a project page.
2. The system displays its configured related projects.
3. The visitor selects a related project.
4. The system opens that project's page.
5. The visitor may continue exploring further related projects.

### Alternative flows

- If no related projects are configured, the related-project section is omitted.
- If a related project is unpublished or unavailable, it must not be exposed as a broken public link.
- If a referenced project ID is invalid, content validation should report the problem before publication.

### Expected outcome

The visitor can discover additional relevant work through manually configured relationships.

### Business rules

- Related-project references use stable project IDs.
- Relationships are directional by default: if Project A references Project B, Project B does not automatically reference Project A.
- Related-project details are resolved from the original project content rather than duplicated.
- A project cannot reference itself.

## 9. Flow 6 — Open a Public Project Collection

**Goal:** Review a curated selection of projects suited to a particular audience or topic.

### Preconditions

- A public collection has been defined and published.
- Its referenced projects are valid and eligible for publication.

### Main flow

1. The visitor opens a collection URL.
2. The system displays the collection's title and description in the selected language.
3. The system displays the projects included in the collection.
4. The visitor opens one or more projects.
5. The visitor uses the link to the full portfolio when they want to explore beyond the curated selection.

### Alternative flows

- If a collection contains no eligible projects, the system displays an appropriate empty state or prevents the empty collection from being published, according to the final validation policy.
- If the collection URL is invalid, the system displays a not-found page.
- If a referenced project is missing, unpublished, or otherwise invalid, build validation should identify the issue and prevent broken public references.

### Expected outcome

A recruiter, client, or other recipient can review a focused set of projects and then explore the complete portfolio.

### Business rules

- Collection membership is defined by project IDs.
- Collection URLs are public and do not require authentication.
- A collection's membership remains fixed until its definition is edited.
- Project metadata changes become visible after the updated content is successfully built and deployed.
- A collection must not expose confidential or unpublished project information.

## 10. Flow 7 — Select the Interface Language

**Goal:** Read the portfolio in Arabic or English.

### Main flow

1. The visitor opens a portfolio page or a public collection.
2. The system determines the initial language using the browser's language preferences, subject to the final language-precedence policy.
3. The system displays the available content in the selected language.
4. The visitor uses the language switcher to select Arabic or English.
5. The system displays the equivalent destination in the selected language when available.
6. The system applies the correct text direction and layout for the language.

### Alternative flows

- If the browser language is neither Arabic nor English, the system uses the defined default language.
- If a case study is unavailable in the selected language, the system clearly identifies the available language and provides access to it.
- If an equivalent page cannot be resolved, the system navigates to a suitable fallback destination rather than constructing an invalid URL.

### Expected outcome

The visitor can navigate between Arabic and English without losing the context of the portfolio unnecessarily.

### Business rules

- Arabic uses right-to-left direction.
- English uses left-to-right direction.
- Project content and interface language must be handled consistently.
- The public collection URL is language-neutral.
- Manual language switching is supported.
- Whether a manually selected language persists across visits, and how that preference interacts with browser language detection, remains to be finalized.

## 11. Flow 8 — Edit and Publish Portfolio Content

**Goal:** Add or update public portfolio content without a CMS or runtime administration interface.

### Preconditions

- The portfolio repository is available to the owner.
- The owner can edit content files and run the project's validation and build commands.

### Main flow

1. The owner opens the repository locally.
2. The owner adds or edits a project content file, case study, or collection definition.
3. The owner updates references when project IDs or collection membership change.
4. The owner runs the project's validation checks.
5. The system reports schema errors, missing references, invalid required fields, or other detected content issues.
6. The owner corrects any reported errors.
7. The owner runs a production build.
8. If the build succeeds, the owner commits and pushes the changes through the chosen version-control workflow.
9. The deployment platform publishes the new build.
10. The owner verifies the affected public pages and links.

### Alternative flows

- If validation fails, the owner corrects the content before proceeding.
- If the production build fails, the owner investigates and resolves the issue before deployment.
- If deployment fails, the owner follows the deployment platform's recovery process.
- If an update removes or changes a project ID, validation identifies affected collection and related-project references.

### Expected outcome

Valid content changes become public after a successful build and deployment.

### Business rules

- Project content is managed through repository files.
- There is no CMS or database in the initial architecture.
- Content changes are not visible to public visitors until the updated site is deployed.
- Stable IDs should not change merely because a title or translation changes.
- Public content must be reviewed for confidentiality and accuracy before deployment.

## 12. Flow 9 — Handle Invalid or Unavailable Content

**Goal:** Prevent broken navigation and misleading information.

### Main flow

1. A visitor requests a page or link.
2. The system determines whether the requested public resource exists and is available.
3. If it is available, the system displays it.
4. If it is unavailable, the system displays an appropriate fallback or not-found page.
5. Where practical, the visitor can return to the project catalogue or portfolio homepage.

### Content-validation responsibilities

Before publication, validation should detect:

- Missing required project fields.
- Duplicate project IDs.
- Invalid collection references.
- Invalid related-project references.
- Self-referencing related projects.
- Missing required language fields, according to the final translation policy.
- Invalid or missing content referenced by a published page.

### Expected outcome

Visitors are not directed to broken public pages, and content errors are detected as early as practical.

## 13. Flow Priority

| Flow | Priority | Rationale |
|---|---|---|
| Discover the portfolio | P0 | Main entry point |
| Browse and filter projects | P0 | Core discovery capability |
| Inspect a project | P0 | Primary portfolio value |
| Select the interface language | P0 | Required bilingual experience |
| Open a public project collection | P0 | Core sharing capability |
| Edit and publish content | P0 | Required publishing workflow |
| Read a case study | P1 | Deeper technical evidence |
| Explore related projects | P1 | Additional discovery |
| Handle invalid or unavailable content | P0 | Reliability and content integrity |

## 14. Open Decisions

The following decisions must be resolved before the corresponding implementation details are finalized:

1. **Translation requirements:** Must a published project have complete Arabic and English core content, or may missing translations use a fallback?
2. **Language precedence:** Should a manually selected language persist and take precedence over browser language on future visits?
3. **Default language:** Which language should be used when the browser preference is neither Arabic nor English?
4. **Case-study routing:** Should case studies use separate URLs or appear as sections of project pages?
5. **Collection validation:** Should an invalid collection prevent the entire build, or should validation block only the affected collection?
6. **Filter semantics:** When multiple filters are selected, should values within a filter use OR logic and different filter groups use AND logic?
7. **Collection membership:** Should unpublished or missing projects block publication of the collection, or be excluded automatically with a validation warning?
8. **URL structure and hosting:** The final routes and deployment platform have not yet been confirmed.

## 15. Acceptance-Test Guidance

Each main flow should eventually have acceptance tests that verify:

- The visitor can complete the flow using the public interface.
- Only published and eligible content is shown.
- Search, filters, and navigation produce consistent results.
- Arabic and English pages use the correct text direction.
- Missing optional information does not produce empty or misleading interface elements.
- Invalid references are detected during validation.
- Public collections contain only their intended eligible projects.
- Content updates appear after a successful deployment.
- Invalid URLs result in a usable not-found experience.

This document describes intended behavior. It does not imply that every flow has already been implemented.