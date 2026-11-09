# Proposal: Remove D23 Media from Project Showcase

## Why

Per user instruction, D23 Media (Insight by Danny) is being removed from the portfolio project catalog. The portfolio focuses directly on systems engineering, full-stack community workflows (LendLoop), serverless architecture (OpsPilot), quantitative market data pipelines (IDX LQ45 Trading Assistant), and enterprise manufacturing systems (Veloura ERP).

## What Changes

1. **Data Model (`src/data/projects.ts`):**
   - Remove the `d23-media` entry from the `projects` array.

2. **Design Tokens & Styling (`src/app/globals.css`):**
   - Remove `.project-card--d23-media` CSS rules (light and dark mode radial gradients and orb accents).

3. **Translations (`src/data/translations.ts`):**
   - Update `projectsDescription` in English and Indonesian to remove the mention of "interactive editorial AI systems" / "sistem editorial AI interaktif".

4. **OpenSpec Baseline Specification (`portfolio-core`):**
   - Update `Scenario: Compact Projects Section Presentation` in `specs/portfolio-core/spec.md` to remove D23 Media from the primary projects list.

## Capabilities

### Modified Capabilities

- `portfolio-core`: Updates `Scenario: Compact Projects Section Presentation` to exclude D23 Media and feature LendLoop, OpsPilot, and IDX LQ45 Trading Assistant as primary compact cards.

## Impact

- Static page `/case-studies/d23-media/` will no longer be generated.
- No external dependencies or breaking changes.
