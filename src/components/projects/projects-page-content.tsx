"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function ProjectsPageContent() {
  const { locale } = useLocale();
  const t = translations.projectsPage;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.eyebrow[locale]}</p>
          <h1>
            {t.titlePrefix[locale]}
            <br />
            <em>{t.titleEm[locale]}</em>
          </h1>
          <p>{t.description[locale]}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="projects-grid projects-grid-full">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
