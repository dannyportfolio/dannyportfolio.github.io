"use client";

import Image from "next/image";
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
          <div className="hero-new-badge">
            <span className="hero-new-badge__dot" aria-hidden="true" />
            <span className="mono">{locale === "en" ? "New showcase" : "Portofolio baru"}</span>
            <Link href="/case-studies/veloura" className="hero-new-badge__link">
              Veloura ERP — Fashion Manufacturing & Distribution →
            </Link>
          </div>
          <p className="eyebrow">
            Danial Fachrudin <span>—</span> Software Engineer
          </p>
          <h1>
            {locale === "en" ? (
              <>
                Building Systems
                <br />
                <em>That Perform.</em>
              </>
            ) : (
              <>
                Membangun Sistem
                <br />
                <em>Yang Berperforma.</em>
              </>
            )}
          </h1>
          <p className="hero-parallax-copy">
            {locale === "en"
              ? "Software Engineer focused on backend architecture, scalable APIs, database performance, and reliable production systems."
              : "Software Engineer yang berfokus pada arsitektur backend, API skalabel, performa basis data, dan keandalan sistem produksi."}
          </p>
          <div className="hero-actions">
            <ButtonLink href="/projects">
              {locale === "en" ? "Explore projects" : "Jelajahi proyek"}{" "}
              <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              {locale === "en" ? "Open CV" : "Buka CV"} <span aria-hidden="true">↗</span>
            </ButtonLink>
          </div>
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
        <div className="hero-visual">
          <figure className="hero-portrait">
            <Image
              src="/danny-fachrudin-profile.avif"
              alt="Danial Fachrudin, Software Engineer"
              fill
              priority
              sizes="(max-width: 800px) 86vw, 34vw"
            />
          </figure>
          <div className="hero-visual-caption">
            <span className="mono">
              {locale === "en" ? "Based in Indonesia" : "Berbasis di Indonesia"}
            </span>
            <strong>
              {locale === "en" ? "Available internationally" : "Tersedia secara internasional"}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
