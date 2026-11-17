# Design: Universal ATS-Friendly Resume Engineering System

## Architecture Overview

The resume system follows a clean pipeline:

1. **Master Profile (`src/data/resume/master-profile.ts`)**: Single source of truth holding identity, contact links, career timeline (`engineeringSince: 2021`, `freelanceSince: 2023`), tagged summary sentences, 9 skill categories with verification status (`verified` | `user-provided`) and project/experience evidence, chronological experience bullets, verified projects, certifications mapped from `src/data/certifications.ts`, empty placeholders for unverified fields (`education`, `languages`), preferences, and explicit `informationGaps`.
2. **Portfolio Synchronization**: `src/data/profile.ts`, `src/data/experience.ts`, `src/data/skills.ts`, and `src/data/education.ts` derive their shared facts from `masterProfile` so the portfolio homepage and resume remain consistent.
3. **Role Presets & Skill Taxonomy (`src/data/resume/role-presets.ts`, `src/data/resume/skill-taxonomy.ts`)**: Eight role presets (`software`, `backend`, `fullstack`, `frontend`, `api`, `cloud`, `devops`, `platform`) plus alias/regex patterns for deterministic keyword extraction and non-profile gap detection.
4. **Pure Engine (`src/lib/resume/`)**:
   - `job-analyzer.ts`: Extracts required vs preferred keywords from job descriptions, computes matched verified/user-provided evidence, surfaces gaps explicitly, and recommends the closest `RoleId`.
   - `build-resume.ts`: Pure transformation `(profile, selection) => ResumeModel` that adapts headline (stripping unsupported seniority terms), summary sentences, categorized skill ordering, experience bullet emphasis, and project selection/ordering (3 projects in `standard`, 4 projects with architecture lines in `detailed`).
   - `filename.ts`: Builds sanitized dynamic filenames (`Danial_Fachrudin_<Role>_Resume` or `Danial_Fachrudin_<Company>_<Role>_Resume`).
   - `zip.ts` + `export-docx.ts`: Zero-dependency store-only ZIP archive and OOXML WordprocessingML generator producing clean A4 paragraphs (`w:keepNext` on headings/item headers, no tables, no text boxes, hyperlinks in `document.xml.rels`).
   - `export-text.ts`: Linear plain-text ATS renderer from `ResumeModel`.
   - `version-store.ts`: Safe browser `localStorage` CRUD for saved resume versions and optional confirmed local profile overrides, plus URL-hash serialization (`#job=...`) for passing tailored job payloads to `/resume/print` without server storage.
5. **UI & Print Styling (`src/components/resume/`, `src/app/globals.css`)**:
   - `ResumeDocument`: Strict single-column semantic HTML (`<article>`, `<header>`, `<section>`, `<ul>`), inline contact details in the body, `pt` typography (`22pt` name, `11pt` headline/headings, `9.5pt` contact, `9.75pt` body), and item-level `break-inside: avoid` with heading `break-after: avoid` to eliminate section-level whitespace gaps.
   - `ResumePageContent`: Clean 3-tab workspace (Role Variants, Job Tailoring, Master Profile & Versions), live preview + plain-text ATS view toggle, Print/PDF link, DOCX download, and plain-text copy.
   - `ResumePrintContent`: Hydrates from query params (`role`, `mode`) + optional `#job=` hash and local overrides, sets `document.title` to the dynamic filename, and provides print/DOCX controls hidden in `@media print`.

## Key Trade-offs

- **Browser-side deterministic JD analyzer over LLM API**: Because the site builds with Next.js `output: "export"`, client-side taxonomy matching provides predictable, offline, zero-secret tailoring and zero hallucination risk.
- **Zero-dependency store-only ZIP DOCX builder over third-party `docx` bundle**: Keeps bundle size tiny, guarantees no tables/text boxes sneak in, and allows strict unit verification of generated OOXML.
- **Standard vs Detailed modes**: Standard mode keeps 3 prioritized projects and crisp bullets so it fits comfortably on 1 page (or 2 balanced pages if extra detail is confirmed), while Detailed mode surfaces full projects and architecture lines across 2 balanced pages.
