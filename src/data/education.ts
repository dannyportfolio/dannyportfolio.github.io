export type Education = {
  institution: string;
  credential: string;
  period: string;
  details?: string;
  location?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
};

/**
 * Honest, unverified credential policy:
 * No academic institutions, degree titles, or professional certifications are fabricated.
 * Add genuine verified educational backgrounds and certifications here as they are acquired.
 *
 * Example structure:
 * {
 *   institution: "Universitas Gadjah Mada",
 *   credential: "B.Sc. in Computer Science",
 *   period: "2019 — 2023",
 *   location: "Yogyakarta, Indonesia"
 * }
 */
export const education: Education[] = [];

/**
 * Example structure:
 * {
 *   name: "AWS Certified Solutions Architect",
 *   issuer: "Amazon Web Services",
 *   year: "2024"
 * }
 */
export const certifications: Certification[] = [];
