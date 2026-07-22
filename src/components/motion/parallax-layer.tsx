"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ParallaxLayer({ children, speed = 0.08, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const offset = (rect.top + rect.height / 2 - viewportCenter) * speed;
      element.style.setProperty("--parallax-y", `${Math.max(-42, Math.min(42, -offset))}px`);
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => { window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); if (frame) window.cancelAnimationFrame(frame); };
  }, [reducedMotion, speed]);
  return <div ref={ref} className={`parallax-layer ${className}`} style={{ "--parallax-y": "0px" } as CSSProperties}>{children}</div>;
}
