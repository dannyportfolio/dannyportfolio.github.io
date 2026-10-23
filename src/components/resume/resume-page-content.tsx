"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import type { TargetRole } from "@/data/profile";
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

  return (
    <>
      <section className="resume-page-header">
        <div className="container">
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
          <p>
            {locale === "en"
              ? "Choose a target role to prioritize the summary and skill ordering. The portfolio and CV share identical, verified data."
              : "Pilih fokus peran untuk menyesuaikan ringkasan dan urutan keahlian. Seluruh portofolio dan CV menggunakan data terverifikasi yang sama."}
          </p>
          <ResumeCustomizer current={role} />
          <div className="hero-actions">
            {isDetailed ? (
              <>
                <ButtonLink href={`/resume/print?role=${role}&mode=detailed`}>
                  {locale === "en" ? "Download Detailed CV PDF" : "Unduh PDF CV Lengkap"}{" "}
                  <span aria-hidden="true">↗</span>
                </ButtonLink>
                <Link className="text-link" href={`/resume?role=${role}#resume`}>
                  {locale === "en" ? "Standard CV (1–2 pages) ↑" : "CV Standar (1–2 halaman) ↑"}
                </Link>
              </>
            ) : (
              <>
                <ButtonLink href={`/resume/print?role=${role}`}>
                  {locale === "en" ? "Download CV PDF" : "Unduh PDF CV"}{" "}
                  <span aria-hidden="true">↗</span>
                </ButtonLink>
                <Link
                  className="text-link"
                  href={`/resume?role=${role}&mode=detailed#detailed-resume`}
                >
                  {locale === "en"
                    ? "Detailed engineering breakdown ↓"
                    : "Ringkasan rekayasa mendalam ↓"}
                </Link>
              </>
            )}
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
