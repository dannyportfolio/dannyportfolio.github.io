"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/data/blog";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function BlogCard({ post }: { post: BlogPost }) {
  const { locale } = useLocale();
  const t = translations.blogPage;

  return (
    <article
      className="project-card blog-card"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className="project-thumbnail blog-card-thumb"
        aria-hidden="true"
        style={{ minHeight: "130px" }}
      >
        <span className="project-thumbnail__orb" />
        <span className="project-thumbnail__grid" />
        <div style={{ position: "relative", zIndex: 2, padding: "16px" }}>
          <span className="blueprint-badge">{post.category[locale]}</span>
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.82rem",
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {post.readingTime[locale]}
          </p>
        </div>
      </div>

      <div
        className="project-card__content"
        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <div className="project-card__meta">
          <p className="mono">{post.publishedDate}</p>
          <span className="mono">{post.readingTime[locale]}</span>
        </div>
        <h2 style={{ fontSize: "1.35rem", lineHeight: 1.25, marginTop: "4px" }}>
          <Link href={`/blog/${post.slug}`} className="project-title-link">
            {post.title[locale]}
          </Link>
        </h2>
        <p
          style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "8px" }}
        >
          {post.summary[locale]}
        </p>

        <div className="badge-row" style={{ marginTop: "auto", paddingTop: "16px" }}>
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="card-footer" style={{ marginTop: "auto" }}>
        <span>{post.author}</span>
        <div className="card-footer-actions">
          <Link
            href={`/blog/${post.slug}`}
            className="text-link"
            aria-label={`Read article: ${post.title[locale]}`}
          >
            {t.readArticle[locale]}
          </Link>
        </div>
      </div>
    </article>
  );
}
