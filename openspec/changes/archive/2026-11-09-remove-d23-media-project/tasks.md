# Tasks: Remove D23 Media from Project Showcase

## 1. Data & Content Updates

- [x] 1.1 Remove `d23-media` entry from `src/data/projects.ts`
- [x] 1.2 Update `projectsDescription` in `src/data/translations.ts` to remove reference to editorial AI systems
- [x] 1.3 Remove `.project-card--d23-media` styles and orb accents from `src/app/globals.css`

## 2. Specification & Verification

- [x] 2.1 Update `openspec/specs/portfolio-core/spec.md` to remove D23 Media from the projects section scenario
- [x] 2.2 Run `npm run typecheck` to verify no broken TypeScript references
- [x] 2.3 Run `npm run lint` to ensure ESLint passes cleanly
- [x] 2.4 Run `npm run format` to ensure Prettier passes
- [x] 2.5 Run `npm run build` to verify static export succeeds without `d23-media` route
- [x] 2.6 Run `npx openspec validate --specs` to verify baseline specifications
