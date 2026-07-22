import { PrintButton } from "@/components/resume/print-button";
import { ResumeDocument } from "@/components/resume/resume-document";
import type { TargetRole } from "@/data/profile";
function validRole(value: string | undefined): TargetRole { return value === "software" || value === "fullstack" ? value : "backend"; }
export const metadata = { title: "Print Resume", robots: { index: false, follow: false } };
export default async function PrintResume({ searchParams }: { searchParams: Promise<{ role?: string; mode?: string }> }) { const params = await searchParams; const role = validRole(params.role); return <main className="print-page"><div className="print-toolbar"><a className="button button-secondary" href={`/resume?role=${role}`}>Back to customizer</a><PrintButton /></div><ResumeDocument role={role} detailed={params.mode === "detailed"} /></main>; }
