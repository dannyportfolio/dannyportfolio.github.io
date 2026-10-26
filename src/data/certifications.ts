export type CertificateFormat = "pdf" | "image";

export interface Certificate {
  /** Unique identifier for the certificate entry */
  id: string;
  /** Official title of the credential / certificate */
  title: string;
  /** Name of the issuing organization */
  issuer: string;
  /** Full verified issue date */
  issueDate?: string;
  /** Year issued (used for compact resume views) */
  year?: string;
  /** Verified course hours completed, if specified */
  courseHours?: string;
  /** Official credential or license ID, if available (leave undefined if none) */
  credentialId?: string;
  /** Relative web path or URL to the certificate document */
  filePath: string;
  /** Document format: "pdf" or "image" */
  fileType: CertificateFormat;
  /** Optimized preview thumbnail path (WebP / AVIF / PNG) */
  thumbnailUrl: string;
  /** Official public verification URL (e.g. Credly badge URL) */
  verificationUrl?: string;
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
 * 1. Place the PDF or image file in `/public/certificates/`
 * 2. Generate an optimized WebP thumbnail (or provide image path)
 * 3. Append a new entry to the `certificates` array below
 * 4. Only include fields that can be verified from the actual certificate document
 */
export const certificates: Certificate[] = [
  {
    id: "aws-academy-cloud-foundations",
    title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
    issuer: "AWS Academy",
    issueDate: "October 14, 2023",
    year: "2023",
    courseHours: "20 hours",
    // Credential ID is omitted because it is not specified on the certificate document.
    filePath: "/certificates/aws-academy-cloud-foundations.pdf",
    fileType: "pdf",
    thumbnailUrl: "/certificates/aws-academy-cloud-foundations.webp",
    verificationUrl: "https://www.credly.com/go/mGq9Kiy6",
    skills: ["Cloud Foundations", "AWS Core Services", "Cloud Security", "Architecture Principles"],
    summary: {
      en: "Certificate of completion validating 20 course hours covering cloud concepts, core AWS security, architecture, pricing, and support models.",
      id: "Sertifikat penyelesaian pelatihan 20 jam yang memvalidasi konsep cloud, keamanan AWS, arsitektur, penetapan harga, dan model dukungan.",
    },
  },
];
