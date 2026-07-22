import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
const baseUrl = "https://TODO-add-production-domain.example";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/projects", "/engineering", "/resume", ...projects.map((project) => `/case-studies/${project.slug}`)].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 })); }
