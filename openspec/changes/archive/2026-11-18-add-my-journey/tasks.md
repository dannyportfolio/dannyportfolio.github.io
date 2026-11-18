# Implementation Tasks: My Journey

- [x] 1. Author `src/data/journey.ts` with typed chapter schema, Chapter 01 narrative (Sections 01–06), philosophy, five pillars, Chapters 02 & 03 future records, and complete EN/ID content adhering strictly to factual guardrails.
- [x] 2. Update `src/data/translations.ts` with `nav.journey`, `footer.journey`, and `journeyPage` UI strings in EN and ID.
- [x] 3. Update `src/components/layout/site-header.tsx` and `src/components/layout/site-footer.tsx` to include My Journey navigation and active route detection (`/journey`).
- [x] 4. Build `src/components/journey/journey-landing-content.tsx` implementing the editorial hero, philosophy & principles, five-year timeline, Chapter 01 showcase, future chapter previews, five pillars, and closing reflection.
- [x] 5. Build `src/components/journey/journey-chapter-content.tsx` implementing the Chapter reading experience with reading progress indicator, sticky/mobile section navigation, formatted prose, pull quotes, transformation contrast grid, five pillars, and chapter navigation.
- [x] 6. Create `src/app/journey/page.tsx`, `src/app/journey/[slug]/page.tsx`, and `src/app/journey/[slug]/not-found.tsx` with SSG `generateStaticParams`, SEO metadata, and JSON-LD.
- [x] 7. Update `src/app/sitemap.ts` to include `/journey/` and documented chapter URLs.
- [x] 8. Add editorial My Journey styles and responsive breakpoints to `src/app/globals.css`.
- [x] 9. Add `tests/journey.test.ts` validating chapter structure, factual guardrails, and bilingual completeness, and verify with `npm test`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npx openspec validate add-my-journey`, and browser/build checks.
