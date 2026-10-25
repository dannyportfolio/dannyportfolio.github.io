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
    <article className="case-study case-study-hero">
      <header className="case-header article-header">
        <div className="container">
          <nav className="case-breadcrumb" aria-label="Breadcrumb">
            <Link href="/engineering" className="text-link">
              {t.backToNotes[locale]}
            </Link>
          </nav>

          <div className="article-header-top">
            <p className="eyebrow" style={{ margin: 0 }}>
              {locale === "en" ? "Engineering Note" : "Catatan Rekayasa"}
            </p>
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

          <h1 className="article-title">{article.title[locale]}</h1>
          <p className="article-summary">{article.excerpt[locale]}</p>

          <div className="article-meta-bar">
            <div className="article-meta-details">
              <span>
                {locale === "en" ? "Published:" : "Diterbitkan:"} {article.publishedDate}
              </span>
              <span className="article-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{article.readingTime[locale]}</span>
            </div>
            <div className="article-meta-tags">
              {article.topics.map((topic) => (
                <Badge key={topic}>{topic}</Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container case-layout">
        <aside className="case-index" aria-label="Sections">
          <span className="mono">{locale === "en" ? "Sections" : "Daftar Bagian"}</span>
          {article.sections.map((section, idx) => (
            <a key={idx} href={`#section-${idx}`}>
              {section.heading[locale]}
            </a>
          ))}
        </aside>

        <div className="case-content">
          {article.sections.map((section, idx) => (
            <section id={`section-${idx}`} key={idx} className="article-section">
              <h2>{section.heading[locale]}</h2>
              {section.paragraphs[locale].map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {section.code && (
                <div className="article-code-block">
                  <div className="article-code-header">
                    <span>{section.code.language}</span>
                  </div>
                  <pre className="article-code-pre">
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
                    className="article-card article-card-interactive"
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
