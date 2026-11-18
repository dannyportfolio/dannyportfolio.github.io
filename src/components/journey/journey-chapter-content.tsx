"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedIntro, AnimatedWords } from "@/components/motion/animated-text";
import { useLocale } from "@/context/locale-context";
import { useActiveSection } from "@/hooks/use-active-section";
import { journeyArchive, journeyPillars, type JourneyChapter } from "@/data/journey";
import { translations } from "@/data/translations";

function FormattedProse({ content }: { content: string }) {
  if (!content) return null;
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = content.split(tokenRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (part.startsWith("[") && part.endsWith(")")) {
          const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
          if (match) {
            const [, label, url] = match;
            const isExternal = url.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {label}
                </a>
              );
            }
            return (
              <Link key={index} href={url} className="text-link">
                {label}
              </Link>
            );
          }
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        return part;
      })}
    </>
  );
}

export function JourneyChapterContent({ chapter }: { chapter: JourneyChapter }) {
  const { locale, setLocale } = useLocale();
  const t = translations.journeyPage;
  const sections = chapter.sections ?? [];
  const sectionIds = sections.map((section) => section.id);
  const activeSection = useActiveSection(sectionIds);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setProgress(100);
        return;
      }
      const next = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
      setProgress(next);
    };

    const onScroll = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <article className="journey-chapter-page">
      {/* Subtle Chapter Reading Progress */}
      <div
        className="journey-reading-progress"
        role="progressbar"
        aria-label={t.readingProgressLabel[locale]}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span className="journey-reading-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Editorial Chapter Header */}
      <header className="case-header journey-chapter-header">
        <div className="container">
          <nav className="case-breadcrumb" aria-label="Breadcrumb">
            <Link href="/journey" className="text-link">
              {t.backToJourney[locale]}
            </Link>
          </nav>

          <div className="article-header-top">
            <span className="blueprint-badge">
              {locale === "en" ? "Chapter" : "Bab"} {chapter.number} · {chapter.period} ·{" "}
              {chapter.statusNote[locale]}
            </span>

            <div
              className="article-lang-switcher"
              role="group"
              aria-label={translations.blogPage.switchLanguage[locale]}
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

          <AnimatedWords className="article-title" text={chapter.title[locale]} />
          <AnimatedIntro className="article-summary">{chapter.subtitle[locale]}</AnimatedIntro>

          <div className="article-meta-bar">
            <div className="article-meta-details">
              <span>
                {locale === "en" ? "Written by" : "Ditulis oleh"} <strong>{chapter.author}</strong>
              </span>
              <span className="article-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{chapter.period}</span>
              {chapter.readingTime && (
                <>
                  <span className="article-meta-sep" aria-hidden="true">
                    ·
                  </span>
                  <span>{chapter.readingTime[locale]}</span>
                </>
              )}
            </div>
          </div>

          {chapter.epigraph && (
            <blockquote className="journey-header-epigraph">
              “{chapter.epigraph[locale]}”
            </blockquote>
          )}
        </div>
      </header>

      {/* Mobile Compact Section Navigation */}
      <div className="journey-mobile-toc-wrap">
        <div className="container">
          <nav className="journey-mobile-toc" aria-label={t.sectionJumpLabel[locale]}>
            {sections.map((section) => {
              const isCurrent = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={isCurrent ? "is-active" : undefined}
                >
                  <span className="mono">{section.number}</span>
                  <span>{section.title[locale]}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Long-Form Reading Layout */}
      <div className="container case-layout journey-chapter-layout">
        <aside
          className="case-index journey-chapter-index"
          aria-label={t.chapterContentsLabel[locale]}
        >
          <span className="mono">{t.chapterContentsLabel[locale]}</span>
          {sections.map((section) => {
            const isCurrent = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`journey-toc-link ${isCurrent ? "is-active" : ""}`}
                aria-current={isCurrent ? "location" : undefined}
              >
                <span className="mono">{section.number}</span>
                <span>{section.title[locale]}</span>
              </a>
            );
          })}
          <div className="journey-toc-progress">
            <span className="mono">
              {progress}% {locale === "en" ? "read" : "dibaca"}
            </span>
          </div>
        </aside>

        <div className="case-content journey-reading-column">
          {sections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className="journey-chapter-section"
              aria-labelledby={`${section.id}-heading`}
            >
              <div className="journey-section-kicker">
                <span className="mono">
                  {locale === "en" ? "Section" : "Bagian"} {section.number}
                </span>
                <span className="journey-section-sub">{section.subtitle[locale]}</span>
              </div>

              <h2 id={`${section.id}-heading`}>{section.title[locale]}</h2>

              {section.pullQuote && (
                <blockquote className="journey-pull-quote">
                  “{section.pullQuote[locale]}”
                </blockquote>
              )}

              <div className="journey-prose">
                {section.paragraphs[locale].map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    <FormattedProse content={paragraph} />
                  </p>
                ))}
              </div>

              {section.projectNotes && section.projectNotes.length > 0 && (
                <div className="journey-project-notes">
                  {section.projectNotes.map((project) => (
                    <div key={project.slug} className="journey-project-note">
                      <div className="journey-project-note-head">
                        <h3>{project.title}</h3>
                        <span className="mono">{project.roleContext[locale]}</span>
                      </div>
                      <p>{project.description[locale]}</p>
                      <Link href={project.href} className="text-link">
                        {locale === "en" ? "Read system brief →" : "Baca ringkasan sistem →"}
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {section.transformation && (
                <div className="journey-transformation-box">
                  <div className="journey-transformation-headers">
                    <span className="mono">{section.transformation.fromHeading[locale]}</span>
                    <span className="mono journey-toward-head">
                      {section.transformation.towardHeading[locale]}
                    </span>
                  </div>
                  <div className="journey-transformation-rows">
                    {section.transformation.rows.map((row) => (
                      <div key={row.from.en} className="journey-transformation-row">
                        <div className="journey-shift-from">{row.from[locale]}</div>
                        <div className="journey-shift-arrow" aria-hidden="true">
                          →
                        </div>
                        <div className="journey-shift-toward">{row.toward[locale]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.includePillars && (
                <div className="journey-chapter-pillars">
                  {journeyPillars.map((pillar) => (
                    <div key={pillar.id} className="journey-chapter-pillar">
                      <div className="journey-chapter-pillar-head">
                        <span className="mono">{pillar.number}</span>
                        <h3>{pillar.title[locale]}</h3>
                      </div>
                      <p>{pillar.summary[locale]}</p>
                      <p className="journey-pillar-commitment">{pillar.commitment[locale]}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.closingReflection && (
                <aside className="journey-closing-card">
                  <p className="eyebrow">{section.closingReflection.eyebrow[locale]}</p>
                  <h3>{section.closingReflection.headline[locale]}</h3>
                  {section.closingReflection.paragraphs[locale].map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                  <p className="journey-closing-refrain">
                    {section.closingReflection.closingStatement[locale]}
                  </p>
                </aside>
              )}
            </section>
          ))}

          {/* Chapter End Note & Navigation */}
          <footer className="journey-chapter-footer">
            <div className="journey-chapter-endnote">
              <p className="eyebrow">{journeyArchive.closingMessage.eyebrow[locale]}</p>
              <p className="journey-endnote-title">{journeyArchive.closingMessage.title[locale]}</p>
              <p>{journeyArchive.closingMessage.signOff[locale]}</p>
            </div>

            <div className="journey-chapter-nav-bar">
              <Link href="/journey" className="button button-secondary">
                {t.backToJourney[locale]}
              </Link>
              <div className="journey-chapter-nav-links">
                <Link href="/projects" className="text-link">
                  {t.exploreProjectsLink[locale]}
                </Link>
                <Link href="/resume" className="text-link">
                  {t.viewResumeLink[locale]}
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
