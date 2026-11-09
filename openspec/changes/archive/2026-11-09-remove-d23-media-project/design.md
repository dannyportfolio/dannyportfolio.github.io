# Design: Remove D23 Media from Project Showcase

## Context

See `proposal.md` for motivation. Danial Fachrudin's portfolio showcases production software engineering work. D23 Media is being removed to keep the project list tightly focused on core engineering domains (LendLoop, OpsPilot, IDX LQ45 Trading Assistant, Veloura ERP).

## Goals / Non-Goals

**Goals:**

- Clean removal of `d23-media` project record from `src/data/projects.ts`.
- Clean removal of unused CSS classes `.project-card--d23-media` from `src/app/globals.css`.
- Update project description copy in `src/data/translations.ts` in English and Indonesian.
- Verify zero dead links or build errors during SSG generation (`npm run build`).

**Non-Goals:**

- Modifying blog posts or unrelated portfolio sections.
- Deleting the standalone `Insight by Danny` project repository/files outside this portfolio.

## Decisions

- **Decision 1: Immediate removal rather than deprecation flag.**
  - _Rationale_: The portfolio is a static site with no external API dependents consuming project JSON. Completely removing the entry simplifies maintainability and eliminates dead routes.
  - _Alternatives considered_: Setting `isArchived: true` (unnecessary complexity since projects array directly feeds SSG).

## Risks / Trade-offs

- **[Risk]** Existing links to `/case-studies/d23-media/` will return 404.
  - **Mitigation**: The portfolio includes a customized Next.js `not-found.tsx` handler with return navigation.
