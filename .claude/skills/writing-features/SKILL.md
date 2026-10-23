---
name: writing-features
description: Use this skill to create a comprehensive Feature Specification based on the project template. It defines WHAT to build, requirements, and a high-level implementation checklist, but NOT the exact code changes yet.
---

# Writing Features (Feature Specification)

## Overview

Your goal is to create a detailed **Feature Specification** file. This file serves as the contract between the user and the implementation phase.

**Input:** A rough idea, a brainstorming session output, or a user request.
**Output:** A new markdown file in `.docs/features/YYYY-MM-DD-<feature-name>.md`.
**Template:** You **MUST** follow `.docs/features/FEATURES_template.md`.

**Crucial Distinction:**
- **Product/Spec Mode (THIS SKILL):** defining requirements, edge cases, acceptance criteria, and a high-level checklist of *files to change*.
- **Engineering/Execution Mode (NEXT SKILL):** writing the actual code, running tests, and managing git commits.

## The Process

1. **Read the Template:**
   - Read `.docs/features/FEATURES_template.md` to understand the structure.

2. **Create the File:**
   - Create a new file: `.docs/features/YYYY-MM-DD-<feature-name-kebab-case>.md`.
   - Copy the headers from the template.

3. **Fill in the Sections:**

   - **User Story:** Who, what, why.
   - **Requirements:** Detailed breakdown of core functionality, edge cases, and constraints.
   - **Open Questions:** If any exist, list them. If resolved, move to requirements.
   - **Acceptance Criteria:** The "Definition of Done". Be specific.
   - **Technical Details:** Architecture, API changes, DB schema, new dependencies.
   - **Implementation Plan:**
     - A high-level checklist of logical steps.
     - **DO NOT** write full code blocks here.
     - **DO** list the files you expect to create or modify.
     - Example:
       - [ ] Create `projects/authentication/services.py`
       - [ ] Update `projects/authentication/views.py` to use the service
       - [ ] Add unit tests in `projects/authentication/tests.py`

4. **Review:**
   - Ask the user to review the Spec.
   - Refine based on feedback.

## Handoff to Execution

Once the **Feature Specification** is approved by the user:

**"Feature Spec saved to `.docs/features/<filename>.md`. Ready for execution?"**

- If yes, use the `executing-features` skill.
- The `executing-features` skill will read this file and step through the Implementation Plan.
