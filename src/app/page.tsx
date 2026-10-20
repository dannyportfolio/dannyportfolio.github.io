import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SystemArchitecture } from "@/components/engineering/system-architecture";
import { RequestFlow } from "@/components/engineering/request-flow";
import { PerformanceVisualization } from "@/components/engineering/performance-visualization";
import { DatabaseFlow } from "@/components/engineering/database-flow";
import { HeroParallax } from "@/components/portfolio/hero-parallax";
import { StickyIntroduction } from "@/components/portfolio/sticky-introduction";
import { ResumeTransition } from "@/components/portfolio/resume-transition";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { principles, skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export default function Home() {
  return (
    <SiteShell>
      <ScrollProgress />
      <HeroParallax />
      <StickyIntroduction />
      <RequestFlow />
      <TechnicalExpertiseSection />
      <ProjectsSection />
      <ArchitectureCaseStudiesSection />
      <PerformanceVisualization />
      <DatabaseFlow />
      <ExperienceSection />
      <PrinciplesSection />
      <ResumeTransition />
      <ContactSection />
    </SiteShell>
  );
}

function TechnicalExpertiseSection() {
  return (
    <section id="expertise" className="engineering-stack">
      <div className="container stack-layout">
        <div className="stack-heading">
          <p className="eyebrow">03 / Technical expertise</p>
          <h2>
            Engineering
            <br />
            <em>stack.</em>
          </h2>
          <p>
            Tools grouped by the system concern they help solve — from product boundaries to
            production operations.
          </p>
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
  return (
    <section id="projects" className="projects-story">
      <div className="container">
        <div className="projects-story-heading">
          <p className="eyebrow">04 / Selected systems</p>
          <h2>
            Products built for
            <br />
            <em>real-world use.</em>
          </h2>
          <p>
            A focused selection of platforms spanning B2B logistics, local services, advertising,
            travel, and professional consulting.
          </p>
        </div>
        <div className="projects-home-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h3" />
          ))}
        </div>
        <div className="projects-story-bottom">
          <span className="mono">{String(projects.length).padStart(2, "0")} selected products</span>
          <Link href="/projects" className="text-link">
            View project overview →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArchitectureCaseStudiesSection() {
  return (
    <section id="case-studies" className="architecture-showcase">
      <div className="container architecture-showcase-grid">
        <div>
          <p className="eyebrow">05 / Architecture case studies</p>
          <h2>
            Designing the path
            <br />
            <em>through complexity.</em>
          </h2>
          <p>
            Each project record captures its product context, system focus, and the engineering
            considerations that shape the work.
          </p>
          <ButtonLink href="/case-studies/astraops" variant="secondary">
            Read a system brief <span aria-hidden="true">→</span>
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
  return (
    <section id="experience" className="experience-story">
      <div className="container experience-story-grid">
        <div>
          <p className="eyebrow">06 / Experience</p>
          <h2>
            A career shaped
            <br />
            by <em>shipping.</em>
          </h2>
          <p>Building professionally since 2021, with an independent freelance focus since 2023.</p>
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
  return (
    <section className="principles-band">
      <div className="container">
        <p className="eyebrow">Operating principles</p>
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
  return (
    <section id="contact" className="contact-section contact-story">
      <div className="container">
        <p className="eyebrow">08 / Contact</p>
        <h2>
          Interested in building
          <br />
          <em>reliable, scalable software?</em>
        </h2>
        <p>{profile.availability}</p>
        <p>{profile.relocation}</p>
        {profile.contactLinks.length > 0 && (
          <div className="contact-links">
            {profile.contactLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
