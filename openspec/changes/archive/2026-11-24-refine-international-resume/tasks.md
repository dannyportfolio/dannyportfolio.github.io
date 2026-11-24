# Tasks: Refine International Resume Standards

- [ ] 1. Update `src/data/resume/master-profile.ts` terminology (`80&Company` `"Contract"`, `LendLoop` `"Full-Stack Systems Build"`) without fabricating unverified facts.
- [ ] 2. Update `src/lib/resume/build-resume.ts` to tighten Standard mode summary, cap Standard mode skills per category, curate Standard mode certifications, and enrich header location readiness.
- [ ] 3. Update `src/components/resume/resume-document.tsx` to render `model.languages` when non-empty.
- [ ] 4. Add/update unit tests in `tests/resume.test.ts` covering Standard vs Detailed curation, summary length, and languages omission.
- [ ] 5. Run `npm test`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npx openspec validate --specs`, then archive the OpenSpec change.
