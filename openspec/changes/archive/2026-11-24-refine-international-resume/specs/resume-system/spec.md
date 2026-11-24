# Delta Specification: Resume System

## ADDED Requirements

### Requirement: International Resume Curation in Standard Mode

In Standard mode (`detailed: false`), the system SHALL keep the resume concise and internationally uniform by limiting the summary to the opening, the top-ranked role sentence, and closing, capping each skill category to its top role-prioritized skills, and curating certifications to English-language, internationally recognized credentials, while Detailed mode (`detailed: true`) continues to expose the full verified profile.

#### Scenario: Standard Mode Conciseness and English Credential Curation

- **WHEN** `buildResume` is called with `detailed: false`
- **THEN** `summary` includes the opening, 1 top-ranked role sentence, and closing; each skill category is capped to at most 4 top-ranked skills; and `certifications` excludes non-English course titles

#### Scenario: Detailed Mode Full Profile

- **WHEN** `buildResume` is called with `detailed: true`
- **THEN** `summary` includes 3 top-ranked role sentences, all verified skills per category are included, and all verified certifications are included

### Requirement: Spoken Languages Section Rendering

The system SHALL render a `Languages` section in `ResumeDocument` whenever `model.languages` contains one or more entries, and omit the section when `model.languages` is empty.

#### Scenario: Languages Omitted When Unverified

- **WHEN** `model.languages` is empty
- **THEN** `ResumeDocument` does not render a `Languages` section
