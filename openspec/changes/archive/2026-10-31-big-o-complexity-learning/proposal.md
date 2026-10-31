# Proposal: Big O Notation and Algorithm Complexity Learning Experience

## Why

Understanding computational complexity is a core foundational discipline for software engineers designing production systems. Many developers struggle to bridge the gap between theoretical asymptotic bounds (Big O, Big Omega, Big Theta) and real-world engineering constraints such as CPU cache locality, memory allocations, and database query planning.

This change introduces a comprehensive, dual-surface educational experience across Danny's developer portfolio:

1. `/engineering`: An interactive, structured Engineering Knowledge Reference acting as a compact engineering handbook.
2. `/blog`: An in-depth, long-form technical article ("Big O Notation Explained: A Practical Guide to Algorithm Complexity") detailing mathematical foundations, step-by-step code analysis, common engineering mistakes, and production optimization patterns.

The two surfaces complement each other without duplicating content: the engineering page provides instant lookup, visual growth comparisons, and structured analysis workflows, while the blog article provides an immersive editorial narrative with practical scenarios, deep TypeScript code walkthroughs, and system trade-offs.

## What Changes

- **Bilingual Deep-Dive Blog Post**:
  - New article `big-o-notation-algorithm-complexity` authored in both English and Indonesian in `src/data/posts/big-o-complexity.ts`.
  - Fully integrated into `src/data/blog.ts` with metadata, tags, 11 detailed sections, TypeScript examples, callouts, tables, verification checklists, and cross-references to `/engineering`.
  - Reading time approximately 14 minutes, automatically calculated from authentic content.

- **Interactive Complexity Growth Explorer**:
  - A lightweight, responsive SVG-based interactive chart (`ComplexityGrowthExplorer`) comparing growth curves for O(1), O(log n), O(n), O(n log n), O(n^2), and O(2^n).
  - Interactive input size slider (n = 1 to 64 with capped display values to prevent exponential layout breakage), curve focus toggles, and live operation count breakdown.
  - Fully accessible, zero external visualization libraries, adhering strictly to dark and light theme tokens.
  - Embedded seamlessly within `/engineering` and optionally inside `/blog` via `BlogDetailContent`.

- **Engineering Knowledge Reference Handbook on `/engineering`**:
  - Integrated into `src/app/engineering/page.tsx` with 9 structured technical subsections:
    1. Introduction: Understanding Algorithm Complexity (Time, Space, Input Size n, Growth Rate, Asymptotic Analysis).
    2. Big O Notation Explained (Upper bound O, lower bound Omega, tight bound Theta, reduction of T(n) = 3n^2 + 5n + 10).
    3. Common Time Complexities (O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n), O(n!) with practical examples and TypeScript snippets).
    4. Visual Complexity Comparison (embedding ComplexityGrowthExplorer).
    5. Time Complexity vs Space Complexity (auxiliary space vs input storage, recursion call stack, merge sort tradeoffs).
    6. How to Analyze Code Complexity (10-step systematic process with TypeScript examples and reasoning).
    7. Engineering Trade-offs (constants, cache locality, input thresholds, benchmarking).
    8. Quick Reference matrix for rapid engineering lookup.
    9. Further Learning linking directly to the companion blog article.
  - Preserves existing portfolio features, principles grid, and backend article cards.

- **Bilingual Translations & Typography**:
  - Adds complete English and Indonesian strings in `src/data/translations.ts` and `src/data/algorithm-complexity.ts`.
  - Zero em dashes (`—`) across all UI copy and translations, strictly adhering to Anti-Slop R-02.
  - Full WCAG AA color contrast and keyboard navigation.

## Capabilities

### Modified Capabilities

- `engineering-blog`: Expands the article catalog with algorithmic complexity taxonomy and adds responsive interactive diagram support for complexity growth visualization.
- `portfolio-core`: Expands the `/engineering` knowledge surface to host an interactive algorithm complexity reference handbook while preserving existing backend architecture notes.

## Impact

- `src/data/posts/big-o-complexity.ts`: New bilingual blog post data file.
- `src/data/blog.ts`: Registers the new post in the blog catalog.
- `src/data/algorithm-complexity.ts`: Dedicated structured reference data module for complexities, TypeScript examples, and analysis walkthroughs.
- `src/data/translations.ts`: Expanded with bilingual translations for reference sections, badges, explorer controls, and captions.
- `src/components/engineering/complexity-growth-explorer.tsx`: New interactive SVG chart component.
- `src/components/engineering/algorithm-complexity-reference.tsx`: New comprehensive reference component for `/engineering`.
- `src/components/blog/blog-detail-content.tsx`: Enhanced to support embedding `complexity-growth` diagrams.
- `src/app/engineering/page.tsx`: Updated to feature the reference handbook alongside existing principles and articles.
- `src/app/globals.css`: Added styles for the complexity growth chart, complexity comparison matrix, code analysis blocks, and interactive controls.
- Zero external runtime dependencies added; pure Next.js 16 + React 19 + Tailwind CSS 4.
