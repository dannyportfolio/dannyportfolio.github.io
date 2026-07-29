export type Education = { institution: string; credential: string; period: string; details?: string };
export type Certification = { name: string; issuer: string; year?: string };
// Keep unverified credentials out of the public resume.
export const education: Education[] = [];
export const certifications: Certification[] = [];
