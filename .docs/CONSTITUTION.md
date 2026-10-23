# Project Constitution

This file contains the **IMMUTABLE PRINCIPLES** for this project. These are non-negotiable rules that supersede any other instruction or preference.

## 1. Zero Hallucination Policy
- **Never** import libraries that are not listed in `package.json`.
- **Never** assume a file exists without checking first.
- **Stop and Ask** if you are unsure about a dependency or import.

## 2. Tech Stack Consistency
- **Languages**: TypeScript
- **Frameworks**: Astro
- **Database**: None (Markdown-based)
- **No Rogue Tech**: Do not introduce new languages or frameworks without explicit *human* approval.

## 3. Operations & Safety
- **Non-Destructive**: Never run commands that delete data (like `rm -rf`) without the user's explicit confirmation step.
- **Secrets**: Never commit secrets or api keys. Use `.env`.

## 4. Code Quality
- **Types**: No `any`. Strict mode always.
- **Tests**: Core business logic must be tested.
- **Review**: All AI-generated code is draft equality until verified.

## 5. Documentation
- **Update as you go**: If you change a feature, update its `specs` or `docs`.
- **Single Source of Truth**: `docs/` folder is the truth.
