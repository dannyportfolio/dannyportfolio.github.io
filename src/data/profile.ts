export type ProfileLink = {
  label: string;
  href: string;
  type?: "email" | "github" | "linkedin" | "portfolio" | "instagram" | "custom";
};

export const profile = {
  name: "Danial Fachrudin",
  role: "Software Engineer — Backend & Performance Focused",
  // Primary verified contact details from repository source & git configuration.
  // Add LinkedIn or phone/WhatsApp here when available from the owner.
  email: "danialf.business@gmail.com",
  github: "https://github.com/dannyportfolio",
  linkedin: "", // Owner configuration point: e.g. "https://linkedin.com/in/username"
  instagram: "https://instagram.com/daannhard",
  portfolioUrl: "https://dannyportfolio.github.io",
  location: "Indonesia",

  headline: {
    en: "I build reliable backend systems, scalable APIs, and production-ready software with a strong focus on performance, maintainability, and real-world product impact.",
    id: "Saya membangun sistem backend yang andal, API skalabel, dan software siap produksi dengan fokus kuat pada performa, maintainability, serta dampak produk nyata.",
  },
  shortBio: {
    en: "Software Engineer focused on designing thoughtful server-side systems and making the operational details of software easier to reason about.",
    id: "Software Engineer yang berfokus merancang sistem sisi server yang terencana dan membuat operasional software lebih mudah dipahami.",
  },
  availability: {
    en: "Open to remote, hybrid, or onsite opportunities, including contract engagements.",
    id: "Terbuka untuk peluang remote, hybrid, maupun onsite, termasuk proyek kontrak.",
  },
  relocation: {
    en: "Open to relocating to the Netherlands, Germany, or the United States.",
    id: "Terbuka untuk relokasi ke Belanda, Jerman, atau Amerika Serikat.",
  },
  summary: {
    en: "Backend-focused software engineer building reliable systems, intentional APIs, database-aware products, and maintainable delivery practices.",
    id: "Software engineer berfokus backend yang membangun sistem andal, rancangan API terarah, arsitektur basis data teroptimasi, dan praktik delivery yang dapat dipelihara.",
  },
  contactLinks: [
    { label: "Email", href: "mailto:danialf.business@gmail.com", type: "email" },
    { label: "GitHub", href: "https://github.com/dannyportfolio", type: "github" },
    { label: "Instagram", href: "https://instagram.com/daannhard", type: "instagram" },
  ] as ProfileLink[],
};

export type TargetRole = "backend" | "software" | "fullstack";

export const targetRoles: Record<
  TargetRole,
  {
    label: { en: string; id: string };
    subtitle: { en: string; id: string };
    summary: { en: string; id: string };
  }
> = {
  backend: {
    label: { en: "Backend Engineer", id: "Backend Engineer" },
    subtitle: {
      en: "APIs, data systems, performance & scalability",
      id: "API, sistem data, performa & skalabilitas",
    },
    summary: {
      en: "Backend-focused engineer designing reliable APIs, data access patterns, and production-ready services.",
      id: "Engineer berfokus backend yang merancang API andal, pola akses data terarah, dan layanan siap produksi.",
    },
  },
  software: {
    label: { en: "Software Engineer", id: "Software Engineer" },
    subtitle: {
      en: "Architecture, reliability & maintainability",
      id: "Arsitektur, keandalan & maintainability",
    },
    summary: {
      en: "Software engineer focused on reliable product systems, maintainable architecture, and pragmatic engineering decisions.",
      id: "Software engineer yang berfokus pada keandalan sistem produk, arsitektur yang mudah dipelihara, dan keputusan rekayasa pragmatis.",
    },
  },
  fullstack: {
    label: { en: "Full Stack Engineer", id: "Full Stack Engineer" },
    subtitle: {
      en: "Product delivery from interface to infrastructure",
      id: "Pengiriman produk dari antarmuka hingga infrastruktur",
    },
    summary: {
      en: "Full stack engineer connecting clear user experiences with dependable backend services and deployment workflows.",
      id: "Full stack engineer yang menghubungkan pengalaman pengguna yang jelas dengan layanan backend dan alur deployment yang andal.",
    },
  },
};
