import {
  masterProfile,
  skillCategoryLabels,
  type MasterProfile,
  type ProfileCertification,
  type ProfileEducation,
  type ProfileLanguage,
  type ProfileOverrides,
  type SkillCategoryId,
} from "../../data/resume/master-profile.ts";
import {
  DEFAULT_ROLE,
  isRoleId,
  rolePresets,
  type RoleId,
} from "../../data/resume/role-presets.ts";
import { resumeBaseFilename } from "./filename.ts";
import { analyzeJobDescription, type JobAnalysis, type JobInput } from "./job-analyzer.ts";

export type ResumeMode = "general" | "role" | "job";

export type ResumeSelection = {
  mode?: ResumeMode;
  role?: RoleId;
  detailed?: boolean;
  job?: JobInput;
  overrides?: ProfileOverrides;
};

export type ResumeContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type ResumeSkillCategory = {
  id: SkillCategoryId;
  label: string;
  skills: string[];
};

export type ResumeExperienceItem = {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
};

export type ResumeProjectItem = {
  slug: string;
  title: string;
  subtitle: string;
  link?: { label: string; href: string };
  stack: string[];
  bullets: string[];
  architecture?: string;
};

export type ResumeModel = {
  mode: ResumeMode;
  role: RoleId;
  detailed: boolean;
  filenameBase: string;
  name: string;
  headline: string;
  contact: ResumeContactItem[];
  summary: string;
  skillCategories: ResumeSkillCategory[];
  experience: ResumeExperienceItem[];
  projects: ResumeProjectItem[];
  education: ProfileEducation[];
  certifications: ProfileCertification[];
  languages: ProfileLanguage[];
  additional: { label: string; value: string }[];
  analysis?: JobAnalysis;
};

