import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { CaseStudyContent } from "@/components/engineering/case-study-content";
import { getProject, projects } from "@/data/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }
  return {
    title: `${project.name} System Brief`,
    description: project.summary.en,
    alternates: {
      canonical: `/case-studies/${slug}/`,
    },
    openGraph: {
      title: `${project.name} — Architecture System Brief`,
      description: project.summary.en,
    },
  };
}

export default async function CaseStudy({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <SiteShell>
      <CaseStudyContent project={project} />
    </SiteShell>
  );
}
