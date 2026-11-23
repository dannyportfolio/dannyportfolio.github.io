export type CertificateFormat = "pdf" | "image";

export type CertificateCategory = "cloud" | "engineering" | "data" | "management";

export type CertificatePreviewTheme = "aws" | "hackerrank" | "udemy";

export interface Certificate {
  /** Unique identifier for the certificate entry */
  id: string;
  /** Official title of the credential / certificate */
  title: string;
  /** Name of the issuing organization */
  issuer: string;
  /** Domain category used for filtering and grouping */
  category: CertificateCategory;
  /** Visual preview theme aligned with the issuing organization */
  previewTheme: CertificatePreviewTheme;
  /** Full verified issue date */
  issueDate?: string;
  /** ISO date string (YYYY-MM-DD) for chronological sorting */
  issuedIso?: string;
  /** Year issued (used for compact resume views) */
  year?: string;
  /** Verified course hours completed, if specified */
  courseHours?: string;
  /** Numeric course hours for aggregate calculation, if specified */
  courseHoursNumeric?: number;
  /** Instructor(s) or signatory printed on the certificate document */
  instructor?: string;
  /** Certificate type label printed on the document (e.g. Certificate of Accomplishment) */
  credentialType?: string;
  /** Official credential or license ID, if available (leave undefined if none) */
  credentialId?: string;
  /** Relative web path or URL to the certificate document, if stored locally */
  filePath?: string;
  /** Document format: "pdf" or "image" */
  fileType?: CertificateFormat;
  /** Optimized preview thumbnail path (WebP / AVIF / PNG), if available */
  thumbnailUrl?: string;
  /** Official public verification URL (e.g. Credly or Udemy verification URL) */
  verificationUrl?: string;
  /** Highlights flagship credential in the portfolio showcase */
  featured?: boolean;
  /** Core competencies and verified technical topics covered */
  skills?: string[];
  /** Optional summary or notes */
  summary?: {
    en: string;
    id: string;
  };
}

/**
 * Centralized Certificate Data Configuration
 *
 * All credentials in this file are strictly verified from official documents.
 * To add a new certificate:
 * 1. Place the PDF or image file in `/public/certificates/` (optional)
 * 2. Generate an optimized WebP thumbnail if a PDF asset is stored locally
 * 3. Append a new entry to the `certificates` array below
 * 4. Only include fields that can be verified from the actual certificate document
 */
