# Design: Redesign Homepage Hero and Compact Project Presentation

## Context

See `proposal.md` for motivation. The site operates on Next.js 16 Static Site Generation (`output: "export"`). The portfolio emphasizes Danial Fachrudin's backend software engineering capabilities with Apple-inspired minimalist aesthetics.

## Goals / Non-Goals

**Goals:**

- Provide a developer-first mobile and desktop hero that immediately communicates Danial's identity, role, and positioning.
- Remove all promotional announcement labels ("Latest Project", "NEW") and mock browser illustrations with skeleton bars.
- Balance the desktop hero composition by replacing the empty void on the right with an authentic, restrained Backend Architecture Signature element.
- Present OpsPilot and other projects as clean, compact cards with curated technical highlights and direct repository links.
- Strictly adhere to antislop rules (no em dashes, no fake skeleton mockups, minimum 44px tap targets, WCAG AA contrast).

**Non-Goals:**

- Removing or altering the OpsPilot case study at `/case-studies/opspilot`.
- Fabricating any unverifiable metrics, clients, or technologies.
- Changing site routing, static export configurations, or unrelated pages.

## Decisions

### 1. Project Card Visual Cleanliness

- **Decision**: Remove `.project-thumbnail__blueprint` (browser dots and skeleton bars) and `.project-new-pill`. Replace them with an authentic, restrained technical preview card featuring an architectural system indicator (clean technical domain tag, category badge, and authentic runtime badge) that does not pretend to be a fake browser screenshot.
- **Alternatives considered**:
  - Keep the blueprint but make it smaller: Rejected because mock browser windows with fake skeleton placeholder bars violate craftsmanship and antislop guidelines.
  - Remove thumbnails entirely: Rejected because subtle translucent backdrop gradients provide visual distinction between projects.

### 2. OpsPilot Card Presentation in Projects Story

- **Decision**: Curate the project card content:
  - Display project name cleanly (`OpsPilot`) on the card while preserving full title in case study.
  - Keep description concise and focused.
  - Limit highlights to the 4 core technical pillars: `Go`, `Serverless Architecture`, `Multi-tenant REST API`, `JWT / RBAC`.
  - Display direct verified GitHub repository link and Case Study link in the card footer.
  - Remove `grid-column: 1 / -1` billboard override so all project cards conform to the standard grid.

### 3. Hero Composition on Desktop and Mobile

- **Decision**:
  - Desktop: Ground the right side of the hero layout with a subtle, non-intrusive Backend Architecture Signature component (displaying verified engineering principles: Hexagonal Architecture, Dual Runtime HTTP + AWS Lambda Graviton, HS256 JWT RBAC, Lexical SQL Migration, with a subtle live status indicator). This fills the awkward blank void without introducing an oversized card.
  - Mobile: Remove forced full-viewport height constraints that push developer content down. Make the interactive engineering focus rail compact and easily scrollable/tappable.
- **Alternatives considered**:
  - Center all text on desktop: Looked generic and lost the confident left-aligned Apple editorial composition.
  - Leave right side empty: Created a severe visual imbalance where the right 50% of the screen appeared broken/missing.

### 4. Typography & Copy Hygiene

- **Decision**: Replace the em dash (`—`) in `hero-byline` and translations with a subtle separator (`·`) to enforce antislop rule R-02 while maintaining elegant visual separation.

## Risks / Trade-offs

- [Risk]: Project cards may look too uniform if thumbnails are stripped.
  - Mitigation: Maintain the project-specific subtle gradients (`.project-card--opspilot`, `.project-card--veloura`, etc.) and refined translucent border treatment.
- [Risk]: Desktop hero signature might be perceived as a decorative widget.
  - Mitigation: Ensure every piece of information in the signature reflects authentic, verified system architecture from the codebase with zero fabricated metrics.
