"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/context/locale-context";
import { masterProfile, type ProfileOverrides } from "@/data/resume/master-profile";
import { DEFAULT_ROLE, isRoleId, rolePresets, type RoleId } from "@/data/resume/role-presets";
import { buildResume } from "@/lib/resume/build-resume";
import { buildResumePlainText } from "@/lib/resume/export-text";
import { analyzeJobDescription, type JobInput } from "@/lib/resume/job-analyzer";
import {
  clearProfileOverrides,
  decodeJobPayload,
  deleteResumeVersion,
  encodeJobPayload,
  loadProfileOverrides,
  loadSavedVersions,
  saveProfileOverrides,
  saveResumeVersion,
  type SavedResumeVersion,
} from "@/lib/resume/version-store";
import { translations } from "@/data/translations";
import { ResumeCustomizer } from "./resume-customizer";
import { ResumeDocument } from "./resume-document";
import { triggerDocxDownload } from "./resume-download";
import { ResumeJobPanel } from "./resume-job-panel";
import { ResumeProfilePanel } from "./resume-profile-panel";

type WorkspaceTab = "roles" | "job" | "manage";
type PreviewView = "document" | "text";

function resolveRole(value: string | null): RoleId {
  return isRoleId(value) ? value : DEFAULT_ROLE;
}

