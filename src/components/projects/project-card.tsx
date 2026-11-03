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
  const displayName = project.shortName ?? project.name;
  const displaySummary = project.cardSummary
    ? project.cardSummary[locale]
    : project.summary[locale];
  const displayTechnologies = project.cardTechnologies ?? project.technologies.slice(0, 4);

  return (
    <article className={`project-card project-card--${project.slug}`}>
      <div className="project-thumbnail" aria-hidden="true">
        <span className="project-thumbnail__orb" />
        <span className="project-thumbnail__grid" />
        <div className="project-preview-stage">
          <div className="project-preview-header">
            <span className="project-preview-domain mono">{project.domain}</span>
            <span className="project-preview-badge">{project.category[locale]}</span>
          </div>
          <div className="project-preview-meta">
            <span className="project-preview-name">{displayName}</span>
            <div className="project-preview-chips">
              {displayTechnologies.slice(0, 3).map((tech) => (
                <span key={tech} className="project-preview-chip mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="project-card__content">
        <div className="project-card__meta">
          <p className="mono">{project.domain}</p>
        </div>
        <Heading>
          {project.caseStudy ? (
            <Link href={`/case-studies/${project.slug}`} className="project-title-link">
              {displayName}
            </Link>
          ) : (
            displayName
          )}
        </Heading>
        <p className="project-card__summary">{displaySummary}</p>
        {displayTechnologies.length > 0 && (
          <div className="badge-row" aria-label={`${displayName} technical highlights`}>
            {displayTechnologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
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
              aria-label={`Read ${displayName} system brief`}
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
              aria-label={`View ${displayName} source code on GitHub`}
            >
              {t.viewCode[locale]} <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.url !== project.githubUrl && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-link--secondary"
              aria-label={`View ${displayName} live project (opens in a new tab)`}
            >
              {t.liveSite[locale]} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
