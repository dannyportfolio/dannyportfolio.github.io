# Project Directory Map

A high-level map of directory ownership and feature mappings. Use this guide to locate relevant files quickly without traversing the entire repository.

---

## Directory Ownership

```text
├── .agents/                 # Shared AI assistant skills and slash workflows
├── .claude/                 # Claude Code commands and skill definitions
├── .cursor/                 # Cursor commands and skill definitions
├── .gemini/                 # Gemini CLI / Antigravity commands and skill definitions
├── .github/                 # GitHub Actions workflows & Copilot prompt definitions
│   └── workflows/           # CI/CD (deploy-pages.yml)
├── docs/                    # Architecture, project map, and workflow documentation
├── openspec/                # OpenSpec specifications, active changes, and config
│   ├── changes/             # Active feature proposals and change deltas
│   ├── specs/               # Main baseline capability specifications
│   └── config.yaml          # OpenSpec project configuration
├── public/                  # Static assets served at root
│   ├── certificates/        # Authentic PDF credentials and WebP thumbnails
│   └── *.avif, *.png        # Profile and horizon artwork
└── src/
    ├── app/                 # Next.js App Router pages and global CSS
    │   ├── blog/            # Blog catalog and [slug] post routes
    │   ├── case-studies/    # Product architecture case study pages
    │   ├── engineering/     # Engineering notes and deep dives
    │   ├── projects/        # Project index page
    │   ├── resume/          # Interactive resume builder & print preview
    │   ├── globals.css      # Core design tokens, layers, and styles
    │   ├── layout.tsx       # Root HTML document structure and metadata
    │   └── page.tsx         # Homepage narrative composition
    ├── components/          # Reusable UI components by feature domain
    │   ├── blog/            # Blog cards and architecture diagrams
    │   ├── engineering/     # Terminal cards and request flow diagrams
    │   ├── layout/          # SiteHeader, SiteFooter, SiteShell
    │   ├── motion/          # ScrollReveal, ScrollProgress, Parallax
    │   ├── portfolio/       # CertificationsSection, Hero, Profile, Principles
    │   ├── projects/        # ProjectCard and catalog layout
    │   ├── resume/          # ResumeDocument, ResumeCustomizer, PrintButton
    │   └── ui/              # Primitive Badge, Button, ButtonLink
    ├── context/             # Global React contexts (locale-context.tsx)
    ├── data/                # Single source of truth data modules
    │   ├── posts/           # Blog post content modules
    │   ├── certifications.ts # Verified certificates, links, and thumbnails
    │   ├── education.ts     # Education and resume credential mapping
    │   ├── experience.ts    # Career history and responsibilities
    │   ├── profile.ts       # Profile facts, contact links, target roles
    │   ├── projects.ts      # Project case studies and metadata
    │   ├── skills.ts        # Categorized skills and core principles
    │   └── translations.ts  # EN / ID bilingual dictionary
    ├── hooks/               # Custom React hooks (useActiveSection, useReducedMotion)
    └── lib/                 # Utility functions (cn for classnames)
```

---

## Where to Make Common Changes

| Task / Change Request                   | Primary Files to Inspect & Edit                                                                                                                                                                                                                                                |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Add / update certifications**         | [`src/data/certifications.ts`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/data/certifications.ts), [`public/certificates/`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/public/certificates)                                                  |
| **Modify career history**               | [`src/data/experience.ts`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/data/experience.ts)                                                                                                                                                                   |
| **Add / edit projects or case studies** | [`src/data/projects.ts`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/data/projects.ts), [`src/app/case-studies/[slug]/page.tsx`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/app/case-studies/[slug]/page.tsx)                             |
| **Publish or edit blog articles**       | [`src/data/blog.ts`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/data/blog.ts), [`src/data/posts/`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/data/posts)                                                                                |
| **Update translations (EN / ID)**       | [`src/data/translations.ts`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/data/translations.ts)                                                                                                                                                               |
| **Design system, colors, spacing**      | [`src/app/globals.css`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/app/globals.css)                                                                                                                                                                         |
| **Navigation bar or footer links**      | [`src/components/layout/site-header.tsx`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/components/layout/site-header.tsx), [`site-footer.tsx`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/components/layout/site-footer.tsx)               |
| **Resume format or print output**       | [`src/components/resume/resume-document.tsx`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/components/resume/resume-document.tsx), [`src/app/resume/print/page.tsx`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/src/app/resume/print/page.tsx) |
| **New OpenSpec capability or change**   | [`openspec/specs/`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/openspec/specs), [`openspec/changes/`](file:///C:/Users/Lenovo%20X13/Documents/Danny%20Fachrudin/openspec/changes)                                                                               |
