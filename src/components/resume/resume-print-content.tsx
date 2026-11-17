"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/locale-context";
import { masterProfile, type ProfileOverrides } from "@/data/resume/master-profile";
import { DEFAULT_ROLE, isRoleId, type RoleId } from "@/data/resume/role-presets";
import { buildResume } from "@/lib/resume/build-resume";
import type { JobInput } from "@/lib/resume/job-analyzer";
import { decodeJobPayload, loadProfileOverrides } from "@/lib/resume/version-store";
import { PrintButton } from "./print-button";
import { ResumeDocument } from "./resume-document";
import { triggerDocxDownload } from "./resume-download";

function resolveRole(value: string | null): RoleId {
  return isRoleId(value) ? value : DEFAULT_ROLE;
}

export function ResumePrintContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const isDetailed = searchParams.get("mode") === "detailed";
  const { locale } = useLocale();

  const [job, setJob] = useState<JobInput | undefined>(undefined);
  const [overrides, setOverrides] = useState<ProfileOverrides>({});
  const [hashSuffix, setHashSuffix] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    const decoded = decodeJobPayload(hash);
    const savedOverrides = loadProfileOverrides();

    const frame = window.requestAnimationFrame(() => {
      if (decoded) {
        setJob(decoded);
        setHashSuffix(hash);
      }
      setOverrides(savedOverrides);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const role = resolveRole(roleParam);
  const mode =
    job && (job.text.trim() || (job.title ?? "").trim()) ? "job" : roleParam ? "role" : "general";

  const model = buildResume(masterProfile, {
    mode,
    role,
    detailed: isDetailed,
    job,
    overrides,
  });

  useEffect(() => {
    const syncTitle = () => {
      document.title = model.filenameBase;
    };
    syncTitle();
    const timer = window.setTimeout(syncTitle, 50);
    window.addEventListener("beforeprint", syncTitle);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeprint", syncTitle);
    };
  }, [model.filenameBase]);

  const backHref = `/resume/?role=${role}${isDetailed ? "&mode=detailed" : ""}#resume${hashSuffix}`;

  return (
    <main className="print-page">
      <title>{model.filenameBase}</title>
      <div className="print-toolbar">
        <a className="button button-secondary" href={backHref}>
          {locale === "en" ? "Back to generator" : "Kembali ke generator"}
        </a>
        <div className="print-toolbar-right">
          <span className="mono print-filename">{model.filenameBase}.pdf</span>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => triggerDocxDownload(model)}
          >
            DOCX
          </button>
          <PrintButton
            label={locale === "en" ? "Print / Save as PDF" : "Cetak / Simpan PDF"}
            filenameBase={model.filenameBase}
          />
        </div>
      </div>
      <ResumeDocument model={model} standalone />
    </main>
  );
}
