# Usability Testing

## 1. Purpose

This document defines the usability testing approach for My Portfolio.

The goal is to evaluate whether visitors can understand the portfolio, discover relevant projects, inspect technical evidence, navigate curated project collections, and switch languages without unnecessary effort.

Usability testing evaluates the experience from the visitor's perspective. It complements, but does not replace:

- Functional testing.
- Accessibility testing.
- Responsive layout testing.
- Performance testing.
- SEO validation.

A page can work correctly and still be difficult to understand. Usability testing helps identify that gap.

## 2. Product Context

My Portfolio is a bilingual developer portfolio built with Astro.

It presents software projects, designs, UI/UX work, automations, and AI-related projects. Visitors should be able to explore projects, inspect relevant details, and evaluate the available evidence.

The portfolio supports:

- Arabic and English.
- Light and dark themes.
- Project search and filtering.
- Project detail pages and case studies where available.
- Public curated collections that link back to the full portfolio.

The initial implementation is intended to remain simple, static-first, and maintainable by one developer.

## 3. Usability Objectives

Testing should establish whether visitors can:

1. Understand what the portfolio offers.
2. Identify the kinds of work represented.
3. Find projects relevant to a particular skill, technology, or work type.
4. Understand an individual project's purpose and the developer's contribution.
5. Locate evidence supporting project claims.
6. Navigate a shared collection and discover the full portfolio.
7. Use Arabic and English versions successfully.
8. Switch themes without confusion.
9. Recover from empty search results or unavailable pages.
10. Use the interface comfortably on mobile and desktop.

The goal is not to prove that the design is good. The goal is to discover where real visitors struggle and improve those areas.

## 4. Testing Principles

### 4.1 Test Real Tasks

Ask participants to accomplish realistic goals rather than asking whether they like the interface.

Prefer:

"Find a project that demonstrates backend development and explain what evidence supports that conclusion."

Avoid:

"Do you like the project cards?"

### 4.2 Observe Before Explaining

Do not teach participants how to use the interface before observing their first attempt.

Record where they hesitate, what they misunderstand, and which actions they take.

### 4.3 Test the Actual Interface

Whenever possible, test the deployed or production-equivalent site with representative content.

A prototype may be used to test navigation or visual hierarchy before implementation, but findings from a prototype should not be treated as proof of production behavior.

### 4.4 Separate Preference from Usability

A participant may dislike a visual choice while still completing tasks successfully. Another participant may like the appearance while failing to find important information.

Record aesthetic preferences separately from observed usability problems.

### 4.5 Improve Incrementally

As a solo developer, prioritize issues that block important tasks or affect multiple visitors.

Do not attempt to optimize every small detail before the core user journeys work.

## 5. Target Participants

Recruit participants who represent the intended audiences rather than relying exclusively on other developers.

### 5.1 Recruiter or Hiring Manager

Likely goals:

- Understand the developer's capabilities.
- Find relevant projects quickly.
- Evaluate experience and contribution.
- Locate repositories, demos, or case studies.

### 5.2 Potential Client

Likely goals:

- Determine whether the developer can solve a relevant problem.
- Find comparable work.
- Understand the scope of previous projects.
- Locate evidence and a way to continue exploring the portfolio.

### 5.3 Technical Reviewer

Likely goals:

- Inspect implementation details.
- Understand technical decisions.
- Review code, tests, architecture, or measurable outcomes where available.

### 5.4 General Visitor

Likely goals:

- Understand the portfolio's purpose.
- Browse projects without needing specialist knowledge.
- Navigate between project summaries and detailed explanations.

### 5.5 Language and Device Coverage

Include participants who can comfortably evaluate the Arabic experience and the English experience.

Where feasible, include both desktop and mobile users.

Participants do not need to represent every category in every round. Early tests should focus on discovering significant usability issues, not producing statistically representative estimates.

## 6. Testing Methods

### 6.1 Moderated Usability Testing

A moderator asks a participant to complete tasks while observing their behavior.

Useful for:

- Discovering misunderstandings.
- Asking what the participant expected to happen.
- Investigating unexpected navigation choices.
- Understanding why an element was overlooked.

This is the preferred initial method for a small project because it produces actionable qualitative feedback.

### 6.2 Unmoderated Task Testing

Participants complete a defined set of tasks independently and report their outcomes.

Useful for:

- Checking whether previously identified problems have been resolved.
- Comparing task completion across revisions.
- Observing a broader set of visitors when recruitment permits.

