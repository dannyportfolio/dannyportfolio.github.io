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
  "80and-company": ["TypeScript", "Node.js", "NestJS", "Go (Golang)"],
  freelance: [
    "TypeScript",
    "Next.js",
    "Node.js",
    "Go",
    "PostgreSQL / MySQL",
    "Docker",
    "AWS Lambda",
  ],
  "foundational-engineering": [
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Go",
    "Python",
    "SQL",
    "Docker",
  ],
};

const roleSummaries: Record<string, string> = {
  "80and-company":
    "Contributed remotely as a Backend Engineer under a seasonal international contract across TypeScript, Node.js, NestJS, and Go services.",
  freelance:
    "Launched independent software engineering practice in 2023, acquiring clients directly and delivering production web platforms, REST APIs, relational data models, and cloud deployments.",
  "foundational-engineering":
    "Started software engineering in 2021, building core backend, database, web application, and cloud fundamentals prior to launching independent client services in 2023.",
};

export const experiences: Experience[] = masterProfile.experience.map((entry) => ({
  company: entry.organization,
  companyUrl: entry.organizationUrl,
  position: entry.title,
  employmentType: entry.employmentType,
  period: entry.periodLabel ?? `${entry.startYear} - ${entry.endYear}`,
  location: entry.location === "Remote" ? "Remote · Available internationally" : entry.location,
  responsibilities: entry.bullets.map((bullet) => bullet.text),
  technologies: roleTechnologies[entry.id] ?? [],
  contributions: [roleSummaries[entry.id] ?? entry.bullets[0]?.text ?? ""],
}));
