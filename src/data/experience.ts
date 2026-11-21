import { masterProfile } from "./resume/master-profile.ts";

export type Experience = {
  company: string;
  companyUrl?: string;
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
  "80and-company": ["TypeScript", "Node.js", "NestJS", "Go (Golang)"],
};

const roleSummaries: Record<string, string> = {
  freelance:
    "Independent freelance practice delivering full-stack web applications, REST APIs, relational data models, authentication/RBAC, and cloud deployments from requirements to production.",
  "80and-company":
    "Worked remotely with 80&Company under a seasonal contract in an international professional environment across the TypeScript, Node.js, NestJS, and Go ecosystems, strengthening backend engineering capabilities, adaptability, and remote collaboration.",
};

export const experiences: Experience[] = masterProfile.experience.map((entry) => ({
  company: entry.organization,
  companyUrl: entry.organizationUrl,
  position: entry.title,
  employmentType: entry.id === "80and-company" ? "Seasonal Contract" : "Freelance",
  period: entry.periodLabel ?? `${entry.startYear} - ${entry.endYear}`,
  location: entry.location === "Remote" ? "Remote · Available internationally" : entry.location,
  responsibilities: entry.bullets.map((bullet) => bullet.text),
  technologies: roleTechnologies[entry.id] ?? [],
  contributions: [roleSummaries[entry.id] ?? entry.bullets[0]?.text ?? ""],
}));
