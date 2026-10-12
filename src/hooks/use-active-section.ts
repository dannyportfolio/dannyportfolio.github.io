"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("");
  const sectionKey = sectionIds.join("|");

  useEffect(() => {
    const ids = sectionKey.split("|").filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const visibleMap = new Map<string, number>();

    const updateActive = () => {
      // If at bottom of page, activate last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        const lastId = ids[ids.length - 1];
        if (lastId) {
          setActiveSection(lastId);
          return;
        }
      }

      // If at top of page, activate first section
      if (window.scrollY < 80) {
        const firstId = ids[0];
        if (firstId) {
          setActiveSection(firstId);
          return;
        }
      }

      let bestId = "";
      let bestRatio = 0;
      for (const [id, ratio] of visibleMap.entries()) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId) {
        setActiveSection(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleMap.delete(entry.target.id);
          }
        }
        updateActive();
      },
      { rootMargin: "-20% 0px -38% 0px", threshold: [0.05, 0.2, 0.4, 0.6, 0.8] },
    );

    elements.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      if (
        window.scrollY < 80 ||
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60
      ) {
        updateActive();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionKey]);

  return activeSection;
}
