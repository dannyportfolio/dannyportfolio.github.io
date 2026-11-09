# Proposal: Integrate Legacy IHSG Market Analysis Project

## Why

Danial Fachrudin developed an audit-ready, batch-oriented quantitative market analysis pipeline for the Indonesian Stock Market (IDX LQ45) in the legacy repository `https://github.com/dannyportfolio/masket-ai-asisstant`. Integrating this project into the personal portfolio highlights verified competencies in financial technology, market-data ingestion architecture, algorithmic data validation, Chaikin Money Flow (CMF), Wyckoff Volume Price Analysis (VPA), and macro regime circuit breakers.

## What Changes

1. **OpenSpec Specification (`openspec/specs/portfolio-core/spec.md`):**
   - Update `Scenario: Compact Projects Section Presentation` to include the verified IDX LQ45 Trading Assistant project card alongside existing projects (D23 Media, LendLoop, OpsPilot) and replace the legacy exclusion clause with verified repository integration.

2. **Data Model (`src/data/projects.ts`):**
   - Add `idx-trading-assistant` project entry with domain `github.com/dannyportfolio/masket-ai-asisstant`, verified GitHub URL, bilingual summaries, problems, constraints, architectural steps, and tech stack tags (`Python`, `pandas`, `NumPy`, `yfinance`, `ta`, `Fincept Engine`, `pytest`).
   - Strictly avoid fabricated financial claims, simulated ROI, or fake live deployment links.

3. **Styling & Visual Design (`src/app/globals.css`):**
   - Add `.project-card--idx-trading-assistant` styling with an emerald/cyan financial precision gradient for both light and dark themes.

4. **Verification & Quality Gates:**
   - Execute typecheck, lint, build, and OpenSpec validation to verify zero regressions.
