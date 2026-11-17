import { masterProfile, type SkillCategoryId } from "./resume/master-profile.ts";
import { rolePresets, type RoleId } from "./resume/role-presets.ts";

export type SkillGroup = { title: string; skills: string[] };

function skillsByCategories(categories: SkillCategoryId[]): string[] {
  const allowed = new Set<SkillCategoryId>(categories);
  return masterProfile.skills
    .filter((skill) => allowed.has(skill.category))
    .map((skill) => skill.name);
}

/** Homepage showcase groups derived directly from verified & user-stated master profile skills. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Backend",
    skills: skillsByCategories(["languages", "backend"]).slice(0, 10),
  },
  {
    title: "Databases & Architecture",
    skills: skillsByCategories(["databases", "architecture"]).slice(0, 10),
  },
  {
    title: "Cloud, DevOps & Security",
    skills: skillsByCategories(["cloud", "devops", "security"]).slice(0, 10),
  },
  {
    title: "Frontend & Quality",
    skills: skillsByCategories(["frontend", "testing"]).slice(0, 10),
  },
];

export const principles = [
  "Performance before premature complexity",
  "Measure before optimize",
  "Database queries matter",
  "Cache strategically",
  "Design APIs intentionally",
  "Secure data by default",
  "Observability is part of production",
  "Reliability over cleverness",
];

export function skillsForRole(role: RoleId): string[] {
  const preset = rolePresets[role];
  const all = masterProfile.skills.map((skill) => skill.name);
  const prioritized = preset.focus.filter((skill) => all.includes(skill));
  return [...prioritized, ...all.filter((skill) => !prioritized.includes(skill))];
}
