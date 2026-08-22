import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dannyportfolio.github.io").replace(
  /\/$/,
  "",
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projects",
    "/engineering",
    "/resume",
    ...projects.map((project) => `/case-studies/${project.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
