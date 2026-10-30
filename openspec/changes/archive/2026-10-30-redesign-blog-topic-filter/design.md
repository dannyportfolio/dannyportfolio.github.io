# Design: Blog Topic Filter Redesign

## Context

The current blog listing in `src/components/blog/blog-listing-content.tsx` permanently renders all category pills horizontally above the search bar. With long category names (such as "Cloud Architecture & Infrastructure" and "DevOps & Cloud Infrastructure"), this causes multi-line wrapping on mobile devices (320px–430px), consuming over 200px of vertical space before any article content appears.

See `proposal.md` and `specs/engineering-blog/spec.md` for functional requirements.

## Goals / Non-Goals

**Goals:**

- Replace the static chip cloud with a unified, compact `Topics` control alongside the search bar.
- Provide a dedicated mobile modal bottom sheet with backdrop overlay, search input, scrollable topic list, clear action, apply action, and dismissal.
- Provide an anchored desktop dropdown popover with search input and internal scrolling.
- Prevent background scroll while the mobile bottom sheet is active.
- Support complete keyboard accessibility (`Escape` key dismissal, focus trapping/restoration, and ARIA attributes).
- Keep topic counts dynamically derived from `blogPosts` without data duplication.
- Fully localize all labels and UI text in EN and ID.

**Non-Goals:**

- Introducing multi-selection topic filtering (existing behavior is strictly single-selection).
- Modifying blog post schemas, articles, or route structure.
- Introducing third-party UI libraries (such as Radix or Headless UI).

## Decisions

1. **Component Architecture (`src/components/blog/blog-topic-filter.tsx`)**:
   - Extract the topic filtering UI into an isolated, reusable client component `BlogTopicFilter`.
   - Props: `selectedCategory: string`, `onSelectCategory: (category: string) => void`, `categories: string[]`, `categoryCounts: Record<string, number>`, `totalPosts: number`.
   - Rationale: Isolates state management (modal open/close, internal search query, focus handling, scroll locking) from the main listing card feed.

2. **Responsive Layout Strategy (Mobile Bottom Sheet vs. Desktop Popover)**:
   - Use CSS media queries (`@media (max-width: 640px)`) combined with a detected mobile flag for responsive behavior.
   - On screens `<= 640px`: Fixed full-screen overlay backdrop with a slide-up bottom sheet pinned to the bottom of the viewport (`max-height: 85vh`, rounded top corners, touch-friendly scroll, explicit "Clear" and "Apply" actions).
   - On screens `> 640px`: Anchored absolute popover beneath the trigger button (`max-height: 380px`, width ~ 320px, subtle border, restrained elevation shadow, internal scrolling).
   - Rationale: Single semantic DOM tree styled responsively avoids hydration mismatches while delivering native feel on both platforms.

3. **Single Selection & Staged State**:
   - Maintain the single-selection model (`"all"` or specific category string).
   - In the mobile sheet, maintain a temporary draft selection until the user taps "Apply" or "Clear", allowing effortless cancellation without immediate unwanted filter triggers. On desktop, selection updates immediately with clear visual feedback.

4. **Dynamic Topic Derivation & Counts**:
   - Derive categories and item counts dynamically from `blogPosts.map(p => p.category[locale])`.
   - Display topic count badge on the main trigger button (`Topics (5)`) and item counts beside each topic option in the list.

5. **Accessibility & Scroll Management**:
   - Body scroll locking via `document.body.style.overflow = "hidden"` while the mobile bottom sheet is open.
   - Escape key listener on `window` to close the dialog.
   - Click-outside detection to dismiss desktop popover.
   - Semantic ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-expanded`, `role="listbox"`, `role="option"`.

## Risks / Trade-offs

- **[Risk] Long category strings overflowing button or popover** → Mitigation: Use CSS `text-overflow: ellipsis`, `overflow: hidden`, and flex wrapping/truncation inside options to ensure long strings wrap or truncate gracefully at 320px width.
- **[Risk] Mobile keyboard pushing bottom sheet awkwardly** → Mitigation: Use `max-height: 85vh` with flex layout so header, search input, and action buttons remain pinned while only the topic list scrolls (`overflow-y: auto`).
- **[Risk] Background scroll locking leaving orphaned styles** → Mitigation: Clean up `overflow` style inside `useEffect` return function to guarantee reset on unmount.
