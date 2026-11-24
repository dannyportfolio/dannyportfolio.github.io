import {
  formatSummaryOpening,
  getEngineeringYears,
  masterProfile,
  skillCategoryLabels,
  type MasterProfile,
  type ProfileCertification,
  type ProfileEducation,
  type ProfileLanguage,
  type SkillCategoryId,
} from "../../data/resume/master-profile.ts";
import {
  DEFAULT_ROLE,
  isRoleId,
  rolePresets,
  type RoleId,
} from "../../data/resume/role-presets.ts";
import { stripUrlScheme } from "../utils.ts";
import { resumeBaseFilename } from "./filename.ts";

export type ResumeSelection = {
  role?: RoleId;
  detailed?: boolean;
  referenceDate?: Date;
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
  employmentType: string;
  period: string;
  bullets: string[];
};

export type ResumeProjectItem = {
  slug: string;
  title: string;
  subtitle: string;
  context?: string;
  link?: { label: string; href: string };
  stack: string[];
  bullets: string[];
  architecture?: string;
};

export type ResumeModel = {
  role: RoleId;
  detailed: boolean;
  experienceYears: number;
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
};

function buildFocusWeights(role: RoleId): Map<string, number> {
  const weights = new Map<string, number>();
  const preset = rolePresets[role];
  preset.focus.forEach((term, index) => {
    weights.set(term, Math.max(1, preset.focus.length - index));
  });
  return weights;
}

function scoreTags(tags: string[], weights: Map<string, number>): number {
  let score = 0;
  for (const tag of tags) {
    score += weights.get(tag) ?? 0;
  }
  return score;
}

function buildSummary(
  profile: MasterProfile,
  weights: Map<string, number>,
  detailed: boolean,
  referenceDate?: Date,
): string {
  const ranked = profile.summary.sentences
    .map((sentence, index) => ({
      sentence,
      index,
      score: scoreTags(sentence.tags, weights),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const sentenceCount = detailed ? 3 : 1;
  const selected = ranked
    .slice(0, sentenceCount)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence.text);

  const opening = formatSummaryOpening(profile.timeline.engineeringSince, referenceDate);
  return [opening, ...selected, profile.summary.closing].join(" ");
}

function buildSkillCategories(
  profile: MasterProfile,
  role: RoleId,
  detailed: boolean,
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

  const maxSkillsPerCategory = detailed ? Infinity : 4;

  return preset.categoryOrder
    .map((catId) => {
      const skills = [...(grouped.get(catId) ?? [])]
        .sort((a, b) => (weights.get(b) ?? 0) - (weights.get(a) ?? 0))
        .slice(0, maxSkillsPerCategory);
      return { id: catId, label: skillCategoryLabels[catId], skills };
    })
    .filter((item) => item.skills.length > 0);
}

const NON_ENGLISH_CERT_PATTERN = /\b(untuk|pemula|sampai|mahir|pemrograman)\b/i;

function buildCertifications(profile: MasterProfile, detailed: boolean): ProfileCertification[] {
  if (detailed) {
    return [...profile.certifications];
  }
  return profile.certifications.filter((cert) => !NON_ENGLISH_CERT_PATTERN.test(cert.name));
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

    const limit = detailed ? rankedBullets.length : (entry.defaultBulletLimit ?? 3);
    return {
      id: entry.id,
      title: entry.title,
      organization: entry.organization,
      location: entry.location,
      employmentType: entry.employmentType,
      period: entry.periodLabel ?? `${entry.startYear} - ${entry.endYear}`,
      bullets: rankedBullets.slice(0, limit).map((item) => item.text),
    };
  });
}

function buildProjects(
  profile: MasterProfile,
  role: RoleId,
  detailed: boolean,
  weights: Map<string, number>,
): ResumeProjectItem[] {
  const preset = rolePresets[role];
  const orderIndex = new Map(preset.projectOrder.map((slug, idx) => [slug, idx]));

  const ordered = [...profile.projects].sort(
    (a, b) => (orderIndex.get(a.slug) ?? 99) - (orderIndex.get(b.slug) ?? 99),
  );
  const selected = detailed ? ordered.slice(0, 4) : ordered.slice(0, 3);

  return selected.map((project) => {
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
      context: project.context,
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
  const role: RoleId = isRoleId(selection.role) ? selection.role : DEFAULT_ROLE;
  const detailed = Boolean(selection.detailed);
  const weights = buildFocusWeights(role);
  const preset = rolePresets[role];

  const contact: ResumeContactItem[] = [
    { label: "Location", value: `${profile.identity.location} (Open to Remote & Relocation)` },
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

  const additional: { label: string; value: string }[] = [
    { label: "Work preference", value: profile.preferences.workArrangement },
    { label: "Relocation", value: profile.preferences.relocation },
  ];

  return {
    role,
    detailed,
    experienceYears: getEngineeringYears(
      profile.timeline.engineeringSince,
      selection.referenceDate,
    ),
    filenameBase: resumeBaseFilename({
      candidateName: profile.identity.name,
      roleLabel: preset.label,
    }),
    name: profile.identity.name,
    headline: `${preset.label} | ${preset.tagline}`,
    contact,
    summary: buildSummary(profile, weights, detailed, selection.referenceDate),
    skillCategories: buildSkillCategories(profile, role, detailed, weights),
    experience: buildExperience(profile, detailed, weights),
    projects: buildProjects(profile, role, detailed, weights),
    education: [...profile.education],
    certifications: buildCertifications(profile, detailed),
    languages: [...profile.languages],
    additional,
  };
}
