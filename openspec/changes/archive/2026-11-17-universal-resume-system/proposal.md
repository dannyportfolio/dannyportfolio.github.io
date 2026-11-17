# Proposal: Universal ATS-Friendly Resume Engineering System

## Why

The current `/resume` generator duplicates profile facts across multiple data files, defaults to `backend` instead of a general Software Engineer resume, outputs uncategorized skill runs and unverified skill claims, leaks an education placeholder into the published PDF, and wraps whole sections in `break-inside: avoid` causing large whitespace gaps and unbalanced pagination.

## What Changes

- Establish `src/data/resume/master-profile.ts` as the single source of truth distinguishing verified facts, user-provided facts, and missing information gaps, and derive `profile.ts`, `experience.ts`, `skills.ts`, and `education.ts` from it so the homepage and resume stay aligned.
- Separate software engineering timeline (`2021 - 2023`) from independent freelance practice (`2023 - Present`) without inflating experience claims.
- Replace the component-bound resume assembly with a pure resume model builder (`src/lib/resume/build-resume.ts`), role preset definitions (`software` default, `backend`, `fullstack`, `frontend`, `api`, `cloud`, `devops`, `platform`), and a deterministic browser-side job description analyzer (`src/lib/resume/job-analyzer.ts`) that matches keywords, surfaces gaps honestly, and re-ranks verified facts without hallucinating skills or seniority.
- Overhaul the resume document layout and print CSS to a single-column A4 ATS-compatible design with semantic headings, `pt`-unit typography, inline body contact details, and item-level page-break control eliminating section-level whitespace jumps.
- Add dynamic ATS filenames, client-side DOCX export (`src/lib/resume/export-docx.ts`), plain-text ATS preview/copy, local version management, and local confirmed profile override controls while preserving existing `/resume` and `/resume/print` routes and query parameter compatibility (`role`, `mode`).

### Out of Scope

- Creating a separate resume application outside this Next.js static export repository.
- Server-side PDF rendering, database persistence, or external LLM API calls.
- Deploying to production before automated tests and PDF extraction QA pass.

## Capabilities

### New Capabilities

- None (all capabilities extend the existing `resume-system` specification).

### Modified Capabilities

- `resume-system`: Expand requirements to cover a single verified master profile, universal ATS single-column layout and pagination rules, expanded role presets defaulting to Software Engineer, client-side job description analysis and tailoring, DOCX and plain-text export, dynamic filenames, and local version management.

## Impact

- Data modules: `src/data/resume/*`, `src/data/{profile,experience,skills,education,translations}.ts`
- Pure resume engine: `src/lib/resume/*`
- UI & routes: `src/components/resume/*`, `src/components/portfolio/resume-transition.tsx`, `src/app/globals.css`
- Tests & QA: `tests/resume.test.ts`, automated PDF generation + text extraction verification script
- Documentation: `docs/architecture.md`, `docs/project-map.md`, `docs/resume-system.md`
