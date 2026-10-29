## MODIFIED Requirements

### Requirement: Responsive Portfolio Flow

The system SHALL present an intentional, narrative-driven overview of software engineering background across mobile, tablet, and desktop viewports (320px to 1440px+) without horizontal clipping, leading on the homepage hero directly with the engineer's identity and primary headline rather than project notification banners.

#### Scenario: First-Screen Hero Presentation

- **WHEN** a visitor loads the homepage at mobile or desktop widths
- **THEN** the hero leads directly with the engineer's identity byline, primary headline ("Building Systems That Perform."), positioning summary, primary/secondary CTAs ("Explore projects" and "Open CV"), and interactive engineering focus rail without rendering a latest-project announcement banner

#### Scenario: Navigating Sections

- **WHEN** a visitor scrolls or navigates to an anchor (e.g. `#about`, `#philosophy`, `#projects`, `#case-studies`, `#certifications`, `#contact`)
- **THEN** smooth scrolling targets the section heading with consistent top offset to prevent sticky header overlap, and falls back to instant scrolling when `prefers-reduced-motion: reduce` is active

#### Scenario: Language Switching

- **WHEN** a visitor toggles the EN / ID language selector
- **THEN** all section titles, narrative descriptions, UI controls, and the single footer guiding verse update instantaneously to match the active locale without page reload

## ADDED Requirements

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