Unmoderated results may provide less insight into why a problem occurred.

### 6.3 First-Impression Test

Show the homepage briefly, then ask participants to explain:

- What the site is about.
- Who the site appears to belong to.
- What kinds of work are available.
- What they would do next.

This tests whether the visual hierarchy and introductory content communicate the portfolio's purpose.

### 6.4 Expert Review

The developer reviews the site against established usability principles, such as:

- Visibility of system status.
- Match between interface language and user expectations.
- Consistency.
- Error prevention and recovery.
- Recognition rather than memorization.
- Clear navigation and interaction feedback.

Expert review is useful between participant sessions, but it must not be presented as a substitute for testing with actual users.

## 7. Core Test Scenarios

### Scenario 1: Understand the Portfolio

**Goal:** Determine whether visitors can understand the site without guidance.

**Task:**

"Explore this page briefly. Tell me what you think this portfolio contains and what you would use it for."

**Observe:**

- Whether the visitor understands the portfolio's purpose.
- Which content they notice first.
- Whether the available project categories are clear.
- Whether they can identify a sensible next action.

**Success condition:**

The visitor can describe the portfolio's purpose and identify a reasonable way to begin exploring.

### Scenario 2: Find a Relevant Project

**Goal:** Evaluate search and filtering.

**Task:**

"Find a project that demonstrates a particular technology or type of work."

Use a technology or project category that actually exists in the test dataset.

**Observe:**

- Whether the visitor notices search and filters.
- Whether filter labels are understandable.
- Whether the results match the intended criteria.
- Whether active filters are obvious.
- Whether the visitor can reset the search.

**Success condition:**

The visitor locates an appropriate project and can explain why it matches the request.

### Scenario 3: Evaluate a Project

**Goal:** Test whether a project detail page communicates useful information.

**Task:**

"Choose a project and determine what problem it addresses, what work the developer contributed, and what evidence is available."

**Observe:**

- Whether the summary explains the project's purpose.
- Whether role and contribution are easy to find.
- Whether technologies and technical details are understandable.
- Whether evidence can be located.
- Whether important claims appear unsupported or ambiguous.

**Success condition:**

The visitor can identify the project's purpose, the documented contribution, and the available evidence without significant confusion.

### Scenario 4: Find Technical Evidence

**Goal:** Evaluate the discoverability of repositories, demos, tests, and technical explanations.

**Task:**

"Find the strongest available evidence that helps you assess the technical quality of this project."

**Observe:**

- Whether relevant links are easy to identify.
- Whether link labels communicate their destinations.
- Whether the visitor can distinguish a live demo from a source repository.
- Whether tests, results, or limitations are documented when available.

**Success condition:**

The visitor locates relevant available evidence and understands what it can and cannot demonstrate.

Do not require participants to find evidence that the project does not actually contain.

### Scenario 5: Explore a Public Collection

**Goal:** Evaluate curated project sharing.

**Task:**

"Open this collection, explore the selected projects, and find a way to continue browsing the complete portfolio."

**Observe:**

- Whether the visitor understands that the page presents a curated subset.
- Whether the collection title and description communicate its purpose.
- Whether project links work as expected.
- Whether the full-portfolio link is discoverable.

**Success condition:**

The visitor understands the collection's scope and can navigate to the full portfolio.

### Scenario 6: Switch Language

**Goal:** Evaluate the language switcher and bilingual navigation.

**Task:**

"Switch the current page to the other available language and continue exploring."

**Observe:**

- Whether the switcher is easy to find.
- Whether the destination is the equivalent page where available.
- Whether text direction and layout update correctly.
- Whether the visitor understands the behavior when a translation is unavailable.

**Success condition:**

The visitor can change languages and continue navigating without losing orientation.

### Scenario 7: Change Theme

**Goal:** Evaluate the light and dark theme controls.

**Task:**

"Change the appearance to the other theme and continue reading the page."

**Observe:**

- Whether the control is identifiable.
- Whether the new theme is applied consistently.
- Whether text, borders, images, and controls remain readable.
- Whether the theme change causes distracting layout shifts.

**Success condition:**

The visitor switches themes successfully and can continue using the interface.

### Scenario 8: Recover from No Results

**Goal:** Test error prevention and recovery in project discovery.

**Task:**

"Search for a combination of criteria that produces no matching projects, then return to the full project list."

**Observe:**

- Whether the empty state explains what happened.
- Whether a reset or recovery action is easy to find.
- Whether the visitor can return to the complete project list.
- Whether the interface preserves or unexpectedly loses filter state.

