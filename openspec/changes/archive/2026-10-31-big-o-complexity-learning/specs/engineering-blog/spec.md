## ADDED Requirements

### Requirement: Algorithm Complexity Educational Article

The system SHALL publish a long-form technical article titled "Big O Notation Explained: A Practical Guide to Algorithm Complexity" (`big-o-notation-algorithm-complexity`) with complete English and Indonesian translations.

#### Scenario: Reading the Big O Technical Article

- **WHEN** a visitor navigates to `/blog/big-o-notation-algorithm-complexity`
- **THEN** the system renders the article with 11 structured sections covering asymptotic upper bounds, Big Omega, Big Theta, complexity classes (O(1) through O(n!)), step-by-step TypeScript analysis, space vs time complexity, common engineering mistakes, production system scenarios, and optimization workflows.

#### Scenario: Switching Languages on the Article

- **WHEN** a visitor selects English or Bahasa Indonesia on the article page
- **THEN** all section titles, summaries, prose, callouts, and table contents render seamlessly in the selected language without modifying code snippets.

### Requirement: Interactive Complexity Growth Explorer

The system SHALL provide an interactive SVG-based complexity growth explorer comparing growth rates across O(1), O(log n), O(n), O(n log n), O(n²), and O(2ⁿ).

#### Scenario: Adjusting Input Size

- **WHEN** a user adjusts the input size slider or triggers an input value
- **THEN** the chart recalculates operation counts dynamically and updates the curve plots and operation comparison table without layout distortion.

#### Scenario: Toggling Complexity Curves

- **WHEN** a user toggles individual complexity curves on or off
- **THEN** the chart isolates the selected curves for focused visual comparison.

### Requirement: Engineering Knowledge Reference Handbook

The system SHALL render a structured algorithm complexity reference on the `/engineering` page featuring asymptotic bounds definitions, comparison tables, code analysis steps, and trade-offs.

#### Scenario: Cross-Referencing Knowledge Surfaces

- **WHEN** a visitor accesses the engineering reference on `/engineering`
- **THEN** navigation links allow direct transition to the deep-dive article on `/blog` and vice versa.
