# Tasks

## 1. Project Card and Data Refinement

- [x] 1.1 Update `src/data/projects.ts` to add `shortName?: string` or clean project title rendering while preserving all detailed OpsPilot case study narrative, architecture steps, and verified repository link. Verify data types via `npm run typecheck`.
- [x] 1.2 Redesign `src/components/projects/project-card.tsx` to remove `.project-new-pill`, `project-new-tag`, and `.project-thumbnail__blueprint` (browser dots and skeleton bars). Render a clean, authentic technical preview badge and curate card highlights (Go, Serverless Architecture, Multi-tenant REST API, JWT / RBAC) without badge crowding. Verify markup structure.
- [x] 1.3 Update `src/app/globals.css` to clean up obsolete blueprint styles, remove the `grid-column: 1 / -1` full-width override on `.project-card--new`, and ensure all project cards render harmoniously in standard grid.

## 2. Homepage Hero and Composition Refinement

- [x] 2.1 Refactor `src/components/portfolio/hero-parallax.tsx` to lead confidently with personal developer identity, replace em dash in byline with clean separator (`·`), introduce a balanced subtle Backend Architecture Signature element on desktop, and streamline mobile layout.
- [x] 2.2 Update `src/app/globals.css` to refine `.hero-layout`, `.hero-signature`, and `.hero-ledger` styles across mobile and desktop, removing forced 100vh stretching on mobile and ensuring min 44px tap targets.
- [x] 2.3 Verify and update `src/data/translations.ts` to ensure bilingual (EN/ID) parity with zero em dashes per antislop R-02.

## 3. Comprehensive Verification & Responsive Audit

- [x] 3.1 Execute `npm run typecheck`, `npm run lint`, and `npm run build` to verify clean static export.
- [x] 3.2 Validate OpenSpec specifications via `npx openspec validate --specs`.
- [x] 3.3 Conduct automated Playwright responsive verification across all target viewports (320px, 360px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px) in both EN/ID locales and light/dark themes, verifying zero horizontal scroll, legible typography, proper tap targets, and balanced composition.

## Workflow follow-up

- Archive the change after verification and review.
