"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/context/locale-context";

export function ResumeTransition() {
  const { locale } = useLocale();

  return (
    <section id="resume-generator" className="resume-transition">
      <div className="container resume-transition-grid">
        <div>
          <p className="eyebrow">
            {locale === "en" ? "08 / Resume generator" : "08 / Generator resume"}
          </p>
          <h2>
            {locale === "en" ? (
              <>
                Portfolio tells the story.
                <br />
                <em>Resume delivers the summary.</em>
              </>
            ) : (
              <>
                Portofolio mengisahkan karya.
                <br />
                <em>Resume merangkum intinya.</em>
              </>
            )}
          </h2>
          <p>
            {locale === "en"
              ? "One structured source of truth keeps the project history, CV modes, and printable document aligned as the portfolio grows."
              : "Satu sumber data terstruktur menjaga konsistensi rekam proyek, variasi CV, dan dokumen cetak PDF."}
          </p>
          <ButtonLink href="/resume">
            {locale === "en" ? "Generate Resume" : "Buka Generator Resume"}{" "}
            <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
        <ScrollReveal className="resume-flow">
          <div className="resume-files">
            <span>profile.ts</span>
            <span>experience.ts</span>
            <span>projects.ts</span>
            <span>skills.ts</span>
          </div>
          <i>↓</i>
          <div className="resume-builder">Resume Builder</div>
          <i>↓</i>
          <div className="resume-pdf">
            PDF <span>selectable text</span>
          </div>
          <Link href="/resume/print" className="text-link">
            {locale === "en" ? "Open print view →" : "Buka tampilan cetak →"}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
