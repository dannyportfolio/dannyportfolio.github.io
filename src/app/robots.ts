import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dannyportfolio.github.io").replace(
    /\/$/,
    "",
  );
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/resume/print"] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
