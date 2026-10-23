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
            <ScrollReveal key={stage.en} delay={index * 40} className="flow-stage-wrap">
              <div className="flow-stage">
                <div className="flow-stage-header">
                  <span className="flow-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flow-stage-dot" aria-hidden="true" />
                </div>
                <span className="flow-stage-title">{stage[locale]}</span>
              </div>
              {index < stages.length - 1 && (
                <span className="flow-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 16 16"
                    className="flow-arrow-icon"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M 3 8 L 13 8 M 9 4 L 13 8 L 9 12" />
                  </svg>
                </span>
              )}
            </ScrollReveal>
          ))}
        </div>
        <p className="illustrative-note">{t.pipelineNote[locale]}</p>
      </div>
    </section>
  );
}
