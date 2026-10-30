# Tasks

## 1. Localization & Data Contracts

- [x] 1.1 Add bilingual translations for topic filtering (topics button, bottom sheet title, topic search placeholder, clear, apply, close, and empty state) in `src/data/translations.ts` and verify types pass.

## 2. Topic Filter Component & Styling

- [x] 2.1 Implement `BlogTopicFilter` in `src/components/blog/blog-topic-filter.tsx` with dynamic topic counts, case-insensitive topic search, single-selection semantics, keyboard navigation (Escape key), and mobile scroll locking.
- [x] 2.2 Add CSS rules in `src/app/globals.css` for the compact topic button, active indicators, desktop popover, mobile bottom sheet, overlay backdrop, and dark/light mode tokens.
- [x] 2.3 Refactor `src/components/blog/blog-listing-content.tsx` to remove the permanently stacked chips, mount `BlogTopicFilter`, and maintain independent article search and filtering.

## 3. Verification & Responsive QA

- [x] 3.1 Run `npm run format:check`, `npm run lint`, `npm run typecheck`, and `npm run build` to verify zero errors across the static export.
- [x] 3.2 Audit responsive behavior across target viewports (320px, 360px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px) to verify zero horizontal overflow, usable search, and smooth dismissals.

## Workflow follow-up

- Archive the change after verification: `npx openspec archive redesign-blog-topic-filter`.
- Commit, push, and monitor production deployment.
