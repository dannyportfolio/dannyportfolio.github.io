# Design: Integrate Legacy IHSG Market Analysis Project

## Context

See `proposal.md` for motivation. The portfolio platform is a static export Next.js application (`output: "export"`) with strict bilingual support (EN/ID) and an Apple-inspired minimalist design aesthetic. Legacy work in quantitative finance (`masket-ai-asisstant`) must be showcased accurately without live demo fabrication.

## Goals / Non-Goals

**Goals:**
- Provide authentic representation of the Python/pandas quantitative pipeline for IDX LQ45 stocks.
- Standardize project data in `src/data/projects.ts` with architecture steps, verified GitHub repository link, technical indicators (CMF, Wyckoff VPA), and data quality validation gates.
- Maintain consistent visual styling across light and dark themes using CSS radial gradient tokens.
- Ensure automated verification passes (typecheck, lint, formatting, SSG static export, OpenSpec validation).

**Non-Goals:**
- No synthetic live web application or simulated portfolio return calculator.
- No dynamic server-side trade execution or automated real-time broker integration.

## Decisions

- **Decision 1: Direct link to repository only.**
  - *Rationale*: The quantitative pipeline is a CLI-driven batch process, not a hosted web SaaS. Providing a repository URL adheres to the zero-hallucination policy.
  - *Alternatives considered*: Building a mock dashboard (rejected for violating zero-hallucination).

- **Decision 2: Emerald/cyan visual identity.**
  - *Rationale*: Differentiates financial technology and market analytics from editorial media (blue) and ERP (violet) while remaining cohesive with the portfolio's palette.
  - *Alternatives considered*: Generic monochrome (lacks visual distinction in project grid).

## Risks / Trade-offs

- **[Risk]** Visitors might expect a hosted interactive dashboard.
  - **Mitigation**: Highlight CLI architecture steps, file-based artifact generation, and verified GitHub repository badge explicitly.
