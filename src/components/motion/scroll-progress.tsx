"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

const sections = [
  { id: "about", number: "01", key: "about" },
  { id: "philosophy", number: "02", key: "philosophy" },
  { id: "expertise", number: "03", key: "expertise" },
  { id: "projects", number: "04", key: "projects" },
  { id: "case-studies", number: "05", key: "caseStudies" },
  { id: "experience", number: "06", key: "experience" },
  { id: "certifications", number: "07", key: "certifications" },
  { id: "resume-generator", number: "08", key: "resume" },
  { id: "contact", number: "09", key: "contact" },
] as const;

export function ScrollProgress() {
  const { locale } = useLocale();
  const t = translations.scrollProgress;
  const active = useActiveSection([
    "intro",
    "profile",
    ...sections.map(({ id }) => id),
    "principles",
  ]);
  return (
    <aside className="scroll-progress" aria-label={t.ariaLabel[locale]}>
      {sections.map(({ id, number, key }) => {
        const label = t[key][locale];
        const isActive =
          active === id ||
          (id === "about" && (active === "intro" || active === "profile")) ||
          (id === "resume-generator" && active === "principles");
        return (
          <a
            key={id}
            href={`#${id}`}
            className={isActive ? "active" : ""}
            aria-label={`${number} — ${label}`}
            aria-current={isActive ? "location" : undefined}
          >
            <span className="scroll-progress-label">{label}</span>
            <span className="scroll-progress-num">{number}</span>
            <i aria-hidden="true" />
          </a>
        );
      })}
    </aside>
  );
}
