# Tasks

## 1. Planning & Specifications

- [x] 1.1 Complete OpenSpec change artifacts (`proposal.md`, `design.md`, `tasks.md`, and delta `spec.md`).

## 2. Localization & Data Contracts

- [x] 2.1 Add bilingual translations for algorithm complexity reference, explorer controls, badges, and tooltips in `src/data/translations.ts`.
- [x] 2.2 Create `src/data/algorithm-complexity.ts` containing structured reference data, complexity classes, analysis examples, and quick-lookup data.
- [x] 2.3 Create `src/data/posts/big-o-complexity.ts` containing the complete 11-section blog article in English and Indonesian.
- [x] 2.4 Register the new post in `src/data/blog.ts` and verify static generation params.

## 3. Interactive Visualization & UI Components

- [x] 3.1 Build `src/components/engineering/complexity-growth-explorer.tsx` with responsive SVG charting, n-slider controls, curve toggles, and live operations table.
- [x] 3.2 Build `src/components/engineering/algorithm-complexity-reference.tsx` assembling all 9 handbook reference sections.
- [x] 3.3 Update `src/components/blog/blog-detail-content.tsx` to support embedding the complexity explorer diagram.
- [x] 3.4 Integrate `AlgorithmComplexityReference` into `src/app/engineering/page.tsx` while preserving existing principles and article cards.

## 4. Styling & Theme Integration

- [x] 4.1 Add CSS rules in `src/app/globals.css` for the complexity explorer, curve palette, comparison matrix, and code analysis steps.
- [x] 4.2 Validate dark and light theme appearance and WCAG AA contrast.
- [x] 4.3 Ensure responsive layouts across mobile (320px–430px), tablet (768px), and desktop (1024px+).

## 5. Verification & Delivery

- [x] 5.1 Run `npm run format:check`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- [x] 5.2 Validate OpenSpec specifications with `npx openspec validate --specs`.
- [x] 5.3 Verify zero em dashes (`—`) across all newly authored content.
- [x] 5.4 Archive the OpenSpec change with `npx openspec archive big-o-complexity-learning`.
