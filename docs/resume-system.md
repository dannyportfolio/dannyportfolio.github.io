# Universal ATS-Friendly Resume System

This document describes the architecture, data governance, tailoring behavior, and verification workflow of the `/resume/` and `/resume/print/` system.

---

## 1. Architecture Overview

The resume system compiles every preview and export format from one structured profile:

1. **Master Profile (`src/data/resume/master-profile.ts`)**: Single source of truth for identity, contact channels, timeline (`engineeringSince: 2021`, `freelanceSince: 2023`), tagged summary sentences, 9 technical skill categories, chronological experience bullets, verified projects, certifications mapped from `src/data/certifications.ts`, preferences, and explicit `informationGaps`.
2. **Portfolio Synchronization**: `src/data/profile.ts`, `src/data/experience.ts`, `src/data/skills.ts`, and `src/data/education.ts` derive their shared fields from `masterProfile` so the homepage and resume stay aligned.
3. **Role Presets (`src/data/resume/role-presets.ts`)**: Eight engineering role presets (`software` default, `backend`, `fullstack`, `frontend`, `api`, `cloud`, `devops`, `platform`) that define skill focus, category order, project order, and job-title matching signals without modifying factual history.
4. **Skill Taxonomy (`src/data/resume/skill-taxonomy.ts`)**: Canonical pattern and alias definitions for profile skills plus external industry skills used solely to surface requirement gaps honestly.
5. **Pure Builder & Exports (`src/lib/resume/`)**:
   - `job-analyzer.ts`: Browser-side deterministic keyword extractor separating required vs preferred qualifications, matching verified evidence, recommending a role preset, and flagging gaps.
   - `build-resume.ts`: Pure function `(profile, selection) => ResumeModel` adapting headline (without inventing seniority), summary sentences, skill ordering, experience bullet ordering, and project selection (3 projects in `standard`, 4 projects with architecture lines in `detailed`).
   - `filename.ts`: Builds dynamic ATS-safe filenames (`Danial_Fachrudin_<Role>_Resume` or `Danial_Fachrudin_<Company>_<Role>_Resume`).
   - `zip.ts` + `export-docx.ts`: Zero-dependency store-only ZIP archive and OOXML `.docx` generator emitting A4 Arial paragraphs with `w:keepNext`, hyperlinks, and zero tables or text boxes.
   - `export-text.ts`: Linear plain-text ATS extractor matching document reading order.
   - `version-store.ts`: Browser `localStorage` persistence for saved versions and optional local confirmed overrides, plus URL-hash (`#job=`) serialization for `/resume/print/`.

---

## 2. Verification Policy & Editing Guidelines

Every skill, experience entry, project, and certification in `master-profile.ts` tracks:

- `status: "verified" | "user-provided"`
- `evidence`: referencing a project slug (`opspilot`, `lendloop`, `veloura`, `tragapos`, `griya-properti`, `astraops`, `idx-trading-assistant`), `"portfolio-site"`, or `"experience"`.

Never add unverified degrees, metrics, or unsupported seniority titles. Missing details belong in `masterProfile.informationGaps` and are omitted from published resumes unless confirmed locally via browser overrides or updated in `master-profile.ts`.

---

## 3. Routes & Query Compatibility

- `/resume/`: Interactive workspace with Role Variants, Job Tailoring, Profile & Versions management, A4 preview, ATS plain-text preview, DOCX download, and print link.
- `/resume/print/`: Standalone A4 print view with dynamically synced `document.title` for browser PDF saving.
- Supported query parameters:
  - `role`: `software` (default), `backend`, `fullstack`, `frontend`, `api`, `cloud`, `devops`, `platform`
  - `mode`: `standard` (default) or `detailed`
- Hash state: `#job=<base64url>` passes job-specific tailoring input client-side to `/resume/print/` without server storage.

---

## 4. Verification

```bash
npm test
npm run typecheck
npm run lint
npm run format:check
npm run build
```
