"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/data/blog";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function BlogDetailContent({
  post,
  relatedPosts = [],
}: {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}) {
  const { locale, setLocale } = useLocale();
  const t = translations.blogPage;

  return (
    <article className="case-study case-study-hero">
      <header className="case-header">
        <div className="container">
          <nav className="case-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "20px" }}>
            <Link href="/blog" className="text-link">
              {t.backToBlog[locale]}
            </Link>
          </nav>

          {/* Category & Bilingual Language Switcher */}
          <div className="article-header-top">
            <span className="blueprint-badge">{post.category[locale]}</span>

            <div
              className="article-lang-switcher"
              role="group"
              aria-label="Article translation language"
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`article-lang-button ${locale === "en" ? "is-active" : ""}`}
                aria-pressed={locale === "en"}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLocale("id")}
                className={`article-lang-button ${locale === "id" ? "is-active" : ""}`}
                aria-pressed={locale === "id"}
              >
                Bahasa Indonesia
              </button>
            </div>
          </div>

          <h1 className="article-title">{post.title[locale]}</h1>

          <p className="article-summary">{post.summary[locale]}</p>

          <div className="article-meta-bar">
            <div className="article-meta-details">
              <span>
                {t.by[locale]} <strong>{post.author}</strong>
              </span>
              <span className="article-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>
                {t.publishedOn[locale]} {post.publishedDate}
              </span>
              <span className="article-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{post.readingTime[locale]}</span>
            </div>
            <div className="article-meta-tags">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container case-layout">
        <aside className="case-index" aria-label="Table of contents">
          <span className="mono">{locale === "en" ? "Table of Contents" : "Daftar Isi"}</span>
          {post.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title[locale]}
            </a>
          ))}
        </aside>

        <div className="case-content">
          {post.sections.map((section) => (
            <section id={section.id} key={section.id} className="article-section">
              <h2>{section.title[locale]}</h2>

              {section.paragraphs[locale].map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}

              {section.callout && (
                <aside className="article-callout">
                  <p>{section.callout.text[locale]}</p>
                </aside>
              )}

              {section.code && (
                <div className="article-code-block">
                  <div className="article-code-header">
                    <span>{section.code.language.toUpperCase()}</span>
                    {section.code.caption && (
                      <span style={{ color: "var(--muted)" }}>{section.code.caption[locale]}</span>
                    )}
                  </div>
                  <pre className="article-code-pre">
                    <code>{section.code.snippet}</code>
                  </pre>
                </div>
              )}

              {section.checklist && (
                <div className="article-checklist-card">
                  <h4>{locale === "en" ? "Verification Criteria:" : "Kriteria Verifikasi:"}</h4>
                  <ul className="article-checklist">
                    {section.checklist[locale].map((item, cIdx) => (
                      <li key={cIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div
              style={{ marginTop: "60px", paddingTop: "32px", borderTop: "1px solid var(--line)" }}
            >
              <h3 style={{ marginBottom: "20px" }}>{t.relatedArticles[locale]}</h3>
              <div
                className="article-grid"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
              >
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="article-card article-card-interactive"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p className="mono">/{rel.slug}</p>
                    <h4 style={{ fontSize: "1.05rem", margin: "8px 0" }}>{rel.title[locale]}</h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                      {rel.summary[locale]}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Bar */}
          <div
            style={{
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid var(--line)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Link href="/blog" className="button button-secondary">
              {t.backToBlog[locale]}
            </Link>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/projects" className="text-link">
                {locale === "en" ? "Explore Systems →" : "Jelajahi Sistem →"}
              </Link>
              <Link href="/engineering" className="text-link">
                {locale === "en" ? "Engineering Notes →" : "Catatan Rekayasa →"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
