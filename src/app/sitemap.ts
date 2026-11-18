import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { publishedEngineeringArticles } from "@/data/engineering";
import { publishedBlogPosts } from "@/data/blog";
import { documentedJourneyChapters } from "@/data/journey";
import { SITE_URL } from "@/lib/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projects/", "/engineering/", "/blog/", "/journey/", "/resume/"];

  const caseStudyRoutes = projects.map((p) => `/case-studies/${p.slug}/`);
  const engineeringRoutes = publishedEngineeringArticles.map((a) => `/engineering/${a.slug}/`);
  const blogRoutes = publishedBlogPosts.map((p) => `/blog/${p.slug}/`);
  const journeyRoutes = documentedJourneyChapters.map((c) => `/journey/${c.slug}/`);

  const allRoutes = [
    ...staticRoutes,
    ...caseStudyRoutes,
    ...engineeringRoutes,
    ...blogRoutes,
    ...journeyRoutes,
  ];

  return allRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : path.startsWith("/blog/") ? 0.8 : 0.7,
  }));
}
