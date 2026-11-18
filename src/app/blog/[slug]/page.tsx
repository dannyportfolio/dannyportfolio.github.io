import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { BlogDetailContent } from "@/components/blog/blog-detail-content";
import { getBlogPost, publishedBlogPosts } from "@/data/blog";
import { AUTHOR_NAME, SITE_URL } from "@/lib/config/site";
import { serializeJsonLd } from "@/lib/utils";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedBlogPosts.map((post) => ({ slug: post.slug }));
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
      url: `${SITE_URL}/blog/${slug}/`,
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

  const relatedPosts = publishedBlogPosts.filter((p) => p.slug !== slug).slice(0, 2);

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
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}/`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleJsonLd),
        }}
      />
      <BlogDetailContent post={post} relatedPosts={relatedPosts} />
    </SiteShell>
  );
}
