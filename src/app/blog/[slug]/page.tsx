import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { BlogDetailContent } from "@/components/blog/blog-detail-content";
import { blogPosts, getBlogPost } from "@/data/blog";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dannyportfolio.github.io").replace(
  /\/$/,
  "",
);

export function generateStaticParams() {
  return blogPosts
    .filter((post) => post.status === "published")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.seoTitle.en,
    description: post.seoDescription.en,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title: post.title.en,
      description: post.summary.en,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
      tags: post.tags,
      url: `${baseUrl}/blog/${slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.en,
      description: post.summary.en,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.status === "published")
    .slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.en,
    description: post.summary.en,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${baseUrl}/`,
    },
    publisher: {
      "@type": "Person",
      name: "Danial Fachrudin",
      url: `${baseUrl}/`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}/`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <BlogDetailContent post={post} relatedPosts={relatedPosts} />
    </SiteShell>
  );
}
