import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { JourneyChapterContent } from "@/components/journey/journey-chapter-content";
import { documentedJourneyChapters, getJourneyChapter } from "@/data/journey";
import { AUTHOR_NAME, SITE_URL } from "@/lib/config/site";
import { serializeJsonLd } from "@/lib/utils";

type JourneyChapterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return documentedJourneyChapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: JourneyChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getJourneyChapter(slug);
  if (!chapter) {
    return {
      title: "Chapter Not Found",
    };
  }

  const title = `Chapter ${chapter.number}: ${chapter.title.en} (${chapter.period})`;

  return {
    title,
    description: chapter.summary.en,
    alternates: {
      canonical: `/journey/${slug}/`,
    },
    openGraph: {
      title: `${title} — My Journey`,
      description: chapter.summary.en,
      type: "article",
      authors: [chapter.author],
      url: `${SITE_URL}/journey/${slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — My Journey`,
      description: chapter.summary.en,
    },
  };
}

export default async function JourneyChapterPage({ params }: JourneyChapterPageProps) {
  const { slug } = await params;
  const chapter = getJourneyChapter(slug);
  if (!chapter) notFound();

  const chapterJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Chapter ${chapter.number}: ${chapter.title.en} (${chapter.period})`,
    description: chapter.summary.en,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/journey/${slug}/`,
    },
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(chapterJsonLd),
        }}
      />
      <JourneyChapterContent chapter={chapter} />
    </SiteShell>
  );
}
