import { Suspense } from "react";
import { ResumePrintContent } from "@/components/resume/resume-print-content";

export const metadata = { title: "Print Resume", robots: { index: false, follow: false } };

export default function PrintResume() {
  return <Suspense fallback={null}><ResumePrintContent /></Suspense>;
}
