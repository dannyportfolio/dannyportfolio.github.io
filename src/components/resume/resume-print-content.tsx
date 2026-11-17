"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "@/context/locale-context";
import { masterProfile } from "@/data/resume/master-profile";
import { DEFAULT_ROLE, isRoleId, type RoleId } from "@/data/resume/role-presets";
import { buildResume } from "@/lib/resume/build-resume";
import { PrintButton } from "./print-button";
import { ResumeDocument } from "./resume-document";

function resolveRole(value: string | null): RoleId {
  return isRoleId(value) ? value : DEFAULT_ROLE;
}

export function ResumePrintContent() {
  const searchParams = useSearchParams();
  const role = resolveRole(searchParams.get("role"));
  const isDetailed = searchParams.get("mode") === "detailed";
  const { locale } = useLocale();

  const model = buildResume(masterProfile, { role, detailed: isDetailed });

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

  const backHref = `/resume/?role=${role}${isDetailed ? "&mode=detailed" : ""}#resume`;

  return (
    <main className="print-page">
      <title>{model.filenameBase}</title>
      <div className="print-toolbar">
        <a className="button button-secondary" href={backHref}>
          {locale === "en" ? "Back to customizer" : "Kembali ke customizer"}
        </a>
        <div className="print-toolbar-right">
          <span className="mono print-filename">{model.filenameBase}.pdf</span>
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
