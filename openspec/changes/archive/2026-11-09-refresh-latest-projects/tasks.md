# Implementation Tasks: Refresh Latest Projects

## Phase 1: Data Contracts & Project Data

- [x] 1.1 Add `d23-media` project specification and architecture steps to `src/data/projects.ts` with authentic details from `C:\Users\Lenovo X13\Documents\Insight By Danny`
- [x] 1.2 Update `src/data/translations.ts` with updated narrative and project summaries
- [x] 1.3 Add LinkedIn profile to JSON-LD structured data in `src/app/layout.tsx`

## Phase 2: UI Presentation & Slop Elimination

- [x] 2.1 Refine `ProjectCard` in `src/components/projects/project-card.tsx` to replace artificial skeleton bars with authentic project tech badges
- [x] 2.2 Add `.project-card--d23-media` translucent thumbnail styling and `.blueprint-tech-preview` styles to `src/app/globals.css`

## Phase 3: Verification & Validation

- [x] 3.1 Execute `npm run typecheck` to verify 0 type errors
- [x] 3.2 Execute `npm run lint` to verify 0 ESLint warnings/errors
- [x] 3.3 Execute `npm run format:check` and format if needed
- [x] 3.4 Execute `npm run build` and ensure all static pages (including `/case-studies/d23-media/`) build successfully
- [x] 3.5 Execute `npx openspec validate --specs`
