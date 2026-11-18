# my-journey Specification

## Purpose

Provides an extensible, editorial five-year chapter archive documenting Danial Fachrudin's authentic personal and professional evolution, beginning with Chapter 01: The Foundation (2021–2026).

## Requirements

### Requirement: My Journey Navigation & Discoverability

The system SHALL expose **My Journey** in the primary desktop and mobile header navigation (`SiteHeader`), the site footer (`SiteFooter`), and the static XML sitemap (`sitemap.ts`) with localized labels (`My Journey` / `Perjalanan Saya`) and active route highlighting when visiting `/journey` or `/journey/*`.

#### Scenario: Discovering My Journey from Site Navigation

- **WHEN** a visitor views any page on the portfolio at desktop or mobile widths
- **THEN** the navigation bar and footer include a working link to `/journey`
- **AND** navigating to `/journey` or `/journey/chapter-01` marks the **My Journey** header item as active (`is-active`, `aria-current="page"`)

### Requirement: Five-Year Chapter Archive Landing Page

The `/journey/` route SHALL render an editorial archive landing page introducing the five-year chapter structure, philosophy statement, guiding principles, Chapter 01 preview, upcoming future chapters, and closing personal reflection.

#### Scenario: Viewing the Archive Structure

- **WHEN** a visitor navigates to `/journey/`
- **THEN** the page displays the editorial hero introduction, core philosophy statement with seven guiding principles, the extensible five-year timeline (Chapters 01 through 03), the Chapter 01 featured index linking to `/journey/chapter-01/`, the five pillars foundation, and the closing reflection

#### Scenario: Inspecting Future Chapters

- **WHEN** a visitor views the chapter timeline and upcoming chapter previews on `/journey/`
- **THEN** Chapters 02 (2026–2031, The Expansion) and 03 (2031–2036, The Contribution) are clearly labeled as future chapters that have not yet been written
- **AND** no fabricated milestones, positions, or outcomes are presented as completed achievements

### Requirement: Dedicated Chapter 01 Reading Experience

The `/journey/[slug]/` route SHALL statically export `/journey/chapter-01/` via `generateStaticParams` and render a long-form editorial reading experience preserving the exact six-section conceptual order:

1. `01` — The Beginning
2. `02` — The Challenges
3. `03` — The Experience
4. `04` — The Realization
5. `05` — The Transformation
6. `06` — The Direction

#### Scenario: Navigating Chapter 01 Sections

- **WHEN** a visitor reads `/journey/chapter-01/` on desktop or mobile
- **THEN** the reader provides a scroll reading progress indicator, section index navigation (sticky sidebar on desktop, accessible compact jump navigation on mobile), pull-quote callouts, a From-to-Toward transformation comparison in Section 05, and the Five Pillars breakdown in Section 06
- **AND** active reading progress respects `prefers-reduced-motion: reduce`

### Requirement: Factual Guardrails & Bilingual Localization

All My Journey narrative data and UI controls SHALL support both English (`en`) and Bahasa Indonesia (`id`) locales via `LocaleProvider`, and MUST strictly adhere to verified profile facts without inventing dates, employers, degrees, financial figures, or disparaging conventional university education.

#### Scenario: Switching Languages in My Journey

- **WHEN** a visitor toggles between `EN` and `ID` on `/journey/` or `/journey/chapter-01/`
- **THEN** all titles, narrative prose, quotes, transformation contrasts, five pillars, and navigation controls update instantaneously without page reload
