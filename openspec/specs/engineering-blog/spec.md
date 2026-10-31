# Engineering Blog Specification

## Purpose

Provides a technical article library covering software architecture, performance engineering, distributed systems, and modern development workflows with search and language localization.

## Requirements

### Requirement: Article Listing and Filtering

The system SHALL enable visitors to browse, search, and filter technical articles through an independent article search input and a compact topic filter control.

#### Scenario: Searching Articles

- **WHEN** a visitor types a query into the blog search input
- **THEN** the article list filters in real time matching article titles, summaries, and tags independently of topic filtering

#### Scenario: Category Filtering

- **WHEN** a visitor selects a category from the compact topic filter control
- **THEN** only articles matching the selected category are displayed

### Requirement: Interactive Architecture Visualizations

The system SHALL embed responsive, interactive SVG or diagram components within deep-dive engineering case studies and blog posts.

#### Scenario: Viewing Technical Diagrams

- **WHEN** a visitor reads an engineering deep dive
- **THEN** system architecture diagrams render responsively with proper dark/light theme contrast and accessible labels

### Requirement: Compact Responsive Topic Filter Control

The system SHALL render a compact topic filter trigger displaying a filter icon, topic count, and active selection indicator, opening a responsive bottom sheet on mobile and an anchored dropdown popover on desktop.

#### Scenario: Opening Topics on Mobile

- **WHEN** a visitor triggers the Topics control on a mobile viewport
- **THEN** a modal bottom sheet opens containing a topic search input, scrollable topic list, clear action, apply action, and close dismissal mechanism while background scrolling is disabled

#### Scenario: Opening Topics on Desktop

- **WHEN** a visitor triggers the Topics control on a desktop viewport
- **THEN** a compact dropdown popover anchored to the button opens with a topic search input, scrollable topic list, and clear action without horizontal or vertical viewport overflow

#### Scenario: Searching Topics Dynamically

- **WHEN** a visitor enters text into the topic search input inside the filter sheet or popover
- **THEN** the list of available topics filters dynamically and case-insensitively in real time

#### Scenario: Keyboard Dismissal and Focus Management

- **WHEN** a visitor presses the Escape key or activates a close trigger
- **THEN** the topic filter sheet or popover closes smoothly and returns focus to the Topics trigger button

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
