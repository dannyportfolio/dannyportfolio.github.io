"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ButtonLink } from "@/components/ui/button";

const nodes = ["CLIENT", "API", "AUTH", "CACHE", "DATABASE", "QUEUE", "WORKER", "LOGS"];

export function HeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const hero = ref.current;
      if (!hero) return;
      const scroll = Math.min(window.scrollY, window.innerHeight);
      const fade = Math.max(0, 1 - scroll / (window.innerHeight * 0.78));
      hero.style.setProperty("--hero-scroll", `${scroll}px`);
      hero.style.setProperty("--hero-fade", `${fade}`);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateScroll); };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const hero = ref.current;
      if (!hero) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      hero.style.setProperty("--pointer-x", `${x * 6}px`);
      hero.style.setProperty("--pointer-y", `${y * 6}px`);
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onPointer); if (frame) window.cancelAnimationFrame(frame); };
  }, [reducedMotion]);
  return <section ref={ref} id="intro" className="hero-parallax" style={{ "--hero-scroll": "0px", "--hero-fade": 1, "--pointer-x": "0px", "--pointer-y": "0px" } as CSSProperties}><div className="hero-grid-pattern" /><div className="hero-glow" /><svg className="hero-lines" viewBox="0 0 1440 900" aria-hidden="true"><path d="M-30 315C200 250 248 440 465 378S725 120 920 246s197 333 522 235" /><path d="M105 735c227-155 321 23 522-108S878 455 1155 550s229-63 367-118" /><path d="M1020-10c-45 168 161 231 73 403S981 518 1106 659s101 205 282 269" /></svg><div className="hero-constellation" aria-hidden="true">{nodes.map((node, index) => <span key={node} className={`constellation-node node-${index}`}>{node}</span>)}</div><div className="floating-card card-api"><span className="mono">POST /v1/jobs</span><strong>202 Accepted</strong><small>queue: scheduled</small></div><div className="floating-card card-database"><span className="mono">db / primary</span><strong>index scan</strong><small>plan: optimised</small></div><div className="floating-card card-cache"><span className="mono">redis / cache</span><strong>cache hit</strong><small>ttl: 300s</small></div><div className="container hero-content"><p className="eyebrow">Danny Fachrudin <span>—</span> Software Engineer</p><h1>Building Systems<br /><em>That Perform.</em></h1><p className="hero-parallax-copy">Software Engineer focused on backend architecture, scalable APIs, database performance, and reliable production systems.</p><div className="hero-actions"><ButtonLink href="#projects">Explore systems <span>↓</span></ButtonLink><ButtonLink href="/resume/print" variant="secondary">Download CV <span>↗</span></ButtonLink></div><div className="hero-meta"><span>Backend Engineering &amp; Performance</span><Link href="#contact">Available for the right challenge ↗</Link></div></div><div className="hero-scroll-prompt"><span>Scroll to explore</span><i /></div></section>;
}
