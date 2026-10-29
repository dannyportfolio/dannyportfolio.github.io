# Technical Design: Homepage Experience & Interaction Refinement

## Architecture & Component Mapping

1. **Data & Localization (`src/data/profile.ts`, `src/data/translations.ts`)**:
   - Remove `instagram` from `profile.contactLinks` (and unused `instagram` property) in `src/data/profile.ts`, retaining verified `email` (`danialf.business@gmail.com`) and `github` (`https://github.com/dannyportfolio`).
   - Consolidate hero copy, interactive engineering focus items, contact channel metadata, and footer guiding verse translations (`Proverbs 16:3 (NIV)` and `Amsal 16:3 (TB)`) inside `src/data/translations.ts` as the single bilingual source of truth.

2. **Homepage Hero (`src/components/portfolio/hero-parallax.tsx`, `src/app/globals.css`)**:
   - Delete the `.hero-announcement` JSX element and all `.hero-announcement*` CSS rules.
   - Structure `.hero-content` with clean editorial hierarchy: identity eyebrow → two-line balanced `<h1>` ("Building Systems" / _"That Perform."_) → supporting positioning copy → primary/secondary CTAs → full-container `.hero-ledger` interactive focus rail.
   - Add an interactive 3-pillar focus switcher (`01 Backend Architecture`, `02 Data & Performance`, `03 Production Delivery`) using semantic `<button>` triggers (`aria-pressed`), keyboard navigation, concise authentic descriptions, and smooth anchor jump links (`#philosophy`, `#projects`, `#case-studies`) alongside availability status (`#contact`).
   - Add lightweight pointer-guided ambient lighting via CSS custom properties (`--hero-glow-x`, `--hero-glow-y`) updated in `requestAnimationFrame` only on fine pointers when reduced motion is inactive.

3. **Scroll & Section Flow (`src/app/page.tsx`, `src/components/motion/scroll-reveal.tsx`, `src/app/globals.css`)**:
   - Remove `section.projects-story { scroll-margin-top: 0; }` and unify anchor scroll offset via `html { scroll-padding-top: 84px; }` and `section[id] { scroll-margin-top: 84px; }` (with `scroll-padding-top` alone governing root anchor scrolling cleanly so offsets do not double-stack).
   - Add `id="principles"` to `PrinciplesSection` so `SiteHeader`'s `useActiveSection` tracks all sections accurately, and localize `ExperienceSection`'s emphasized title (`t.experienceTitleEm[locale]`).
   - Wrap homepage section headings and project cards in `ScrollReveal` with restrained stagger, and remove `filter: blur(4px)` from `.scroll-reveal` so transitions animate only `opacity` and `transform`.

4. **Contact & Footer (`src/app/page.tsx`, `src/components/layout/site-footer.tsx`, `src/app/globals.css`)**:
   - Upgrade `.contact-links` in `ContactSection` to a balanced two-channel layout displaying Email (`danialf.business@gmail.com`) and GitHub (`github.com/dannyportfolio`) with clear icons, accessible `aria-label`s, `:focus-visible` outlines, and `>= 48px` touch targets.
   - Refactor `SiteFooter` to render a single `<figure className="footer-verse__block" lang={locale}>` controlled by `useLocale()`, removing `.footer-verse__grid` dual columns and its divider.
