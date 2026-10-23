"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { EngineeringArticle } from "@/data/engineering";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export function EngineeringDetailContent({
  article,
  relatedArticles = [],
}: {
  article: EngineeringArticle;
  relatedArticles?: EngineeringArticle[];
}) {
  const { locale, setLocale } = useLocale();
  const t = translations.engineeringPage;

  return (
    <article className="case-study" style={{ paddingBottom: "80px" }}>
      <header className="case-header">
        <div className="container">
          <nav className="case-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "20px" }}>
            <Link href="/engineering" className="text-link">
              {t.backToNotes[locale]}
            </Link>
          </nav>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <p className="eyebrow" style={{ margin: 0 }}>
              {locale === "en" ? "Engineering Note" : "Catatan Rekayasa"}
            </p>
            <div className="article-lang-toggle" role="group" aria-label="Article Language">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`button button-small ${locale === "en" ? "button-primary" : "button-secondary"}`}
                style={{ padding: "4px 12px", fontSize: "0.75rem", borderRadius: "6px" }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLocale("id")}
                className={`button button-small ${locale === "id" ? "button-primary" : "button-secondary"}`}
                style={{
                  padding: "4px 12px",
                  fontSize: "0.75rem",
                  borderRadius: "6px",
                  marginLeft: "6px",
                }}
              >
                Bahasa Indonesia
              </button>
            </div>
          </div>

          <h1>{article.title[locale]}</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--muted)", maxWidth: "780px" }}>
            {article.excerpt[locale]}
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <span className="mono">
              {locale === "en" ? "Published:" : "Diterbitkan:"} {article.publishedDate}
            </span>
            <span className="mono">·</span>
            <span className="mono">{article.readingTime[locale]}</span>
            <div className="badge-row" style={{ marginTop: 0, marginLeft: "auto" }}>
              {article.topics.map((topic) => (
                <Badge key={topic}>{topic}</Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container case-layout">
        <aside className="case-index">
          <span className="mono">{locale === "en" ? "Sections" : "Daftar Bagian"}</span>
          {article.sections.map((section, idx) => (
            <a key={idx} href={`#section-${idx}`}>
              {section.heading[locale]}
            </a>
          ))}
        </aside>

        <div className="case-content">
          {article.sections.map((section, idx) => (
            <section id={`section-${idx}`} key={idx} style={{ marginBottom: "40px" }}>
              <h2>{section.heading[locale]}</h2>
              {section.paragraphs[locale].map((p, pIdx) => (
                <p key={pIdx} style={{ lineHeight: 1.75, fontSize: "1.05rem" }}>
                  {p}
                </p>
              ))}
              {section.code && (
                <div
                  style={{
                    margin: "24px 0",
                    background: "var(--surface-strong)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 16px",
                      background: "color-mix(in srgb, var(--surface) 60%, var(--surface-strong))",
                      borderBottom: "1px solid var(--line)",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span>{section.code.language}</span>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: "16px",
                      overflowX: "auto",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <code>{section.code.snippet}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}

          {relatedArticles.length > 0 && (
            <div
              style={{ marginTop: "60px", paddingTop: "32px", borderTop: "1px solid var(--line)" }}
            >
              <h3 style={{ marginBottom: "20px" }}>
                {locale === "en" ? "Related Engineering Notes" : "Catatan Rekayasa Terkait"}
              </h3>
              <div
                className="article-grid"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
              >
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/engineering/${rel.slug}`}
                    className="article-card"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p className="mono">/{rel.slug}</p>
                    <h4 style={{ fontSize: "1.05rem", margin: "8px 0" }}>{rel.title[locale]}</h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                      {rel.excerpt[locale]}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "48px" }}>
            <Link href="/engineering" className="button button-secondary">
              {t.backToNotes[locale]}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
