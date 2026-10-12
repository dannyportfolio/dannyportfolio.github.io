"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import type { TargetRole } from "@/data/profile";
import { ResumeCustomizer } from "./resume-customizer";
import { ResumeDocument } from "./resume-document";

function validRole(value: string | null): TargetRole {
  return value === "software" || value === "fullstack" ? value : "backend";
}

export function ResumePageContent() {
  const searchParams = useSearchParams();
  const role = validRole(searchParams.get("role"));
  const isDetailed = searchParams.get("mode") === "detailed";

  return (
    <>
      <section className="resume-page-header">
        <div className="container">
          <p className="eyebrow">CV generator</p>
          <h1>
            One source of truth.
            <br />
            <em>Two focused resumes.</em>
          </h1>
          <p>
            Choose a target role to prioritise the summary and skills. The portfolio and CV use the
            same editable data files.
          </p>
          <ResumeCustomizer current={role} />
          <div className="hero-actions">
            {isDetailed ? (
              <>
                <ButtonLink href={`/resume/print?role=${role}&mode=detailed`}>
                  Download Detailed CV PDF <span aria-hidden="true">↗</span>
                </ButtonLink>
                <Link className="text-link" href={`/resume?role=${role}#resume`}>
                  Standard CV (1–2 pages) ↑
                </Link>
              </>
            ) : (
              <>
                <ButtonLink href={`/resume/print?role=${role}`}>
                  Download CV PDF <span aria-hidden="true">↗</span>
                </ButtonLink>
                <Link
                  className="text-link"
                  href={`/resume?role=${role}&mode=detailed#detailed-resume`}
                >
                  Detailed engineering resume ↓
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="resume-preview" id="resume">
        <div className="container">
          <div className="resume-preview-bar">
            <p className="eyebrow">Professional CV · 1–2 pages</p>
            <ButtonLink href={`/resume/print?role=${role}`} variant="secondary">
              Download Standard PDF <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
          <ResumeDocument role={role} />
        </div>
      </section>
      <section className="resume-preview detailed-preview" id="detailed-resume">
        <div className="container">
          <div className="resume-preview-bar">
            <p className="eyebrow">Detailed engineering resume</p>
            <ButtonLink href={`/resume/print?role=${role}&mode=detailed`} variant="secondary">
              Download Detailed PDF <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
          <ResumeDocument role={role} detailed />
        </div>
      </section>
    </>
  );
}
