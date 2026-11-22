# Resume System Specification (Delta)

## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Automated January Experience Tenure Calculation

The system SHALL compute engineering years of experience dynamically from `masterProfile.timeline.engineeringSince` (`2021`) using the current calendar year so that displayed tenure increments by 1 every January (e.g., 5 years in 2026, 6 years starting January 2027) without manual edits.

#### Scenario: Calendar Year Rollover in January

- **WHEN** `getEngineeringYears(2021, referenceDate)` is evaluated for a date in 2026 vs. January 2027
- **THEN** it returns `5` for 2026 and `6` for January 2027, and the resume summary reflects `5+ years` and `6+ years` respectively
