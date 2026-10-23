import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { EngineeringDetailContent } from "@/components/engineering/engineering-detail-content";
import { engineeringArticles, getEngineeringArticle } from "@/data/engineering";

type EngineeringPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return engineeringArticles
    .filter((article) => article.published)
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: EngineeringPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getEngineeringArticle(slug);
  if (!article) {
    return {
      title: "Engineering Note Not Found",
    };
  }
  return {
    title: `${article.title.en} — Engineering Notes`,
    description: article.excerpt.en,
    alternates: {
      canonical: `/engineering/${slug}/`,
    },
    openGraph: {
      title: `${article.title.en} | Danial Fachrudin`,
      description: article.excerpt.en,
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

export default async function EngineeringDetailPage({ params }: EngineeringPageProps) {
  const { slug } = await params;
  const article = getEngineeringArticle(slug);
  if (!article) notFound();

  const relatedArticles = engineeringArticles
    .filter((item) => item.slug !== slug && item.published)
    .slice(0, 2);

  return (
    <SiteShell>
      <EngineeringDetailContent article={article} relatedArticles={relatedArticles} />
    </SiteShell>
  );
}
