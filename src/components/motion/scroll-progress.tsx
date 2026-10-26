"use client";

import { useActiveSection } from "@/hooks/use-active-section";

const sections = [
  ["about", "01"],
  ["philosophy", "02"],
  ["expertise", "03"],
  ["projects", "04"],
  ["case-studies", "05"],
  ["experience", "06"],
  ["certifications", "07"],
  ["resume-generator", "08"],
  ["contact", "09"],
] as const;

export function ScrollProgress() {
  const active = useActiveSection(["intro", "profile", ...sections.map(([id]) => id)]);
  return (
    <aside className="scroll-progress" aria-label="Section progress">
      {sections.map(([id, number]) => {
        const isActive =
          active === id || (id === "about" && (active === "intro" || active === "profile"));
        return (
          <a
            key={id}
            href={`#${id}`}
            className={isActive ? "active" : ""}
            aria-label={`Go to section ${number}`}
          >
            <span>{number}</span>
            <i />
          </a>
        );
      })}
    </aside>
  );
}
