# Resume System Architecture

The `/resume/` and `/resume/print/` routes implement a minimalist, ATS-compatible resume generator backed by a single verified source of truth.

## Single Source of Truth

- `src/data/resume/master-profile.ts`: Holds candidate contact details, summary components, career history (`2021 - 2023` Software Engineer and `2023 - Present` Freelance Software Engineer), categorized technical skills, selected projects, verified certifications, languages, work preferences, and `informationGaps` (facts not yet verified).
- `src/data/resume/role-presets.ts`: Defines the 3 supported target roles (`software` default, `backend`, `fullstack`) and their summary/skill/project priorities.
- Portfolio modules (`src/data/profile.ts`, `src/data/experience.ts`, `src/data/skills.ts`, `src/data/education.ts`) derive directly from `masterProfile`.

## Assembly & Print Pipeline

- `src/lib/resume/build-resume.ts`: Pure builder `buildResume(profile, { role, detailed })` that assembles a normalized `ResumeModel` from `masterProfile`. Standard mode renders 3 selected projects; detailed mode renders 4 projects with architecture summaries.
- `src/lib/resume/filename.ts`: Generates ATS-safe PDF filenames such as `Danial_Fachrudin_Software_Engineer_Resume`.
- `src/components/resume/resume-document.tsx`: Single-column semantic HTML A4 resume layout with body-embedded contact details, clear section hierarchy, and print-safe spacing.
- `src/components/resume/resume-page-content.tsx`: Minimalist customizer with 3 target role buttons, Standard/Detailed toggle, `Print / Save PDF` link (`/resume/print/?role=...`), and live A4 preview.
- `src/components/resume/resume-print-content.tsx`: Standalone A4 print view with a screen-only toolbar (`Back to customizer`, dynamic filename badge, and `PrintButton`) that sets `document.title` before calling `window.print()`.
