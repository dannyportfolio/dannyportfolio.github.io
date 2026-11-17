import {
  masterProfile,
  type FactStatus,
  type MasterProfile,
} from "../../data/resume/master-profile.ts";
import { roleIds, rolePresets, type RoleId } from "../../data/resume/role-presets.ts";
import {
  externalSkillTerms,
  profileSkillAliases,
  type SkillPattern,
} from "../../data/resume/skill-taxonomy.ts";

export type JobInput = {
  title?: string;
  company?: string;
  text: string;
};

export type SkillMatch = {
  skill: string;
  status: FactStatus;
  evidence: string[];
  required: boolean;
  weight: number;
};

export type SkillGap = {
  term: string;
  required: boolean;
  note: string;
};

export type JobAnalysis = {
  detectedTitle: string;
  detectedCompany: string;
  suggestedRole: RoleId;
  requiredKeywords: string[];
  preferredKeywords: string[];
  allKeywords: string[];
  matchedSkills: SkillMatch[];
  gaps: SkillGap[];
  matchSummary: {
    matchedCount: number;
    totalRecognized: number;
    requiredMatched: number;
    requiredTotal: number;
  };
};

const MAX_JD_LENGTH = 30_000;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesPattern(line: string, pattern: string | RegExp): boolean {
  if (pattern instanceof RegExp) {
    return pattern.test(line);
  }
  const escaped = escapeRegex(pattern.toLowerCase());
  const prefix = pattern.startsWith(".") ? "(^|[^a-z0-9_+#])" : "(^|[^a-z0-9_+#.])";
  const rx = new RegExp(`${prefix}${escaped}(?=$|[^a-z0-9_+#.]|\\.(?!\\w))`, "i");
  return rx.test(line);
}

