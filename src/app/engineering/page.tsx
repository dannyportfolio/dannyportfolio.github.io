"use client";

import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { Badge } from "@/components/ui/badge";
import { AlgorithmComplexityReference } from "@/components/engineering/algorithm-complexity-reference";
import { engineeringArticles } from "@/data/engineering";
import { principles } from "@/data/skills";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export default function EngineeringPage() {
  const { locale } = useLocale();
  const t = translations.engineeringPage;

  return (
    <SiteShell>
      {/* Editorial Simplified Hero */}
      <section className="page-hero engineering-hero">
        <div className="container">
          <p className="eyebrow">{t.complexityEyebrow[locale]}</p>
          <h1 className="engineering-hero__title">{t.complexityTitle[locale]}</h1>
          <p className="engineering-hero__subtitle">{t.complexitySubtitle[locale]}</p>
          <p className="engineering-hero__description">{t.complexityIntro[locale]}</p>
        </div>
      </section>

      {/* 4-Group Progressive Complexity Handbook */}
      <section className="section handbook-section">
        <div className="container">
          <AlgorithmComplexityReference locale={locale} />
        </div>
      </section>

      {/* Engineering Philosophy & Principles */}
      <section className="section tint">
        <div className="container">
          <SectionHeading eyebrow={t.principlesEyebrow[locale]} title={t.principlesTitle[locale]} />
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <article key={principle}>
                <span className="mono">0{index + 1}</span>
                <h3>{principle}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.libraryEyebrow[locale]} title={t.libraryTitle[locale]} />
          <div className="article-grid">
            {engineeringArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/engineering/${article.slug}`}
                className="article-card article-card-interactive"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p className="mono">/{article.slug}</p>
                  <span className="mono">{article.readingTime[locale]}</span>
                </div>
                <h2>{article.title[locale]}</h2>
                <p>{article.excerpt[locale]}</p>
                <div className="badge-row" style={{ marginTop: "auto", paddingTop: "14px" }}>
                  {article.topics.map((topic) => (
                    <Badge key={topic}>{topic}</Badge>
                  ))}
                </div>
                <span className="text-link" style={{ marginTop: "14px", fontWeight: 600 }}>
                  {t.noteBadge[locale]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
