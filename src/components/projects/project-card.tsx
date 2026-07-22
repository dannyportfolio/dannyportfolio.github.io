import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
export function ProjectCard({ project }: { project: Project }) { return <article className="project-card"><div><p className="mono">/{project.slug}</p><h3>{project.name}</h3><p>{project.summary}</p></div><div className="badge-row">{project.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}</div><div className="card-footer"><span>Architecture & backend story</span>{project.caseStudy ? <Link href={`/case-studies/${project.slug}`} className="text-link">Read case study <span aria-hidden>→</span></Link> : <span className="muted">TODO: case study</span>}</div></article>; }
