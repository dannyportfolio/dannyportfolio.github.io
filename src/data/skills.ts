export type SkillGroup = { title: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  { title: "Backend", skills: ["Node.js", "TypeScript", "Next.js Server", "NestJS", "ASP.NET (TODO: confirm)", "Golang (TODO: confirm)"] },
  { title: "Database", skills: ["PostgreSQL", "Prisma", "Supabase", "Redis", "Database indexing", "Query optimization"] },
  { title: "Infrastructure", skills: ["Vercel", "Railway", "GitHub Actions", "CI/CD", "Logging", "Monitoring", "Production debugging"] },
  { title: "Engineering", skills: ["API Design", "System Design", "Authentication & Authorization", "Performance Optimization", "Background Jobs", "Caching", "Testing", "Secure Data Handling"] },
];

export const principles = [
  "Performance before premature complexity",
  "Measure before optimize",
  "Database queries matter",
  "Cache strategically",
  "Design APIs intentionally",
  "Secure data by default",
  "Observability is part of production",
  "Reliability over cleverness",
];

export function skillsForRole(role: "backend" | "software" | "fullstack") {
  const priority: Record<typeof role, string[]> = {
    backend: ["API Design", "PostgreSQL", "Query optimization", "Database indexing", "Redis", "Caching", "Node.js", "TypeScript", "System Design", "Performance Optimization"],
    software: ["System Design", "Testing", "CI/CD", "Logging", "Monitoring", "TypeScript", "API Design", "Secure Data Handling", "Production debugging"],
    fullstack: ["Next.js Server", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Vercel", "API Design", "CI/CD", "Authentication & Authorization"],
  };
  const allSkills = skillGroups.flatMap((group) => group.skills);
  return [...priority[role], ...allSkills.filter((skill) => !priority[role].includes(skill))];
}
