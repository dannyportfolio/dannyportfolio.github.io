"use client";

import { useLocale } from "@/context/locale-context";

export function ArchitectureDiagram() {
  const { locale } = useLocale();

  return (
    <div
      className="conceptual-architecture"
      role="region"
      aria-label={
        locale === "en"
          ? "Conceptual architecture diagram from client to API, services, data, cache and observability"
          : "Diagram arsitektur konseptual dari klien ke API, layanan, data, cache, dan observabilitas"
      }
    >
      <div className="conceptual-row">
        <span className="conceptual-node">{locale === "en" ? "Client" : "Klien"}</span>
        <span className="conceptual-arrow" aria-hidden="true">
          →
        </span>
        <span className="conceptual-node">{locale === "en" ? "API Gateway" : "API Gateway"}</span>
        <span className="conceptual-arrow" aria-hidden="true">
          →
        </span>
        <span className="conceptual-node">
          {locale === "en" ? "Domain Services" : "Layanan Domain"}
        </span>
      </div>
      <div className="conceptual-down" aria-hidden="true">
        ↓
      </div>
      <div className="conceptual-row lower">
        <span className="conceptual-node">
          {locale === "en" ? "Primary Database" : "Basis Data Utama"}
        </span>
        <span className="conceptual-node">
          {locale === "en" ? "Cache Boundary" : "Lapisan Cache"}
        </span>
        <span className="conceptual-node">
          {locale === "en" ? "Observability" : "Observabilitas"}
        </span>
      </div>
      <p className="conceptual-caption mono">
        {locale === "en"
          ? "Conceptual system map — verified per project in individual case studies."
          : "Peta sistem konseptual — terverifikasi pada masing-masing studi kasus proyek."}
      </p>
    </div>
  );
}
