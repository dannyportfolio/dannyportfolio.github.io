"use client";

import Link from "next/link";
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
  const isDetailed = searchParams.get("mode") === "detailed";

  return (
    <main className="print-page">
      <div className="print-toolbar">
        <Link
          className="button button-secondary"
          href={`/resume?role=${role}${isDetailed ? "&mode=detailed#detailed-resume" : "#resume"}`}
        >
          Back to customizer
        </Link>
        <PrintButton />
      </div>
      <ResumeDocument role={role} detailed={isDetailed} />
    </main>
  );
}
