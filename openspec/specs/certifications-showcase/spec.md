# Certifications Showcase Specification

## Purpose

Manages and displays verified professional certifications and technical credentials with document previews, credential metadata, accessible modal dialog inspection, and direct verification links.

## Requirements

### Requirement: Verified Credential Presentation

The system SHALL display only authentically verified credentials without fabricating unverified credentials, dates, or IDs.

#### Scenario: Displaying Certificate Details

- **WHEN** a visitor views the certifications section
- **THEN** the system displays the issuing organization, official credential title, verified issue date, and duration if specified

#### Scenario: Metadata Omission

- **WHEN** a credential has no official license ID
- **THEN** the credential ID field is omitted rather than populated with placeholder data

### Requirement: Document Viewing and Modal Inspection

The system SHALL provide interactive preview and full document access without forcing an immediate download.

#### Scenario: Opening Modal Viewer

- **WHEN** a visitor clicks "View Certificate" or the preview stage
- **THEN** an accessible modal dialog opens displaying the high-resolution certificate with focus trapping and keyboard Escape dismissal

#### Scenario: Direct Document Access

- **WHEN** a visitor clicks "Open Document" or "Verify Credential"
- **THEN** the document or external Credly verification page opens safely in a new tab with `target="_blank"` and `rel="noopener noreferrer"`
