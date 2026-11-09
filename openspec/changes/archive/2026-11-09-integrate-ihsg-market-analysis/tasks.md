# Implementation Tasks: Integrate IHSG Market Analysis

## Phase 1: Specifications & Data Model

- [x] 1.1 Update OpenSpec baseline specification in `openspec/specs/portfolio-core/spec.md` to reflect the integrated project
- [x] 1.2 Add `idx-trading-assistant` project data to `src/data/projects.ts` with authentic details from `masket-ai-asisstant`
- [x] 1.3 Ensure zero hallucination: no live site link (only GitHub repository link), verified technology tags, and no fabricated financial returns

## Phase 2: Design System & Styling

- [x] 2.1 Add `.project-card--idx-trading-assistant` visual gradient and orb styling to `src/app/globals.css`
- [x] 2.2 Verify mobile and desktop responsiveness in light and dark modes

## Phase 3: Verification & Archival

- [x] 3.1 Run `npm run typecheck`
- [x] 3.2 Run `npm run lint`
- [x] 3.3 Run `npm run format:check`
- [x] 3.4 Run `npm run build` to ensure static generation of `/case-studies/idx-trading-assistant/` succeeds
- [x] 3.5 Run `npx openspec validate --specs`
- [x] 3.6 Archive change with `npx openspec archive integrate-ihsg-market-analysis`
