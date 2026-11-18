import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { JourneyLandingContent } from "@/components/journey/journey-landing-content";
import { AUTHOR_NAME, SITE_URL } from "@/lib/config/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Journey — Built by Action",
  description:
    "How Danial Fachrudin (Danny) started building a software engineering career in 2021, learned through ownership and action, and continues stepping into bigger chapters.",
  alternates: {
    canonical: "/journey/",
  },
  openGraph: {
    title: "My Journey — Danial Fachrudin",
    description:
      "A five-year personal leadership narrative about starting in 2021, building through real experience, and stepping forward into what's possible.",
    type: "website",
    url: `${SITE_URL}/journey/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "My Journey — Danial Fachrudin",
    description:
      "Five-year chapters of software engineering growth, ownership, and forward momentum starting with Chapter 01: The Foundation (2021–2026).",
  },
};

const journeyCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "My Journey — Built by Action",
  description:
    "Five-year chapters on software engineering, taking ownership, personal leadership, and building toward future possibilities.",
  url: `${SITE_URL}/journey/`,
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: `${SITE_URL}/`,
  },
};

export default function JourneyPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(journeyCollectionJsonLd),
        }}
      />
      <JourneyLandingContent />
    </SiteShell>
  );
}
