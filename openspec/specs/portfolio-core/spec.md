# Portfolio Core Specification

## Purpose

Provides a performant, minimalist, Apple-inspired portfolio presentation showcasing software engineering capabilities, architectural case studies, career experience, and verified credentials with bilingual (EN/ID) support and theme customization.

## Requirements

### Requirement: Responsive Portfolio Flow

The system SHALL present an intentional, narrative-driven overview of software engineering background across mobile, tablet, and desktop viewports (320px to 1440px+) without horizontal clipping, leading on the homepage hero directly with the engineer's identity and primary headline rather than project notification banners, and presenting selected projects in a compact, harmonious grid.

#### Scenario: First-Screen Hero Presentation

- **WHEN** a visitor loads the homepage at mobile or desktop widths
- **THEN** the hero leads directly with the engineer's identity byline, primary headline ("Building Systems That Perform."), positioning summary, primary/secondary CTAs ("Explore projects" and "Open CV"), and balanced engineering visual composition without rendering a latest-project announcement banner, oversized project card, or mock browser illustration

#### Scenario: Navigating Sections

- **WHEN** a visitor scrolls or navigates to an anchor (e.g. `#about`, `#philosophy`, `#projects`, `#case-studies`, `#certifications`, `#contact`)
- **THEN** smooth scrolling targets the section heading with consistent top offset to prevent sticky header overlap, and falls back to instant scrolling when `prefers-reduced-motion: reduce` is active

#### Scenario: Language Switching

- **WHEN** a visitor toggles the EN / ID language selector
- **THEN** all section titles, narrative descriptions, UI controls, and the single footer guiding verse update instantaneously to match the active locale without page reload

#### Scenario: Compact Projects Section Presentation

- **WHEN** a visitor inspects the Projects section on the homepage or catalog
- **THEN** projects including LendLoop and OpsPilot are displayed as compact cards with clean titles, representative technical preview, focused key highlights, and direct verified repository links, without multi-badge tag clouds or fake browser blueprints

### Requirement: Theme Customization

The system SHALL support light and dark color schemes matching system preference with user toggle persistence.

#### Scenario: Switching Themes

- **WHEN** a visitor toggles the theme switch button in the header
- **THEN** document dataset updates to the chosen theme and persists the choice in local storage

### Requirement: Focused Professional Contact Channels

The system SHALL expose only verified Email and GitHub channels in the homepage contact section with accessible labels, visible keyboard focus states, and touch-accessible targets.

#### Scenario: Inspecting Contact Options

- **WHEN** a visitor navigates to `/#contact`
- **THEN** the contact section renders only the verified `mailto:` Email link and GitHub profile link without Instagram or empty social slots

### Requirement: Reduced-Motion Accessibility

The system MUST honor operating-system `prefers-reduced-motion: reduce` preferences across CSS smooth scrolling, hero entrance/ambient effects, and scroll-reveal transitions.

#### Scenario: Visitor Enables Reduced Motion

- **WHEN** a visitor views the portfolio with `prefers-reduced-motion: reduce` enabled
- **THEN** anchor navigation jumps without animated scrolling and content renders immediately without nonessential motion delays
