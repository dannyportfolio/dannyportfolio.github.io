import { SiteShell } from "@/components/layout/site-shell";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
export const metadata = { title: "Projects", description: "Selected engineering projects and case-study structures." };
export default function ProjectsPage() { return <SiteShell><section className="page-hero"><div className="container"><p className="eyebrow">Selected work</p><h1>Project systems,<br /><em>not just screens.</em></h1><p>Each project captures product context, system focus, and delivery considerations without unsupported claims.</p></div></section><section className="section"><div className="container"><div className="projects-grid projects-grid-full">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div></section></SiteShell>; }
