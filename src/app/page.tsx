import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SystemArchitecture } from "@/components/engineering/system-architecture";
import { RequestFlow } from "@/components/engineering/request-flow";
import { PerformanceVisualization } from "@/components/engineering/performance-visualization";
import { DatabaseFlow } from "@/components/engineering/database-flow";
import { TerminalCard } from "@/components/engineering/terminal-card";
import { HeroParallax } from "@/components/portfolio/hero-parallax";
import { StickyIntroduction } from "@/components/portfolio/sticky-introduction";
import { ProjectStoryCard } from "@/components/portfolio/project-story-card";
import { ResumeTransition } from "@/components/portfolio/resume-transition";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { principles, skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export default function Home() {
  return <SiteShell><ScrollProgress /><HeroParallax /><StickyIntroduction /><RequestFlow />
    <section id="expertise" className="engineering-stack"><div className="container stack-layout"><div className="stack-heading"><p className="eyebrow">03 / Technical expertise</p><h2>Engineering<br /><em>stack.</em></h2><p>Tools grouped by the system concern they help solve — from product boundaries to production operations.</p></div><div className="stack-groups">{skillGroups.map((group, index) => <ScrollReveal key={group.title} delay={index * 55} className="stack-group"><div><span className="mono">0{index + 1}</span><h3>{group.title}</h3></div><div className="stack-skills">{group.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}</div></ScrollReveal>)}</div></div></section>
    <section id="projects" className="projects-story"><div className="container projects-story-heading"><p className="eyebrow">04 / Selected systems</p><h2>Work in context,<br /><em>not just a gallery.</em></h2><p>Scroll through a selection of systems. Each panel keeps space for the verified problem, architecture, and operational considerations.</p></div><HorizontalScroll>{projects.map((project, index) => <ProjectStoryCard key={project.slug} project={project} index={index} />)}</HorizontalScroll><div className="container projects-story-bottom"><span className="mono">SCROLL →</span><Link href="/projects" className="text-link">View all project records →</Link></div></section>
    <section id="case-studies" className="architecture-showcase"><div className="container architecture-showcase-grid"><div><p className="eyebrow">05 / Architecture case studies</p><h2>Designing the path<br /><em>through complexity.</em></h2><p>Every system makes tradeoffs. Case studies document the boundaries, data flow, operational risks, and decisions behind the implementation.</p><ButtonLink href="/case-studies/gegarap-id" variant="secondary">Read a case study <span>→</span></ButtonLink></div><ScrollReveal className="architecture-display"><SystemArchitecture /><TerminalCard className="architecture-terminal" /></ScrollReveal></div></section>
    <PerformanceVisualization /><DatabaseFlow />
    <section id="experience" className="experience-story"><div className="container experience-story-grid"><div><p className="eyebrow">06 / Experience</p><h2>A record built<br />on <em>facts.</em></h2><p>Professional information remains editable until verified details are provided.</p></div><div className="experience-story-list">{experiences.map((experience, index) => <ScrollReveal key={`${experience.company}-${experience.position}`} delay={index * 80}><article><span className="mono">{experience.period}</span><h3>{experience.position}</h3><p>{experience.company} · {experience.location}</p><p>{experience.contributions[0]}</p><div className="badge-row">{experience.technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)}</div></article></ScrollReveal>)}</div></div></section>
    <section className="principles-band"><div className="container"><p className="eyebrow">Operating principles</p><div className="principles-band-grid">{principles.map((principle, index) => <ScrollReveal key={principle} delay={index * 35}><span className="mono">0{index + 1}</span><h3>{principle}</h3></ScrollReveal>)}</div></div></section>
    <ResumeTransition />
    <section id="contact" className="contact-section contact-story"><div className="container"><p className="eyebrow">08 / Contact</p><h2>Interested in building<br /><em>reliable, scalable software?</em></h2><p>{profile.availability}</p><div className="contact-links"><a href="#contact">{profile.email}</a><a href="#contact">{profile.github}</a><a href="#contact">{profile.linkedin}</a></div></div></section>
  </SiteShell>;
}
