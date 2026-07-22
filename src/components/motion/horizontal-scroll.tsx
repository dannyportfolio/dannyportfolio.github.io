"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HorizontalScroll({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(min-width: 900px)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth + 48, 0);
      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => { window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); if (frame) window.cancelAnimationFrame(frame); };
  }, [reducedMotion]);
  return <section ref={sectionRef} className="horizontal-scroll"><div className="horizontal-sticky"><div ref={trackRef} className="horizontal-track">{children}</div></div></section>;
}