export function ResumePageContent() {
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const t = translations.resume;

  const urlRoleParam = searchParams.get("role");
  const urlDetailed = searchParams.get("mode") === "detailed";

  const [role, setRole] = useState<RoleId>(() => resolveRole(urlRoleParam));
  const [hasExplicitRole, setHasExplicitRole] = useState(() => isRoleId(urlRoleParam));
  const [isDetailed, setIsDetailed] = useState(urlDetailed);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("roles");
  const [previewView, setPreviewView] = useState<PreviewView>("document");
  const [job, setJob] = useState<JobInput>({ title: "", company: "", text: "" });
  const [overrides, setOverrides] = useState<ProfileOverrides>({});
  const [versions, setVersions] = useState<SavedResumeVersion[]>([]);
  const [copied, setCopied] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const nextRole = params.get("role");
      setRole(resolveRole(nextRole));
      setHasExplicitRole(isRoleId(nextRole));
      setIsDetailed(params.get("mode") === "detailed");
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    const decoded = decodeJobPayload(window.location.hash);
    const storedVersions = loadSavedVersions();
    const storedOverrides = loadProfileOverrides();

    const frame = window.requestAnimationFrame(() => {
      setVersions(storedVersions);
      setOverrides(storedOverrides);
      if (decoded && (decoded.text.trim() || (decoded.title ?? "").trim())) {
        setJob(decoded);
        setActiveTab("job");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const hasJobInput = job.text.trim().length > 0 || (job.title ?? "").trim().length > 0;
  const activeMode =
    activeTab === "job" && hasJobInput ? "job" : hasExplicitRole ? "role" : "general";

  const analysis = useMemo(() => {
    if (!hasJobInput) return null;
    return analyzeJobDescription(job, masterProfile);
  }, [hasJobInput, job]);

  const model = useMemo(
    () =>
      buildResume(masterProfile, {
        mode: activeMode,
        role,
        detailed: isDetailed,
        job: activeMode === "job" ? job : undefined,
        overrides,
      }),
    [activeMode, role, isDetailed, job, overrides],
  );

  const plainText = useMemo(() => buildResumePlainText(model), [model]);

  function updateQuery(nextRole: RoleId, detailed: boolean) {
    setRole(nextRole);
    setHasExplicitRole(true);
    setIsDetailed(detailed);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("role", nextRole);
      if (detailed) params.set("mode", "detailed");
      else params.delete("mode");
      const query = params.toString();
      const nextUrl = `/resume/${query ? `?${query}` : ""}${window.location.hash}`;
      window.history.replaceState(null, "", nextUrl);
    }
  }

  function handleSelectRole(nextRole: RoleId) {
    updateQuery(nextRole, isDetailed);
  }

  function handleToggleDetailed(detailed: boolean) {
    updateQuery(role, detailed);
  }

  function handleSaveVersion(name: string) {
    const result = saveResumeVersion({
      name,
      mode: activeMode,
      role,
      detailed: isDetailed,
      job: activeMode === "job" ? job : undefined,
    });
    setVersions(result.versions);
    setStatusNotice(result.error ?? null);
  }

  function handleLoadVersion(version: SavedResumeVersion) {
    if (version.job) {
      setJob(version.job);
      setActiveTab("job");
    } else {
      setActiveTab("roles");
    }
    updateQuery(version.role, version.detailed);
  }

  function handleDeleteVersion(id: string) {
    const result = deleteResumeVersion(id);
    setVersions(result.versions);
    setStatusNotice(result.error ?? null);
  }

  function handleSaveOverrides(next: ProfileOverrides) {
    setOverrides(next);
    const result = saveProfileOverrides(next);
    setStatusNotice(result.ok ? null : result.error);
  }

  function handleResetOverrides() {
    setOverrides({});
    const result = clearProfileOverrides();
    setStatusNotice(result.ok ? null : result.error);
  }

  async function handleCopyPlainText() {
    try {
      await navigator.clipboard.writeText(plainText);
      setStatusNotice(null);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn("Clipboard write failed; switching to plain-text view:", error);
      setPreviewView("text");
      setStatusNotice(
        locale === "en"
          ? "Clipboard access was blocked; switched to ATS Plain Text view so you can copy manually."
          : "Akses clipboard diblokir; beralih ke tampilan Teks ATS agar Anda dapat menyalin secara manual.",
      );
    }
  }

  const preset = rolePresets[role];
  const jobHash = activeMode === "job" ? `#job=${encodeJobPayload(job)}` : "";
  const printHref = `/resume/print/?role=${role}${isDetailed ? "&mode=detailed" : ""}${jobHash}`;
  const defaultVersionName =
    activeMode === "job" && job.company?.trim()
      ? `${job.company.trim()} - ${preset.label}`
      : `${preset.label} (${isDetailed ? "Detailed" : "Standard"})`;

  return (
    <>
      <section className="resume-page-header">
        <div className="container">
          <div className="resume-hero-layout">
            <div className="resume-hero-main">
              <p className="eyebrow">
                {locale === "en" ? "Universal ATS Resume System" : "Sistem Resume ATS Universal"}
              </p>
              <h1>
                {locale === "en" ? (
                  <>
                    One verified profile.
                    <br />
                    <em>Tailored to every role.</em>
                  </>
                ) : (
                  <>
                    Satu profil terverifikasi.
                    <br />
                    <em>Disesuaikan untuk setiap peran.</em>
                  </>
                )}
              </h1>
              <p className="resume-hero-description">
                {locale === "en"
                  ? "Generate international-standard, single-column A4 resumes in PDF and DOCX. Role presets and job-description tailoring reorder verified evidence without inventing skills or experience."
                  : "Buat resume A4 satu kolom standar internasional dalam format PDF dan DOCX. Pengaturan peran dan penyesuaian lowongan menyusun ulang bukti terverifikasi tanpa menambah klaim palsu."}
              </p>
            </div>

            <div className="resume-hero-panel">
              <div className="resume-workspace-tabs" role="tablist" aria-label="Resume tools">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "roles"}
                  className={`resume-tab-btn ${activeTab === "roles" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("roles")}
                >
                  {locale === "en" ? "Role Variants" : "Variasi Peran"}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "job"}
                  className={`resume-tab-btn ${activeTab === "job" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("job")}
                >
                  {locale === "en" ? "Job Tailoring" : "Sesuaikan Lowongan"}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "manage"}
                  className={`resume-tab-btn ${activeTab === "manage" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("manage")}
                >
                  {locale === "en" ? "Profile & Versions" : "Profil & Versi"}
                </button>
              </div>

              {activeTab === "roles" && (
                <>
                  <ResumeCustomizer current={role} onSelect={handleSelectRole} />
                  <div className="role-focus-pill" aria-live="polite">
                    <span className="role-focus-tag mono">
                      {locale === "en" ? "Active focus" : "Fokus aktif"}:
                    </span>
                    <span className="role-focus-text">{preset.tagline}</span>
                  </div>
                </>
              )}

              {activeTab === "job" && (
                <ResumeJobPanel
                  job={job}
                  onChange={setJob}
                  analysis={analysis}
                  activeRole={role}
                  onSelectRole={handleSelectRole}
                />
              )}

              {activeTab === "manage" && (
                <ResumeProfilePanel
                  versions={versions}
                  onSaveVersion={handleSaveVersion}
                  onLoadVersion={handleLoadVersion}
                  onDeleteVersion={handleDeleteVersion}
                  defaultVersionName={defaultVersionName}
                  overrides={overrides}
                  onSaveOverrides={handleSaveOverrides}
                  onResetOverrides={handleResetOverrides}
                />
              )}

              <div className="resume-format-row">
                <span className="mono role-selector-label">{t.format[locale]}</span>
                <div className="resume-format-toggle" role="group" aria-label="Resume density">
                  <button
                    type="button"
                    aria-pressed={!isDetailed}
                    className={`resume-format-btn ${!isDetailed ? "is-active" : ""}`}
                    onClick={() => handleToggleDetailed(false)}
                  >
                    {locale === "en" ? "Standard (1 page)" : "Standar (1 halaman)"}
                  </button>
                  <button
                    type="button"
                    aria-pressed={isDetailed}
                    className={`resume-format-btn ${isDetailed ? "is-active" : ""}`}
                    onClick={() => handleToggleDetailed(true)}
                  >
                    {locale === "en" ? "Detailed (2 pages)" : "Lengkap (2 halaman)"}
                  </button>
                </div>
              </div>

              <div className="resume-actions">
                <a href={printHref} className="resume-primary-action">
                  <span>{t.printSavePdf[locale]}</span>
                </a>
                <button
                  type="button"
                  className="resume-secondary-btn"
                  onClick={() => triggerDocxDownload(model)}
                >
                  {t.downloadDocx[locale]}
                </button>
                <button
                  type="button"
                  className="resume-secondary-btn"
                  onClick={handleCopyPlainText}
                >
                  {copied ? t.copiedPlainText[locale] : t.copyPlainText[locale]}
                </button>
              </div>
              {statusNotice && (
                <p className="resume-status-notice" role="status">
                  {statusNotice}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="resume-preview" id="resume">
        <div className="container">
          <div className="resume-preview-bar">
            <div className="resume-preview-meta">
              <p className="eyebrow">{isDetailed ? t.detailed[locale] : t.standard[locale]}</p>
              <span className="mono resume-filename-tag">{model.filenameBase}.pdf</span>
            </div>

            <div className="resume-preview-controls">
              <div className="resume-view-switch" role="group" aria-label="Preview view mode">
                <button
                  type="button"
                  aria-pressed={previewView === "document"}
                  className={`resume-format-btn ${previewView === "document" ? "is-active" : ""}`}
                  onClick={() => setPreviewView("document")}
                >
                  {locale === "en" ? "A4 Preview" : "Pratinjau A4"}
                </button>
                <button
                  type="button"
                  aria-pressed={previewView === "text"}
                  className={`resume-format-btn ${previewView === "text" ? "is-active" : ""}`}
                  onClick={() => setPreviewView("text")}
                >
                  {locale === "en" ? "ATS Plain Text" : "Teks ATS"}
                </button>
              </div>
              <a href={printHref} className="button button-secondary">
                {t.printSavePdf[locale]}
              </a>
            </div>
          </div>

          {previewView === "document" ? (
            <ResumeDocument model={model} />
          ) : (
            <pre className="resume-plain-text" aria-label="Plain text ATS extraction preview">
              {plainText}
            </pre>
          )}
        </div>
      </section>
    </>
  );
}
