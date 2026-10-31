# Technical Design: Big O Notation and Algorithm Complexity Learning Experience

## Architecture Overview

The Big O learning experience spans two coordinated routes:

1. `/engineering` (Static reference handbook with interactive exploration)
2. `/blog/big-o-notation-algorithm-complexity` (Editorial deep-dive article with narrative progression)

Both pages adhere to the project's static site generation (`output: "export"`) constraints and require zero runtime server dependencies.

```
+------------------------------------------------------------------------+
|                          Danial Fachrudin Portfolio                    |
+------------------------------------------------------------------------+
                               |
         +---------------------+---------------------+
         |                                           |
         v                                           v
  /engineering                                     /blog
  (Engineering Knowledge Reference)                 (Long-Form Technical Article)
         |                                           |
         +--> Intro & Asymptotic Bounds (O, Ω, Θ)    +--> Narrative: 2 Devs Scenario
         +--> 7 Complexity Classes (Table & Cards)   +--> Step-by-Step Code Analysis
         +--> ComplexityGrowthExplorer (SVG Chart)   +--> Best, Average, Worst Case
         +--> Time vs Auxiliary Space Complexity     +--> Time vs Space Tradeoffs
         +--> 10-Step Code Analysis Walkthrough      +--> 10 Common Big O Mistakes
         +--> Engineering Tradeoffs (Cache, N size)  +--> Real-World Engineering Scenarios
         +--> Quick Reference Lookup Matrix          +--> Optimization Process
         +--> Cross-Link to /blog Article            +--> Cross-Link to /engineering
```

## Component Architecture

### 1. `ComplexityGrowthExplorer` (`src/components/engineering/complexity-growth-explorer.tsx`)

- **State Management**:
  - `inputSize` (`number`, default `16`, slider range `1` to `64`): Simulates input scale $n$.
  - `activeCurves` (`Record<string, boolean>`): Allows filtering individual curves for focused comparison.
  - `selectedPoint` (`number | null`): Tooltip inspection along the domain.
- **Mathematical Curves**:
  - Constant: $f(n) = 1$
  - Logarithmic: $f(n) = \max(1, \log_2(n))$
  - Linear: $f(n) = n$
  - Linearithmic: $f(n) = n \cdot \log_2(n)$
  - Quadratic: $f(n) = n^2$
  - Exponential: $f(n) = 2^n$ (capped for display to prevent layout clipping; annotated with overflow marker)
- **SVG Coordinate Transformation**:
  - Uses normalized coordinates ($[0, 500] \times [0, 320]$) with responsive `viewBox="0 0 500 320"`.
  - Responsive container with `overflow-x-auto` on narrow mobile screens (320px–375px).
  - High contrast stroke colors with CSS variable integration:
    - O(1): emerald (`#10b981`)
    - O(log n): sky (`#0284c7`)
    - O(n): amber (`#d97706`)
    - O(n log n): purple (`#8b5cf6`)
    - O(n²): rose (`#e11d48`)
    - O(2ⁿ): crimson (`#dc2626`)
  - Semantic labels, keyboard reachable inputs, and `role="region"` with `aria-label`.

### 2. `AlgorithmComplexityReference` (`src/components/engineering/algorithm-complexity-reference.tsx`)

- Embeds the 9 reference sections with clean typography and modular organization:
  - Section 1: Introduction to Algorithm Complexity (definitions of Time, Space, $n$, Growth Rate, Asymptotic Analysis).
  - Section 2: Big O, Big Omega ($\Omega$), Big Theta ($\Theta$) with mathematical proof demonstration $T(n) = 3n^2 + 5n + 10 \in \mathcal{O}(n^2)$.
  - Section 3: Detailed cards for the 7 complexity tiers with TypeScript snippets and typical use cases.
  - Section 4: Interactive `ComplexityGrowthExplorer`.
  - Section 5: Time Complexity vs Space Complexity (auxiliary space vs input space, stack memory in recursion).
  - Section 6: Systematic 10-step analysis guide with TypeScript code examples.
  - Section 7: Engineering trade-offs (constants, memory overhead, cache locality, input thresholds).
  - Section 8: Quick reference matrix.
  - Section 9: Companion article CTA to `/blog/big-o-notation-algorithm-complexity`.

### 3. Blog Article Structure (`src/data/posts/big-o-complexity.ts`)

- 11 comprehensive sections matching project schemas:
  - `id`: Unique kebab-case anchors for table-of-contents navigation.
  - Bilingual `title` and `paragraphs` arrays.
  - TypeScript code blocks with formatted explanations.
  - Responsive comparison tables with horizonal scroll containers.
  - Verification checklists and callouts (`note`, `tip`, `warning`).
  - Seamless integration with existing `BlogDetailContent`.

## Localization Strategy

- All content provided in natural, professional English and Indonesian.
- Computer science terminology retained in English where standard in Indonesian industry: Big O Notation, Time Complexity, Space Complexity, Input Size, Worst Case, Average Case, Best Case, Recursion, Memoization, Big Theta, Big Omega.
- Code blocks and keywords remain unchanged across languages.
- Strict compliance with Anti-Slop R-02: zero em dashes (`—`) in any prose or translations.
