/**
 * Master professional profile: the single source of truth for every resume variant.
 *
 * Rules for editing:
 * - `status: "verified"` means the fact is backed by a public repository, a live demo,
 *   a credential document, or this repository itself (see `evidence`).
 * - `status: "user-provided"` means the owner stated it but no public artifact proves it yet.
 * - Anything unknown goes into `informationGaps` and is never rendered.
 * - Role presets and job tailoring may only select, reorder, and emphasize entries here.
 */
import { certificates } from "../certifications.ts";
import { projects } from "../projects.ts";

export type FactStatus = "verified" | "user-provided";

export type SkillCategoryId =
  | "languages"
  | "backend"
  | "frontend"
  | "databases"
  | "cloud"
  | "devops"
  | "security"
  | "testing"
  | "architecture";

export type ProfileSkill = {
  name: string;
  category: SkillCategoryId;
  status: FactStatus;
  /** Project slugs or "experience" / "portfolio-site" that demonstrate the skill. */
  evidence: string[];
};

export type ExperienceBullet = {
  text: string;
  /** Canonical skill names this bullet demonstrates; drives relevance ranking. */
  tags: string[];
};

export type ProfileExperience = {
  id: string;
  title: string;
  organization: string;
  organizationUrl?: string;
  location: string;
  employmentType: string;
  startYear: number;
  endYear: number | "Present";
  periodLabel?: string;
  defaultBulletLimit?: number;
  status: FactStatus;
  bullets: ExperienceBullet[];
};

export type ProfileProject = {
  slug: string;
  /** Short resume title; the long portfolio name stays in projects.ts. */
  title: string;
  subtitle: string;
  context?: string;
  status: FactStatus;
  link?: { label: string; href: string };
  stack: string[];
  bullets: ExperienceBullet[];
  /** One-line architecture note used by the detailed resume. */
  architecture: string;
};

export type SummarySentence = { text: string; tags: string[] };

export type ProfileEducation = {
  institution: string;
  credential: string;
  period: string;
  details?: string;
  status: FactStatus;
};

export type ProfileCertification = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  status: FactStatus;
};

export type ProfileLanguage = {
  language: string;
  proficiency: string;
};

export type ProfileAchievement = {
  text: string;
  evidence: string;
  status: FactStatus;
};

export type ProfileOverrides = {
  phone?: string;
  location?: string;
  workArrangement?: string;
  relocation?: string;
  education?: ProfileEducation[];
  languages?: ProfileLanguage[];
  additionalNotes?: string;
};

export const skillCategoryLabels: Record<SkillCategoryId, string> = {
  languages: "Programming Languages",
  backend: "Backend Engineering",
  frontend: "Frontend Engineering",
  databases: "Databases",
  cloud: "Cloud Infrastructure",
  devops: "DevOps & CI/CD",
  security: "Security & Authentication",
  testing: "Testing & Quality Engineering",
  architecture: "System Architecture",
};

