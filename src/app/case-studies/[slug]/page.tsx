import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CaseStudyJourney } from "@/components/engineering/case-study-journey";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = getProject(slug); return { title: project ? `${project.name} System Brief` : "System brief", description: project?.summary }; }

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const sections = [
    { title: "Product Context", content: project.summary }, { title: "Product Challenge", content: project.problem }, { title: "System Focus", content: project.highlights.join(" · ") }, { title: "Architecture Lens", content: project.architecture }, { title: "Engineering Contribution", content: project.contributions.join(" ") }, { title: "Delivery Considerations", content: project.reliability },
  ];
  return <SiteShell><article className="case-study"><header className="case-header"><div className="container"><p className="eyebrow">Project system brief</p><h1>{project.name}</h1><p>{project.summary}</p><p className="case-domain"><a href={project.url} target="_blank" rel="noopener noreferrer">{project.domain} <span aria-hidden="true">↗</span></a></p></div></header><div className="container case-layout"><aside className="case-index"><span className="mono">On this page</span>{sections.map((section) => <a key={section.title} href={`#${section.title.toLowerCase().replaceAll(" ", "-")}`}>{section.title}</a>)}</aside><div className="case-content">{sections.map((section) => <section id={section.title.toLowerCase().replaceAll(" ", "-")} key={section.title}><p className="eyebrow">{section.title}</p><h2>{section.title}</h2><p>{section.content}</p>{section.title === "Architecture Lens" && <CaseStudyJourney />}</section>)}</div></div></article></SiteShell>;
}
