---
name: execute-feature
description: Execute a Feature Specification to build the feature
---

# Execute Feature

1. **Input Check:**
   - Ask the user which Feature Specification file they want to execute (e.g., `.docs/features/my-feature.md`).
   - (If the user just finished writing one, assume that's the target).

2. **Trigger Skill:** Use the `executing-features` skill.
   - Read the Feature Specification.
   - Iterate through the "Implementation Plan" checklist.
   - For each item: Plan -> Confirm -> Execute -> Verify.

3. **Completion:**
   - Once all items are checked, run final verifications.
   - Offer to commit the changes.
