# Proposal: Update Resume Career Positioning & Automated Experience Tenure

## Why

The resume data in `src/data/resume/master-profile.ts` currently omits the `2021 - 2023` software engineering period, causing ATS parsers and readers to see 2023 (when independent freelance client acquisition began) as the start of Danial Fachrudin's engineering career. Additionally, the experience years counter is static rather than incrementing automatically every January from the 2021 baseline, and role presets lack a Systems & Cloud Infrastructure option.

## What Changes

- Restore the distinct `2021 - 2023` foundational Software Engineer entry in `masterProfile.experience`, separate `2023 - Present` independent client practice/entrepreneurship, and place `April 2026 - November 2026` (`80&Company` seasonal contract) in reverse-chronological order.
- Add a deterministic experience-years calculation helper (`getEngineeringYears`) anchored to `masterProfile.timeline.engineeringSince` (2021) so experience automatically increments by 1 every January (e.g. `5+ years` in 2026, `6+ years` in January 2027), with hydration-safe client sync on static exports.
- Rewrite the professional summary and experience bullets to emphasize 5+ years of hands-on engineering, backend/systems architecture, and independent client delivery without inventing unverified metrics, companies, or degrees.
- Add a `systems` (`Systems & Cloud Engineer`) role preset and project context labels (`Client Production System`, `Architecture & Systems Build`, `Technical Assessment`).
- Align portfolio derivatives (`experience.ts`, `profile.ts`, `translations.ts`, `journey.ts`), `docs/resume-system.md`, and `tests/resume.test.ts`.
