"use client";

import Link from "next/link";
import { CaseStudyJourney } from "@/components/engineering/case-study-journey";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { useLocale } from "@/context/locale-context";

export function CaseStudyContent({ project }: { project: Project }) {
  const { locale } = useLocale();

  const sections = [
    {
      id: "product-context",
      title: locale === "en" ? "Product Context" : "Konteks Produk",
      content: project.summary[locale],
    },
    {
      id: "product-challenge",
      title: locale === "en" ? "System Problem & Scope" : "Masalah & Cakupan Sistem",
      content: project.problem[locale],
    },
    {
      id: "engineering-challenge",
      title: locale === "en" ? "Engineering Constraints" : "Tantangan Rekayasa",
      content: project.challenge[locale],
    },
    {
      id: "architecture-lens",
      title: locale === "en" ? "System Architecture Flow" : "Alur Arsitektur Sistem",
      content: project.architecture[locale],
    },
    {
      id: "engineering-contribution",
      title: locale === "en" ? "Key Engineering Contributions" : "Kontribusi Rekayasa Utama",
      content: project.contributions[locale].join(" "),
    },
    {
      id: "delivery-considerations",
      title:
        locale === "en" ? "Reliability & Integrity Guarantees" : "Jaminan Keandalan & Integritas",
      content: project.reliability[locale],
    },
  ];

  return (
    <article className="case-study">
      <header className="case-header">
        <div className="container">
          <nav className="case-breadcrumb" aria-label="Breadcrumb">
            <Link href="/projects" className="text-link">
              {locale === "en" ? "← Back to all projects" : "← Kembali ke daftar proyek"}
            </Link>
          </nav>
          <p className="eyebrow" style={{ margin: 0, marginBottom: "16px" }}>
            {locale === "en" ? "Project system brief" : "Ringkasan sistem proyek"}
          </p>
          <h1 className="article-title">{project.name}</h1>
          <p className="article-summary">{project.summary[locale]}</p>
          <div className="article-meta-bar" style={{ marginTop: "24px" }}>
            <div className="article-meta-details">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
                style={{ fontWeight: 600 }}
              >
                {project.domain} <span aria-hidden="true">↗</span>
              </a>
            </div>
            {project.technologies.length > 0 && (
              <div className="article-meta-tags">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container case-layout">
        <aside className="case-index">
          <span className="mono">{locale === "en" ? "On this page" : "Daftar isi"}</span>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </aside>

        <div className="case-content">
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <p className="eyebrow">{section.title}</p>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
              {section.id === "architecture-lens" && (
                <div style={{ marginTop: "28px" }}>
                  <CaseStudyJourney project={project} />
                </div>
              )}
            </section>
          ))}

          <div className="case-footer-actions">
            <Link href="/projects" className="button button-secondary">
              {locale === "en" ? "← Back to all projects" : "← Kembali ke semua proyek"}
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                {locale === "en" ? "View Code on GitHub" : "Lihat Kode di GitHub"}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.url !== project.githubUrl && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                {locale === "en" ? `Visit ${project.name}` : `Kunjungi ${project.name}`}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
