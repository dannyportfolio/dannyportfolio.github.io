"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function ProjectCard({
  project,
  headingLevel = "h2",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const { locale } = useLocale();
  const t = translations.projectsPage;

  return (
    <article
      className={`project-card project-card--${project.slug}${project.isNew ? " project-card--new" : ""}`}
    >
      <div className="project-thumbnail" aria-hidden="true">
        {project.isNew && (
          <span className="project-new-pill">
            <span className="project-new-pill__dot" aria-hidden="true" />
            {locale === "en" ? "Latest Project" : "Proyek Terbaru"}
          </span>
        )}
        <span className="project-thumbnail__orb" />
        <span className="project-thumbnail__grid" />
        <div className="project-thumbnail__blueprint">
          <div className="blueprint-header">
            <span className="blueprint-dot" />
            <span className="blueprint-dot" />
            <span className="blueprint-dot" />
            <span className="blueprint-domain">{project.domain}</span>
          </div>
          <div className="blueprint-body">
            <span className="blueprint-badge">{project.category[locale]}</span>
            <div className="blueprint-bars">
              <span className="blueprint-bar" style={{ width: "80%" }} />
              <span className="blueprint-bar" style={{ width: "55%" }} />
              <span className="blueprint-bar" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <p className="mono">{project.domain}</p>
          {project.isNew && <span className="project-new-tag">{t.newTag[locale]}</span>}
        </div>
        <Heading>
          {project.caseStudy ? (
            <Link href={`/case-studies/${project.slug}`} className="project-title-link">
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </Heading>
        <p>{project.summary[locale]}</p>
        <ul className="project-highlights" aria-label={`${project.name} contribution highlights`}>
          {project.highlights[locale].map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {project.technologies.length > 0 && (
          <div className="badge-row">
            {project.technologies.map((technology) => (
              <Badge key={technology}>{technology}</Badge>
            ))}
          </div>
        )}
      </div>

      <div className="card-footer">
        <span>{project.category[locale]}</span>
        <div className="card-footer-actions">
          {project.caseStudy && (
            <Link
              href={`/case-studies/${project.slug}`}
              className="text-link"
              aria-label={`Read ${project.name} system brief`}
            >
              {t.systemBrief[locale]} <span aria-hidden="true">→</span>
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-link--code"
              aria-label={`View ${project.name} source code on GitHub`}
            >
              {t.viewCode[locale]} <span aria-hidden="true">↗</span>
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-link--secondary"
            aria-label={`View ${project.name} live project (opens in a new tab)`}
          >
            {t.liveSite[locale]} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
