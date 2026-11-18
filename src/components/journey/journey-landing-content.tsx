"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedIntro, AnimatedWords } from "@/components/motion/animated-text";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useLocale } from "@/context/locale-context";
import { journeyArchive, journeyChapters, journeyPillars } from "@/data/journey";
import { translations } from "@/data/translations";

export function JourneyLandingContent() {
  const { locale } = useLocale();
  const t = translations.journeyPage;

  const chapterOne = journeyChapters.find((c) => c.slug === "chapter-01");
  const futureChapters = journeyChapters.filter((c) => c.status === "future");

  return (
    <div className="journey-page">
      {/* 1. Editorial Hero Introduction */}
      <section className="journey-hero">
        <div className="container journey-hero-grid">
          <div className="journey-hero-copy">
            <p className="eyebrow">{journeyArchive.eyebrow[locale]}</p>
            <AnimatedWords
              className="journey-title"
              segments={[
                { text: journeyArchive.titlePrefix[locale] },
                { text: journeyArchive.titleEm[locale], accent: true, breakBefore: true },
              ]}
            />
            <AnimatedIntro className="journey-lead">
              {journeyArchive.heroLead[locale]}
            </AnimatedIntro>
            <div className="journey-hero-actions">
              {chapterOne && (
                <Link href={`/journey/${chapterOne.slug}`} className="button button-primary">
                  {t.readChapter[locale]}
                </Link>
              )}
              <a href="#timeline" className="button button-secondary">
                {t.timelineEyebrow[locale]}
              </a>
            </div>
          </div>

          <ScrollReveal delay={90} className="journey-colophon">
            <div className="journey-colophon-author">
              <div className="journey-colophon-avatar">
                <Image
                  src="/danny-fachrudin-profile.avif"
                  alt="Danial Fachrudin"
                  fill
                  sizes="56px"
                />
              </div>
              <div>
                <p className="journey-colophon-name">Danial Fachrudin (Danny)</p>
                <p className="mono">
                  {locale === "en"
                    ? "Software Engineer · Building since 2021"
                    : "Software Engineer · Berkarya sejak 2021"}
                </p>
              </div>
            </div>
            <blockquote className="journey-colophon-thesis">
              {journeyArchive.thesisStatement[locale]}
            </blockquote>
            <dl className="journey-colophon-meta">
              <div>
                <dt className="mono">{locale === "en" ? "Active Chapter" : "Bab Aktif"}</dt>
                <dd>
                  {chapterOne
                    ? `${chapterOne.number} · ${chapterOne.title[locale]} (${chapterOne.period})`
                    : "01"}
                </dd>
              </div>
              <div>
                <dt className="mono">{locale === "en" ? "Cadence" : "Siklus"}</dt>
                <dd>{locale === "en" ? "One chapter every 5 years" : "Satu bab tiap 5 tahun"}</dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Core Philosophy & Guiding Principles */}
      <section className="journey-philosophy" aria-labelledby="journey-philosophy-heading">
        <div className="container journey-philosophy-grid">
          <ScrollReveal className="journey-philosophy-statement reveal-subtle">
            <p className="eyebrow">{journeyArchive.philosophyEyebrow[locale]}</p>
            <blockquote id="journey-philosophy-heading" className="journey-philosophy-quote">
              “{journeyArchive.philosophyQuote[locale]}”
            </blockquote>
            <p className="journey-philosophy-note">{journeyArchive.philosophySubnote[locale]}</p>
          </ScrollReveal>

          <ScrollReveal delay={80} className="journey-principles-panel">
            <p className="mono journey-principles-label">{t.principlesHeading[locale]}</p>
            <ol className="journey-principles-list">
              {journeyArchive.guidingPrinciples.map((principle, index) => (
                <li key={principle.en} className="journey-principle-item">
                  <span className="mono">0{index + 1}</span>
                  <span>{principle[locale]}</span>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Five-Year Chapter Timeline */}
      <section id="timeline" className="journey-section" aria-labelledby="journey-timeline-heading">
        <div className="container">
          <ScrollReveal className="journey-section-head reveal-subtle">
            <p className="eyebrow">{t.timelineEyebrow[locale]}</p>
            <h2 id="journey-timeline-heading">{t.timelineTitle[locale]}</h2>
          </ScrollReveal>

          <div className="journey-timeline-grid">
            {journeyChapters.map((chapter, index) => {
              const isDocumented = chapter.status === "documented";
              return (
                <ScrollReveal
                  key={chapter.slug}
                  delay={index * 60}
                  className={`journey-timeline-card ${isDocumented ? "is-documented" : "is-future"}`}
                >
                  <div className="journey-timeline-top">
                    <span className="mono journey-chapter-num">
                      {locale === "en" ? "Chapter" : "Bab"} {chapter.number}
                    </span>
                    <span className="mono journey-chapter-period">{chapter.period}</span>
                  </div>
                  <h3>{chapter.title[locale]}</h3>
                  <p>{chapter.theme[locale]}</p>
                  <div className="journey-timeline-footer">
                    <span
                      className={`journey-status-pill ${isDocumented ? "is-documented" : "is-future"}`}
                    >
                      {chapter.statusNote[locale]}
                    </span>
                    {isDocumented && (
                      <Link href={`/journey/${chapter.slug}`} className="text-link">
                        {locale === "en" ? "Read →" : "Baca →"}
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Chapter 01 Featured Section */}
      {chapterOne && (
        <section
          id="chapter-01-featured"
          className="journey-section journey-featured-band"
          aria-labelledby="chapter-one-heading"
        >
          <div className="container journey-featured-grid">
            <ScrollReveal className="journey-featured-lead reveal-subtle">
              <div className="journey-featured-meta">
                <span className="eyebrow">{t.featuredEyebrow[locale]}</span>
                <span className="mono">
                  {chapterOne.period} · {chapterOne.readingTime?.[locale]}
                </span>
              </div>
              <h2 id="chapter-one-heading">
                {locale === "en" ? "Chapter 01 — " : "Bab 01 — "}
                <em>{chapterOne.title[locale]}</em>
              </h2>
              {chapterOne.epigraph && (
                <p className="journey-epigraph">“{chapterOne.epigraph[locale]}”</p>
              )}
              <p className="journey-featured-summary">{chapterOne.summary[locale]}</p>
              <div className="journey-featured-cta">
                <Link href={`/journey/${chapterOne.slug}`} className="button button-primary">
                  {t.readChapter[locale]}
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80} className="journey-outline-card">
              <p className="mono journey-outline-label">{t.chapterSectionsLabel[locale]}</p>
              <ol className="journey-outline-list">
                {chapterOne.sections?.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`/journey/${chapterOne.slug}#${section.id}`}
                      className="journey-outline-link"
                    >
                      <span className="mono">{section.number}</span>
                      <span className="journey-outline-text">
                        <strong>{section.title[locale]}</strong>
                        <span>{section.subtitle[locale]}</span>
                      </span>
                      <span className="journey-outline-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 5. Five Pillars Foundation */}
      <section id="pillars" className="journey-section" aria-labelledby="journey-pillars-heading">
        <div className="container">
          <ScrollReveal className="journey-section-head reveal-subtle">
            <p className="eyebrow">{t.pillarsEyebrow[locale]}</p>
            <h2 id="journey-pillars-heading">{t.pillarsTitle[locale]}</h2>
          </ScrollReveal>

          <div className="journey-pillars-grid">
            {journeyPillars.map((pillar, index) => (
              <ScrollReveal key={pillar.id} delay={index * 45} className="journey-pillar-card">
                <span className="mono">{pillar.number}</span>
                <h3>{pillar.title[locale]}</h3>
                <p>{pillar.summary[locale]}</p>
                <p className="journey-pillar-commitment">{pillar.commitment[locale]}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming Chapter Previews */}
      <section
        id="upcoming"
        className="journey-section journey-upcoming-band"
        aria-labelledby="journey-upcoming-heading"
      >
        <div className="container">
          <ScrollReveal className="journey-section-head reveal-subtle">
            <p className="eyebrow">{t.upcomingEyebrow[locale]}</p>
            <h2 id="journey-upcoming-heading">{t.upcomingTitle[locale]}</h2>
            <p className="journey-upcoming-disclaimer">{t.upcomingNote[locale]}</p>
          </ScrollReveal>

          <div className="journey-upcoming-grid">
            {futureChapters.map((chapter, index) => (
              <ScrollReveal key={chapter.slug} delay={index * 60} className="journey-upcoming-card">
                <div className="journey-timeline-top">
                  <span className="mono">
                    {locale === "en" ? "Chapter" : "Bab"} {chapter.number} · {chapter.period}
                  </span>
                  <span className="journey-status-pill is-future">
                    {chapter.statusNote[locale]}
                  </span>
                </div>
                <h3>{chapter.title[locale]}</h3>
                <p className="journey-upcoming-subtitle">{chapter.subtitle[locale]}</p>
                <p className="journey-upcoming-summary">{chapter.summary[locale]}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Closing Personal Statement */}
      <section id="closing" className="journey-closing" aria-labelledby="journey-closing-heading">
        <div className="container journey-closing-inner">
          <ScrollReveal className="reveal-subtle">
            <p className="eyebrow">{journeyArchive.closingMessage.eyebrow[locale]}</p>
            <h2 id="journey-closing-heading">{journeyArchive.closingMessage.title[locale]}</h2>
            <div className="journey-closing-body">
              {journeyArchive.closingMessage.paragraphs[locale].map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <p className="journey-closing-signoff">
              {journeyArchive.closingMessage.signOff[locale]}
            </p>
            <p className="journey-closing-refrain">{journeyArchive.thesisStatement[locale]}</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
