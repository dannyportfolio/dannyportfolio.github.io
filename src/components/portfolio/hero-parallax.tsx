import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export function HeroParallax() {
  return (
    <section id="intro" className="hero-parallax">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-content">
          <p className="eyebrow">Danny Fachrudin <span>—</span> Software Engineer</p>
          <h1>Building Systems<br /><em>That Perform.</em></h1>
          <p className="hero-parallax-copy">Software Engineer focused on backend architecture, scalable APIs, database performance, and reliable production systems.</p>
          <div className="hero-actions">
            <ButtonLink href="#projects">Explore projects <span aria-hidden="true">↓</span></ButtonLink>
            <ButtonLink href="/resume/print" variant="secondary">Open CV <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <div className="hero-meta">
            <span>Backend Engineering · Product Development · Performance</span>
            <Link href="#contact">Open to the right opportunity ↗</Link>
          </div>
        </div>
        <div className="hero-visual">
          <figure className="hero-portrait">
            <Image src="/danny-fachrudin-profile.avif" alt="Danny Fachrudin, Software Engineer" fill priority sizes="(max-width: 800px) 86vw, 34vw" />
          </figure>
          <div className="hero-visual-caption">
            <span className="mono">Based in Indonesia</span>
            <strong>Available internationally</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
