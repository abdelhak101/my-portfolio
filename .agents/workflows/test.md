---
name: test
description: Project-wide Testing Orchestrator - Generate, Run, and Analyze tests
---

# Testing Orchestrator

Service: {{service}}

If generate is true:
- Scan the specified service (or all services if empty)
- Generate missing tests and write them to tests/gemini_generated/

If report is true:
- Generate a summary report in tests/reports/

Otherwise:
- Run existing tests using docker-compose.test.yml
- Analyze failures and explain root causes
