# Resume System Specification

## Purpose

Generates data-driven, ATS-compliant resumes with configurable target role emphasis, real-time preview, print-optimized stylesheet, and browser PDF generation.

## Requirements

### Requirement: Role-Driven Summary Prioritization

The system SHALL generate every resume variant from one centralized verified master profile, selecting and ordering summary statements, categorized skills, experience bullets, and projects to match the active role preset (`software`, `backend`, `fullstack`, `systems`) while defaulting to a general Software Engineer resume when no role parameter is given.

#### Scenario: Default General Resume

- **WHEN** a visitor opens `/resume` or `/resume/print` without a `role` query parameter
- **THEN** the system renders the general Software Engineer resume variant without altering underlying factual history

#### Scenario: Switching Target Role

- **WHEN** a visitor selects a supported target role (`software`, `backend`, `fullstack`, `systems`) or passes `?role=<id>`
- **THEN** the headline, summary composition, skill category order, bullet emphasis, and project priority update from the single master profile without introducing unverified skills or changing factual dates

#### Scenario: Timeline Honesty and Omission of Unverified Sections

- **WHEN** the master profile contains distinct software engineering (`2021 - 2023`), independent freelance (`2023 - Present`), and contract (`April 2026 - November 2026`) periods and an empty education list
- **THEN** the resume renders all chronological periods in reverse-chronological order and omits empty sections rather than printing placeholder notes

### Requirement: Automated January Experience Tenure Calculation

The system SHALL compute engineering years of experience dynamically from `masterProfile.timeline.engineeringSince` (`2021`) using the current calendar year so that displayed tenure increments by 1 every January (e.g., 5 years in 2026, 6 years starting January 2027) without manual edits.

#### Scenario: Calendar Year Rollover in January

- **WHEN** `getEngineeringYears(2021, referenceDate)` is evaluated for a date in 2026 vs. January 2027
- **THEN** it returns `5` for 2026 and `6` for January 2027, and the resume summary reflects `5+ years` and `6+ years` respectively

### Requirement: Print and PDF Export

The system SHALL format the resume as a single-column A4 document using ATS-safe sans-serif fonts, body-embedded contact details, semantic headings, item-level page-break rules, selectable text, and dynamic document titles for PDF export.

#### Scenario: Printing or Saving as PDF

- **WHEN** a visitor accesses `/resume/print` or triggers the browser print dialog
- **THEN** screen controls are hidden, contact details remain in the document body in reading order, section headings stay attached to their first item, and the document title reflects the dynamic resume filename

### Requirement: International Resume Curation in Standard Mode

In Standard mode (`detailed: false`), the system SHALL keep the resume concise and internationally uniform by limiting the summary to the opening, the top-ranked role sentence, and closing, capping each skill category to its top role-prioritized skills, and curating certifications to English-language, internationally recognized credentials, while Detailed mode (`detailed: true`) continues to expose the full verified profile.

#### Scenario: Standard Mode Conciseness and English Credential Curation

- **WHEN** `buildResume` is called with `detailed: false`
- **THEN** `summary` includes the opening, 1 top-ranked role sentence, and closing; each skill category is capped to at most 4 top-ranked skills; and `certifications` excludes non-English course titles

#### Scenario: Detailed Mode Full Profile

- **WHEN** `buildResume` is called with `detailed: true`
- **THEN** `summary` includes 3 top-ranked role sentences, all verified skills per category are included, and all verified certifications are included

### Requirement: Spoken Languages Section Rendering

The system SHALL render a `Languages` section in `ResumeDocument` whenever `model.languages` contains one or more entries, and omit the section when `model.languages` is empty.

#### Scenario: Languages Omitted When Unverified

- **WHEN** `model.languages` is empty
- **THEN** `ResumeDocument` does not render a `Languages` section