function stripUrlScheme(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function buildFocusWeights(role: RoleId, analysis?: JobAnalysis): Map<string, number> {
  const weights = new Map<string, number>();
  const preset = rolePresets[role];

  preset.focus.forEach((term, index) => {
    weights.set(term, Math.max(1, preset.focus.length - index));
  });

  if (analysis) {
    for (const match of analysis.matchedSkills) {
      const existing = weights.get(match.skill) ?? 0;
      weights.set(match.skill, existing + match.weight * 4);
    }
  }

  return weights;
}

function scoreTags(tags: string[], weights: Map<string, number>): number {
  let score = 0;
  for (const tag of tags) {
    score += weights.get(tag) ?? 0;
  }
  return score;
}

function buildHeadline(role: RoleId, mode: ResumeMode, analysis?: JobAnalysis): string {
  const preset = rolePresets[role];
  if (mode !== "job" || !analysis || analysis.matchedSkills.length === 0) {
    return `${preset.label} | ${preset.tagline}`;
  }

  // Never echo unverified seniority terms (Senior/Staff/Principal/Lead); derive label from role preset.
  const topMatched = analysis.matchedSkills.slice(0, 4).map((item) => item.skill);
  return `${preset.label} | ${topMatched.join(", ")}`;
}

function buildSummary(profile: MasterProfile, weights: Map<string, number>): string {
  const ranked = profile.summary.sentences
    .map((sentence, index) => ({
      sentence,
      index,
      score: scoreTags(sentence.tags, weights),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const selected = ranked
    .slice(0, 2)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence.text);

  return [profile.summary.opening, ...selected, profile.summary.closing].join(" ");
}

function buildSkillCategories(
  profile: MasterProfile,
  role: RoleId,
  weights: Map<string, number>,
): ResumeSkillCategory[] {
  const preset = rolePresets[role];
  const grouped = new Map<SkillCategoryId, string[]>();

  for (const catId of preset.categoryOrder) {
    grouped.set(catId, []);
  }

  for (const skill of profile.skills) {
    const list = grouped.get(skill.category) ?? [];
    list.push(skill.name);
    grouped.set(skill.category, list);
  }

  const orderedCategories = [...preset.categoryOrder].map((catId, baseIndex) => {
    const skills = [...(grouped.get(catId) ?? [])].sort((a, b) => {
      const diff = (weights.get(b) ?? 0) - (weights.get(a) ?? 0);
      return diff !== 0 ? diff : 0;
    });
    const categoryScore = skills.reduce((sum, name) => sum + (weights.get(name) ?? 0), 0);
    return { catId, skills, categoryScore, baseIndex };
  });

  if (weights.size > 0) {
    orderedCategories.sort((a, b) => {
      // Keep programming languages first unless another category strongly dominates via JD matches.
      const aBoost = a.catId === "languages" ? 4 : 0;
      const bBoost = b.catId === "languages" ? 4 : 0;
      const scoreDiff = b.categoryScore + bBoost - (a.categoryScore + aBoost);
      return scoreDiff !== 0 ? scoreDiff : a.baseIndex - b.baseIndex;
    });
  }

  return orderedCategories
    .filter((item) => item.skills.length > 0)
    .map((item) => ({
      id: item.catId,
      label: skillCategoryLabels[item.catId],
      skills: item.skills,
    }));
}

function buildExperience(
  profile: MasterProfile,
  detailed: boolean,
  weights: Map<string, number>,
): ResumeExperienceItem[] {
  return profile.experience.map((entry) => {
    const rankedBullets = entry.bullets
      .map((bullet, index) => ({
        text: bullet.text,
        index,
        score: scoreTags(bullet.tags, weights),
      }))
      .sort((a, b) => b.score - a.score || a.index - b.index);

    const limit = detailed ? rankedBullets.length : entry.id === "freelance" ? 5 : 2;
    const bullets = rankedBullets.slice(0, limit).map((item) => item.text);

    return {
      id: entry.id,
      title: entry.title,
      organization: entry.organization,
      location: entry.location,
      period: `${entry.startYear} - ${entry.endYear}`,
      bullets,
    };
  });
}

function buildProjects(
  profile: MasterProfile,
  role: RoleId,
  mode: ResumeMode,
  detailed: boolean,
  weights: Map<string, number>,
): ResumeProjectItem[] {
  const preset = rolePresets[role];
  const orderIndex = new Map(preset.projectOrder.map((slug, idx) => [slug, idx]));

  const ranked = profile.projects
    .map((project) => {
      const presetRank = orderIndex.get(project.slug) ?? 99;
      const tagPool = new Set([
        ...project.stack,
        ...project.bullets.flatMap((bullet) => bullet.tags),
      ]);
      const matchScore = scoreTags([...tagPool], weights);
      return { project, presetRank, matchScore };
    })
    .sort((a, b) => {
      if (mode === "job") {
        const diff = b.matchScore - a.matchScore;
        if (diff !== 0) return diff;
      }
      return a.presetRank - b.presetRank;
    });

  const selected = detailed ? ranked.slice(0, 4) : ranked.slice(0, 3);

  return selected.map(({ project }) => {
    const rankedBullets = project.bullets
      .map((bullet, index) => ({
        text: bullet.text,
        index,
        score: scoreTags(bullet.tags, weights),
      }))
      .sort((a, b) => b.score - a.score || a.index - b.index);

    const bulletLimit = detailed ? rankedBullets.length : 3;

    return {
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      link: project.link,
      stack: project.stack,
      bullets: rankedBullets.slice(0, bulletLimit).map((item) => item.text),
      architecture: detailed ? project.architecture : undefined,
    };
  });
}

export function buildResume(
  profile: MasterProfile = masterProfile,
  selection: ResumeSelection = {},
): ResumeModel {
  const mode: ResumeMode = selection.mode ?? "general";
  const analysis =
    mode === "job" && selection.job ? analyzeJobDescription(selection.job, profile) : undefined;

  const requestedRole = selection.role;
  const role: RoleId = isRoleId(requestedRole)
    ? requestedRole
    : analysis
      ? analysis.suggestedRole
      : DEFAULT_ROLE;

  const detailed = Boolean(selection.detailed);
  const overrides = selection.overrides;
  const weights = buildFocusWeights(role, analysis);
  const preset = rolePresets[role];

  const location = overrides?.location?.trim() || profile.identity.location;
  const contact: ResumeContactItem[] = [
    { label: "Location", value: location },
    ...(overrides?.phone?.trim() ? [{ label: "Phone", value: overrides.phone.trim() }] : []),
    {
      label: "Email",
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
    },
    {
      label: "Portfolio",
      value: stripUrlScheme(profile.contact.portfolio),
      href: profile.contact.portfolio,
    },
    {
      label: "GitHub",
      value: stripUrlScheme(profile.contact.github),
      href: profile.contact.github,
    },
    {
      label: "LinkedIn",
      value: stripUrlScheme(profile.contact.linkedin),
      href: profile.contact.linkedin,
    },
  ];

  const education: ProfileEducation[] = [...profile.education, ...(overrides?.education ?? [])];
  const languages: ProfileLanguage[] = [...profile.languages, ...(overrides?.languages ?? [])];

  const workArrangement = overrides?.workArrangement?.trim() || profile.preferences.workArrangement;
  const relocation = overrides?.relocation?.trim() || profile.preferences.relocation;

  const additional: { label: string; value: string }[] = [
    { label: "Work preference", value: workArrangement },
    { label: "Relocation", value: relocation },
  ];

  if (languages.length > 0) {
    additional.push({
      label: "Languages",
      value: languages.map((item) => `${item.language} (${item.proficiency})`).join(", "),
    });
  }
  if (overrides?.additionalNotes?.trim()) {
    additional.push({ label: "Notes", value: overrides.additionalNotes.trim() });
  }

  return {
    mode,
    role,
    detailed,
    filenameBase: resumeBaseFilename({
      candidateName: profile.identity.name,
      roleLabel: preset.label,
      company: mode === "job" ? selection.job?.company : undefined,
    }),
    name: profile.identity.name,
    headline: buildHeadline(role, mode, analysis),
    contact,
    summary: buildSummary(profile, weights),
    skillCategories: buildSkillCategories(profile, role, weights),
    experience: buildExperience(profile, detailed, weights),
    projects: buildProjects(profile, role, mode, detailed, weights),
    education,
    certifications: [...profile.certifications],
    languages,
    additional,
    analysis,
  };
}
