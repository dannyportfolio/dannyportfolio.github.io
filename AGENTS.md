# AGENTS.md — AI Coding Agent Guidelines

Welcome to the Danial Fachrudin portfolio repository. This document is the primary entry point for coding agents. Read this file first to understand the architecture, boundaries, and low-token workflow guidelines before inspecting source files.

---

## 1. Project Overview & Tech Stack

- **Purpose**: Professional portfolio and ATS-compliant resume platform for Danial Fachrudin (Software Engineer).
- **Core Stack**: Next.js 16.1.6 (App Router), React 19.2.4, TypeScript 5.9.2, Tailwind CSS v4.1.14.
- **Output Mode**: Static Site Generation (`output: "export"` in `next.config.ts`, deployed to GitHub Pages).
- **Zero Hallucination Policy**: Strictly enforce authentic credentials and project metrics. Never invent unverified degrees, work history, or certifications.
- **Specification System**: OpenSpec (`@fission-ai/openspec`).

---

## 2. Essential Documentation Links

- **Architecture Reference**: [`docs/architecture.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/architecture.md) — High-level design, SSG constraints, design tokens, routing, and data flow.
- **Project Directory Map**: [`docs/project-map.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/project-map.md) — Directory ownership and file mapping for common changes.
- **Development & OpenSpec Workflow**: [`docs/development-workflow.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/development-workflow.md) — Change lifecycle, OpenSpec commands, and validation.
- **Baseline Specifications**: [`openspec/specs/`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/openspec/specs) — Official capability requirements.

---

## 3. Standard Verification Commands

Always run commands via `npm` or `npx`:

```bash
# Typecheck (zero emit)
npm run typecheck

# Linting
npm run lint

# Code style
npm run format:check
npm run format

# Production static export (outputs to out/)
npm run build

# Validate OpenSpec specifications
npx openspec validate --specs
```

---

## 4. Low-Token Agent Workflow

To conserve context tokens and maintain high implementation precision, follow this 5-step protocol on every request:

### Step 1: Read Minimal Context

At the start of a task, inspect **only**:

1. This `AGENTS.md` file.
2. The specific feature entry in [`docs/project-map.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/project-map.md) to locate relevant files.
3. Relevant OpenSpec artifacts in `openspec/` if working on a specified feature.
   _Do not read the entire repository or traverse unrelated directories by default._

### Step 2: Classify the Request

Use this decision tree to pick the lightest appropriate workflow:

- **Small bug fix or copy change**: Inspect only the target file (e.g. `src/data/translations.ts`), apply change, run `npm run typecheck` and `npm run lint`. No OpenSpec change required.
- **Isolated visual tweak**: Inspect the target component and relevant rules in `src/app/globals.css`. Test responsive alignment and themes. No OpenSpec change required.
- **New feature or meaningful behavior change**: Use OpenSpec (`npx openspec new change <name>` or `/opsx-propose`). Author `proposal.md`, delta `spec.md`, and `tasks.md` before writing application code.
- **Architectural change**: Review [`docs/architecture.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/architecture.md), update baseline specs under `openspec/specs/`, and validate with `npx openspec validate --specs`.

### Step 3: Targeted File Inspection

- Consult [`docs/project-map.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/project-map.md) to find the primary owner file.
- Follow imports only as far as necessary to understand direct interfaces.
- Reuse existing primitives (`Badge`, `ButtonLink`, `ScrollReveal`, `SiteShell`).
- Preserve existing comments and docstrings.

### Step 4: Implement Against the Specification

- Adhere strictly to the approved scope.
- Maintain existing coding style, typography hierarchy, and Apple-inspired aesthetic.
- Support both English and Indonesian in `src/data/translations.ts` for any user-facing strings.
- Ensure light and dark themes remain visually balanced.

### Step 5: Validate and Conclude

Run the relevant checks and report actual execution results:

1. `npm run format:check`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
5. `npx openspec validate --specs` (if specifications were added/updated)
6. If an OpenSpec change was created, archive it upon completion: `npx openspec archive <change-name>`.

---

## 5. Documentation Maintenance & Anti-Drift Rules

- **Source Code is King**: Keep fine-grained implementation details in code and comments; do not mirror every private function in Markdown.
- **Update Only on Real Change**:
  - Update [`docs/architecture.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/architecture.md) only when routing, build targets, or architecture boundaries shift.
  - Update [`docs/project-map.md`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/docs/project-map.md) only when directories or file responsibilities are added or moved.
  - Update [`openspec/specs/`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/openspec/specs) whenever capability requirements evolve.
- **Zero Hallucination**: Never record assumptions as verified requirements.
