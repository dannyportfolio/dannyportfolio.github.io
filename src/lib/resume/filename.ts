/**
 * Dynamic ATS-safe filename generation.
 * Produces names like `Danial_Fachrudin_Software_Engineer_Resume`.
 */
export function sanitizeFilenameSegment(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

export function resumeBaseFilename(options: {
  candidateName: string;
  roleLabel: string;
  company?: string;
}): string {
  const parts = [
    sanitizeFilenameSegment(options.candidateName),
    options.company ? sanitizeFilenameSegment(options.company) : "",
    sanitizeFilenameSegment(options.roleLabel),
    "Resume",
  ].filter(Boolean);

  return parts.join("_");
}