**Success condition:**

The visitor understands that no projects match and successfully restores a useful listing.

### Scenario 9: Mobile Exploration

**Goal:** Evaluate the mobile experience.

**Task:**

"Using a mobile-sized viewport, find a relevant project, inspect its details, and return to the project list."

**Observe:**

- Whether navigation is discoverable.
- Whether search and filters are usable.
- Whether text and controls fit the screen.
- Whether technical content creates unwanted horizontal scrolling.
- Whether returning to the listing preserves context where expected.

**Success condition:**

The visitor completes the task without a blocking layout or interaction problem.

## 8. Test Session Procedure

### 8.1 Preparation

Before each session:

1. Select a representative build.
2. Confirm that all task-related projects and links are available.
3. Prepare the task scenarios.
4. Decide which observations will be recorded.
5. Obtain consent before recording audio, video, or screen activity.
6. Explain that the interface is being tested, not the participant.

Do not use private or confidential project information in test content.

### 8.2 Introduction

Explain that the participant should act as naturally as possible.

Ask them to describe their expectations and actions when comfortable, without forcing continuous narration if that interferes with task completion.

Do not explain the navigation or point out controls before the relevant tasks.

### 8.3 During the Session

For each task:

- Read the task as written.
- Allow the participant to explore independently.
- Record completion and observable difficulties.
- Ask neutral follow-up questions when appropriate.
- Avoid suggesting the correct answer.
- Record unexpected behavior without immediately interpreting its cause.

Useful neutral prompts include:

- "What are you looking for now?"
- "What did you expect that control to do?"
- "What would you try next?"
- "Was anything unclear?"

### 8.4 Closing Questions

Ask:

- What was easiest to do?
- What was hardest to understand?
- Was any important information difficult to find?
- Was anything unexpected?
- What would you change first?

Treat answers as qualitative feedback rather than direct measurements of usability.

## 9. Metrics

Measure a small number of meaningful indicators.

### 9.1 Task Completion Rate

\[
\text{Completion Rate} =
\frac{\text{Successfully Completed Tasks}}
{\text{Total Attempted Tasks}} \times 100
\]

Define success before testing. A task completed only after substantial moderator assistance should not be counted as an unassisted success.

### 9.2 Time on Task

Record the time needed to complete each task.

Use this metric to compare similar tasks across iterations, not to assume that faster is always better. Reading complex technical content may reasonably take longer.

### 9.3 Error Rate

Record errors such as:

- Selecting an irrelevant project.
- Applying an unintended filter.
- Opening the wrong destination.
- Losing navigation context.
- Failing to recover from an empty result state.

Define the relevant error categories before comparing rounds.

### 9.4 Assistance Required

Record whether the participant:

- Completed the task independently.
- Needed a neutral clarification.
- Needed a hint about the interface.
- Could not complete the task.

This provides more useful context than completion alone.

### 9.5 Observed Usability Issues

Record each issue with:

- A concise description.
- The affected task or page.
- The observed evidence.
- The likely impact.
- The frequency observed.
- A proposed change.
- The result of retesting.

Do not confuse the number of comments with the severity of a problem.

### 9.6 Optional Satisfaction Measure

After a task, participants may rate its difficulty on a simple five-point scale.

Use the same wording and scale across sessions.

Treat the result as supporting evidence, not as a statistically reliable measure from a very small sample.

## 10. Initial Success Criteria

The following are proposed internal targets for early evaluation, not industry benchmarks or confirmed product requirements.

| Measure | Initial target |
|---|---|
| Core task completion | At least 80% across tested attempts |
| Critical navigation blockers | Zero unresolved |
| Core tasks requiring moderator hints | Reduce across iterations |
| Search/filter recovery | Participants can restore the listing without assistance |
| Language switching | Participants can switch and continue navigating |
| Theme switching | Participants can switch themes without losing usability |
| Mobile core journey | No blocking layout or interaction failures |
| Project evidence discovery | Participants can locate the available evidence |

Interpret results alongside participant characteristics, task difficulty, and qualitative observations.

A small study cannot establish statistical representativeness. Use the targets to guide improvement rather than to make broad claims about all visitors.

## 11. Severity and Prioritization

Classify findings using the following internal severity model.

### Critical

A core task cannot be completed, essential content is inaccessible, or a major interaction blocks use.

**Action:** Fix before release when the issue affects a core user journey.

### High

A core task is possible but substantially confusing, error-prone, or difficult.

**Action:** Prioritize for the next iteration.

