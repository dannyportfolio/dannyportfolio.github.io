"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

const topicList = [
  { en: "Backend Architecture", id: "Arsitektur Backend" },
  { en: "API Design", id: "Desain API" },
  { en: "Database Systems", id: "Sistem Basis Data" },
  { en: "Caching Strategies", id: "Strategi Caching" },
  { en: "Queue & Background Jobs", id: "Antrean & Background Jobs" },
  { en: "Infrastructure & CI/CD", id: "Infrastruktur & CI/CD" },
  { en: "Observability & Metrics", id: "Observabilitas & Metrik" },
];

export function StickyIntroduction() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section id="about" className="sticky-introduction">
      <div className="container sticky-introduction-grid">
        <div className="sticky-introduction-title">
          <p className="eyebrow">{t.introEyebrow[locale]}</p>
          <h2>
            {t.introTitle[locale]}
            <br />
            <em>{t.introTitleEm[locale]}</em>
          </h2>
          <p>{t.introDescription[locale]}</p>
        </div>
        <div className="introduction-topics">
          {topicList.map((topic, index) => (
            <ScrollReveal key={topic.en} delay={index * 50} className="introduction-topic">
              <span className="mono">0{index + 1}</span>
              <h3>{topic[locale]}</h3>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
