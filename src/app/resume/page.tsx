import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { ResumePageContent } from "@/components/resume/resume-page-content";

export const metadata = { title: "Resume", description: "ATS-friendly, data-driven resume for Danial Fachrudin." };

export default function ResumePage() {
  return <SiteShell><Suspense fallback={null}><ResumePageContent /></Suspense></SiteShell>;
}
