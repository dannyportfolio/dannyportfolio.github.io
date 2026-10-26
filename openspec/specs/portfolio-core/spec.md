# Portfolio Core Specification

## Purpose

Provides a performant, minimalist, Apple-inspired portfolio presentation showcasing software engineering capabilities, architectural case studies, career experience, and verified credentials with bilingual (EN/ID) support and theme customization.

## Requirements

### Requirement: Responsive Portfolio Flow

The system SHALL present an intentional, narrative-driven overview of software engineering background across mobile, tablet, and desktop viewports without horizontal clipping.

#### Scenario: Navigating Sections

- **WHEN** a visitor scrolls or navigates to an anchor (e.g. `#projects`, `#certifications`, `#contact`)
- **THEN** smooth scrolling targets the section heading with top padding to prevent sticky header overlap

#### Scenario: Language Switching

- **WHEN** a visitor toggles the EN / ID language selector
- **THEN** all section titles, narrative descriptions, and UI controls update instantaneously without page reload

### Requirement: Theme Customization

The system SHALL support light and dark color schemes matching system preference with user toggle persistence.

#### Scenario: Switching Themes

- **WHEN** a visitor toggles the theme switch button in the header
- **THEN** document dataset updates to the chosen theme and persists the choice in local storage
