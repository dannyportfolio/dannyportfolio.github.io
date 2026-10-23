import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ProjectsPageContent } from "@/components/projects/projects-page-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering projects, architectures, and production systems by Danial Fachrudin.",
  alternates: {
    canonical: "/projects/",
  },
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <ProjectsPageContent />
    </SiteShell>
  );
}
