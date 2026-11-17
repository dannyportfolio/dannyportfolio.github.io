import { masterProfile } from "./resume/master-profile.ts";

export type Experience = {
  company: string;
  position: string;
  employmentType: string;
  period: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
  contributions: string[];
};

const roleTechnologies: Record<string, string[]> = {
  freelance: [
    "TypeScript",
    "Next.js",
    "Node.js",
    "Go",
    "PostgreSQL / MySQL",
    "Docker",
    "AWS Lambda",
  ],
  "early-career": ["JavaScript", "TypeScript", "REST APIs", "PostgreSQL / MySQL"],
};

const roleSummaries: Record<string, string> = {
  freelance:
    "Independent freelance practice delivering full-stack web applications, REST APIs, relational data models, authentication/RBAC, and cloud deployments from requirements to production.",
  "early-career":
    "Built web applications, backend APIs, and relational SQL schemas while establishing foundational engineering and deployment workflows.",
};

export const experiences: Experience[] = masterProfile.experience.map((entry) => ({
  company: entry.organization,
  position: entry.title,
  employmentType: entry.id === "freelance" ? "Freelance" : "Independent",
  period: `${entry.startYear} - ${entry.endYear}`,
  location: entry.location === "Remote" ? "Remote · Available internationally" : entry.location,
  responsibilities: entry.bullets.map((bullet) => bullet.text),
  technologies: roleTechnologies[entry.id] ?? [],
  contributions: [roleSummaries[entry.id] ?? entry.bullets[0]?.text ?? ""],
}));
