"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const DESKTOP_QUERY = "(min-width: 1100px)";

export function HorizontalScroll({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      if (reducedMotion || !media.matches) {
        section.style.removeProperty("--horizontal-height");
        track.style.transform = "";
        return;
      }

      const rect = section.getBoundingClientRect();
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth + 64, 0);
      const height = Math.max(window.innerHeight * 1.8, maxTranslate * 0.68 + window.innerHeight);
      section.style.setProperty("--horizontal-height", `${Math.ceil(height)}px`);

      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="horizontal-scroll">
      <div className="horizontal-sticky">
        <div ref={trackRef} className="horizontal-track">
          {children}
        </div>
      </div>
    </section>
  );
}