function countOccurrences(text: string, patterns: SkillPattern["patterns"]): number {
  let hits = 0;
  for (const pattern of patterns) {
    if (pattern instanceof RegExp) {
      const globalRx = new RegExp(
        pattern.source,
        pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`,
      );
      const matches = text.match(globalRx);
      if (matches) hits += matches.length;
    } else {
      const escaped = escapeRegex(pattern.toLowerCase());
      const prefix = pattern.startsWith(".") ? "(^|[^a-z0-9_+#])" : "(^|[^a-z0-9_+#.])";
      const rx = new RegExp(`${prefix}${escaped}(?=$|[^a-z0-9_+#.]|\\.(?!\\w))`, "gi");
      const matches = text.match(rx);
      if (matches) hits += matches.length;
    }
  }
  return hits;
}

type LineBucket = "required" | "preferred" | "general";

function classifyLines(text: string): { line: string; bucket: LineBucket }[] {
  const lines = text.split(/\r?\n/);
  let current: LineBucket = "general";
  const result: { line: string; bucket: LineBucket }[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const lower = line
      .toLowerCase()
      .replace(/[:*#-]/g, " ")
      .trim();
    const isShortHeading = line.length <= 70;

    if (
      isShortHeading &&
      /\b(preferred|nice to have|bonus|desired|optional|plus|good to have)\b/.test(lower)
    ) {
      current = "preferred";
      result.push({ line, bucket: "preferred" });
      continue;
    }

    if (
      isShortHeading &&
      /\b(required|requirements|must have|minimum|qualifications|what we look for|you bring|skills)\b/.test(
        lower,
      )
    ) {
      current = "required";
      result.push({ line, bucket: "required" });
      continue;
    }

    const lineBucket: LineBucket = /\b(nice to have|preferred|bonus|plus)\b/i.test(line)
      ? "preferred"
      : /\b(required|must have|mandatory)\b/i.test(line)
        ? "required"
        : current;

    result.push({ line, bucket: lineBucket });
  }

  return result;
}

function inferRole(title: string, text: string, matchedSkills: SkillMatch[]): RoleId {
  const titleLower = title.toLowerCase();
  const fullLower = `${titleLower}\n${text.toLowerCase()}`;
  const matchedWeights = new Map(matchedSkills.map((item) => [item.skill, item.required ? 2 : 1]));

  let bestRole: RoleId = "software";
  let bestScore = -1;

  for (const id of roleIds) {
    const preset = rolePresets[id];
    let score = 0;

    preset.signals.forEach((signal, signalIndex) => {
      const isPrimaryTitleSignal = signalIndex === 0;
      if (titleLower.includes(signal)) {
        score += isPrimaryTitleSignal ? 18 : 10;
      } else if (fullLower.includes(signal)) {
        score += 2;
      }
    });

    preset.focus.forEach((skill, idx) => {
      const reqWeight = matchedWeights.get(skill);
      if (reqWeight) {
        score += reqWeight * Math.max(1, 4 - Math.floor(idx / 3));
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestRole = id;
    }
  }

  return bestScore > 0 ? bestRole : "software";
}

function detectTitleFromText(text: string): string {
  const firstLines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 4);

  for (const line of firstLines) {
    if (
      line.length <= 80 &&
      /\b(engineer|developer|architect|sre|devops|programmer)\b/i.test(line)
    ) {
      return line.replace(/^#+\s*/, "");
    }
  }
  return "";
}

export function analyzeJobDescription(
  input: JobInput,
  profile: MasterProfile = masterProfile,
): JobAnalysis {
  const trimmedText = (input.text ?? "").slice(0, MAX_JD_LENGTH).trim();
  const detectedTitle = (input.title ?? "").trim() || detectTitleFromText(trimmedText);
  const detectedCompany = (input.company ?? "").trim();

  if (!trimmedText && !detectedTitle) {
    return {
      detectedTitle: "",
      detectedCompany,
      suggestedRole: "software",
      requiredKeywords: [],
      preferredKeywords: [],
      allKeywords: [],
      matchedSkills: [],
      gaps: [],
      matchSummary: { matchedCount: 0, totalRecognized: 0, requiredMatched: 0, requiredTotal: 0 },
    };
  }

  const combinedText = `${detectedTitle}\n${trimmedText}`;
  const lines = classifyLines(combinedText);
  const profileSkillMap = new Map(profile.skills.map((skill) => [skill.name, skill]));

  const matchedSkills: SkillMatch[] = [];
  const requiredSet = new Set<string>();
  const preferredSet = new Set<string>();

  for (const entry of profileSkillAliases) {
    const profileSkill = profileSkillMap.get(entry.canonical);
    if (!profileSkill) continue;

    let inRequired = false;
    let inPreferred = false;
    let inGeneral = false;

    for (const item of lines) {
      if (entry.patterns.some((pattern) => matchesPattern(item.line, pattern))) {
        if (item.bucket === "required") inRequired = true;
        else if (item.bucket === "preferred") inPreferred = true;
        else inGeneral = true;
      }
    }

    if (!inRequired && !inPreferred && !inGeneral) continue;

    const required = inRequired || (inGeneral && !inPreferred);
    const occurrences = countOccurrences(combinedText, entry.patterns);
    const weight = (required ? 3 : 1) + Math.min(occurrences, 4);

    if (required) requiredSet.add(entry.canonical);
    else preferredSet.add(entry.canonical);

    matchedSkills.push({
      skill: profileSkill.name,
      status: profileSkill.status,
      evidence: profileSkill.evidence,
      required,
      weight,
    });
  }

  matchedSkills.sort((a, b) => b.weight - a.weight || a.skill.localeCompare(b.skill));

  const gaps: SkillGap[] = [];
  for (const entry of externalSkillTerms) {
    if (profileSkillMap.has(entry.canonical)) continue;

    let inRequired = false;
    let inPreferred = false;
    let inGeneral = false;

    for (const item of lines) {
      if (entry.patterns.some((pattern) => matchesPattern(item.line, pattern))) {
        if (item.bucket === "required") inRequired = true;
        else if (item.bucket === "preferred") inPreferred = true;
        else inGeneral = true;
      }
    }

    if (!inRequired && !inPreferred && !inGeneral) continue;

    const required = inRequired || (inGeneral && !inPreferred);
    if (required) requiredSet.add(entry.canonical);
    else preferredSet.add(entry.canonical);

    gaps.push({
      term: entry.canonical,
      required,
      note: "Not documented in verified profile or public projects",
    });
  }

  gaps.sort((a, b) => Number(b.required) - Number(a.required) || a.term.localeCompare(b.term));

  const requiredKeywords = [...requiredSet];
  const preferredKeywords = [...preferredSet];
  const allKeywords = [...new Set([...requiredKeywords, ...preferredKeywords])];
  const requiredMatched = matchedSkills.filter((item) => item.required).length;
  const requiredGaps = gaps.filter((item) => item.required).length;

  const suggestedRole = inferRole(detectedTitle, trimmedText, matchedSkills);

  return {
    detectedTitle,
    detectedCompany,
    suggestedRole,
    requiredKeywords,
    preferredKeywords,
    allKeywords,
    matchedSkills,
    gaps,
    matchSummary: {
      matchedCount: matchedSkills.length,
      totalRecognized: matchedSkills.length + gaps.length,
      requiredMatched,
      requiredTotal: requiredMatched + requiredGaps,
    },
  };
}
