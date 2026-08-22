"use client";

import { useSearchParams } from "next/navigation";
import type { TargetRole } from "@/data/profile";
import { PrintButton } from "./print-button";
import { ResumeDocument } from "./resume-document";

function validRole(value: string | null): TargetRole {
  return value === "software" || value === "fullstack" ? value : "backend";
}

export function ResumePrintContent() {
  const searchParams = useSearchParams();
  const role = validRole(searchParams.get("role"));

  return (
    <main className="print-page">
      <div className="print-toolbar">
        <a className="button button-secondary" href={`/resume?role=${role}`}>
          Back to customizer
        </a>
        <PrintButton />
      </div>
      <ResumeDocument role={role} detailed={searchParams.get("mode") === "detailed"} />
    </main>
  );
}
