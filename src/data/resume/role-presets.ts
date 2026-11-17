import type { SkillCategoryId } from "./master-profile.ts";

/**
 * Role presets select and reorder facts from the master profile without adding claims.
 */
export type RolePreset = {
  id: RoleId;
  label: string;
  tagline: string;
  focus: string[];
  categoryOrder: SkillCategoryId[];
  projectOrder: string[];
};

export const roleIds = ["software", "backend", "fullstack"] as const;

export type RoleId = (typeof roleIds)[number];

export const DEFAULT_ROLE: RoleId = "software";

export function isRoleId(value: unknown): value is RoleId {
  return typeof value === "string" && (roleIds as readonly string[]).includes(value);
}

export const rolePresets: Record<RoleId, RolePreset> = {
  software: {
    id: "software",
    label: "Software Engineer",
    tagline: "Backend, Full-Stack, Cloud Infrastructure",
    focus: [
      "API Design",
      "REST APIs",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Next.js",
      "Node.js",
      "AWS Lambda",
      "Docker",
      "CI/CD",
      "RBAC",
      "Data Modeling",
      "Integration Testing",
    ],
    categoryOrder: [
      "languages",
      "backend",
      "frontend",
      "databases",
      "cloud",
      "devops",
      "security",
      "testing",
      "architecture",
    ],
    projectOrder: [
      "opspilot",
      "lendloop",
      "veloura",
      "tragapos",
      "griya-properti",
      "astraops",
      "idx-trading-assistant",
    ],
  },
  backend: {
    id: "backend",
    label: "Backend Engineer",
    tagline: "APIs, PostgreSQL, Cloud Services",
    focus: [
      "REST APIs",
      "API Design",
      "PostgreSQL",
      "SQL",
      "Data Modeling",
      "Database Migrations",
      "Go",
      "Node.js",
      "TypeScript",
      "Multi-tenancy",
      "RBAC",
      "Transactional Outbox",
      "Idempotency",
      "AWS Lambda",
      "Redis",
    ],
    categoryOrder: [
      "languages",
      "backend",
      "databases",
      "architecture",
      "cloud",
      "security",
      "devops",
      "testing",
      "frontend",
    ],
    projectOrder: [
      "opspilot",
      "veloura",
      "lendloop",
      "tragapos",
      "griya-properti",
      "astraops",
      "idx-trading-assistant",
    ],
  },
  fullstack: {
    id: "fullstack",
    label: "Full Stack Engineer",
    tagline: "Next.js, TypeScript, Node.js, PostgreSQL",
    focus: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Convex",
      "Clerk",
      "Tailwind CSS",
      "RBAC",
      "Playwright",
      "Vitest",
      "Docker",
    ],
    categoryOrder: [
      "languages",
      "frontend",
      "backend",
      "databases",
      "security",
      "testing",
      "devops",
      "cloud",
      "architecture",
    ],
    projectOrder: [
      "lendloop",
      "veloura",
      "opspilot",
      "griya-properti",
      "astraops",
      "tragapos",
      "idx-trading-assistant",
    ],
  },
};
