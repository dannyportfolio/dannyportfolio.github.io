"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useLocale } from "@/context/locale-context";
import { profile } from "@/data/profile";

/**
 * Profile section that follows the hero. The portrait lives here (instead of
 * inside the hero) so the first view stays focused on the introduction and
 * CTAs. The portrait and copy are rendered normally and only their visual
 * entrance is animated through ScrollReveal (opacity + small offset), which
 * falls back to a fully visible state without JS or with reduced motion.
 */
export function ProfileSection() {
  const { locale } = useLocale();

  const facts = [
    {
      term: locale === "en" ? "Based in" : "Lokasi",
      detail: profile.location,
    },
    {
      term: locale === "en" ? "Focus" : "Fokus",
      detail:
        locale === "en"
          ? "Backend architecture, APIs, database performance"
          : "Arsitektur backend, API, performa basis data",
    },
    {
      term: locale === "en" ? "Availability" : "Ketersediaan",
      detail: profile.availability[locale],
    },
    {
      term: locale === "en" ? "Relocation" : "Relokasi",
      detail: profile.relocation[locale],
    },
  ];

  return (
    <section id="profile" className="profile-section" aria-labelledby="profile-heading">
      <div className="container profile-layout">
        <ScrollReveal className="profile-visual reveal-subtle">
          <figure className="profile-figure">
            <div className="profile-portrait">
              <Image
                src="/danny-fachrudin-profile.avif"
                alt="Danial Fachrudin, Software Engineer"
                fill
                sizes="(max-width: 860px) 360px, 420px"
              />
            </div>
            <figcaption className="profile-caption">
              <span className="mono">
                {locale === "en" ? "Based in Indonesia" : "Berbasis di Indonesia"}
              </span>
              <strong>
                {locale === "en" ? "Available internationally" : "Tersedia secara internasional"}
              </strong>
            </figcaption>
          </figure>
        </ScrollReveal>

        <ScrollReveal className="profile-content reveal-subtle" delay={110}>
          <p className="eyebrow">{locale === "en" ? "Profile" : "Profil"}</p>
          <h2 id="profile-heading">
            {profile.name} <em>Software Engineer.</em>
          </h2>
          <p className="profile-summary">{profile.headline[locale]}</p>
          <dl className="profile-facts">
            {facts.map((fact) => (
              <div key={fact.term}>
                <dt className="mono">{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
