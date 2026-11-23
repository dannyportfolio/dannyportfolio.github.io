# Certifications Showcase Specification

## Purpose

Manages and displays verified professional certifications and technical credentials with authentic document previews, interactive category filtering, credential metadata, accessible modal dialog inspection, and direct verification links.

## Requirements

### Requirement: Verified Credential Presentation

The system SHALL display only authentically verified credentials without fabricating unverified credentials, dates, or IDs.

#### Scenario: Displaying Certificate Details

- **WHEN** a visitor views the certifications section
- **THEN** the system displays the issuing organization, official credential title, verified issue date, instructor or signatory if present, and duration if specified

#### Scenario: Metadata Omission

- **WHEN** a credential has no official license ID or verification URL
- **THEN** the omitted field is not rendered rather than populated with placeholder data

#### Scenario: Interactive Filtering and Sorting

- **WHEN** a visitor selects a category filter or sort order in the certifications toolbar
- **THEN** the displayed credential list updates immediately with accurate counts and provides a one-click reset if a filter yields no entries

### Requirement: Document Viewing and Modal Inspection

The system SHALL provide interactive preview and full document access without forcing an immediate download.

#### Scenario: Opening Modal Viewer

- **WHEN** a visitor clicks "View Certificate" or the preview stage
- **THEN** an accessible modal dialog opens displaying the high-resolution certificate image or structured authentic credential preview with keyboard focus trapping, Previous/Next credential navigation, one-click Credential ID copy, Escape dismissal, and focus restoration on close

#### Scenario: Direct Document Access

- **WHEN** a visitor clicks "Open Document" or "Verify Credential"
- **THEN** the document or external verification page (such as Credly or Udemy) opens safely in a new tab with `target="_blank"` and `rel="noopener noreferrer"`
