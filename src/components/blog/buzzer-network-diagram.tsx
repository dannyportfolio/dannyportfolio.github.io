"use client";

import type { Locale } from "@/data/translations";

export function BuzzerNetworkDiagram({ locale }: { locale: Locale }) {
  const stages = [
    {
      num: "01",
      tier: { en: "INGRESS", id: "INGRESS" },
      title: { en: "Content Production", id: "Produksi Konten" },
      desc: {
        en: "Narrative drafting, message templates, multimedia assets, and generative variations",
        id: "Penyusunan narasi, templat pesan, aset multimedia, dan variasi generatif",
      },
    },
    {
      num: "02",
      tier: { en: "NETWORK", id: "JARINGAN" },
      title: { en: "Distribution Nodes", id: "Simpul Distribusi" },
      desc: {
        en: "Multi-account networks, coordinated schedules, human operators, and scheduling tools",
        id: "Jaringan multi-akun, penjadwalan terkoordinasi, operator manusia, dan tool automasi",
      },
    },
    {
      num: "03",
      tier: { en: "DELIVERY", id: "PLATFORM" },
      title: { en: "Platform Delivery", id: "Pengiriman Platform" },
      desc: {
        en: "Cross-platform publishing across timelines, comment threads, reposts, and trending tags",
        id: "Publikasi lintas platform pada timeline, utas komentar, repost, dan tagar tren",
      },
    },
    {
      num: "04",
      tier: { en: "INGESTION", id: "INGESTION" },
      title: { en: "Recommendation Ingestion", id: "Ingesti Rekomendasi" },
      desc: {
        en: "Engagement signals, velocity tracking, dwell time, and algorithmic amplification triggers",
        id: "Sinyal engagement, pelacakan velocity, waktu singgah, dan pemicu amplifikasi algoritma",
      },
    },
    {
      num: "05",
      tier: { en: "CONSUMPTION", id: "KONSUMSI" },
      title: { en: "Audience Exposure", id: "Paparan Audiens" },
      desc: {
        en: "Filter bubble delivery, echo chambers, social proof perception, and organic re-sharing",
        id: "Paparan filter bubble, echo chamber, persepsi social proof, dan re-sharing organik",
      },
    },
    {
      num: "06",
      tier: { en: "ANALYTICS", id: "ANALITIK" },
      title: { en: "Feedback & Telemetry", id: "Umpan Balik & Telemetri" },
      desc: {
        en: "Impression metrics, sentiment telemetry, narrative iteration, and operational adjustments",
        id: "Metrik impresi, telemetri sentimen, iterasi narasi, dan penyesuaian operasional",
      },
    },
  ];

  return (
    <div
      className="article-diagram-wrapper"
      role="region"
      aria-label={
        locale === "en"
          ? "Analytical Model of Information Distribution Pipeline"
          : "Model Analitis Saluran Distribusi Informasi Terkoordinasi"
      }
    >
      <div className="article-diagram-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="arch-dot is-live" aria-hidden="true" />
          <span className="mono" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
            {locale === "en"
              ? "ANALYTICAL MODEL: DISTRIBUTED INFORMATION FLOW"
              : "MODEL ANALITIS: ALUR DISTRIBUSI INFORMASI TERDISTRIBUSI"}
          </span>
        </div>
        <span
          className="mono"
          style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.04em" }}
        >
          {locale === "en" ? "6 CONCEPTUAL STAGES" : "6 TAHAPAN KONSEPTUAL"}
        </span>
      </div>

      <div className="article-diagram-grid">
        {stages.map((stage, idx) => (
          <div key={stage.num} className="article-diagram-card">
            <div className="article-diagram-card-top">
              <span className="mono article-diagram-step">{stage.num}</span>
              <span className="mono article-diagram-tier">{stage.tier[locale]}</span>
            </div>
            <h4 className="article-diagram-card-title">{stage.title[locale]}</h4>
            <p className="article-diagram-card-desc">{stage.desc[locale]}</p>
            {idx < stages.length - 1 && (
              <div className="article-diagram-connector" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="article-diagram-footer">
        <span className="mono" style={{ fontSize: "0.74rem", color: "var(--muted)" }}>
          {locale === "en"
            ? "Analytical architecture model representing coordinated online influence mechanisms. Not an endorsement of manipulative techniques."
            : "Model arsitektur analitis yang memetakan mekanisme pengaruh daring terkoordinasi. Bukan anjuran praktik manipulatif."}
        </span>
      </div>
    </div>
  );
}
