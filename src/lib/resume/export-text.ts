import type { ResumeModel } from "./build-resume.ts";

/**
 * Produces a deterministic linear plain-text representation matching ATS reading order.
 */
export function buildResumePlainText(model: ResumeModel): string {
  const lines: string[] = [];

  lines.push(model.name);
  lines.push(model.headline);
  lines.push(model.contact.map((item) => item.value).join(" | "));
  lines.push("");

  lines.push("PROFESSIONAL SUMMARY");
  lines.push(model.summary);
  lines.push("");

  lines.push("TECHNICAL SKILLS");
  for (const category of model.skillCategories) {
    lines.push(`${category.label}: ${category.skills.join(", ")}`);
  }
  lines.push("");

  lines.push("PROFESSIONAL EXPERIENCE");
  for (const exp of model.experience) {
    lines.push(`${exp.title} | ${exp.organization} (${exp.location}) | ${exp.period}`);
    for (const bullet of exp.bullets) {
      lines.push(`- ${bullet}`);
    }
    lines.push("");
  }

  lines.push("SELECTED PROJECTS");
  for (const project of model.projects) {
    const linkSuffix = project.link ? ` | ${project.link.label}` : "";
    lines.push(`${project.title} - ${project.subtitle}${linkSuffix}`);
    lines.push(`Stack: ${project.stack.join(", ")}`);
    for (const bullet of project.bullets) {
      lines.push(`- ${bullet}`);
    }
    if (project.architecture) {
      lines.push(`Architecture: ${project.architecture}`);
    }
    lines.push("");
  }

  if (model.education.length > 0) {
    lines.push("EDUCATION");
    for (const edu of model.education) {
      lines.push(`${edu.credential} | ${edu.institution} | ${edu.period}`);
    }
    lines.push("");
  }

  if (model.certifications.length > 0) {
    lines.push("CERTIFICATIONS");
    for (const cert of model.certifications) {
      const yearPart = cert.year ? ` (${cert.year})` : "";
      const urlPart = cert.url ? ` | ${cert.url}` : "";
      lines.push(`${cert.name} | ${cert.issuer}${yearPart}${urlPart}`);
    }
    lines.push("");
  }

  if (model.additional.length > 0) {
    lines.push("ADDITIONAL INFORMATION");
    for (const item of model.additional) {
      lines.push(`${item.label}: ${item.value}`);
    }
  }

  return lines.join("\n").trimEnd();
}
