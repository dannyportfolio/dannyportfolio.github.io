export const profile = {
  name: "Danny Fachrudin",
  role: "Software Engineer — Backend & Performance Focused",
  headline: "I build reliable backend systems, scalable APIs, and production-ready software with a strong focus on performance, maintainability, and real-world product impact.",
  shortBio: "Software Engineer focused on designing thoughtful server-side systems and making the operational details of software easier to reason about.",
  availability: "Open to remote, hybrid, or onsite opportunities, including contract engagements.",
  relocation: "Open to relocating to the Netherlands, Germany, or the United States.",
  summary: "Backend-focused software engineer building reliable systems, intentional APIs, database-aware products, and maintainable delivery practices.",
  contactLinks: [] as { label: string; href: string }[],
} as const;

export type TargetRole = "backend" | "software" | "fullstack";

export const targetRoles: Record<TargetRole, { label: string; subtitle: string; summary: string }> = {
  backend: { label: "Backend Engineer", subtitle: "APIs, data systems, performance & scalability", summary: "Backend-focused engineer designing reliable APIs, data access patterns, and production-ready services." },
  software: { label: "Software Engineer", subtitle: "Architecture, reliability & maintainability", summary: "Software engineer focused on reliable product systems, maintainable architecture, and pragmatic engineering decisions." },
  fullstack: { label: "Full Stack Engineer", subtitle: "Product delivery from interface to infrastructure", summary: "Full stack engineer connecting clear user experiences with dependable backend services and deployment workflows." },
};
