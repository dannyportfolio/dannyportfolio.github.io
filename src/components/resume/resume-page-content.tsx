"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { targetRoles, type TargetRole } from "@/data/profile";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";
import { ResumeCustomizer } from "./resume-customizer";
import { ResumeDocument } from "./resume-document";

function validRole(value: string | null): TargetRole {
  return value === "software" || value === "fullstack" ? value : "backend";
}

export function ResumePageContent() {
  const searchParams = useSearchParams();
  const role = validRole(searchParams.get("role"));
  const isDetailed = searchParams.get("mode") === "detailed";
  const { locale } = useLocale();
  const t = translations.resume;
  const currentTarget = targetRoles[role];

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
                    <em>Two focused resumes.</em>
                  </>
                ) : (
                  <>
                    Satu sumber data.
                    <br />
                    <em>Dua fokus resume.</em>
                  </>
                )}
              </h1>
              <p className="resume-hero-description">
                {locale === "en"
                  ? "Choose a target role to prioritize the summary and skill ordering. The portfolio and CV share identical, verified data."
                  : "Pilih fokus peran untuk menyesuaikan ringkasan dan urutan keahlian. Seluruh portofolio dan CV menggunakan data terverifikasi yang sama."}
              </p>
            </div>

            <div className="resume-hero-panel">
              <ResumeCustomizer current={role} />

              <div className="role-focus-pill" aria-live="polite">
                <span className="role-focus-tag mono">
                  {locale === "en" ? "Active focus" : "Fokus aktif"}:
                </span>
                <span className="role-focus-text">{currentTarget.subtitle[locale]}</span>
              </div>

              <div className="resume-actions">
                {isDetailed ? (
                  <>
                    <ButtonLink
                      href={`/resume/print?role=${role}&mode=detailed`}
                      className="resume-primary-action"
                    >
                      <span>
                        {locale === "en" ? "Download Detailed CV PDF" : "Unduh PDF CV Lengkap"}
                      </span>
                      <span className="action-icon" aria-hidden="true">
                        ↗
                      </span>
                    </ButtonLink>
                    <Link className="resume-secondary-action" href={`/resume?role=${role}#resume`}>
                      <span>
                        {locale === "en" ? "Standard CV (1–2 pages)" : "CV Standar (1–2 halaman)"}
                      </span>
                      <span className="action-icon" aria-hidden="true">
                        ↑
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <ButtonLink
                      href={`/resume/print?role=${role}`}
                      className="resume-primary-action"
                    >
                      <span>{locale === "en" ? "Download CV PDF" : "Unduh PDF CV"}</span>
                      <span className="action-icon" aria-hidden="true">
                        ↗
                      </span>
                    </ButtonLink>
                    <Link
                      className="resume-secondary-action"
                      href={`/resume?role=${role}&mode=detailed#detailed-resume`}
                    >
                      <span>
                        {locale === "en"
                          ? "Detailed engineering breakdown"
                          : "Ringkasan rekayasa mendalam"}
                      </span>
                      <span className="action-icon" aria-hidden="true">
                        ↓
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="resume-preview" id="resume">
        <div className="container">
          <div className="resume-preview-bar">
            <p className="eyebrow">{t.standard[locale]}</p>
            <ButtonLink href={`/resume/print?role=${role}`} variant="secondary">
              {locale === "en" ? "Print / Save PDF" : "Cetak / Simpan PDF"}{" "}
              <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
          <ResumeDocument role={role} locale={locale} />
        </div>
      </section>

      <section className="resume-preview detailed-preview" id="detailed-resume">
        <div className="container">
          <div className="resume-preview-bar">
            <p className="eyebrow">{t.detailed[locale]}</p>
            <ButtonLink href={`/resume/print?role=${role}&mode=detailed`} variant="secondary">
              {locale === "en" ? "Print / Save PDF" : "Cetak / Simpan PDF"}{" "}
              <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
          <ResumeDocument role={role} detailed locale={locale} />
        </div>
      </section>
    </>
  );
}
