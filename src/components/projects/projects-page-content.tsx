"use client";

import { AnimatedIntro, AnimatedWords } from "@/components/motion/animated-text";
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
          <AnimatedWords
            segments={[
              { text: t.titlePrefix[locale] },
              { text: t.titleEm[locale], accent: true, breakBefore: true },
            ]}
          />
          <AnimatedIntro>{t.description[locale]}</AnimatedIntro>
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
