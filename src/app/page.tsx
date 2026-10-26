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
        <div className="stack-heading">
          <p className="eyebrow">{t.expertiseEyebrow[locale]}</p>
          <h2>
            {t.expertiseTitle[locale]}
            <br />
            <em>{t.expertiseTitleEm[locale]}</em>
          </h2>
          <p>{t.expertiseDescription[locale]}</p>
        </div>
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
        <div className="projects-story-heading">
          <p className="eyebrow">{t.projectsEyebrow[locale]}</p>
          <h2>
            {t.projectsTitle[locale]}
            <br />
            <em>{t.projectsTitleEm[locale]}</em>
          </h2>
          <p>{t.projectsDescription[locale]}</p>
        </div>
        <div className="projects-home-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h3" />
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
        <div>
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
        </div>
        <ScrollReveal className="architecture-display">
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
        <div>
          <p className="eyebrow">{t.experienceEyebrow[locale]}</p>
          <h2>
            {t.experienceTitle[locale]}
            <br />
            by <em>shipping.</em>
          </h2>
          <p>{t.experienceDescription[locale]}</p>
        </div>
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
    <section className="principles-band">
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
        <p className="eyebrow">{locale === "en" ? "09 / Contact" : "09 / Kontak"}</p>
        <h2>
          {t.contactTitle[locale]}
          <br />
          <em>{t.contactTitleEm[locale]}</em>
        </h2>
        <p>{profile.availability[locale]}</p>
        <p>{profile.relocation[locale]}</p>
        {profile.contactLinks.length > 0 ? (
          <div className="contact-links">
            {profile.contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${link.label} (${profile.name})`}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="muted" style={{ marginTop: "24px" }}>
            {t.contactEmpty[locale]}
          </p>
        )}
      </div>
    </section>
  );
}
