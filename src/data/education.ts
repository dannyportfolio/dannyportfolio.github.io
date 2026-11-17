import { masterProfile } from "./resume/master-profile.ts";

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
 * Derived directly from masterProfile; unverified academic institutions are never fabricated.
 */
export const education: Education[] = masterProfile.education.map((item) => ({
  institution: item.institution,
  credential: item.credential,
  period: item.period,
  details: item.details,
}));

export const certifications: Certification[] = masterProfile.certifications.map((cert) => ({
  name: cert.name,
  issuer: cert.issuer,
  year: cert.year,
  credentialUrl: cert.url,
}));
