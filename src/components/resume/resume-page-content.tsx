"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/context/locale-context";
import { resolveRole, rolePresets, type RoleId } from "@/data/resume/role-presets";
import { buildResume } from "@/lib/resume/build-resume";
import { translations } from "@/data/translations";
import { ResumeCustomizer } from "./resume-customizer";
import { ResumeDocument } from "./resume-document";

export function ResumePageContent() {
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const t = translations.resume;

  const urlRoleParam = searchParams.get("role");
  const urlDetailed = searchParams.get("mode") === "detailed";

  const [role, setRole] = useState<RoleId>(() => resolveRole(urlRoleParam));
  const [isDetailed, setIsDetailed] = useState(urlDetailed);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setRole(resolveRole(params.get("role")));
      setIsDetailed(params.get("mode") === "detailed");
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const model = useMemo(
    () => buildResume(undefined, { role, detailed: isDetailed }),
    [role, isDetailed],
  );

  function updateQuery(nextRole: RoleId, detailed: boolean) {
    setRole(nextRole);
    setIsDetailed(detailed);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("role", nextRole);
      if (detailed) params.set("mode", "detailed");
      else params.delete("mode");
      const query = params.toString();
      window.history.replaceState(null, "", `/resume/${query ? `?${query}` : ""}`);
    }
  }

  const preset = rolePresets[role];
  const printHref = `/resume/print/?role=${role}${isDetailed ? "&mode=detailed" : ""}`;

  return (
    <>
      <section className="resume-page-header">
        <div className="container">
          <div className="resume-hero-layout">
            <div className="resume-hero-main">
              <p className="eyebrow">
                {locale === "en" ? "ATS-Friendly CV Generator" : "Generator CV Standar ATS"}
              </p>
              <h1>
                {locale === "en" ? (
                  <>
                    One source of truth.
                    <br />
                    <em>Focused engineering resumes.</em>
                  </>
                ) : (
                  <>
                    Satu sumber data.
                    <br />
                    <em>Resume rekayasa terfokus.</em>
                  </>
                )}
              </h1>
              <p className="resume-hero-description">
                {locale === "en"
                  ? "Choose a target role to prioritize the summary, skill categories, and projects. Single-column A4 layout formatted for ATS parsing and browser PDF export."
                  : "Pilih fokus peran untuk menyesuaikan ringkasan, kategori keahlian, dan proyek. Tata letak A4 satu kolom yang ramah parser ATS dan ekspor PDF browser."}
              </p>
            </div>

            <div className="resume-hero-panel">
              <ResumeCustomizer current={role} onSelect={(next) => updateQuery(next, isDetailed)} />

              <div className="role-focus-pill" aria-live="polite">
                <span className="role-focus-tag mono">
                  {locale === "en" ? "Active focus" : "Fokus aktif"}:
                </span>
                <span className="role-focus-text">{preset.tagline}</span>
              </div>

              <div className="resume-format-row">
                <span className="mono role-selector-label">{t.format[locale]}</span>
                <div className="resume-format-toggle" role="group" aria-label="Resume density">
                  <button
                    type="button"
                    aria-pressed={!isDetailed}
                    className={`resume-format-btn ${!isDetailed ? "is-active" : ""}`}
                    onClick={() => updateQuery(role, false)}
                  >
                    {locale === "en" ? "Standard" : "Standar"}
                  </button>
                  <button
                    type="button"
                    aria-pressed={isDetailed}
                    className={`resume-format-btn ${isDetailed ? "is-active" : ""}`}
                    onClick={() => updateQuery(role, true)}
                  >
                    {locale === "en" ? "Detailed" : "Lengkap"}
                  </button>
                </div>
              </div>

              <div className="resume-actions">
                <a href={printHref} className="resume-primary-action">
                  <span>{t.printSavePdf[locale]}</span>
                </a>
              </div>
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
            <a href={printHref} className="button button-secondary">
              {t.printSavePdf[locale]}
            </a>
          </div>

          <ResumeDocument model={model} />
        </div>
      </section>
    </>
  );
}
