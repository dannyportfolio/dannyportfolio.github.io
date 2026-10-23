import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { BlogListingContent } from "@/components/blog/blog-listing-content";

export const metadata: Metadata = {
  title: "Engineering Blog",
  description:
    "Practical guides, educational articles, and engineering perspectives on AI-assisted development, backend architecture, and software quality.",
  alternates: {
    canonical: "/blog/",
  },
  openGraph: {
    title: "Engineering Blog — Danial Fachrudin",
    description:
      "Practical guides and engineering perspectives on AI-assisted development and software craft.",
  },
};

export default function BlogPage() {
  return (
    <SiteShell>
      <BlogListingContent />
    </SiteShell>
  );
}
