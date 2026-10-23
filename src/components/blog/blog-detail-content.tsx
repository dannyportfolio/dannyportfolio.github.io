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
    <article className="case-study" style={{ paddingBottom: "100px" }}>
      <header className="case-header">
        <div className="container">
          <nav className="case-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "20px" }}>
            <Link href="/blog" className="text-link">
              {t.backToBlog[locale]}
            </Link>
          </nav>

          {/* Bilingual Language Switcher */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span className="blueprint-badge" style={{ margin: 0 }}>
              {post.category[locale]}
            </span>

            <div
              className="article-lang-switcher"
              role="group"
              aria-label="Article translation language"
              style={{
                display: "inline-flex",
                background: "var(--surface)",
                padding: "3px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
              }}
            >
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`button ${locale === "en" ? "button-primary" : "button-secondary"}`}
                style={{
                  padding: "5px 14px",
                  fontSize: "0.78rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-pressed={locale === "en"}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLocale("id")}
                className={`button ${locale === "id" ? "button-primary" : "button-secondary"}`}
                style={{
                  padding: "5px 14px",
                  fontSize: "0.78rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-pressed={locale === "id"}
              >
                Bahasa Indonesia
              </button>
            </div>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", lineHeight: 1.1, margin: "16px 0" }}>
            {post.title[locale]}
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "780px",
              margin: "0 0 24px",
            }}
          >
            {post.summary[locale]}
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
              paddingTop: "18px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <span className="mono">
              {t.by[locale]} <strong>{post.author}</strong>
            </span>
            <span className="mono">·</span>
            <span className="mono">
              {t.publishedOn[locale]} {post.publishedDate}
            </span>
            <span className="mono">·</span>
            <span className="mono">{post.readingTime[locale]}</span>
            <div className="badge-row" style={{ marginTop: 0, marginLeft: "auto" }}>
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container case-layout">
        <aside className="case-index">
          <span className="mono">{locale === "en" ? "Table of Contents" : "Daftar Isi"}</span>
          {post.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title[locale]}
            </a>
          ))}
        </aside>

        <div className="case-content">
          {post.sections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              style={{ marginBottom: "50px", scrollMarginTop: "100px" }}
            >
              <h2 style={{ fontSize: "1.65rem", lineHeight: 1.25, marginBottom: "18px" }}>
                {section.title[locale]}
              </h2>

              {section.paragraphs[locale].map((para, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    fontSize: "1.06rem",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                    color: "var(--text)",
                  }}
                >
                  {para}
                </p>
              ))}

              {section.callout && (
                <aside
                  style={{
                    margin: "24px 0",
                    padding: "16px 20px",
                    borderRadius: "8px",
                    borderLeft: "4px solid var(--accent)",
                    background: "var(--surface)",
                    fontSize: "0.98rem",
                    lineHeight: 1.65,
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 500 }}>{section.callout.text[locale]}</p>
                </aside>
              )}

              {section.code && (
                <div
                  style={{
                    margin: "24px 0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                    background: "var(--surface-strong)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 16px",
                      background: "color-mix(in srgb, var(--surface) 70%, var(--surface-strong))",
                      borderBottom: "1px solid var(--line)",
                      fontSize: "0.76rem",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span>{section.code.language.toUpperCase()}</span>
                    {section.code.caption && (
                      <span style={{ color: "var(--muted)" }}>{section.code.caption[locale]}</span>
                    )}
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: "18px",
                      overflowX: "auto",
                      fontSize: "0.86rem",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <code>{section.code.snippet}</code>
                  </pre>
                </div>
              )}

              {section.checklist && (
                <div
                  style={{
                    margin: "24px 0",
                    padding: "20px 24px",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                  }}
                >
                  <h4 style={{ margin: "0 0 14px", fontSize: "1.05rem" }}>
                    {locale === "en" ? "Verification Criteria:" : "Kriteria Verifikasi:"}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", display: "grid", gap: "10px" }}>
                    {section.checklist[locale].map((item, cIdx) => (
                      <li key={cIdx} style={{ fontSize: "0.96rem", lineHeight: 1.6 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Related Articles & Navigation */}
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
                    className="article-card"
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

            <div style={{ display: "flex", gap: "10px" }}>
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
