"use client";

import { useId } from "react";
import type { Locale } from "@/data/translations";

export function InferencePipelineDiagram({ locale }: { locale: Locale }) {
  const idPrefix = useId();
  const arrowMarkerId = `${idPrefix}-arrow`;

  const stages = [
    {
      num: "01",
      tier: { en: "INGRESS", id: "INGRESS" },
      title: { en: "Client Request", id: "Permintaan Klien" },
      desc: {
        en: "HTTP POST /chat/completions with stream=true",
        id: "HTTP POST /chat/completions dengan stream=true",
      },
    },
    {
      num: "02",
      tier: { en: "INGRESS", id: "INGRESS" },
      title: { en: "Gateway & Auth", id: "Gateway & Autentikasi" },
      desc: {
        en: "TLS termination, token quotas, tenant rate limiting",
        id: "Terminasi TLS, kuota token, rate limiting tenant",
      },
    },
    {
      num: "03",
      tier: { en: "FRONTEND", id: "FRONTEND" },
      title: { en: "Tokenization", id: "Tokenisasi & Validasi" },
      desc: {
        en: "BPE encode prompt, context truncation, format chat template",
        id: "BPE encode prompt, pemotongan konteks, chat template",
      },
    },
    {
      num: "04",
      tier: { en: "RUNTIME", id: "RUNTIME" },
      title: { en: "Admission & Queue", id: "Penerimaan & Antrean" },
      desc: {
        en: "Chunked prefill planning, KV cache reservation check",
        id: "Perencanaan chunked prefill, verifikasi alokasi KV cache",
      },
    },
    {
      num: "05",
      tier: { en: "EXECUTION", id: "EKSEKUSI" },
      title: { en: "Prefill Phase", id: "Fase Prefill" },
      desc: {
        en: "Compute-bound parallel GEMM over prompt tokens",
        id: "GEMM paralel komputasi-intensif pada token prompt",
      },
    },
    {
      num: "06",
      tier: { en: "MEMORY", id: "MEMORI" },
      title: { en: "PagedAttention KV", id: "PagedAttention & KV" },
      desc: {
        en: "Non-contiguous block tables in GPU HBM / VRAM",
        id: "Tabel blok non-bersebelahan di GPU HBM / VRAM",
      },
    },
    {
      num: "07",
      tier: { en: "EXECUTION", id: "EKSEKUSI" },
      title: { en: "Decode Iteration", id: "Iterasi Decode" },
      desc: {
        en: "Memory-bandwidth bound GEMV generating next token",
        id: "GEMV terikat bandwidth memori pencipta token berikutnya",
      },
    },
    {
      num: "08",
      tier: { en: "STREAMING", id: "STREAMING" },
      title: { en: "Stream Delivery", id: "Pengiriman Aliran" },
      desc: {
        en: "Detokenize logits, SSE chunk dispatch, Prometheus trace",
        id: "Detokenisasi logit, pengiriman chunk SSE, trace Prometheus",
      },
    },
  ];

  return (
    <div
      className="article-diagram-wrapper"
      role="region"
      aria-label={
        locale === "en"
          ? "Production LLM Inference Request Lifecycle Pipeline"
          : "Siklus Hidup Permintaan Inferensi LLM di Lingkungan Produksi"
      }
    >
      <div className="article-diagram-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="arch-dot is-live" aria-hidden="true" />
          <span className="mono" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
            {locale === "en" ? "REQUEST LIFECYCLE FLOW" : "ALUR SIKLUS HIDUP PERMINTAAN"}
          </span>
        </div>
        <span
          className="mono"
          style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.04em" }}
        >
          {locale === "en" ? "8 PIPELINE STAGES" : "8 TAHAPAN PIPELINE"}
        </span>
      </div>

      {/* DESKTOP / TABLET SVG DIAGRAM (>= 768px) */}
      <div className="arch-desktop-view">
        <svg
          viewBox="0 0 760 370"
          className="arch-desktop-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <marker
              id={arrowMarkerId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent-connector, var(--accent))" />
            </marker>
          </defs>

          {/* Row Tier Labels */}
          <g opacity="0.5">
            <text x="36" y="24" className="arch-tier-text mono">
              {locale === "en"
                ? "INGRESS & FRONTEND PREPARATION"
                : "INGRESS & PERSIAPAN TAHAP AWAL"}
            </text>
            <text x="36" y="204" className="arch-tier-text mono">
              {locale === "en"
                ? "ENGINE EXECUTION & MEMORY MANAGEMENT"
                : "EKSEKUSI ENGINE & PENGELOLAAN MEMORI"}
            </text>
          </g>

          {/* Flow Paths */}
          <g className="arch-connector-paths">
            {/* Top row connectors: 1 -> 2 -> 3 -> 4 */}
            <path
              d="M 185 82 L 230 82"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 375 82 L 420 82"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 565 82 L 610 82"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Turnaround from stage 4 down to stage 5 */}
            <path
              d="M 685 118 C 685 160, 685 160, 685 240"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Bottom row reverse connectors: 5 -> 6 -> 7 -> 8 */}
            <path
              d="M 610 262 L 565 262"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 420 262 L 375 262"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 230 262 L 185 262"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
          </g>

          {/* Top Row: Nodes 1, 2, 3, 4 */}
          {[
            { x: 35, y: 46, w: 150, h: 72, data: stages[0] },
            { x: 225, y: 46, w: 150, h: 72, data: stages[1] },
            { x: 415, y: 46, w: 150, h: 72, data: stages[2] },
            { x: 605, y: 46, w: 150, h: 72, data: stages[3] },
          ].map(({ x, y, w, h, data }) => (
            <g key={data.num} className="arch-svg-node">
              <rect x={x} y={y} width={w} height={h} rx="8" ry="8" className="arch-svg-rect" />
              <circle cx={x + 14} cy={y + 16} r="3.5" className="arch-svg-dot" />
              <text x={x + 24} y={y + 19} className="arch-svg-type mono">
                {data.num} · {data.tier[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 39}
                className="arch-svg-label"
                style={{ fontSize: "0.8rem", fontWeight: 600 }}
              >
                {data.title[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 56}
                fill="var(--muted)"
                style={{
                  fontSize: "0.62rem",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {data.desc[locale].length > 27
                  ? `${data.desc[locale].slice(0, 26)}…`
                  : data.desc[locale]}
              </text>
            </g>
          ))}

          {/* Bottom Row: Nodes 5, 6, 7, 8 (Right to Left flow) */}
          {[
            { x: 605, y: 226, w: 150, h: 72, data: stages[4] },
            { x: 415, y: 226, w: 150, h: 72, data: stages[5] },
            { x: 225, y: 226, w: 150, h: 72, data: stages[6] },
            { x: 35, y: 226, w: 150, h: 72, data: stages[7] },
          ].map(({ x, y, w, h, data }) => (
            <g key={data.num} className="arch-svg-node">
              <rect x={x} y={y} width={w} height={h} rx="8" ry="8" className="arch-svg-rect" />
              <circle cx={x + 14} cy={y + 16} r="3.5" className="arch-svg-dot" />
              <text x={x + 24} y={y + 19} className="arch-svg-type mono">
                {data.num} · {data.tier[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 39}
                className="arch-svg-label"
                style={{ fontSize: "0.8rem", fontWeight: 600 }}
              >
                {data.title[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 56}
                fill="var(--muted)"
                style={{
                  fontSize: "0.62rem",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {data.desc[locale].length > 27
                  ? `${data.desc[locale].slice(0, 26)}…`
                  : data.desc[locale]}
              </text>
            </g>
          ))}

          {/* Loop-back arrow for autoregressive decode step */}
          <path
            d="M 260 300 C 260 340, 480 340, 480 300"
            className="arch-path"
            strokeDasharray="3 3"
            markerEnd={`url(#${arrowMarkerId})`}
          />
          <text
            x="370"
            y="346"
            textAnchor="middle"
            fill="var(--muted)"
            className="mono"
            style={{ fontSize: "0.62rem" }}
          >
            {locale === "en"
              ? "Autoregressive Decode Loop (1 token / step until EOS)"
              : "Loop Decode Autoregresif (1 token / langkah hingga EOS)"}
          </text>
        </svg>
      </div>

      {/* MOBILE REFLOWED HIERARCHY (< 768px) */}
      <div className="arch-mobile-view" role="list">
        {stages.map((stage, idx) => (
          <div key={stage.num} className="arch-mobile-node-wrap" role="listitem">
            <div className="arch-mobile-card">
              <div className="arch-mobile-card-inner">
                <span className="arch-mobile-indicator">
                  <span className="arch-dot is-live" />
                </span>
                <div className="arch-mobile-card-text">
                  <span className="arch-type-tag mono">
                    {stage.num} · {stage.tier[locale]}
                  </span>
                  <h4 className="arch-mobile-label">{stage.title[locale]}</h4>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--muted)",
                      margin: "4px 0 0",
                      lineHeight: 1.4,
                    }}
                  >
                    {stage.desc[locale]}
                  </p>
                </div>
              </div>
            </div>
            {idx < stages.length - 1 && (
              <div className="arch-mobile-down-arrow" aria-hidden="true">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="article-diagram-caption mono">
        {locale === "en"
          ? "Figure 1: Anatomy of a production LLM inference pipeline with continuous batching and PagedAttention."
          : "Gambar 1: Anatomi pipeline inferensi LLM produksi dengan continuous batching dan PagedAttention."}
      </p>
    </div>
  );
}
