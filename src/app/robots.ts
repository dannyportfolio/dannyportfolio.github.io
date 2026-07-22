import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/resume/print"] }, sitemap: "https://TODO-add-production-domain.example/sitemap.xml" }; }
