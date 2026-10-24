"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/context/locale-context";

export function HeroParallax() {
  const { locale } = useLocale();

  return (
    <section id="intro" className="hero-parallax">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-content">
          {/* Featured Project Announcement */}
          <Link
            href="/case-studies/veloura"
            className="hero-announcement"
            aria-label={
              locale === "en"
                ? "Latest project: Veloura ERP — Fashion Manufacturing & Distribution"
                : "Proyek terbaru: Veloura ERP — Fashion Manufacturing & Distribution"
            }
          >
            <span className="hero-announcement__label">
              <span className="hero-announcement__dot" aria-hidden="true" />
              {locale === "en" ? "Latest project" : "Proyek terbaru"}
            </span>
            <span className="hero-announcement__divider" aria-hidden="true" />
            <span className="hero-announcement__title">
              Veloura ERP — Fashion Manufacturing &amp; Distribution
            </span>
            <span className="hero-announcement__arrow" aria-hidden="true">
              →
            </span>
          </Link>

          {/* Professional Byline */}
          <p className="eyebrow hero-byline">
            <span className="hero-byline-name">Danial Fachrudin</span>{" "}
            <span className="hero-byline-sep" aria-hidden="true">
              —
            </span>{" "}
            Software Engineer
          </p>

          {/* Main Headline */}
          <h1>
            <span className="hero-title-lead">
              {locale === "en" ? "Building Systems" : "Membangun Sistem"}
            </span>{" "}
            <em className="hero-title-accent">
              {locale === "en" ? "That Perform." : "Yang Berperforma."}
            </em>
          </h1>

          {/* Supporting Description */}
          <p className="hero-parallax-copy">
            {locale === "en"
              ? "Software Engineer focused on backend architecture, scalable APIs, database performance, and reliable production systems."
              : "Software Engineer yang berfokus pada arsitektur backend, API skalabel, performa basis data, dan keandalan sistem produksi."}
          </p>

          {/* Action CTAs */}
          <div className="hero-actions">
            <ButtonLink href="/projects" className="hero-cta-primary">
              {locale === "en" ? "Explore projects" : "Jelajahi proyek"}{" "}
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
            </ButtonLink>
            <ButtonLink href="/resume" variant="secondary" className="hero-cta-secondary">
              {locale === "en" ? "Open CV" : "Buka CV"}{" "}
              <span className="hero-cta-arrow" aria-hidden="true">
                ↗
              </span>
            </ButtonLink>
          </div>

          {/* Meta Bar: specialties & availability */}
          <div className="hero-meta">
            <span>
              {locale === "en"
                ? "Backend Engineering · Product Development · Performance"
                : "Rekayasa Backend · Pengembangan Produk · Performa"}
            </span>
            <Link href="/#contact">
              {locale === "en" ? "Open to opportunities ↗" : "Terbuka untuk peluang kerja ↗"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
