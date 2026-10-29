# Tasks: Refine Homepage Experience

- [x] 1. Update `src/data/profile.ts` to remove Instagram from `contactLinks` while preserving verified Email and GitHub links.
- [x] 2. Update `src/data/translations.ts` with consolidated EN/ID strings for the hero, interactive engineering focus rail, contact channel labels, and localized footer Bible verse.
- [x] 3. Redesign `src/components/portfolio/hero-parallax.tsx` to remove the Latest Project announcement, preserve headline and CTAs, and introduce the interactive engineering focus rail and pointer-aware ambient lighting.
- [x] 4. Update `src/app/page.tsx` to refine `ContactSection` (two-channel accessible cards/links), localize `ExperienceSection` heading emphasis, add `id="principles"`, and apply restrained `ScrollReveal` wrappers.
- [x] 5. Refactor `src/components/layout/site-footer.tsx` to render a single locale-driven Bible verse block using `useLocale()`.
- [x] 6. Update `src/app/globals.css` (and `src/components/layout/site-header.tsx` if needed) to remove obsolete `.hero-announcement` and dual-verse styles, refine hero/contact/footer styling, improve dark-mode primary button contrast, fix mobile header crowding, unify sticky-header scroll offsets, optimize `.scroll-reveal` transitions, and enforce `prefers-reduced-motion`.
- [x] 7. Run formatting, lint, typecheck, production build, OpenSpec validation, and multi-viewport Chrome CDP responsive/interaction audits (320px–1440px).
