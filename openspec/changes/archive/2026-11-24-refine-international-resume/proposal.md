# Proposal: Refine International Resume Standards

## Why

An audit of the resume against international engineering hiring and ATS standards showed that while the single-column layout and technical depth are strong, Standard mode renders an overly dense summary (~4-6 sentences), all ~46 skills without role-level capping, Indonesian-titled Udemy certificates alongside international credentials, and omits rendering `model.languages` in `ResumeDocument`. In addition, `80&Company` uses `"Seasonal Contract"` instead of `"Contract"`.

## What Changes

- Tighten Standard mode summary composition in `buildResume` to 1 role-prioritized middle sentence (between opening and closing) while keeping Detailed mode expanded.
- Cap Standard mode skills per category to top role-relevant entries (keeping all categories and full skill list in Detailed mode).
- Curate Standard mode certifications to internationally recognized English-language credentials (AWS Academy, HackerRank), while Detailed mode retains all verified certificates.
- Combine location and remote/relocation readiness in the resume header contact line when Standard mode is active, or keep it concise.
- Render `model.languages` in `ResumeDocument` when `languages` is non-empty, preserving the zero-fabrication omission rule when empty.
- Update `80&Company` employment type/location terminology from `"Seasonal Contract"` to `"Contract"` and `LendLoop` context label from `"Technical Assessment"` to `"Full-Stack Systems Build"` in `master-profile.ts`.

## Impact

- `src/data/resume/master-profile.ts`
- `src/lib/resume/build-resume.ts`
- `src/components/resume/resume-document.tsx`
- `tests/resume.test.ts`
- `openspec/specs/resume-system/spec.md`
