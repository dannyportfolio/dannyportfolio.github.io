# Proposal: Refresh Latest Projects & Engineering Quality Assurance

## Why

Danial Fachrudin's latest engineering work includes **D23 Media (Insight by Danny)**, a high-craft editorial publishing and Socratic AI companion platform built on Next.js 15, MDX, and Web Speech API. Showcasing this project alongside **LendLoop** (Next.js 16 + Convex + n8n) and **OpsPilot** (Go + AWS Lambda + Hexagonal Architecture) directly demonstrates senior-level full-stack, backend, and software architecture competencies.

Old projects such as `masket-ai-asisstant` remain strictly excluded from any newly introduced listings.

## What Changes

1. **Data Model (`src/data/projects.ts`):**
   - Added `d23-media` with complete, verified architectural steps, problem context, constraints, and engineering contributions in both English and Indonesian.
   - Maintained strict zero-hallucination standards.
2. **Design & Theming (`src/app/globals.css`):**
   - Added `.project-card--d23-media` translucent editorial color theme in light and dark modes.
   - Styled real technology preview tags in the project card blueprint header/body.
3. **Card Presentation (`src/components/projects/project-card.tsx`):**
   - Replaced artificial skeleton preview bars with authentic technology tags from the project's tech stack.
4. **Translations (`src/data/translations.ts`):**
   - Updated `projectsDescription` to reflect editorial AI systems, workflow automation, and serverless architectures.
5. **SEO & Structured Data (`src/app/layout.tsx`):**
   - Added verified LinkedIn profile URL to JSON-LD `sameAs` array.
