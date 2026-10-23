"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

const stages = [
  { en: "Client Request", id: "Request Klien" },
  { en: "API Gateway", id: "API Gateway" },
  { en: "Authentication & RBAC", id: "Autentikasi & RBAC" },
  { en: "Business Logic", id: "Logika Bisnis" },
  { en: "Caching Boundary", id: "Lapisan Caching" },
  { en: "Database Transactions", id: "Transaksi Basis Data" },
  { en: "Async Queue", id: "Antrean Asinkron" },
  { en: "Background Workers", id: "Background Workers" },
  { en: "Observability & Audit", id: "Observabilitas & Audit" },
];

export function RequestFlow() {
  const { locale } = useLocale();
  const t = translations.home;

  return (
    <section className="pipeline-section" id="philosophy">
      <div className="container">
        <div className="pipeline-heading">
          <p className="eyebrow">{t.pipelineEyebrow[locale]}</p>
          <h2>
            {t.pipelineTitle[locale]}
            <br />
            <em>{t.pipelineTitleEm[locale]}</em>
          </h2>
          <p>{t.pipelineDescription[locale]}</p>
        </div>
        <div className="request-flow" aria-label="Illustrative backend request pipeline">
          {stages.map((stage, index) => (
            <ScrollReveal key={stage.en} delay={index * 45} className="flow-stage">
              <span className="flow-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{stage[locale]}</span>
              {index < stages.length - 1 && <i aria-hidden>↓</i>}
            </ScrollReveal>
          ))}
        </div>
        <p className="illustrative-note">{t.pipelineNote[locale]}</p>
      </div>
    </section>
  );
}
