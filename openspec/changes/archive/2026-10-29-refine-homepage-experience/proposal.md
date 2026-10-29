# Proposal: Refine Homepage Experience, Contact Channels, and Footer Localization

## Why

The homepage hero currently leads with a "Latest project" announcement banner that dilutes the engineer's primary identity and headline on first paint. In addition, the hero's lower rail truncates mid-container on desktop, the contact section still includes an obsolete Instagram link alongside professional channels, and the footer renders both English and Indonesian Bible verses simultaneously despite the site's global EN/ID localization toggle.

## What Changes

- **Homepage Hero Redesign**: Completely remove the `.hero-announcement` banner and associated styles from the homepage hero while preserving all project cards and links in the Projects section and catalog. Elevate the first screen with confident editorial typography ("Building Systems That Perform."), refined atmospheric depth, an interactive engineering focus ledger with smooth section deep-links, and WCAG-compliant primary CTA contrast across light and dark themes.
- **Coherent Scroll & Reveal Flow**: Standardize sticky-header anchor offsets (`scroll-margin-top` / `scroll-padding-top`) across all homepage sections (including `#projects` and `#principles`), optimize `ScrollReveal` to animate only `opacity` and `transform` (eliminating blur-filter GPU overhead), add restrained section reveals, and strictly respect `prefers-reduced-motion`.
- **Contact Section Simplification**: Remove Instagram from `profile.contactLinks` and render only the two verified professional channels (Email and GitHub) with accessible labels, visible focus indicators, and touch-friendly targets.
- **Localized Footer Verse**: Replace the redundant dual-column EN+ID footer verse layout with a single verse block bound to the active `useLocale()` state, preserving exact existing wording and citations (`Proverbs 16:3 (NIV)` / `Amsal 16:3 (TB)`).
- **Navigation & Mobile Header Polish**: Restore desktop-only visibility for `.resume-link` on narrow screens (`<= 800px`) to prevent header crowding at 320px, and refine hover/focus feedback across header controls, CTAs, and project cards.

## Capabilities

### Modified Capabilities

- `portfolio-core`: Refines first-screen hero hierarchy, anchor scroll offset consistency, contact channel presentation, and single-locale footer rendering.

## Out of Scope

- Adding new routes, external animation libraries, or runtime server APIs.
- Inventing unverified metrics, client logos, degrees, or contact addresses.
- Altering project case study narratives, resume content, or blog posts.
