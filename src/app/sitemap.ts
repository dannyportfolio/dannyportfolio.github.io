import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { engineeringArticles } from "@/data/engineering";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dannyportfolio.github.io").replace(
  /\/$/,
  "",
);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projects/", "/engineering/", "/blog/", "/resume/"];

  const caseStudyRoutes = projects.map((p) => `/case-studies/${p.slug}/`);
  const engineeringRoutes = engineeringArticles
    .filter((a) => a.published)
    .map((a) => `/engineering/${a.slug}/`);
  const blogRoutes = blogPosts
    .filter((p) => p.status === "published")
    .map((p) => `/blog/${p.slug}/`);

  const allRoutes = [...staticRoutes, ...caseStudyRoutes, ...engineeringRoutes, ...blogRoutes];

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : path.startsWith("/blog/") ? 0.8 : 0.7,
  }));
}
