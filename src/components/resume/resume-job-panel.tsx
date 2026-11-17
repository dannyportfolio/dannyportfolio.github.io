"use client";

import { useLocale } from "@/context/locale-context";
import { rolePresets, type RoleId } from "@/data/resume/role-presets";
import type { JobAnalysis, JobInput } from "@/lib/resume/job-analyzer";

export function ResumeJobPanel({
  job,
  onChange,
  analysis,
  activeRole,
  onSelectRole,
}: {
  job: JobInput;
  onChange: (next: JobInput) => void;
  analysis: JobAnalysis | null;
  activeRole: RoleId;
  onSelectRole: (role: RoleId) => void;
}) {
  const { locale } = useLocale();
  const hasText = job.text.trim().length > 0 || (job.title ?? "").trim().length > 0;

  return (
    <div className="resume-job-panel">
      <div className="resume-form-row">
        <div className="resume-field">
          <label htmlFor="jd-company" className="mono resume-field-label">
            {locale === "en" ? "Company (optional)" : "Perusahaan (opsional)"}
          </label>
          <input
            id="jd-company"
            type="text"
            className="resume-input"
            value={job.company ?? ""}
            onChange={(e) => onChange({ ...job, company: e.target.value })}
            placeholder={
              locale === "en" ? "Company name for filename" : "Nama perusahaan untuk file"
            }
            maxLength={100}
          />
        </div>
        <div className="resume-field">
          <label htmlFor="jd-title" className="mono resume-field-label">
            {locale === "en" ? "Target Role Title (optional)" : "Judul Peran (opsional)"}
          </label>
          <input
            id="jd-title"
            type="text"
            className="resume-input"
            value={job.title ?? ""}
            onChange={(e) => onChange({ ...job, title: e.target.value })}
            placeholder={locale === "en" ? "e.g. Backend Engineer" : "mis. Backend Engineer"}
            maxLength={140}
          />
        </div>
      </div>

      <div className="resume-field">
        <div className="resume-field-header">
          <label htmlFor="jd-text" className="mono resume-field-label">
            {locale === "en" ? "Job Description" : "Deskripsi Pekerjaan"}
          </label>
          {hasText && (
            <button
              type="button"
              className="resume-text-btn"
              onClick={() => onChange({ title: "", company: "", text: "" })}
            >
              {locale === "en" ? "Clear input" : "Hapus"}
            </button>
          )}
        </div>
        <textarea
          id="jd-text"
          className="resume-textarea"
          rows={6}
          value={job.text}
          onChange={(e) => onChange({ ...job, text: e.target.value })}
          placeholder={
            locale === "en"
              ? "Paste responsibilities, required qualifications, and preferred skills. Matching and gap analysis run locally in your browser."
              : "Tempel tanggung jawab, kualifikasi wajib, dan keahlian yang diinginkan. Analisis berjalan lokal di browser Anda."
          }
          maxLength={30_000}
        />
      </div>

      {!hasText ? (
        <div className="resume-analysis-empty">
          <p>
            {locale === "en"
              ? "Paste a job description above to analyze keyword matches against verified project evidence and inspect any missing requirements."
              : "Tempel deskripsi pekerjaan di atas untuk mencocokkan keahlian terverifikasi dan melihat kesenjangan persyaratan."}
          </p>
        </div>
      ) : analysis ? (
        <div className="resume-analysis-card" aria-live="polite">
          <div className="resume-analysis-header">
            <div>
              <span className="mono resume-field-label">
                {locale === "en" ? "Profile Match Summary" : "Ringkasan Kecocokan"}
              </span>
              <p className="resume-analysis-score">
                {analysis.matchSummary.matchedCount} of {analysis.matchSummary.totalRecognized}{" "}
                recognized keywords supported by profile
                {analysis.matchSummary.requiredTotal > 0
                  ? ` (${analysis.matchSummary.requiredMatched}/${analysis.matchSummary.requiredTotal} required)`
                  : ""}
              </p>
            </div>
            {analysis.suggestedRole !== activeRole && (
              <button
                type="button"
                className="resume-pill-action"
                onClick={() => onSelectRole(analysis.suggestedRole)}
              >
                {locale === "en" ? "Switch to" : "Ganti ke"}{" "}
                {rolePresets[analysis.suggestedRole].label}
              </button>
            )}
          </div>

          <div className="resume-analysis-columns">
            <div className="resume-analysis-col">
              <h3 className="mono resume-analysis-subhead">
                {locale === "en" ? "Matched Skills & Evidence" : "Keahlian Cocok & Bukti"}
              </h3>
              {analysis.matchedSkills.length > 0 ? (
                <ul className="resume-match-list">
                  {analysis.matchedSkills.map((item) => (
                    <li key={item.skill} className="resume-match-item">
                      <span className="resume-match-name">{item.skill}</span>
                      <span className="resume-match-meta">
                        {item.required ? "required" : "preferred"} · {item.status} (
                        {item.evidence.join(", ")})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="resume-analysis-muted">
                  {locale === "en"
                    ? "No recognized skills matched yet. Add the technical stack section of the job posting."
                    : "Belum ada kata kunci teknis yang cocok."}
                </p>
              )}
            </div>

            <div className="resume-analysis-col">
              <h3 className="mono resume-analysis-subhead">
                {locale === "en"
                  ? "Unmatched Requirements (Not Added)"
                  : "Persyaratan Belum Terpenuhi (Tidak Ditambahkan)"}
              </h3>
              {analysis.gaps.length > 0 ? (
                <ul className="resume-gap-list">
                  {analysis.gaps.map((gap) => (
                    <li key={gap.term} className="resume-gap-item">
                      <span className="resume-match-name">{gap.term}</span>
                      <span className="resume-match-meta">
                        {gap.required ? "required" : "preferred"} · {gap.note}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="resume-analysis-muted">
                  {locale === "en"
                    ? "No unverified external skills detected in the recognized keyword set."
                    : "Tidak ada keahlian eksternal yang terdeteksi sebagai kesenjangan."}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