### Medium

A problem causes avoidable hesitation or extra effort but has a workable alternative.

**Action:** Fix when practical, especially if repeated across participants.

### Low

A minor inconsistency or preference with limited impact on task completion.

**Action:** Record and address only when the benefit justifies the effort.

Severity should reflect impact, not merely how visually noticeable the issue is.

## 12. Findings and Remediation Workflow

For every meaningful issue:

1. Describe the observed behavior.
2. Separate observation from interpretation.
3. Identify the affected requirement or user flow.
4. Assign a severity level.
5. Propose a change.
6. Implement the change.
7. Retest the affected task.
8. Record whether the problem was resolved, reduced, or remains open.

Example:

**Observation:** Participants overlook the repository link on a project detail page.

**Possible interpretation:** The link's label or visual hierarchy does not communicate its importance.

**Potential improvement:** Use a clearer destination label and adjust its placement.

**Validation:** Repeat the task with new or returning participants and check whether the repository is found more reliably.

Do not assume that the first proposed solution is correct without checking the result.

## 13. Testing Frequency

For a solo developer, use lightweight testing at meaningful milestones.

### Before the Initial Release

- Test the homepage and navigation.
- Test project discovery.
- Test a project detail page.
- Test language and theme switching.
- Test one public collection.
- Test at least one narrow mobile viewport.

### After Major Changes

Repeat affected tasks when changes modify:

- Information architecture.
- Search or filtering.
- Project card design.
- Project detail structure.
- Mobile navigation.
- Language switching.
- Theme behavior.

### Periodic Review

Revisit the main user journeys when the project catalogue, audience, or content structure changes significantly.

There is no need to schedule an expensive formal study after every minor CSS change.

## 14. Practical First-Round Plan

A lightweight first round can use approximately **3–5 participants** as an exploratory starting point, provided the findings are interpreted cautiously.

Suggested procedure:

1. Recruit a mix of technically oriented and non-technical visitors.
2. Include both desktop and mobile exposure where practical.
3. Give each participant four or five representative tasks.
4. Observe independently before asking follow-up questions.
5. Group recurring problems by page or user journey.
6. Fix the highest-impact issues.
7. Run a focused follow-up round.

This sample is intended to uncover common usability problems early. It does not guarantee that all issues will be discovered, and it is not a statistically representative sample.

## 15. Test Records

For each session, record:

- Test date.
- Build or version tested.
- Participant code, without unnecessary identifying information.
- Language used.
- Viewport or device category.
- Task identifier.
- Completion outcome.
- Time on task, if collected.
- Assistance required.
- Observed errors.
- Participant comments.
- Follow-up action.

Obtain appropriate consent before recording sessions. Retain only information needed for product improvement.

## 16. Usability Testing Checklist

### Preparation

- [ ] Test tasks reflect real visitor goals.
- [ ] The test content represents the actual portfolio.
- [ ] Relevant links and projects are available.
- [ ] Recording consent is obtained when applicable.

### Execution

- [ ] Participants are not taught the interface before the task.
- [ ] Observations are recorded separately from interpretations.
- [ ] The moderator avoids leading questions.
- [ ] Failures and unexpected actions are recorded.

### Evaluation

- [ ] Task success is defined consistently.
- [ ] Completion and assistance are tracked.
- [ ] Findings are prioritized by impact.
- [ ] Proposed changes are linked to observed evidence.

### Follow-up

- [ ] High-impact issues are addressed.
- [ ] Affected tasks are retested.
- [ ] Remaining issues are documented.
- [ ] Results are compared cautiously across rounds.

## 17. Open Decisions

The following remain open:

1. Whether testing will be remote, in person, or both.
2. Which participant groups are most important for the initial release.
3. Whether a formal satisfaction questionnaire is necessary.
4. Which core tasks will be release-blocking.
5. Whether usability testing will be part of a recurring release checklist.
6. Where test records and findings will be stored in the repository.

These decisions should be made according to the project's actual audience and available time.

## 18. Definition of Done

A usability testing cycle is complete when:

- Representative tasks have been attempted by relevant participants or through a clearly documented expert review.
- Observed issues have been recorded.
- Significant problems have been prioritized.
- High-impact issues have been addressed or explicitly accepted as known limitations.
- Changes affecting core tasks have been retested.
- Findings and remaining uncertainties have been documented.

The purpose of usability testing is continuous improvement: helping visitors find, understand, and evaluate the work presented in My Portfolio with as little unnecessary friction as possible.
