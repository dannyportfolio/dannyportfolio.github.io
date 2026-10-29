"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroParallax() {
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const t = translations.home;
  const focusItems = t.heroFocusItems;

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const section = sectionRef.current;
    if (!section) return;

    const clientX = event.clientX;
    const clientY = event.clientY;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      section.style.setProperty("--hero-pointer-x", `${x.toFixed(1)}%`);
      section.style.setProperty("--hero-pointer-y", `${y.toFixed(1)}%`);
      frameRef.current = null;
    });
  }

  function handleFocusKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % focusItems.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + focusItems.length) % focusItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = focusItems.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  const activeFocus = focusItems[activeIndex] ?? focusItems[0];

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="hero-parallax"
      onPointerMove={handlePointerMove}
    >
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="container hero-layout">
        <div className="hero-content">
          {/* Professional Byline */}
          <p className="eyebrow hero-byline hero-enter hero-enter--1">
            <span className="hero-byline-marker" aria-hidden="true" />
            <span className="hero-byline-name">{t.heroEyebrow[locale]}</span>{" "}
            <span className="hero-byline-sep" aria-hidden="true">
              —
            </span>{" "}
            <span>{t.heroRole[locale]}</span>
          </p>

          {/* Main Headline */}
          <h1 className="hero-enter hero-enter--2">
            <span className="hero-title-lead">{t.heroTitlePrefix[locale]}</span>{" "}
            <em className="hero-title-accent">{t.heroTitleEm[locale]}</em>
          </h1>

          {/* Supporting Description */}
          <p className="hero-parallax-copy hero-enter hero-enter--3">{t.heroDescription[locale]}</p>

          {/* Action CTAs */}
          <div className="hero-actions hero-enter hero-enter--4">
            <ButtonLink href="/projects" className="hero-cta-primary">
              {t.heroCtaPrimary[locale]}{" "}
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
            </ButtonLink>
            <ButtonLink href="/resume" variant="secondary" className="hero-cta-secondary">
              {t.heroCtaSecondary[locale]}{" "}
              <span className="hero-cta-arrow" aria-hidden="true">
                ↗
              </span>
            </ButtonLink>
          </div>
        </div>

        {/* Interactive Engineering Focus Rail & Narrative Transition */}
        <div className="hero-ledger hero-enter hero-enter--5">
          <div className="hero-ledger__bar">
            <div className="hero-focus-tabs" role="group" aria-label={t.heroFocusLabel[locale]}>
              {focusItems.map((item, index) => {
                const isSelected = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    aria-pressed={isSelected}
                    className={`hero-focus-tab ${isSelected ? "is-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleFocusKeyDown(event, index)}
                  >
                    <span className="hero-focus-tab__index">{item.index}</span>
                    <span className="hero-focus-tab__label">{item.label[locale]}</span>
                  </button>
                );
              })}
            </div>

            <a href="#contact" className="hero-availability">
              <span className="hero-availability__dot" aria-hidden="true" />
              <span>{t.heroOpportunities[locale]}</span>
              <span className="hero-availability__arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>

          <div className="hero-focus-panel" aria-live="polite">
            <p className="hero-focus-panel__detail">{activeFocus.detail[locale]}</p>
            <a href={activeFocus.href} className="hero-focus-panel__jump">
              <span>{activeFocus.cta[locale]}</span>
              <span className="hero-focus-panel__arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