export const certificates: Certificate[] = [
  {
    id: "aws-academy-cloud-foundations",
    title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
    issuer: "AWS Academy",
    category: "cloud",
    previewTheme: "aws",
    credentialType: "Certificate of Completion",
    issueDate: "October 14, 2023",
    issuedIso: "2023-10-14",
    year: "2023",
    courseHours: "20 hours",
    courseHoursNumeric: 20,
    // Credential ID is omitted because it is not specified on the certificate document.
    filePath: "/certificates/aws-academy-cloud-foundations.pdf",
    fileType: "pdf",
    thumbnailUrl: "/certificates/aws-academy-cloud-foundations.webp",
    verificationUrl: "https://www.credly.com/go/mGq9Kiy6",
    featured: true,
    skills: ["Cloud Foundations", "AWS Core Services", "Cloud Security", "Architecture Principles"],
    summary: {
      en: "Certificate of completion validating 20 course hours covering cloud concepts, core AWS security, architecture, pricing, and support models.",
      id: "Sertifikat penyelesaian pelatihan 20 jam yang memvalidasi konsep cloud, keamanan AWS, arsitektur, penetapan harga, dan model dukungan.",
    },
  },
  {
    id: "udemy-data-science-bootcamp-2024",
    title: "The Data Science Course: Complete Data Science Bootcamp 2024",
    issuer: "Udemy",
    category: "data",
    previewTheme: "udemy",
    credentialType: "Certificate of Completion",
    issueDate: "July 31, 2024",
    issuedIso: "2024-07-31",
    year: "2024",
    courseHours: "32 total hours",
    courseHoursNumeric: 32,
    instructor: "365 Careers",
    credentialId: "UC-e8dd0e80-eb41-4b8c-91d3-72ae5a31f040",
    verificationUrl: "https://ude.my/UC-e8dd0e80-eb41-4b8c-91d3-72ae5a31f040",
    skills: ["Data Science", "Python", "Statistics", "Machine Learning"],
    summary: {
      en: "32-hour complete data science curriculum by 365 Careers covering probability, statistics, Python analytics, and foundational machine learning.",
      id: "Kurikulum data science 32 jam oleh 365 Careers yang mencakup probabilitas, statistik, analisis Python, dan dasar machine learning.",
    },
  },
  {
    id: "udemy-project-management-profesional",
    title: "Project Management untuk Profesional : Panduan Lengkap PM",
    issuer: "Udemy",
    category: "management",
    previewTheme: "udemy",
    credentialType: "Certificate of Completion",
    issueDate: "May 13, 2024",
    issuedIso: "2024-05-13",
    year: "2024",
    courseHours: "20 total hours",
    courseHoursNumeric: 20,
    instructor: "Bale Services Training, Bun Sya",
    credentialId: "UC-ce614f36-368e-4693-b524-c377db1f3812",
    verificationUrl: "https://ude.my/UC-ce614f36-368e-4693-b524-c377db1f3812",
    skills: ["Project Management", "Delivery Planning", "Scope & Risk Control"],
    summary: {
      en: "20-hour professional project management training covering scope planning, scheduling, stakeholder alignment, and execution delivery.",
      id: "Pelatihan manajemen proyek profesional 20 jam yang mencakup perencanaan ruang lingkup, penjadwalan, koordinasi pemangku kepentingan, dan eksekusi delivery.",
    },
  },
  {
    id: "udemy-docker-pemula-sampai-mahir",
    title: "Docker : Pemula sampai Mahir",
    issuer: "Udemy",
    category: "cloud",
    previewTheme: "udemy",
    credentialType: "Certificate of Completion",
    issueDate: "September 29, 2023",
    issuedIso: "2023-09-29",
    year: "2023",
    courseHours: "8 total hours",
    courseHoursNumeric: 8,
    instructor: "Programmer Zaman Now",
    credentialId: "UC-860fb828-5167-440f-871c-8805758c7cea",
    verificationUrl: "https://ude.my/UC-860fb828-5167-440f-871c-8805758c7cea",
    skills: ["Docker", "Containers", "Container Networking", "DevOps"],
    summary: {
      en: "8-hour structured Docker course led by Programmer Zaman Now covering container images, volumes, networking, and multi-container workflows.",
      id: "Pelatihan Docker terstruktur selama 8 jam oleh Programmer Zaman Now yang mencakup image kontainer, volume, jaringan, dan alur multi-kontainer.",
    },
  },
  {
    id: "hackerrank-problem-solving-basic",
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    category: "engineering",
    previewTheme: "hackerrank",
    credentialType: "Certificate of Accomplishment",
    issueDate: "August 4, 2023",
    issuedIso: "2023-08-04",
    year: "2023",
    instructor: "Harishankaran K (CTO, HackerRank)",
    credentialId: "E076E2D9D42B",
    skills: ["Problem Solving", "Algorithms", "Data Structures"],
    summary: {
      en: "Skill certification test passed on HackerRank validating algorithmic problem solving, core data structures, and logical reasoning.",
      id: "Sertifikasi uji kompetensi HackerRank yang memvalidasi pemecahan masalah algoritmik, struktur data inti, dan penalaran logis.",
    },
  },
  {
    id: "udemy-pemrograman-java-pemula-sampai-mahir",
    title: "Pemrograman Java : Pemula sampai Mahir",
    issuer: "Udemy",
    category: "engineering",
    previewTheme: "udemy",
    credentialType: "Certificate of Completion",
    issueDate: "October 22, 2022",
    issuedIso: "2022-10-22",
    year: "2022",
    courseHours: "49.5 total hours",
    courseHoursNumeric: 49.5,
    instructor: "Eko Kurniawan Khannedy",
    credentialId: "UC-1a9c042b-4240-4d0f-ba68-f9cbe3ac70ef",
    verificationUrl: "https://ude.my/UC-1a9c042b-4240-4d0f-ba68-f9cbe3ac70ef",
    skills: ["Java", "Object-Oriented Programming", "Standard Library", "JVM Foundations"],
    summary: {
      en: "49.5-hour comprehensive Java programming curriculum by Eko Kurniawan Khannedy covering OOP, standard libraries, generics, and concurrency basics.",
      id: "Kurikulum pemrograman Java 49,5 jam oleh Eko Kurniawan Khannedy yang mencakup OOP, pustaka standar, generics, dan dasar konkurensi.",
    },
  },
];
