# Design: My Journey Editorial Feature

## Architectural Overview

Follows the portfolio's existing static-export Next.js App Router architecture (`output: "export"`, `trailingSlash: true`) and single-source-of-truth data model:

1. **Data Layer (`src/data/journey.ts`)**:
   - Strongly typed `JourneyChapter`, `ChapterSection`, `JourneyPillar`, `TransformationContrast`, and `JourneyArchive` definitions.
   - `journeyChapters` array holds both documented chapters (`status: "documented"`, rendered into static routes by `generateStaticParams`) and future chapters (`status: "future"`, rendered in the timeline and upcoming previews without generating empty reading pages).
   - Adding Chapter 02 in the future requires only changing its `status` to `"documented"` and providing its `sections` array in `src/data/journey.ts`.

2. **Localization (`src/data/translations.ts` & `src/data/journey.ts`)**:
   - `translations.nav.journey`, `translations.footer.journey`, and `translations.journeyPage` provide UI chrome labels in `en` and `id`.
   - `src/data/journey.ts` holds the long-form literary prose and structured editorial blocks in `en` (primary editorial voice) and `id` (faithful translation preserving tone and factual restraint).

3. **Presentation Layer (`src/components/journey/`)**:
   - `journey-landing-content.tsx`: Client component rendering the landing page hero, philosophy statement + guiding principles, five-year chapter timeline, Chapter 01 featured section with six-part outline, future chapters preview, five pillars overview, and closing reflection.
   - `journey-chapter-content.tsx`: Client component rendering the Chapter reading view with a lightweight scroll reading progress bar, sticky desktop section TOC (`useActiveSection`), responsive mobile section index, editorial prose blocks (`FormattedText` supporting safe italic/bold/link inline formatting), pull quotes, From → Toward transformation grid, Five Pillars cards, and verified portfolio cross-links (`AstraOps`, `LendLoop`, `OpsPilot`, `Veloura ERP`).
   - `src/app/journey/page.tsx` and `src/app/journey/[slug]/page.tsx` export static Next.js `Metadata`, JSON-LD (`CreativeWork` / `Article` serialized safely via `serializeJsonLd`), and `generateStaticParams` for SSG output.

4. **Design & Accessibility**:
   - Reuses existing design tokens (`--bg`, `--surface`, `--surface-nested`, `--surface-contrast`, `--text`, `--muted`, `--accent`, `--line`, `--radius-card`) so both light and dark themes work seamlessly.
   - Uses a subtle serif stack (`--font-editorial`) strictly for literary pull quotes and epigraph accents while preserving clean sans-serif titles and monospace chapter/section markers (`01`–`06`).
   - Reading width constrained to comfortable editorial measure (`~68ch` / `700px`), `line-height: 1.8`, generous whitespace, `>= 44px` tap targets on mobile, keyboard focus outlines, and `prefers-reduced-motion: reduce` fallbacks.