function projectUrl(slug: string): string {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown project slug in master profile: ${slug}`);
  return project.githubUrl ?? project.url;
}

function linkLabel(href: string): string {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function projectLink(slug: string) {
  const href = projectUrl(slug);
  return { label: linkLabel(href), href };
}

const aws = certificates.find((cert) => cert.id === "aws-academy-cloud-foundations");

export const ENGINEERING_START_YEAR = 2021;
export const FREELANCE_START_YEAR = 2023;

/**
 * Computes completed calendar years of software engineering experience from 2021.
 * Automatically increments by 1 every January (e.g., 5 in 2026, 6 in January 2027).
 */
export function getEngineeringYears(
  startYear: number = ENGINEERING_START_YEAR,
  referenceDate: Date = new Date(),
): number {
  return Math.max(0, referenceDate.getFullYear() - startYear);
}

export function formatSummaryOpening(
  startYear: number = ENGINEERING_START_YEAR,
  referenceDate: Date = new Date(),
): string {
  const years = getEngineeringYears(startYear, referenceDate);
  return `Software engineer with ${years}+ years of hands-on experience (since ${startYear}) building backend services, REST APIs, relational data models, and full-stack web applications, with independent client delivery and freelance business operations since ${FREELANCE_START_YEAR}.`;
}

export const masterProfile = {
  identity: {
    name: "Danial Fachrudin",
    preferredName: "Danny",
    location: "Indonesia",
    remote: "Open to remote work and relocation",
  },
  contact: {
    email: "danialfacrudin@gmail.com",
    portfolio: "https://dannyportfolio.github.io",
    github: "https://github.com/dannyportfolio",
    linkedin: "https://www.linkedin.com/in/danialfachrudin23/",
  },
  /** Overall software engineering start vs. independent freelance start. */
  timeline: { engineeringSince: ENGINEERING_START_YEAR, freelanceSince: FREELANCE_START_YEAR },

  summary: {
    opening: formatSummaryOpening(ENGINEERING_START_YEAR),
    sentences: [
      {
        text: "Designs REST APIs and relational data models in PostgreSQL and MySQL, with authentication, role-based access control, and multi-tenant isolation enforced on the server.",
        tags: ["REST APIs", "PostgreSQL", "MySQL", "RBAC", "API Design", "Multi-tenancy"],
      },
      {
        text: "Builds backend services in TypeScript/Node.js and Go using hexagonal and clean architecture, including a Go REST API that runs as both a standalone HTTP server and an AWS Lambda function behind API Gateway.",
        tags: [
          "Go",
          "Node.js",
          "TypeScript",
          "AWS Lambda",
          "API Gateway",
          "Serverless",
          "Hexagonal Architecture",
        ],
      },
      {
        text: "Ships full-stack products with Next.js and React, from data model and API contract to responsive, accessible interfaces.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Accessibility"],
      },
      {
        text: "Operates Docker, Docker Compose, Kubernetes (K3s), AWS SAM, and GitHub Actions CI/CD pipelines, handling schema migrations, automated testing, and production debugging.",
        tags: [
          "Docker",
          "Kubernetes (K3s)",
          "AWS SAM",
          "CI/CD",
          "GitHub Actions",
          "Database Migrations",
          "Production Debugging",
        ],
      },
      {
        text: "Applies event-driven patterns such as the transactional outbox, signed webhooks, and idempotent background jobs to keep distributed integrations reliable.",
        tags: ["Event-Driven Architecture", "Webhooks", "Idempotency", "n8n", "Background Jobs"],
      },
    ] as SummarySentence[],
    closing:
      "Combines technical ownership across architecture, implementation, and operations with direct client acquisition, requirements scoping, and remote international contract delivery.",
  },

  skills: [
    // Programming Languages
    {
      name: "TypeScript",
      category: "languages",
      status: "verified",
      evidence: ["lendloop", "veloura", "portfolio-site"],
    },
    {
      name: "JavaScript",
      category: "languages",
      status: "verified",
      evidence: ["lendloop", "portfolio-site"],
    },
    { name: "Go", category: "languages", status: "verified", evidence: ["opspilot", "tragapos"] },
    { name: "SQL", category: "languages", status: "verified", evidence: ["opspilot", "veloura"] },
    {
      name: "Python",
      category: "languages",
      status: "verified",
      evidence: ["idx-trading-assistant"],
    },
    // Backend Engineering
    {
      name: "Node.js",
      category: "backend",
      status: "verified",
      evidence: ["lendloop", "griya-properti"],
    },
    {
      name: "REST APIs",
      category: "backend",
      status: "verified",
      evidence: ["opspilot", "astraops"],
    },
    { name: "NestJS", category: "backend", status: "verified", evidence: ["griya-properti"] },
    { name: "Go net/http", category: "backend", status: "verified", evidence: ["opspilot"] },
    { name: "Gin", category: "backend", status: "verified", evidence: ["tragapos"] },
    { name: "Convex", category: "backend", status: "verified", evidence: ["lendloop"] },
    { name: "WebSockets", category: "backend", status: "verified", evidence: ["tragapos"] },
    { name: "Webhooks", category: "backend", status: "verified", evidence: ["lendloop"] },
    { name: "Background Jobs", category: "backend", status: "verified", evidence: ["lendloop"] },
    { name: "n8n", category: "backend", status: "verified", evidence: ["lendloop"] },
    {
      name: "Zod",
      category: "backend",
      status: "verified",
      evidence: ["griya-properti", "astraops"],
    },
    // Frontend Engineering
    {
      name: "Next.js",
      category: "frontend",
      status: "verified",
      evidence: ["lendloop", "veloura", "portfolio-site"],
    },
    {
      name: "React",
      category: "frontend",
      status: "verified",
      evidence: ["lendloop", "griya-properti", "portfolio-site"],
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      status: "verified",
      evidence: ["veloura", "griya-properti", "portfolio-site"],
    },
    {
      name: "TanStack Query",
      category: "frontend",
      status: "verified",
      evidence: ["griya-properti"],
    },
    {
      name: "Accessibility",
      category: "frontend",
      status: "verified",
      evidence: ["lendloop", "portfolio-site"],
    },
    // Databases
    {
      name: "PostgreSQL",
      category: "databases",
      status: "verified",
      evidence: ["opspilot", "veloura", "tragapos"],
    },
    { name: "MySQL", category: "databases", status: "user-provided", evidence: ["experience"] },
    { name: "Redis", category: "databases", status: "verified", evidence: ["griya-properti"] },
    { name: "MongoDB", category: "databases", status: "verified", evidence: ["griya-properti"] },
    { name: "SQLite", category: "databases", status: "verified", evidence: ["tragapos"] },
    {
      name: "Database Migrations",
      category: "databases",
      status: "verified",
      evidence: ["opspilot"],
    },
    {
      name: "Data Modeling",
      category: "databases",
      status: "verified",
      evidence: ["veloura", "opspilot"],
    },
    // Cloud Infrastructure
    { name: "AWS Lambda", category: "cloud", status: "verified", evidence: ["opspilot"] },
    { name: "API Gateway", category: "cloud", status: "verified", evidence: ["opspilot"] },
    { name: "AWS SAM", category: "cloud", status: "verified", evidence: ["opspilot"] },
    { name: "Serverless", category: "cloud", status: "verified", evidence: ["opspilot"] },
    { name: "Vercel", category: "cloud", status: "verified", evidence: ["veloura", "astraops"] },
    { name: "GitHub Pages", category: "cloud", status: "verified", evidence: ["portfolio-site"] },
    // DevOps & CI/CD
    {
      name: "Docker",
      category: "devops",
      status: "verified",
      evidence: ["opspilot", "lendloop", "tragapos"],
    },
    {
      name: "Docker Compose",
      category: "devops",
      status: "verified",
      evidence: ["opspilot", "lendloop"],
    },
    { name: "Kubernetes (K3s)", category: "devops", status: "verified", evidence: ["tragapos"] },
    {
      name: "GitHub Actions",
      category: "devops",
      status: "verified",
      evidence: ["portfolio-site"],
    },
    { name: "Git", category: "devops", status: "verified", evidence: ["portfolio-site"] },
    { name: "CI/CD", category: "devops", status: "verified", evidence: ["portfolio-site"] },
    { name: "Structured Logging", category: "devops", status: "verified", evidence: ["opspilot"] },
    {
      name: "Production Debugging",
      category: "devops",
      status: "user-provided",
      evidence: ["experience"],
    },
    // Security & Authentication
    {
      name: "JWT",
      category: "security",
      status: "verified",
      evidence: ["opspilot", "griya-properti"],
    },
    {
      name: "RBAC",
      category: "security",
      status: "verified",
      evidence: ["opspilot", "lendloop", "veloura"],
    },
    { name: "OAuth 2.0", category: "security", status: "verified", evidence: ["griya-properti"] },
    { name: "Clerk", category: "security", status: "verified", evidence: ["lendloop"] },
    { name: "HMAC Signing", category: "security", status: "verified", evidence: ["lendloop"] },
    {
      name: "Rate Limiting",
      category: "security",
      status: "verified",
      evidence: ["opspilot", "astraops"],
    },
    { name: "Multi-tenancy", category: "security", status: "verified", evidence: ["opspilot"] },
    // Testing & Quality Engineering
    { name: "Playwright", category: "testing", status: "verified", evidence: ["lendloop"] },
    { name: "Vitest", category: "testing", status: "verified", evidence: ["lendloop"] },
    { name: "Go testing", category: "testing", status: "verified", evidence: ["opspilot"] },
    {
      name: "pytest",
      category: "testing",
      status: "verified",
      evidence: ["idx-trading-assistant"],
    },
    {
      name: "Integration Testing",
      category: "testing",
      status: "verified",
      evidence: ["lendloop", "opspilot"],
    },
    // System Architecture
    {
      name: "API Design",
      category: "architecture",
      status: "verified",
      evidence: ["opspilot", "astraops"],
    },
    { name: "OpenAPI", category: "architecture", status: "verified", evidence: ["opspilot"] },
    {
      name: "Hexagonal Architecture",
      category: "architecture",
      status: "verified",
      evidence: ["opspilot"],
    },
    {
      name: "Clean Architecture",
      category: "architecture",
      status: "verified",
      evidence: ["griya-properti", "tragapos"],
    },
    {
      name: "Microservices",
      category: "architecture",
      status: "verified",
      evidence: ["griya-properti"],
    },
    {
      name: "Event-Driven Architecture",
      category: "architecture",
      status: "verified",
      evidence: ["lendloop", "tragapos"],
    },
    {
      name: "Transactional Outbox",
      category: "architecture",
      status: "verified",
      evidence: ["lendloop", "tragapos"],
    },
    {
      name: "Idempotency",
      category: "architecture",
      status: "verified",
      evidence: ["lendloop", "astraops"],
    },
  ] satisfies ProfileSkill[] as ProfileSkill[],

  experience: [
    {
      id: "80and-company",
      title: "Backend Engineer",
      organization: "80&Company",
      organizationUrl: "https://80and.co/en",
      location: "Remote · Seasonal Contract",
      employmentType: "Seasonal Contract",
      startYear: 2026,
      endYear: 2026,
      periodLabel: "April 2026 - November 2026",
      defaultBulletLimit: 2,
      status: "user-provided",
      bullets: [
        {
          text: "Contributed remotely as a Backend Engineer under a seasonal contract in an international engineering environment across TypeScript, Node.js, NestJS, and Go.",
          tags: ["TypeScript", "Node.js", "NestJS", "Go"],
        },
        {
          text: "Delivered backend engineering tasks across distributed remote workflows, maintaining code quality, API reliability, and cross-team collaboration.",
          tags: ["TypeScript", "Node.js", "NestJS", "Go", "API Design"],
        },
      ],
    },
    {
      id: "freelance",
      title: "Independent Software Engineer & Founder",
      organization: "Independent Practice",
      location: "Remote",
      employmentType: "Freelance / Independent Practice",
      startYear: 2023,
      endYear: "Present",
      defaultBulletLimit: 5,
      status: "user-provided",
      bullets: [
        {
          text: "Launched an independent software engineering practice in 2023, directly acquiring clients, scoping business workflows, defining architecture, and managing end-to-end delivery.",
          tags: ["Requirements Gathering", "Data Modeling", "System Design", "API Design"],
        },
        {
          text: "Engineered and delivered commercial client systems including AstraOps (B2B freight quoting and waybill tracking for PT Trukindo Logistik Prima) and Veloura ERP (garment manufacturing and multi-warehouse inventory ledger for PT Veloura Yogyakarta).",
          tags: ["Next.js", "TypeScript", "PostgreSQL", "REST APIs", "System Design"],
        },
        {
          text: "Designed relational schemas and transactional workflows in PostgreSQL and MySQL (indexing, migrations, append-only ledgers, and state machines), enforcing server-side RBAC, JWT, and OAuth 2.0.",
          tags: [
            "PostgreSQL",
            "MySQL",
            "Database Migrations",
            "Data Modeling",
            "SQL",
            "RBAC",
            "JWT",
            "OAuth 2.0",
          ],
        },
        {
          text: "Built REST APIs and full-stack web applications in TypeScript, Node.js, Go, Next.js, and React, integrating third-party services, signed webhooks, and administrative dashboards.",
          tags: ["REST APIs", "Node.js", "TypeScript", "Go", "Next.js", "React", "Webhooks"],
        },
        {
          text: "Containerized services with Docker and automated deployments via CI/CD pipelines to managed hosting and serverless platforms.",
          tags: ["Docker", "CI/CD", "GitHub Actions", "Vercel", "Serverless", "AWS Lambda"],
        },
        {
          text: "Investigated and resolved production issues across APIs, failed deployments, third-party integrations, and security boundaries after handoff.",
          tags: ["Production Debugging", "Structured Logging", "Security"],
        },
      ],
    },
    {
      id: "foundational-engineering",
      title: "Software Engineer",
      organization: "Independent Engineering & Software Projects",
      location: "Indonesia",
      employmentType: "Foundational Engineering",
      startYear: 2021,
      endYear: 2023,
      defaultBulletLimit: 3,
      status: "user-provided",
      bullets: [
        {
          text: "Started software engineering in 2021 following vocational Software Engineering (Rekayasa Perangkat Lunak) training, building core competence in backend services, relational databases, and web applications.",
          tags: ["Data Modeling", "REST APIs", "TypeScript", "JavaScript", "SQL"],
        },
        {
          text: "Designed and implemented early software systems across TypeScript/JavaScript, Node.js, Go, Python, and SQL, establishing practical habits in API design, schema modeling, and Git workflows.",
          tags: ["Node.js", "Go", "Python", "SQL", "Git", "API Design"],
        },
        {
          text: "Built cloud and containerization fundamentals across Docker, Linux workflows, and AWS Academy Cloud Foundations (completed October 2023) prior to launching independent client services.",
          tags: ["Docker", "CI/CD", "Serverless"],
        },
      ],
    },
  ] satisfies ProfileExperience[] as ProfileExperience[],

  projects: [
    {
      slug: "opspilot",
      title: "OpsPilot",
      subtitle: "Serverless multi-tenant task REST API in Go",
      context: "Architecture & Systems Build",
      status: "verified",
      link: projectLink("opspilot"),
      stack: ["Go", "AWS Lambda", "API Gateway", "PostgreSQL", "JWT", "RBAC", "AWS SAM", "Docker"],
      bullets: [
        {
          text: "Built a multi-tenant task API in Go with hexagonal architecture; domain packages have no dependency on net/http or database drivers.",
          tags: ["Go", "Hexagonal Architecture", "REST APIs", "API Design", "Go net/http"],
        },
        {
          text: "One http.Handler tree serves both a standalone HTTP server and an AWS Lambda adapter for API Gateway HTTP API v2, packaged with AWS SAM for ARM64.",
          tags: ["AWS Lambda", "API Gateway", "AWS SAM", "Serverless"],
        },
        {
          text: "Enforced tenancy from verified JWT claims instead of request bodies, with role-based middleware, token revocation, and per-IP rate limiting.",
          tags: ["JWT", "RBAC", "Multi-tenancy", "Rate Limiting"],
        },
        {
          text: "Added versioned up/down SQL migrations, parameterized tenant-scoped PostgreSQL queries, a capped Lambda connection pool, and an OpenAPI 3.1 contract.",
          tags: ["PostgreSQL", "Database Migrations", "SQL", "OpenAPI", "Data Modeling"],
        },
      ],
      architecture:
        "Ports-and-adapters core with PostgreSQL and in-memory repositories, structured JSON logging (log/slog), and Docker Compose for local PostgreSQL.",
    },
    {
      slug: "lendloop",
      title: "LendLoop",
      subtitle: "Neighborhood tool-lending platform",
      context: "Technical Assessment",
      status: "verified",
      link: projectLink("lendloop"),
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Clerk",
        "Convex",
        "n8n",
        "Docker",
        "Vitest",
        "Playwright",
      ],
      bullets: [
        {
          text: "Built a full-stack lending platform with Next.js, Clerk authentication, and a Convex backend covering listings, borrow requests, loan approval, and returns.",
          tags: ["Next.js", "React", "TypeScript", "Clerk", "Convex"],
        },
        {
          text: "Enforced role and ownership checks inside server mutations and never trusted client-supplied user IDs or roles.",
          tags: ["RBAC", "Security", "Convex"],
        },
        {
          text: "Wrote state changes and outbox events in one transaction, then delivered them to n8n through HMAC SHA-256 signed webhooks with replay protection.",
          tags: [
            "Transactional Outbox",
            "Webhooks",
            "HMAC Signing",
            "n8n",
            "Event-Driven Architecture",
          ],
        },
        {
          text: "Scheduled overdue reminders with compound idempotency keys to prevent duplicates; covered by 28 Vitest unit/integration tests and 10 Playwright end-to-end tests.",
          tags: ["Idempotency", "Background Jobs", "Vitest", "Playwright", "Integration Testing"],
        },
      ],
      architecture:
        "Next.js App Router client, Convex ACID mutations with secondary indexes, containerized n8n workflows for notifications, overdue cron, and authenticated write-backs.",
    },
    {
      slug: "veloura",
      title: "Veloura ERP",
      subtitle: "Fashion manufacturing and distribution ERP",
      context: "Client Production System (PT Veloura Yogyakarta)",
      status: "verified",
      link: projectLink("veloura"),
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
      bullets: [
        {
          text: "Built a modular ERP covering garment production work orders, procurement and goods receipt, multi-warehouse inventory, and B2B/D2C sales.",
          tags: ["Next.js", "TypeScript", "Data Modeling", "System Design"],
        },
        {
          text: "Modeled inventory as an append-only PostgreSQL ledger with atomic transactions, so stock balances are derived rather than overwritten.",
          tags: ["PostgreSQL", "SQL", "Data Modeling", "Idempotency"],
        },
        {
          text: "Implemented state machines for production and sales orders, multi-role access control, and Zod validation at module boundaries.",
          tags: ["RBAC", "Zod", "API Design"],
        },
        {
          text: "Isolated the public demo from internal data with a separate display mode deployed on Vercel.",
          tags: ["Vercel", "Security"],
        },
      ],
      architecture:
        "Next.js App Router modules (inventory, sales, procurement, production, QC) over PostgreSQL with audit trails and an isolated public demo mode.",
    },
    {
      slug: "tragapos",
      title: "TragaPOS",
      subtitle: "Offline-first commerce engine in Go",
      context: "Architecture & Systems Build",
      status: "verified",
      link: projectLink("tragapos"),
      stack: ["Go", "Gin", "PostgreSQL", "SQLite", "WebSockets", "Kubernetes (K3s)", "Docker"],
      bullets: [
        {
          text: "Built one Go codebase that compiles to a cloud target (PostgreSQL on Kubernetes) and an edge target (SQLite WAL, CGO disabled).",
          tags: ["Go", "PostgreSQL", "SQLite", "Kubernetes (K3s)", "Clean Architecture"],
        },
        {
          text: "Synced offline sales to the cloud through a transactional outbox with UUIDv7 identifiers, and pushed kitchen and gate events over WebSockets.",
          tags: ["Transactional Outbox", "Event-Driven Architecture", "WebSockets", "Gin"],
        },
      ],
      architecture:
        "Clean Architecture Go service with an APP_MODE switch, offline Ed25519 QR ticket verification, and a WebSocket hub for kitchen displays.",
    },
    {
      slug: "griya-properti",
      title: "Griya Properti",
      subtitle: "Real estate platform on NestJS microservices",
      context: "Architecture & Systems Build",
      status: "verified",
      link: projectLink("griya-properti"),
      stack: [
        "NestJS",
        "TypeScript",
        "Redis",
        "MongoDB",
        "Zod",
        "React",
        "TanStack Query",
        "Docker",
      ],
      bullets: [
        {
          text: "Split identity, listings, and leads into NestJS microservices behind an API gateway, communicating over Redis with shared Zod contracts.",
          tags: ["NestJS", "Microservices", "Redis", "Zod", "Node.js", "Clean Architecture"],
        },
        {
          text: "Implemented cookie-based JWT auth with refresh token rotation and reuse detection, Google OAuth, rate limiting, and ownership checks against IDOR.",
          tags: ["JWT", "OAuth 2.0", "Rate Limiting", "Security", "RBAC"],
        },
      ],
      architecture:
        "API gateway with Helmet and throttling, four NestJS services over Redis RPC, and a React 19 client with TanStack Query.",
    },
    {
      slug: "astraops",
      title: "AstraOps",
      subtitle: "B2B freight quoting and waybill tracking platform",
      context: "Client Production System (PT Trukindo Logistik Prima)",
      status: "verified",
      link: projectLink("astraops"),
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
      bullets: [
        {
          text: "Built a public quote and waybill tracking portal backed by an idempotent ingestion API with token-bucket rate limiting.",
          tags: ["Next.js", "REST APIs", "Idempotency", "Rate Limiting", "API Design"],
        },
        {
          text: "Modeled the lead lifecycle as a PostgreSQL state machine with append-only event logs and Zod boundary validation.",
          tags: ["PostgreSQL", "Data Modeling", "Zod"],
        },
      ],
      architecture:
        "Public portal and internal operations tooling separated by a fail-closed showcase gate.",
    },
    {
      slug: "idx-trading-assistant",
      title: "IDX LQ45 Trading Assistant",
      subtitle: "Quantitative market analysis pipeline",
      context: "Architecture & Systems Build",
      status: "verified",
      link: projectLink("idx-trading-assistant"),
      stack: ["Python", "pandas", "NumPy", "yfinance", "pytest"],
      bullets: [
        {
          text: "Built a batch quantitative analysis pipeline for Indonesian equities with prioritized multi-provider OHLCV ingestion, retry backoff, and stale-cache fallback.",
          tags: ["Python", "Data Modeling", "CI/CD"],
        },
        {
          text: "Enforced a data-quality gate rejecting zero-volume sessions and missing candles without fabricating price bars; tested offline with pytest.",
          tags: ["Python", "pytest", "Integration Testing"],
        },
      ],
      architecture:
        "CLI batch pipeline with provider fallback registry, data-quality validation gate, macro index regime filter, and auditable CSV/JSON exports.",
    },
  ] satisfies ProfileProject[] as ProfileProject[],

  education: [] as ProfileEducation[],

  certifications: aws
    ? [
        {
          name: aws.title,
          issuer: aws.issuer,
          year: aws.year ?? "",
          url: aws.verificationUrl,
          status: "verified" as FactStatus,
        },
      ]
    : ([] as ProfileCertification[]),

  achievements: [] as ProfileAchievement[],

  languages: [] as ProfileLanguage[],

  preferences: {
    workArrangement: "Open to remote, hybrid, or on-site roles, including contract engagements.",
    relocation: "Open to relocating to the Netherlands, Germany, or the United States.",
  },

  references: [] as { name: string; role: string; contact: string }[],

  /** Facts the owner must confirm before they can appear on a resume. */
  informationGaps: [
    "Employer, internship, or studio name and exact months for 2021 to 2023 (currently shown as Foundational Engineering & Software Projects).",
    "Specific deliverables or systems at 80&Company (April 2026 - November 2026) beyond the verified contract summary.",
    "Start and end months for each role (ATS systems compute tenure from dates; years only are shown for 2021-2023 and 2023-Present).",
    "Client names or industries that may be listed for freelance work.",
    "Measurable outcomes (users, latency, cost, delivery time) that can be stated with evidence.",
    "Education: institution, degree or program, and dates.",
    "Spoken languages and proficiency (for example Indonesian and English).",
    "Phone number, if it should appear on the resume.",
    "Evidence for MySQL and production debugging beyond the owner's statement.",
  ],
};

export type MasterProfile = typeof masterProfile;
