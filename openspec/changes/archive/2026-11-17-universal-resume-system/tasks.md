# Tasks: Universal ATS-Friendly Resume Engineering System

## 1. OpenSpec & Data Foundation

- [x] 1.1 Create `src/data/resume/master-profile.ts` and `src/data/resume/role-presets.ts` as single source of truth; verify with TypeScript typecheck.
- [x] 1.2 Add `idx-trading-assistant` to `masterProfile.projects` and `rolePresets`, add `achievements` field, and synchronize `src/data/{profile,experience,skills,education}.ts` to derive shared facts from `masterProfile`; verify no unverified skills (`Prisma`, `Supabase`, `Railway`) remain and `npm run typecheck` passes.
- [x] 1.3 Create `src/data/resume/skill-taxonomy.ts` mapping profile skills and common external ATS terms; verify against unit tests.

## 2. Pure Resume Engine & Exports

- [x] 2.1 Implement `src/lib/resume/job-analyzer.ts` for deterministic keyword, requirement, evidence, and gap extraction; verify with unit tests in `tests/resume.test.ts`.
- [x] 2.2 Implement `src/lib/resume/build-resume.ts` and `src/lib/resume/filename.ts` covering general, role, and job tailoring modes plus optional profile overrides; verify headline seniority guard, skill ordering, project selection, and omission of empty education in unit tests.
- [x] 2.3 Implement `src/lib/resume/zip.ts`, `src/lib/resume/export-docx.ts`, `src/lib/resume/export-text.ts`, and `src/lib/resume/version-store.ts`; verify valid ZIP/OOXML structure (zero tables/text boxes, valid hyperlinks, CRC32) and round-trip serialization in `tests/resume.test.ts`.

## 3. Resume UI, Print Styles & Portfolio Integration

- [x] 3.1 Redesign `src/components/resume/resume-document.tsx` and `.resume-*` + `@media print` rules in `src/app/globals.css` to single-column A4 ATS layout, `pt` typography, inline body contact, and item-level pagination rules; verify zero em dashes (`—`) and clean responsive styles.
- [x] 3.2 Upgrade `src/components/resume/resume-customizer.tsx`, `src/components/resume/resume-page-content.tsx`, `src/components/resume/resume-print-content.tsx`, `src/components/resume/print-button.tsx`, `src/data/translations.ts`, and `src/components/portfolio/resume-transition.tsx` with role variants, JD tailoring, master profile inspector/overrides, saved versions, DOCX download, and ATS plain-text preview.

## 4. Verification, PDF Generation & Documentation

- [x] 4.1 Run `npm test`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npx openspec validate universal-resume-system --strict`.
- [x] 4.2 Run headless browser E2E checks (desktop + mobile + light/dark + console error checks across `/resume/` variants) and generate actual PDFs (`Danial_Fachrudin_Software_Engineer_Resume.pdf`, `Danial_Fachrudin_Backend_Engineer_Resume.pdf`, plus role/tailored checks) and DOCX verification, extract PDF text with `pdfjs-dist` to verify reading order and completeness, and visually inspect rendered PNGs of every PDF page.
- [x] 4.3 Document the system in `docs/resume-system.md` and update `docs/architecture.md` and `docs/project-map.md`.

## Workflow follow-up

- Archive the OpenSpec change (`npx openspec archive universal-resume-system`) and verify `npx openspec validate --specs` passes after all implementation and QA checks pass.
