import { certificates } from "./certifications";

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
 */
export const education: Education[] = [];

/**
 * Verified certifications mapped directly from the single source of truth in `./certifications.ts`
 */
export const certifications: Certification[] = certificates.map((cert) => ({
  name: cert.title,
  issuer: cert.issuer,
  year: cert.year || cert.issueDate,
  credentialUrl: cert.verificationUrl || cert.filePath,
}));
