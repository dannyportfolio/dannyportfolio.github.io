"use client";

import { useState } from "react";
import { useLocale } from "@/context/locale-context";
import {
  masterProfile,
  type ProfileEducation,
  type ProfileLanguage,
  type ProfileOverrides,
} from "@/data/resume/master-profile";
import { rolePresets } from "@/data/resume/role-presets";
import type { SavedResumeVersion } from "@/lib/resume/version-store";

export function ResumeProfilePanel({
  versions,
  onSaveVersion,
  onLoadVersion,
  onDeleteVersion,
  defaultVersionName,
  overrides,
  onSaveOverrides,
  onResetOverrides,
}: {
  versions: SavedResumeVersion[];
  onSaveVersion: (name: string) => void;
  onLoadVersion: (version: SavedResumeVersion) => void;
  onDeleteVersion: (id: string) => void;
  defaultVersionName: string;
  overrides: ProfileOverrides;
  onSaveOverrides: (next: ProfileOverrides) => void;
  onResetOverrides: () => void;
}) {
  const { locale } = useLocale();
  const [versionName, setVersionName] = useState("");
  const [eduInstitution, setEduInstitution] = useState("");
  const [eduCredential, setEduCredential] = useState("");
  const [eduPeriod, setEduPeriod] = useState("");
  const [langName, setLangName] = useState("");
  const [langLevel, setLangLevel] = useState("");

  const verifiedSkillCount = masterProfile.skills.filter((s) => s.status === "verified").length;
  const userSkillCount = masterProfile.skills.filter((s) => s.status === "user-provided").length;

  function handleSaveCurrentVersion() {
    onSaveVersion(versionName.trim() || defaultVersionName);
    setVersionName("");
  }

  function handleAddEducation() {
    if (!eduInstitution.trim() || !eduCredential.trim() || !eduPeriod.trim()) return;
    const entry: ProfileEducation = {
      institution: eduInstitution.trim(),
      credential: eduCredential.trim(),
      period: eduPeriod.trim(),
      status: "user-provided",
    };
    onSaveOverrides({
      ...overrides,
      education: [...(overrides.education ?? []), entry],
    });
    setEduInstitution("");
    setEduCredential("");
    setEduPeriod("");
  }

  function handleRemoveEducation(index: number) {
    const next = [...(overrides.education ?? [])];
    next.splice(index, 1);
    onSaveOverrides({ ...overrides, education: next });
  }

  function handleAddLanguage() {
    if (!langName.trim() || !langLevel.trim()) return;
    const entry: ProfileLanguage = {
      language: langName.trim(),
      proficiency: langLevel.trim(),
    };
    onSaveOverrides({
      ...overrides,
      languages: [...(overrides.languages ?? []), entry],
    });
    setLangName("");
    setLangLevel("");
  }

  function handleRemoveLanguage(index: number) {
    const next = [...(overrides.languages ?? [])];
    next.splice(index, 1);
    onSaveOverrides({ ...overrides, languages: next });
  }

  function handleDownloadMasterJson() {
    const blob = new Blob([JSON.stringify(masterProfile, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "master-profile.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="resume-manage-grid">
      <div className="resume-manage-card">
        <h3 className="resume-manage-title">
          {locale === "en" ? "Saved Resume Versions" : "Versi Resume Tersimpan"}
        </h3>
        <p className="resume-manage-copy">
          {locale === "en"
            ? "Save tailored role or job configurations in this browser so you can reopen or export them anytime."
            : "Simpan konfigurasi peran atau lowongan di browser ini agar mudah dibuka atau diekspor kembali."}
        </p>

        <div className="resume-inline-save">
          <div className="resume-field">
            <label htmlFor="version-name" className="mono resume-field-label">
              {locale === "en" ? "Version Name" : "Nama Versi"}
            </label>
            <input
              id="version-name"
              type="text"
              className="resume-input"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              placeholder={defaultVersionName}
              maxLength={80}
            />
          </div>
          <button
            type="button"
            className="button button-secondary"
            onClick={handleSaveCurrentVersion}
          >
            {locale === "en" ? "Save Current" : "Simpan Versi"}
          </button>
        </div>

        {versions.length === 0 ? (
          <p className="resume-analysis-muted">
            {locale === "en"
              ? "No saved versions yet. Configure a role or job description and save it here."
              : "Belum ada versi tersimpan. Atur peran atau deskripsi pekerjaan lalu simpan di sini."}
          </p>
        ) : (
          <ul className="resume-version-list">
            {versions.map((version) => (
              <li key={version.id} className="resume-version-item">
                <div>
                  <strong>{version.name}</strong>
                  <span className="resume-match-meta">
                    {rolePresets[version.role].label} · {version.detailed ? "Detailed" : "Standard"}{" "}
                    · {version.mode}
                  </span>
                </div>
                <div className="resume-version-actions">
                  <button
                    type="button"
                    className="resume-pill-action"
                    onClick={() => onLoadVersion(version)}
                  >
                    {locale === "en" ? "Load" : "Muat"}
                  </button>
                  <button
                    type="button"
                    className="resume-text-btn"
                    onClick={() => onDeleteVersion(version.id)}
                  >
                    {locale === "en" ? "Delete" : "Hapus"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="resume-manage-card">
        <div className="resume-manage-head">
          <h3 className="resume-manage-title">
            {locale === "en" ? "Master Profile & Gaps" : "Profil Utama & Informasi Kosong"}
          </h3>
          <button type="button" className="resume-text-btn" onClick={handleDownloadMasterJson}>
            {locale === "en" ? "Export JSON" : "Ekspor JSON"}
          </button>
        </div>

        <p className="resume-manage-copy">
          Verified skills: {verifiedSkillCount} · User-provided skills: {userSkillCount} · Verified
          projects: {masterProfile.projects.length} · Verified certifications:{" "}
          {masterProfile.certifications.length}
        </p>

        <div className="resume-gaps-box">
          <span className="mono resume-field-label">
            {locale === "en"
              ? "Information Gaps Requiring Confirmation"
              : "Data Belum Terkonfirmasi"}
          </span>
          <ul className="resume-gaps-items">
            {masterProfile.informationGaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </div>

        <div className="resume-overrides-box">
          <div className="resume-manage-head">
            <span className="mono resume-field-label">
              {locale === "en"
                ? "Local Confirmed Overrides (This Browser Only)"
                : "Penambahan Terkonfirmasi Lokal (Browser Ini Saja)"}
            </span>
            <button type="button" className="resume-text-btn" onClick={onResetOverrides}>
              {locale === "en" ? "Reset" : "Reset"}
            </button>
          </div>

          <div className="resume-form-row">
            <div className="resume-field">
              <label htmlFor="ovr-phone" className="mono resume-field-label">
                Phone
              </label>
              <input
                id="ovr-phone"
                type="tel"
                className="resume-input"
                value={overrides.phone ?? ""}
                onChange={(e) => onSaveOverrides({ ...overrides, phone: e.target.value })}
                placeholder="Optional phone number"
                maxLength={40}
              />
            </div>
            <div className="resume-field">
              <label htmlFor="ovr-location" className="mono resume-field-label">
                Location
              </label>
              <input
                id="ovr-location"
                type="text"
                className="resume-input"
                value={overrides.location ?? ""}
                onChange={(e) => onSaveOverrides({ ...overrides, location: e.target.value })}
                placeholder={masterProfile.identity.location}
                maxLength={80}
              />
            </div>
          </div>

          <div className="resume-mini-adder">
            <span className="mono resume-field-label">Add Confirmed Education</span>
            <div className="resume-form-row resume-form-row--3">
              <input
                type="text"
                aria-label="Education institution"
                className="resume-input"
                value={eduInstitution}
                onChange={(e) => setEduInstitution(e.target.value)}
                placeholder="Institution"
              />
              <input
                type="text"
                aria-label="Degree or credential"
                className="resume-input"
                value={eduCredential}
                onChange={(e) => setEduCredential(e.target.value)}
                placeholder="Degree / Program"
              />
              <input
                type="text"
                aria-label="Study period"
                className="resume-input"
                value={eduPeriod}
                onChange={(e) => setEduPeriod(e.target.value)}
                placeholder="Years (e.g. 2018 - 2022)"
              />
            </div>
            <button type="button" className="resume-pill-action" onClick={handleAddEducation}>
              Add Education
            </button>
            {(overrides.education ?? []).length > 0 && (
              <ul className="resume-chip-list">
                {(overrides.education ?? []).map((edu, idx) => (
                  <li key={`${edu.institution}-${idx}`} className="resume-chip-item">
                    <span>
                      {edu.credential} ({edu.institution}, {edu.period})
                    </span>
                    <button
                      type="button"
                      className="resume-text-btn"
                      onClick={() => handleRemoveEducation(idx)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="resume-mini-adder">
            <span className="mono resume-field-label">Add Spoken Language</span>
            <div className="resume-form-row">
              <input
                type="text"
                aria-label="Language"
                className="resume-input"
                value={langName}
                onChange={(e) => setLangName(e.target.value)}
                placeholder="Language (e.g. English)"
              />
              <input
                type="text"
                aria-label="Proficiency"
                className="resume-input"
                value={langLevel}
                onChange={(e) => setLangLevel(e.target.value)}
                placeholder="Proficiency (e.g. Professional)"
              />
            </div>
            <button type="button" className="resume-pill-action" onClick={handleAddLanguage}>
              Add Language
            </button>
            {(overrides.languages ?? []).length > 0 && (
              <ul className="resume-chip-list">
                {(overrides.languages ?? []).map((lang, idx) => (
                  <li key={`${lang.language}-${idx}`} className="resume-chip-item">
                    <span>
                      {lang.language} ({lang.proficiency})
                    </span>
                    <button
                      type="button"
                      className="resume-text-btn"
                      onClick={() => handleRemoveLanguage(idx)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
