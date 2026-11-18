# Proposal: My Journey — Five-Year Personal & Professional Chapters

## Why

Danial Fachrudin's portfolio currently documents technical systems, case studies, blog notes, and an ATS resume, but has no dedicated editorial archive documenting his long-term personal and professional evolution. **My Journey** introduces an extensible five-year chapter archive starting with **Chapter 01 — The Foundation (2021–2026)**, grounded strictly in verified facts and his personal philosophy without turning into a conventional About page, achievement leaderboard, or motivational cliché.

## What Changes

- Add an extensible bilingual (`en` / `id`) data domain at `src/data/journey.ts` defining the central philosophy, guiding principles, five-year chapter timeline (Chapter 01 documented; Chapters 02 and 03 marked explicitly as future aspirations), five core pillars, and the six-section narrative of Chapter 01.
- Add static-exported Next.js App Router pages:
  - `/journey/` (`src/app/journey/page.tsx`) — Editorial landing page with hero introduction, core philosophy statement, five-year chapter timeline, Chapter 01 featured index, upcoming chapter previews, five pillars foundation, and closing reflection.
  - `/journey/[slug]/` (`src/app/journey/[slug]/page.tsx`) — Dedicated chapter reading experience (starting with `/journey/chapter-01/`) featuring a reading progress bar, sticky desktop / responsive mobile section navigation, pull quotes, transformation contrast view, five pillars breakdown, and chapter footer navigation.
- Integrate **My Journey** into global header navigation (`SiteHeader`), footer links (`SiteFooter`), `src/data/translations.ts`, and `src/app/sitemap.ts`.
- Add dedicated editorial typography and chapter layout styles in `src/app/globals.css` with full light/dark theme compliance and `prefers-reduced-motion` support.
- Add unit tests in `tests/journey.test.ts` validating factual integrity, chapter status invariants, section ordering, and zero-hallucination guardrails.

## Out of Scope

- Replacing or altering the homepage (`/`), `/resume/`, `/blog/`, `/projects/`, or `/case-studies/`.
- Adding backend databases, CMS integrations, user comments, or external analytics.
- Writing fictional achievements or completed narratives for future chapters (Chapter 02: 2026–2031 and Chapter 03: 2031–2036).
