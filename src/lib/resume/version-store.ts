import type { ProfileOverrides } from "../../data/resume/master-profile.ts";
import { isRoleId, type RoleId } from "../../data/resume/role-presets.ts";
import type { ResumeMode } from "./build-resume.ts";
import type { JobInput } from "./job-analyzer.ts";

export type SavedResumeVersion = {
  id: string;
  name: string;
  updatedAt: string;
  mode: ResumeMode;
  role: RoleId;
  detailed: boolean;
  job?: JobInput;
};

export type StorageWriteResult = { ok: true } | { ok: false; error: string };
export type VersionMutationResult = { versions: SavedResumeVersion[]; error?: string };

const VERSIONS_KEY = "df_resume_versions_v1";
const OVERRIDES_KEY = "df_profile_overrides_v1";
const MAX_HASH_LENGTH = 16_000;

function readStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`[resume-store] Unable to read ${key} from localStorage:`, error);
    return null;
  }
}

function writeStorageItem(key: string, value: string): StorageWriteResult {
  if (typeof window === "undefined") {
    return { ok: false, error: "Browser storage is unavailable outside a browser session." };
  }
  try {
    window.localStorage.setItem(key, value);
    return { ok: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown storage error";
    console.warn(`[resume-store] Unable to write ${key} to localStorage:`, error);
    return { ok: false, error: `Could not save to browser storage (${detail}).` };
  }
}

function removeStorageItem(key: string): StorageWriteResult {
  if (typeof window === "undefined") {
    return { ok: false, error: "Browser storage is unavailable outside a browser session." };
  }
  try {
    window.localStorage.removeItem(key);
    return { ok: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown storage error";
    console.warn(`[resume-store] Unable to remove ${key} from localStorage:`, error);
    return { ok: false, error: `Could not clear browser storage (${detail}).` };
  }
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(encoded: string): Uint8Array {
  const padded =
    encoded.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((encoded.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeJobPayload(job: JobInput): string {
  const clean: JobInput = {
    title: (job.title ?? "").slice(0, 140),
    company: (job.company ?? "").slice(0, 100),
    text: (job.text ?? "").slice(0, 8_000),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(clean));
  return toBase64Url(bytes);
}

export function decodeJobPayload(hash: string): JobInput | null {
  if (!hash) return null;
  const normalized = hash.startsWith("#") ? hash.slice(1) : hash;
  const params = new URLSearchParams(normalized);
  const raw = params.get("job");
  if (!raw || raw.length > MAX_HASH_LENGTH) return null;

  try {
    const json = new TextDecoder().decode(fromBase64Url(raw));
    const parsed: unknown = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;
    const rec = parsed as Record<string, unknown>;
    return {
      title: typeof rec.title === "string" ? rec.title.slice(0, 140) : "",
      company: typeof rec.company === "string" ? rec.company.slice(0, 100) : "",
      text: typeof rec.text === "string" ? rec.text.slice(0, 12_000) : "",
    };
  } catch (error) {
    // Reject corrupted or tampered URL-hash payloads rather than crashing the print view.
    console.warn("[resume-store] Ignoring malformed #job hash payload:", error);
    return null;
  }
}

export function loadSavedVersions(): SavedResumeVersion[] {
  const raw = readStorageItem(VERSIONS_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SavedResumeVersion => {
      if (!item || typeof item !== "object") return false;
      const v = item as Record<string, unknown>;
      return (
        typeof v.id === "string" &&
        typeof v.name === "string" &&
        typeof v.updatedAt === "string" &&
        (v.mode === "general" || v.mode === "role" || v.mode === "job") &&
        isRoleId(v.role)
      );
    });
  } catch (error) {
    console.warn("[resume-store] Corrupted saved resume versions JSON in localStorage:", error);
    return [];
  }
}

export function saveResumeVersion(
  input: Omit<SavedResumeVersion, "id" | "updatedAt"> & { id?: string },
): VersionMutationResult {
  const existing = loadSavedVersions();
  const id = input.id || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const nextItem: SavedResumeVersion = {
    id,
    name: input.name.trim().slice(0, 80) || "Untitled Version",
    updatedAt: new Date().toISOString(),
    mode: input.mode,
    role: input.role,
    detailed: Boolean(input.detailed),
    job: input.job,
  };
  const updated = [nextItem, ...existing.filter((item) => item.id !== id)].slice(0, 25);
  const result = writeStorageItem(VERSIONS_KEY, JSON.stringify(updated));
  return result.ok ? { versions: updated } : { versions: updated, error: result.error };
}

export function deleteResumeVersion(id: string): VersionMutationResult {
  const updated = loadSavedVersions().filter((item) => item.id !== id);
  const result = writeStorageItem(VERSIONS_KEY, JSON.stringify(updated));
  return result.ok ? { versions: updated } : { versions: updated, error: result.error };
}

function sanitizeEducationList(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const e = entry as Record<string, unknown>;
    if (
      typeof e.institution !== "string" ||
      typeof e.credential !== "string" ||
      typeof e.period !== "string"
    ) {
      return [];
    }
    return [
      {
        institution: e.institution.slice(0, 140),
        credential: e.credential.slice(0, 140),
        period: e.period.slice(0, 40),
        details: typeof e.details === "string" ? e.details.slice(0, 180) : undefined,
        status: "user-provided" as const,
      },
    ];
  });
}

function sanitizeLanguagesList(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const e = entry as Record<string, unknown>;
    if (typeof e.language !== "string" || typeof e.proficiency !== "string") {
      return [];
    }
    return [
      {
        language: e.language.slice(0, 60),
        proficiency: e.proficiency.slice(0, 60),
      },
    ];
  });
}

export function loadProfileOverrides(): ProfileOverrides {
  const raw = readStorageItem(OVERRIDES_KEY);
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const rec = parsed as Record<string, unknown>;
    return {
      phone: typeof rec.phone === "string" ? rec.phone.slice(0, 40) : undefined,
      location: typeof rec.location === "string" ? rec.location.slice(0, 80) : undefined,
      workArrangement:
        typeof rec.workArrangement === "string" ? rec.workArrangement.slice(0, 180) : undefined,
      relocation: typeof rec.relocation === "string" ? rec.relocation.slice(0, 180) : undefined,
      additionalNotes:
        typeof rec.additionalNotes === "string" ? rec.additionalNotes.slice(0, 240) : undefined,
      education: sanitizeEducationList(rec.education),
      languages: sanitizeLanguagesList(rec.languages),
    };
  } catch (error) {
    console.warn("[resume-store] Corrupted profile overrides JSON in localStorage:", error);
    return {};
  }
}

export function saveProfileOverrides(overrides: ProfileOverrides): StorageWriteResult {
  return writeStorageItem(OVERRIDES_KEY, JSON.stringify(overrides));
}

export function clearProfileOverrides(): StorageWriteResult {
  return removeStorageItem(OVERRIDES_KEY);
}
