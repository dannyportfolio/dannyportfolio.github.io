import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { ResumeCustomizer } from "@/components/resume/resume-customizer";
import { ResumeDocument } from "@/components/resume/resume-document";
import { ButtonLink } from "@/components/ui/button";
import type { TargetRole } from "@/data/profile";
function validRole(value: string | undefined): TargetRole { return value === "software" || value === "fullstack" ? value : "backend"; }
export const metadata = { title: "Resume", description: "ATS-friendly, data-driven resume generator." };
export default async function ResumePage({ searchParams }: { searchParams: Promise<{ role?: string }> }) { const role = validRole((await searchParams).role); return <SiteShell><section className="resume-page-header"><div className="container"><p className="eyebrow">CV generator</p><h1>One source of truth.<br /><em>Two focused resumes.</em></h1><p>Choose a target role to deterministically prioritise the summary and skills. Your portfolio and CV use the same editable data files.</p><ResumeCustomizer current={role} /><div className="hero-actions"><ButtonLink href={`/resume/print?role=${role}`}>Download CV PDF <span>↗</span></ButtonLink><Link className="text-link" href={`/resume?role=${role}&mode=detailed#resume`}>Detailed engineering resume →</Link></div></div></section><section className="resume-preview" id="resume"><div className="container"><p className="eyebrow">Professional CV · 1–2 pages</p><ResumeDocument role={role} /></div></section><section className="resume-preview detailed-preview"><div className="container"><p className="eyebrow">Detailed engineering resume</p><ResumeDocument role={role} detailed /></div></section></SiteShell>; }
