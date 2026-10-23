---
name: executing-features
description: Use this skill to execute a Feature Specification. It iterates through the high-level Implementation Plan checklist, proposes specific code changes for each step, and executes them upon user approval.
---

# Executing Features

## Overview

Your goal is to turn a **Feature Specification** (`.docs/features/YYYY-MM-DD-name.md`) into working code.
Unlike the previous version, the input is NOT a script. It is a checklist. YOU are the engineer who must decide *how* to implement each checklist item.

**Input:** A Feature Specification file.
**Process:** Iterative execution of the "Implementation Plan" section.

## The Process

### Step 1: Load and Validate
1. Read the Feature Specification file.
2. Verify it has an "Implementation Plan" section with unchecked items.
3. If the plan looks incomplete or vague, ask the user for clarification before starting.

### Step 2: Execution Loop (Item by Item)

**For each unchecked item in the Implementation Plan:**

1. **Analyze:**
   - Read the item (e.g., "Create `projects/authentication/services.py`").
   - Determine what files need to be created or modified.
   - Plan the specific code changes.

2. **Propose (The "Plan" Phase):**
   - Present your plan for *just this item* to the user.
   - Show the file paths and a summary of changes.
   - **Crucial:** Ask for confirmation. "Ready to apply these changes?"

3. **Execute (The "Edit" Phase):**
   - Create/Edit the files.
   - **Constraint:** Use best practices (DRY, Service Layer, PEP8, Type Hints).

4. **Verify:**
   - Run lints (flake8), types (mypy), and tests (pytest) if applicable.
   - Fix any immediate errors.

5. **Update Spec:**
   - Mark the item as checked `[x]` in the Feature Specification file.
   - Check if there are more items.

### Step 3: Completion
1. When all items are checked:
   - Run a final full project verification (build, test).
   - Ask the user if they want to verify manually.
   - Offer to commit the changes.

## Guiding Principles

- **One Step at a Time:** Do not try to do the whole feature in one go.
- **Ask Before Editing:** Always get confirmation for your proposed code changes.
- **Update the Doc:** Keeping the Spec up-to-date is how we track progress.
