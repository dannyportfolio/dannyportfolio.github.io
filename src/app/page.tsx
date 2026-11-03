"use client";

import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SystemArchitecture } from "@/components/engineering/system-architecture";
import { RequestFlow } from "@/components/engineering/request-flow";
import { PerformanceVisualization } from "@/components/engineering/performance-visualization";
import { DatabaseFlow } from "@/components/engineering/database-flow";
import { HeroParallax } from "@/components/portfolio/hero-parallax";
import { ProfileSection } from "@/components/portfolio/profile-section";
import { StickyIntroduction } from "@/components/portfolio/sticky-introduction";
import { CertificationsSection } from "@/components/portfolio/certifications-section";
import { ResumeTransition } from "@/components/portfolio/resume-transition";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { principles, skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export default function Home() {
  return (
    <SiteShell>
      <ScrollProgress />
      <HeroParallax />
      <ProfileSection />
      <StickyIntroduction />
      <RequestFlow />
      <TechnicalExpertiseSection />
      <ProjectsSection />
      <ArchitectureCaseStudiesSection />
      <PerformanceVisualization />
      <DatabaseFlow />
      <ExperienceSection />
      <CertificationsSection />
      <PrinciplesSection />
      <ResumeTransition />
      <ContactSection />
    </SiteShell>
  );
}

function TechnicalExpertiseSection() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section id="expertise" className="engineering-stack">
      <div className="container stack-layout">
        <ScrollReveal className="stack-heading reveal-subtle">
          <p className="eyebrow">{t.expertiseEyebrow[locale]}</p>
          <h2>
            {t.expertiseTitle[locale]}
            <br />
            <em>{t.expertiseTitleEm[locale]}</em>
          </h2>
          <p>{t.expertiseDescription[locale]}</p>
        </ScrollReveal>
        <div className="stack-groups">
          {skillGroups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 55} className="stack-group">
              <div>
                <span className="mono">0{index + 1}</span>
                <h3>{group.title}</h3>
              </div>
              <div className="stack-skills">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section id="projects" className="projects-story">
      <div className="container">
        <ScrollReveal className="projects-story-heading reveal-subtle">
          <p className="eyebrow">{t.projectsEyebrow[locale]}</p>
          <h2>
            {t.projectsTitle[locale]}
            <br />
            <em>{t.projectsTitleEm[locale]}</em>
          </h2>
          <p>{t.projectsDescription[locale]}</p>
        </ScrollReveal>
        <div className="projects-home-grid">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.slug}
              delay={Math.min(index, 3) * 55}
              className={`project-card-reveal reveal-subtle${project.isNew ? " project-card-reveal--new" : ""}`}
            >
              <ProjectCard project={project} headingLevel="h3" />
            </ScrollReveal>
          ))}
        </div>
        <div className="projects-story-bottom">
          <span className="mono">
            {String(projects.length).padStart(2, "0")}{" "}
            {locale === "en" ? "selected products" : "produk pilihan"}
          </span>
          <Link href="/projects" className="text-link">
            {t.projectsOverviewLink[locale]}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArchitectureCaseStudiesSection() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section id="case-studies" className="architecture-showcase">
      <div className="container architecture-showcase-grid">
        <ScrollReveal className="reveal-subtle">
          <p className="eyebrow">{t.caseStudiesEyebrow[locale]}</p>
          <h2>
            {t.caseStudiesTitle[locale]}
            <br />
            <em>{t.caseStudiesTitleEm[locale]}</em>
          </h2>
          <p>{t.caseStudiesDescription[locale]}</p>
          <ButtonLink href="/case-studies/veloura" variant="secondary">
            {t.caseStudiesCta[locale]} <span aria-hidden="true">→</span>
          </ButtonLink>
        </ScrollReveal>
        <ScrollReveal className="architecture-display reveal-subtle" delay={80}>
          <SystemArchitecture />
        </ScrollReveal>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section id="experience" className="experience-story">
      <div className="container experience-story-grid">
        <ScrollReveal className="reveal-subtle">
          <p className="eyebrow">{t.experienceEyebrow[locale]}</p>
          <h2>
            {t.experienceTitle[locale]}
            <br />
            <em>{t.experienceTitleEm[locale]}</em>
          </h2>
          <p>{t.experienceDescription[locale]}</p>
        </ScrollReveal>
        <div className="experience-story-list">
          {experiences.map((experience, index) => (
            <ScrollReveal key={`${experience.company}-${experience.position}`} delay={index * 80}>
              <article>
                <span className="mono">{experience.period}</span>
                <h3>{experience.position}</h3>
                <p>
                  {experience.company} · {experience.location}
                </p>
                <p>{experience.contributions[0]}</p>
                <div className="badge-row">
                  {experience.technologies.map((technology) => (
                    <Badge key={technology}>{technology}</Badge>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrinciplesSection() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section id="principles" className="principles-band">
      <div className="container">
        <p className="eyebrow">{t.principlesEyebrow[locale]}</p>
        <div className="principles-band-grid">
          {principles.map((principle, index) => (
            <ScrollReveal key={principle} delay={index * 35}>
              <span className="mono">0{index + 1}</span>
              <h3>{principle}</h3>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section id="contact" className="contact-section contact-story">
      <div className="container">
        <ScrollReveal className="contact-content reveal-subtle">
          <p className="eyebrow">{t.contactEyebrow[locale]}</p>
          <h2>
            {t.contactTitle[locale]}
            <br />
            <em>{t.contactTitleEm[locale]}</em>
          </h2>
          <p>{profile.availability[locale]}</p>
          <p>{profile.relocation[locale]}</p>

          {profile.contactLinks.length > 0 ? (
            <div className="contact-channels">
              {profile.contactLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                const subtitle =
                  link.type === "email"
                    ? t.contactEmailSubtitle[locale]
                    : link.type === "github"
                      ? t.contactGithubSubtitle[locale]
                      : link.label;
                const ariaLabel =
                  link.type === "email"
                    ? `${link.label} ${profile.name} (${link.detail ?? profile.email})`
                    : `${link.label} — ${profile.name} (${locale === "en" ? "opens in a new tab" : "buka di tab baru"})`;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="contact-channel"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={ariaLabel}
                  >
                    <span className="contact-channel__icon" aria-hidden="true">
                      {link.type === "email" ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
                          <path d="m3.5 6 6.5 4.75L16.5 6" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                        </svg>
                      )}
                    </span>
                    <span className="contact-channel__body">
                      <span className="contact-channel__top">
                        <span className="contact-channel__label">{link.label}</span>
                        <span className="contact-channel__subtitle">{subtitle}</span>
                      </span>
                      <span className="contact-channel__detail">
                        {link.detail ?? link.href.replace(/^mailto:/, "")}
                      </span>
                    </span>
                    <span className="contact-channel__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="muted" style={{ marginTop: "24px" }}>
              {t.contactEmpty[locale]}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
