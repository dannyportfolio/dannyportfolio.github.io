import { masterProfile } from "./resume/master-profile.ts";
import { rolePresets, type RoleId } from "./resume/role-presets.ts";

export type ProfileLink = {
  label: string;
  href: string;
  type?: "email" | "github" | "linkedin" | "portfolio" | "custom";
  detail?: string;
};

function shortLabel(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export const profile = {
  name: masterProfile.identity.name,
  role: "Software Engineer - Backend, Full-Stack & Cloud Infrastructure",
  email: masterProfile.contact.email,
  github: masterProfile.contact.github,
  linkedin: masterProfile.contact.linkedin,
  portfolioUrl: masterProfile.contact.portfolio,
  location: masterProfile.identity.location,

  headline: {
    en: "I build reliable backend systems, scalable APIs, and production-ready software with a strong focus on performance, maintainability, and real-world product impact.",
    id: "Saya membangun sistem backend yang andal, API skalabel, dan software siap produksi dengan fokus kuat pada performa, maintainability, serta dampak produk nyata.",
  },
  shortBio: {
    en: "Software Engineer focused on designing thoughtful server-side systems and making the operational details of software easier to reason about.",
    id: "Software Engineer yang berfokus merancang sistem sisi server yang terencana dan membuat operasional software lebih mudah dipahami.",
  },
  availability: {
    en: masterProfile.preferences.workArrangement,
    id: "Terbuka untuk peluang remote, hybrid, maupun onsite, termasuk proyek kontrak.",
  },
  relocation: {
    en: masterProfile.preferences.relocation,
    id: "Terbuka untuk relokasi ke Belanda, Jerman, atau Amerika Serikat.",
  },
  summary: {
    en: `${masterProfile.summary.opening} ${masterProfile.summary.sentences[0].text}`,
    id: "Software engineer sejak 2021 dan praktisi freelance independen sejak 2023 yang membangun sistem backend andal, rancangan API terarah, arsitektur basis data, dan deployment siap produksi.",
  },
  contactLinks: [
    {
      label: "Email",
      href: `mailto:${masterProfile.contact.email}`,
      type: "email",
      detail: masterProfile.contact.email,
    },
    {
      label: "GitHub",
      href: masterProfile.contact.github,
      type: "github",
      detail: shortLabel(masterProfile.contact.github),
    },
    {
      label: "LinkedIn",
      href: masterProfile.contact.linkedin,
      type: "linkedin",
      detail: shortLabel(masterProfile.contact.linkedin),
    },
  ] as ProfileLink[],
};

export type TargetRole = RoleId;

export const targetRoles: Record<
  TargetRole,
  {
    label: { en: string; id: string };
    subtitle: { en: string; id: string };
    summary: { en: string; id: string };
  }
> = {
  software: {
    label: { en: rolePresets.software.label, id: rolePresets.software.label },
    subtitle: { en: rolePresets.software.tagline, id: "Backend, Full-Stack, Infrastruktur Cloud" },
    summary: {
      en: "Software engineer building production web applications and backend services since 2021, with independent freelance delivery since 2023.",
      id: "Software engineer yang membangun aplikasi web dan layanan backend sejak 2021, dengan praktik freelance independen sejak 2023.",
    },
  },
  backend: {
    label: { en: rolePresets.backend.label, id: rolePresets.backend.label },
    subtitle: { en: rolePresets.backend.tagline, id: "API, PostgreSQL, Layanan Cloud" },
    summary: {
      en: "Backend engineer designing REST APIs, PostgreSQL and MySQL data models, and multi-tenant server-side services in Go and TypeScript/Node.js.",
      id: "Backend engineer yang merancang REST API, skema PostgreSQL dan MySQL, serta layanan server multi-tenant dengan Go dan TypeScript/Node.js.",
    },
  },
  fullstack: {
    label: { en: rolePresets.fullstack.label, id: rolePresets.fullstack.label },
    subtitle: { en: rolePresets.fullstack.tagline, id: "Next.js, TypeScript, Node.js, PostgreSQL" },
    summary: {
      en: "Full stack engineer connecting Next.js and React interfaces with dependable backend services, relational databases, and automated testing.",
      id: "Full stack engineer yang menghubungkan antarmuka Next.js dan React dengan layanan backend, basis data relasional, dan pengujian otomatis.",
    },
  },
};
