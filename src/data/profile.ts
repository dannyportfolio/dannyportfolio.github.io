export const profile = {
  name: "Danny Fachrudin",
  role: "Software Engineer — Backend & Performance Focused",
  headline: "I build reliable backend systems, scalable APIs, and production-ready software with a strong focus on performance, maintainability, and real-world product impact.",
  shortBio: "Software Engineer focused on designing thoughtful server-side systems and making the operational details of software easier to reason about.",
  email: "TODO: add your professional email",
  github: "TODO: add GitHub URL",
  linkedin: "TODO: add LinkedIn URL",
  location: "TODO: add location (optional)",
  availability: "Open to meaningful engineering conversations.",
  summary: "Backend-focused software engineer interested in reliable systems, intentional APIs, database performance, and maintainable delivery practices. TODO: personalise this summary with your experience and domain focus.",
} as const;

export type TargetRole = "backend" | "software" | "fullstack";

export const targetRoles: Record<TargetRole, { label: string; subtitle: string; summary: string }> = {
  backend: { label: "Backend Engineer", subtitle: "APIs, data systems, performance & scalability", summary: "Backend-focused engineer designing reliable APIs, data access patterns, and production-ready services. TODO: tailor with relevant experience." },
  software: { label: "Software Engineer", subtitle: "Architecture, reliability & maintainability", summary: "Software engineer focused on reliable product systems, maintainable architecture, and pragmatic engineering decisions. TODO: tailor with relevant experience." },
  fullstack: { label: "Full Stack Engineer", subtitle: "Product delivery from interface to infrastructure", summary: "Full stack engineer connecting clear user experiences with dependable backend services and deployment workflows. TODO: tailor with relevant experience." },
};
