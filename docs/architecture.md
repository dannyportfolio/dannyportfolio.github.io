# System Architecture & Technical Specifications

This document is the authoritative architectural reference for the Danial Fachrudin portfolio website. It provides future developers and AI coding agents with the exact system context needed to make targeted changes without scanning the entire repository.

---

## 1. High-Level Overview & Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.4
- **Language**: TypeScript 5.9.2 (strict typing)
- **Styling**: Tailwind CSS v4.1.14 (`@tailwindcss/postcss`) with custom CSS token layers in `src/app/globals.css`
- **Output Target**: Static Site Generation (`output: "export"` in `next.config.ts`)
- **Hosting / Deployment**: GitHub Pages via automated GitHub Actions workflow (`.github/workflows/deploy-pages.yml`)
- **Specification System**: OpenSpec (`@fission-ai/openspec`)

---

## 2. Core Architectural Decisions

### 2.1 Static Site Export (SSG)

The application generates purely static HTML/CSS/JS artifacts into the `out/` directory at build time.

- **No Node.js runtime in production**: Server Actions, dynamic API routes, and server-side request headers (`cookies()`, `headers()`) are not supported.
- **Image Optimization**: Configured as `images: { unoptimized: true }` in `next.config.ts`. Full-size images are optimized at authoring time (WebP/AVIF) and served statically from `public/`.
- **Trailing Slashes**: `trailingSlash: true` ensures predictable URL paths on static hosts (`/projects/index.html`).

### 2.2 Single Source of Truth for Data

All portfolio data, work history, case studies, engineering notes, and credentials live in typed TypeScript files in `src/data/`.

- **Zero Hallucination Policy**: No degrees, certifications, or professional metrics may be invented. Only verified data is included.
- **Synchronization**: Interactive pages (`/`, `/resume`, `/projects`) consume the same underlying data objects. For example, `src/data/education.ts` maps its certifications directly from `src/data/certifications.ts`.

### 2.3 Bilingual Localization (EN / ID)

Localization is client-driven via React Context (`src/context/locale-context.tsx`).

- Supported locales: `"en"` (English, default) and `"id"` (Bahasa Indonesia).
- Translations dictionary is located at `src/data/translations.ts`.
- Content items in `src/data/` define localized fields as `{ en: string; id: string }`.
- Switching languages updates the UI immediately without page reload or route restructuring.

### 2.4 Design System & Token Architecture

The visual language follows an Apple-inspired minimalist aesthetic defined in `src/app/globals.css`:

- **4 Surface Layers**:
  - Layer 1 (`--bg`): Main page backdrop (`#f9f9fb` light / `#101114` dark)
  - Layer 2 (`--surface`): Primary section cards and containers (`#ffffff` light / `#181a20` dark)
  - Layer 3 (`--surface-nested`, `--surface-strong`): Inset tiles, badge backgrounds, and secondary cards
  - Layer 4 (`--surface-contrast`): High-contrast dark bands used for principles and terminal components
- **Accents**: Restrained blue (`--accent: #335cd6` light / `#7897f5` dark) with soft tint borders.
- **Scroll Alignment**: Global `scroll-padding-top: 86px` prevents fixed header occlusion during anchor navigation.

---

## 3. Page Routes & Composition

| Route                   | Type                    | Purpose & Composition                                                                                                       |
| :---------------------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `/`                     | Client (`"use client"`) | Main story flow: Hero, Profile, Philosophy, Stack, Projects, Case Studies, Experience, Certifications, Principles, Contact. |
| `/projects/`            | Static Page             | Detailed grid of business and engineering projects with category tags.                                                      |
| `/case-studies/[slug]/` | Dynamic SSG             | Deep-dive architectural briefs (`generateStaticParams`).                                                                    |
| `/engineering/`         | Static Page             | Engineering notes, system architecture principles, and article library.                                                     |
| `/engineering/[slug]/`  | Dynamic SSG             | Focused engineering deep dives with interactive system flow diagrams.                                                       |
| `/blog/`                | Client Page             | Engineering blog index with real-time text search and category filtering.                                                   |
| `/blog/[slug]/`         | Dynamic SSG             | Bilingual technical articles with embedded SVG architecture diagrams.                                                       |
| `/resume/`              | Client Page             | ATS-friendly CV customizer with target role switching (Backend, Software, Fullstack).                                       |
| `/resume/print/`        | Client Page             | Minimalist, unadorned printable CV layout optimized for A4/Letter browser PDF export.                                       |

---

## 4. Key Component Boundaries

- **Layout Shell (`src/components/layout/`)**:
  - `SiteHeader`: Sticky navigation, locale toggle (EN/ID), dark/light theme switch, active section spy via `useActiveSection`.
  - `SiteFooter`: Bilingual scripture quote, quick links, copyright notice.
  - `SiteShell`: Wraps pages with header and footer.
- **Motion & Interactions (`src/components/motion/`)**:
  - `ScrollReveal`: Lightweight viewport entrance reveal with `--reveal-delay`. Automatically disables motion when `prefers-reduced-motion` is detected.
  - `ScrollProgress`: Sticky section indicator bar.
- **Certifications (`src/components/portfolio/certifications-section.tsx`)**:
  - Displays verified credentials in an ambient stage.
  - Supports accessible modal inspection (`role="dialog"`), document opening in a new tab, and external verification links (e.g. Credly).

---

## 5. Build, Linting, and Validation

```bash
# Development server
npm run dev

# TypeScript type validation (zero emit)
npm run typecheck

# ESLint check
npm run lint

# Code style check & formatting
npm run format:check
npm run format

# Production static export (outputs to out/)
npm run build

# OpenSpec specification validation
npx openspec validate --specs
```
