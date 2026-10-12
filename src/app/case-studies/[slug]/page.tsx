import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CaseStudyJourney } from "@/components/engineering/case-study-journey";
import { getProject, projects } from "@/data/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.name} System Brief` : "System brief",
    description: project?.summary,
  };
}

export default async function CaseStudy({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const sections = [
    { id: "product-context", title: "Product Context", content: project.summary },
    { id: "product-challenge", title: "Product Challenge", content: project.problem },
    { id: "system-focus", title: "System Focus", content: project.highlights.join(" · ") },
    { id: "architecture-lens", title: "Architecture Lens", content: project.architecture },
    {
      id: "engineering-contribution",
      title: "Engineering Contribution",
      content: project.contributions.join(" "),
    },
    {
      id: "delivery-considerations",
      title: "Delivery Considerations",
      content: project.reliability,
    },
  ];
  return (
    <SiteShell>
      <article className="case-study">
        <header className="case-header">
          <div className="container">
            <nav className="case-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "20px" }}>
              <Link href="/projects" className="text-link">
                ← Back to all projects
              </Link>
            </nav>
            <p className="eyebrow">Project system brief</p>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
            <p className="case-domain">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.domain} <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </header>
        <div className="container case-layout">
          <aside className="case-index">
            <span className="mono">On this page</span>
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
                {section.id === "architecture-lens" && <CaseStudyJourney />}
              </section>
            ))}
            <div className="case-footer-actions" style={{ display: "flex", gap: "14px", marginTop: "40px", flexWrap: "wrap" }}>
              <Link href="/projects" className="button button-secondary">
                ← Back to all projects
              </Link>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                Visit {project.name} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
