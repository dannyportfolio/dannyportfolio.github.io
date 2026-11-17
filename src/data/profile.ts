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
  frontend: {
    label: { en: rolePresets.frontend.label, id: rolePresets.frontend.label },
    subtitle: { en: rolePresets.frontend.tagline, id: "React, Next.js, TypeScript" },
    summary: {
      en: "Frontend engineer building accessible, responsive web interfaces in React, Next.js, TypeScript, and Tailwind CSS backed by typed APIs.",
      id: "Frontend engineer yang membangun antarmuka web responsif dan aksesibel dengan React, Next.js, TypeScript, dan Tailwind CSS.",
    },
  },
  api: {
    label: { en: rolePresets.api.label, id: rolePresets.api.label },
    subtitle: { en: rolePresets.api.tagline, id: "Desain REST API, Autentikasi, Integrasi" },
    summary: {
      en: "API engineer building RESTful contracts, JWT and OAuth authentication, RBAC boundaries, rate limiting, and webhook integrations.",
      id: "API engineer yang membangun kontrak REST API, autentikasi JWT dan OAuth, kontrol akses RBAC, rate limiting, dan integrasi webhook.",
    },
  },
  cloud: {
    label: { en: rolePresets.cloud.label, id: rolePresets.cloud.label },
    subtitle: { en: rolePresets.cloud.tagline, id: "AWS Serverless, Kontainer, CI/CD" },
    summary: {
      en: "Cloud engineer deploying AWS Lambda and API Gateway serverless backends, containerized services, and automated CI/CD workflows.",
      id: "Cloud engineer yang men-deploy backend serverless AWS Lambda dan API Gateway, layanan kontainer, dan alur CI/CD otomatis.",
    },
  },
  devops: {
    label: { en: rolePresets.devops.label, id: rolePresets.devops.label },
    subtitle: {
      en: rolePresets.devops.tagline,
      id: "CI/CD, Kontainer, Deployment, Operasi Produksi",
    },
    summary: {
      en: "DevOps engineer containerizing multi-service workloads with Docker and Kubernetes, automating CI/CD, and resolving production faults.",
      id: "DevOps engineer yang mengemas layanan dengan Docker dan Kubernetes, mengotomasi CI/CD, dan menangani gangguan produksi.",
    },
  },
  platform: {
    label: { en: rolePresets.platform.label, id: rolePresets.platform.label },
    subtitle: {
      en: rolePresets.platform.tagline,
      id: "Platform Backend, Infrastruktur, Pipeline Delivery",
    },
    summary: {
      en: "Platform engineer building multi-tenant backend foundations, schema migration tooling, container orchestration, and CI/CD delivery pipelines.",
      id: "Platform engineer yang membangun fondasi backend multi-tenant, tooling migrasi skema, orkestrasi kontainer, dan pipeline delivery CI/CD.",
    },
  },
};
