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

export const experiences: Experience[] = [
  {
    company: "Independent clients & software products",
    position: "Freelance Software Engineer",
    employmentType: "Freelance",
    period: "2021 — Present",
    location: "Remote · Available internationally",
    responsibilities: [
      "Designed and developed web applications, backend services, REST APIs, and database-driven systems for freelance clients and independent software products.",
      "Translated client requirements and business workflows into functional, maintainable, and deployable software solutions.",
      "Built backend functionality including authentication, role-based access control, database operations, third-party integrations, payment workflows, and administrative dashboards.",
      "Designed and maintained relational database structures using PostgreSQL or MySQL based on project requirements.",
      "Managed projects across requirements gathering, technical planning, development, testing, deployment, and post-launch improvements.",
      "Investigated and resolved application bugs, API issues, deployment failures, security weaknesses, and integration problems.",
    ],
    technologies: ["Web applications", "Backend services", "REST APIs", "PostgreSQL / MySQL"],
    contributions: [
      "Started building software professionally in 2021, then focused on an independent freelance practice from 2023 — taking products from ambiguous requirements to reliable, deployable systems.",
    ],
  },
];
