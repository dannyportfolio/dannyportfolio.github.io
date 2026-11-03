# Proposal: Redesign Homepage Hero and Compact Project Presentation

## Why

The homepage mobile first impression was visually unbalanced, dominated by an oversized project card with a mock browser illustration, stacked badge tags, and multi-line title wrapping. Visitors were forced to scroll past excessive vertical blocks before discovering the software engineer's personal identity, core positioning, and complete portfolio.

## What Changes

- **Homepage Hero Refinement**: Prioritize developer identity ("Danial Fachrudin"), professional role ("Software Engineer"), and core value proposition ("Building Systems That Perform.") in the first viewport. Ensure comfortable, compact mobile vertical rhythm without forced 100vh bloat or awkward empty space on desktop by introducing a balanced, subtle backend architecture signature card.
- **Remove Oversized Project Announcement Elements**: Eliminate the promotional "Latest Project" pill and mock browser blueprint window (3 colored dots, domain badge, fake skeleton bars) from project cards.
- **Streamlined Project Presentation**: Redesign the OpsPilot presentation within the dedicated Projects section into a compact, elegant project card highlighting essential technical attributes (Go, Serverless Architecture, Multi-tenant REST API, JWT / RBAC) and verified GitHub repository link, while preserving all in-depth case study details at `/case-studies/opspilot`.
- **Harmonized Grid Layout**: Remove the full-width grid override (`grid-column: 1 / -1`) on the first project card so all projects sit harmoniously in the standard responsive grid.
- **Copy & Accessibility Polish**: Enforce WCAG AA contrast, clean separator characters instead of em dashes per antislop standards, and full EN/ID bilingual consistency.

## Capabilities

### Modified Capabilities

- `portfolio-core`: Refines the homepage first-screen personal hero hierarchy, eliminates mock browser illustrations and promotional badge bloat, and standardizes compact project card presentation across mobile and desktop.

## Impact

- `src/components/portfolio/hero-parallax.tsx`: Streamlines mobile hero layout and provides balanced desktop architectural signature.
- `src/components/projects/project-card.tsx`: Replaces blueprint mock browser with clean, authentic project preview, removes redundant metadata and badges.
- `src/app/globals.css`: Removes obsolete `.project-new-pill`, `.project-thumbnail__blueprint`, and `grid-column: 1 / -1` billboard override; optimizes mobile hero height and spacing.
- `src/data/translations.ts`: Ensures polished bilingual strings without em dashes.
- `src/data/projects.ts`: Preserves 100% authentic OpsPilot project data and links while providing clean title presentation.
