# Resume System Specification

## Purpose

Generates data-driven, ATS-compliant resumes with configurable target role emphasis, real-time preview, print-optimized stylesheet, and browser PDF generation.

## Requirements

### Requirement: Role-Driven Summary Prioritization

The system SHALL generate every resume variant from one centralized verified master profile, selecting and ordering summary statements, categorized skills, experience bullets, and projects to match the active role preset or general profile while defaulting to a general Software Engineer resume when no role parameter is given.

#### Scenario: Default General Resume

- **WHEN** a visitor opens `/resume` or `/resume/print` without a `role` query parameter
- **THEN** the system renders the general Software Engineer resume variant without altering underlying factual history

#### Scenario: Switching Target Role

- **WHEN** a visitor selects a supported target role (`software`, `backend`, `fullstack`, `frontend`, `api`, `cloud`, `devops`, `platform`) or passes `?role=<id>`
- **THEN** the headline, summary composition, skill category order, bullet emphasis, and project priority update from the single master profile without introducing unverified skills or changing factual dates

#### Scenario: Timeline Honesty and Omission of Unverified Sections

- **WHEN** the master profile contains distinct software engineering (`2021 - 2023`) and independent freelance (`2023 - Present`) periods and an empty education list
- **THEN** the resume renders both chronological periods accurately and omits empty sections rather than printing placeholder notes

### Requirement: Print and PDF Export

The system SHALL format the resume as a single-column A4 document using ATS-safe sans-serif fonts, body-embedded contact details, semantic headings, item-level page-break rules, selectable text, and dynamic document titles for PDF export.

#### Scenario: Printing or Saving as PDF

- **WHEN** a visitor accesses `/resume/print` or triggers the browser print dialog
- **THEN** screen controls are hidden, contact details remain in the document body in reading order, section headings stay attached to their first item, and the document title reflects the dynamic resume filename

### Requirement: Job Description Analysis and Tailoring

The system SHALL analyze a pasted job description in the browser to extract required and preferred qualifications, report matched profile evidence and missing skill gaps honestly, and produce a tailored resume that never invents absent qualifications or unsupported seniority.

#### Scenario: Tailoring to a Job Description

- **WHEN** a user provides a job description (with optional role title and company name) and applies job tailoring
- **THEN** the analyzer lists matched skills with supporting evidence, highlights unmatched requirements as gaps, selects the closest matching role positioning, and reorders verified skills, bullets, and projects without adding unverified claims

### Requirement: DOCX and Plain-Text Export

The system SHALL support client-side export of any active resume variant (general, role-based, or job-tailored) as an ATS-friendly DOCX file without tables or text boxes, and as selectable plain text matching document reading order.

#### Scenario: Exporting DOCX and Plain Text

- **WHEN** a user downloads a DOCX file or copies the plain-text ATS view
- **THEN** the generated output uses the dynamic naming convention (`Danial_Fachrudin_<Role>_Resume.docx` or `Danial_Fachrudin_<Company>_<Role>_Resume.docx`) and preserves linear section order

### Requirement: Local Version Management and Profile Overrides

The system SHALL allow saving, loading, and deleting tailored resume versions in browser storage, inspecting verified versus user-provided profile facts and information gaps, and optionally saving local profile overrides without mutating the repository baseline for other visitors.

#### Scenario: Saving and Restoring a Tailored Version

- **WHEN** a user saves a role or job-tailored configuration as a named version and later reloads it
- **THEN** the saved role, job description, and mode restore accurately from browser storage
