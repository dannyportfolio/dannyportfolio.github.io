# Danny Fachrudin Portfolio

A fast, data-driven Next.js portfolio and ATS-friendly resume generator for a backend-focused software engineer.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Validate production quality with:

```bash
npm run lint
npm run typecheck
npm run build
```

## Edit content

All portfolio and resume content comes from the same source files under `src/data/`:

- `profile.ts` — identity, links, positioning, target-role summaries
- `skills.ts` — skill groups and deterministic role priorities
- `projects.ts` — project cards and case studies
- `experience.ts` — timeline and resume experience
- `education.ts` — education and certifications
- `engineering.ts` — engineering-note cards

Search for `TODO:` and complete [CONTENT_TODO.md](./CONTENT_TODO.md) before publishing. This starter intentionally does not invent career facts, project metrics, links, employers, or credentials.

## Resume generator

Visit `/resume` and choose Backend Engineer, Software Engineer, or Full Stack Engineer. Selection changes the summary and skill order through deterministic rules in `src/data/profile.ts` and `src/data/skills.ts`. The professional and detailed engineering formats share exactly the same data. `/resume/print` produces an A4, selectable-text document that can be saved through the browser print dialog.

## Deployment

Set your production domain in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`. Deploy to Vercel by importing the Git repository; no environment variables are required. Do not publish until placeholder contact links and `TODO:` content are replaced.
