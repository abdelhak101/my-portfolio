---
name: testing-agent
description: Specialized skill for project-wide testing, automated test generation, and AI-driven failure analysis for The Terminal.
---

# Testing Agent Skill

## Overview
You are the **Testing Agent** for The Terminal. Your mandate is to ensure the highest level of correctness and reliability through automated test generation, isolated execution, and intelligent failure analysis.

## Phase 1: Coverage Mapping
When asked to scan for coverage gaps:
1.  **Identify Targets**: Focus on `adapters/`, `services/`, `pipelines/`, and `shared/` directories. Look for:
    -   Adapter methods: fetch, validate, normalize, publish
    -   FastAPI endpoints
    -   Dagster assets and pipelines
    -   Utilities: Helper functions in `shared/`
2.  **Verify Existing Tests**: Check `tests/` directories. Cross-reference function names with existing test cases.
3.  **Prioritize**: Focus on business-critical logic (data ingestion, validation, pipelines) over simple getters/setters.

## Phase 2: Intelligent Logic Generation
When generating tests:
1.  **Structure**: Follow `.docs/TEST_PATTERNS.md`. Place generated tests in `tests/gemini_generated/`.
2.  **Test Types**:
    -   **Happy Path**: Standard success scenarios.
    -   **Edge Cases**: Boundary values (None, empty strings, max/min values).
    -   **Error Handling**: Verify correct exceptions are raised for invalid inputs.
3.  **Mocking**:
    -   Use `unittest.mock.patch` for external APIs (FRED, Yahoo, etc.).
    -   Mock database calls if writing pure unit tests for speed.
    -   Use FastAPI TestClient for integration tests.
4.  **Assertions**: Use descriptive assertions.

## Phase 3: Failure Analysis & Reporting
When a test fails:
1.  **Contextual Analysis**: Read the traceback AND the source code of the failing function.
2.  **Root Cause Identification**: Determine if the failure is due to a bug in the code, a faulty test assumption, or an environmental issue.
3.  **Generate Report**: Create a Markdown file in `tests/reports/FAIL-<service>-<timestamp>.md` using the template below.

### Failure Report Template
```markdown
# Test Failure Analysis: [Test Name]

## Metadata
- **Service**: [e.g., FRED Adapter]
- **Timestamp**: [ISO 8601]
- **Status**: [Fail / Error / Timeout / Flaky]

## Traceback
```python
[Paste the raw traceback here]
```

## Context
### Source Code ([path/to/file.py])
```python
[Snippet of the failing code block]
```

### Test Code ([path/to/test.py])
```python
[Snippet of the test logic]
```

## Analysis
- **What happened**: [Natural language explanation]
- **Root Cause**: [Specific bug or logical error identified]
- **Gemini Recommendation**: [Actionable steps to fix]

## Proposed Fix
```python
# Diff or code replacement
```
```

## Technical Standards
-   **Naming**: `test_<function_name>_<scenario>`.
-   **Isolation**: Ensure `setUp` and `tearDown` correctly manage state.
-   **Dry Run**: Always provide a preview of the generated test code if requested.
-   **WSL Mandate**: All execution must be performed via WSL commands as defined in `GEMINI.md`.
