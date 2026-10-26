# Resume System Specification

## Purpose

Generates data-driven, ATS-compliant resumes with configurable target role emphasis, real-time preview, print-optimized stylesheet, and browser PDF generation.

## Requirements

### Requirement: Role-Driven Summary Prioritization

The system SHALL dynamically adjust the summary and technical skill order based on the active target role while drawing from a single verified data source.

#### Scenario: Switching Target Role

- **WHEN** a visitor selects a target role (e.g., Backend, Software, Full Stack)
- **THEN** the active summary and skill priorities update across standard and detailed views without altering underlying factual history

### Requirement: Print and PDF Export

The system SHALL generate an ATS-parseable, printer-friendly document layout with selectable text.

#### Scenario: Printing or Saving as PDF

- **WHEN** a visitor accesses `/resume/print` or triggers the browser print dialog
- **THEN** navigation and screen chrome are hidden and the document formats to A4 / Letter paper with proper margins and high print contrast
