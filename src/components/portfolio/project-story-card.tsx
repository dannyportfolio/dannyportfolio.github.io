import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectStoryCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-story-card">
      <div className="project-depth project-depth-back">
        <div className="project-map-grid" />
        <div className="project-flow-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mini-diagram" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="project-depth project-depth-mid">
        <span className="mono">SYSTEM {String(index + 1).padStart(2, "0")}</span>
        <p>{project.architecture}</p>
      </div>
      <div className="project-depth project-depth-front">
        <div>
          <p className="eyebrow">Selected system</p>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
        </div>
        <div className="project-facts">
          <p><b>Backend focus</b>{project.contributions[0]}</p>
          <p><b>Engineering challenge</b>{project.challenge}</p>
        </div>
        <div className="project-footer">
          <span>{project.technologies.join(" / ")}</span>
          <Link href={`/case-studies/${project.slug}`}>Case study <i aria-hidden="true">-&gt;</i></Link>
        </div>
      </div>
    </article>
  );
}
