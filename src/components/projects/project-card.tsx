import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  headingLevel = "h2",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className={`project-card project-card--${project.slug}`}>
      <div className="project-thumbnail" aria-hidden="true">
        <span className="project-thumbnail__orb" />
        <span className="project-thumbnail__grid" />
        <p>{project.domain}</p>
        <strong>{project.category}</strong>
      </div>
      <div className="project-card__content">
        <p className="mono">{project.domain}</p>
        <Heading>
          {project.caseStudy ? (
            <Link href={`/case-studies/${project.slug}`} className="project-title-link">
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </Heading>
        <p>{project.summary}</p>
        <ul className="project-highlights" aria-label={`${project.name} contribution highlights`}>
          {project.highlights.map((highlight) => (
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
        <span>{project.category}</span>
        <div className="card-footer-actions">
          {project.caseStudy && (
            <Link
              href={`/case-studies/${project.slug}`}
              className="text-link"
              aria-label={`Read ${project.name} system brief`}
            >
              System brief <span aria-hidden="true">→</span>
            </Link>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-link--secondary"
            aria-label={`View ${project.name} project (opens in a new tab)`}
          >
            Live site <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
