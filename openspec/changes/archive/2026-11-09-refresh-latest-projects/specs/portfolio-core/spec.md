# Delta Specification: Portfolio Core — Latest Projects Refresh

## MODIFIED Requirements

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
- **THEN** projects including D23 Media (Insight by Danny), LendLoop, and OpsPilot are displayed as compact cards with clean titles, representative technical preview, focused key highlights, and direct verified repository or live links, without multi-badge tag clouds or placeholder skeleton bars
- **AND** the excluded legacy project (`masket-ai-asisstant`) is not displayed anywhere in the showcase
