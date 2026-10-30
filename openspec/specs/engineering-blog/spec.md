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
