# Proposal: Redesign Blog Topic Filter for Scalability and Space Efficiency

## Why

The portfolio blog currently renders all category filter chips side-by-side in a wrapping flex container. With long topic names and as new categories are published, this layout stacks multiple rows of chips, consuming excessive vertical space on mobile screens (320px–430px) and pushing the article list far below the fold. Replacing the permanently rendered chip list with an accessible, compact topic filter control—anchored to a bottom sheet on mobile and a dropdown popover on desktop—preserves valuable screen real estate, scales effortlessly to larger topic taxonomies, and delivers a polished, Apple-inspired editorial experience.

## What Changes

- **Compact Topic Filter Control**: Replace the permanently stacked category chip buttons with a unified, compact `Topics` button displaying a filter icon, an active badge/count of available topics, and current selection indicator.
- **Mobile Bottom Sheet Filter**: On mobile viewports, clicking the `Topics` button opens a lightweight, accessible bottom sheet containing:
  - Header with title ("Filter by topic" / "Filter berdasarkan topik") and dismissal close button.
  - Case-insensitive topic search input filtering categories dynamically in real time.
  - Topic options list with single-selection semantics matching the existing data model, clear active indicator, and internal scrolling.
  - Action footer with "Clear" / "Reset" and "Apply" / "Terapkan" controls.
  - Body scroll lock (`overflow: hidden` on body) while open, backdrop dismissal, and `Escape` key support with proper focus restoration.
- **Desktop Dropdown / Popover**: On desktop viewports, clicking `Topics` anchors a compact dropdown popover with search, keyboard navigation, and constrained max-height internal scroll without viewport overflow.
- **Separate Article Search & Topic State**: Article text search remains prominent, visible, and independent alongside the Topics button. Topic counts are dynamically derived from authentic post data (`src/data/blog.ts`).
- **Bilingual & Accessible**: Full EN/ID translation keys in `src/data/translations.ts`, ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-controls`), visible focus rings, and strict `prefers-reduced-motion` compliance.

## Capabilities

### Modified Capabilities

- `engineering-blog`: Updates the topic filtering interface requirements from static category pills to a compact, responsive filter control (bottom sheet on mobile, popover on desktop) with internal topic search and single-selection semantics.

## Impact

- `src/components/blog/blog-listing-content.tsx`: Refactored to replace stacked buttons with the compact filter component and responsive popover/sheet.
- `src/data/translations.ts`: Added bilingual strings for topics filter button, bottom sheet title, topic search placeholder, clear, apply, and empty state.
- `src/app/globals.css`: Added styles for topic filter button, desktop dropdown, mobile bottom sheet, backdrop, animations, and dark/light mode tokens.
- Zero external runtime dependencies added; pure React + CSS implementation.
