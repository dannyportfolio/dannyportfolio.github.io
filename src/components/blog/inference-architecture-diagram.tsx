"use client";

import { useId } from "react";
import type { Locale } from "@/data/translations";

export function InferenceArchitectureDiagram({ locale }: { locale: Locale }) {
  const idPrefix = useId();
  const arrowMarkerId = `${idPrefix}-arrow`;

  const tiers = [
    {
      name: { en: "1. CLIENT & INGRESS TIER", id: "1. TIER KLIEN & INGRESS" },
      items: [
        {
          id: "client-apps",
          label: { en: "Client Applications", id: "Aplikasi Klien" },
          sub: { en: "Web, Mobile, REST/gRPC SDKs", id: "Web, Mobile, SDK REST/gRPC" },
          tag: "CLIENT",
        },
        {
          id: "api-gw",
          label: { en: "API Gateway (Envoy)", id: "API Gateway (Envoy)" },
          sub: {
            en: "Auth, TLS, Rate limits, Quotas",
            id: "Autentikasi, TLS, Batas Kuota",
          },
          tag: "GATEWAY",
        },
      ],
    },
    {
      name: { en: "2. ORCHESTRATION & ROUTING", id: "2. ORKESTRASI & ROUTING" },
      items: [
        {
          id: "inference-router",
          label: { en: "Inference Router", id: "Router Inferensi" },
          sub: {
            en: "Prefix routing, admission control",
            id: "Routing prefix, kendali admisi",
          },
          tag: "ROUTER",
        },
        {
          id: "stream-proxy",
          label: { en: "SSE Stream Proxy", id: "Proxy Aliran SSE" },
          sub: {
            en: "Chunk buffering & disconnect abort",
            id: "Buffer chunk & pembatalan abort",
          },
          tag: "PROXY",
        },
        {
          id: "telemetry-bus",
          label: { en: "Telemetry / Prometheus", id: "Telemetri / Prometheus" },
          sub: {
            en: "TTFT, TPOT, VRAM metrics, OTEL",
            id: "Metrik TTFT, TPOT, VRAM, OTEL",
          },
          tag: "OBSERVE",
        },
      ],
    },
    {
      name: { en: "3. SERVING RUNTIME & ACCELERATORS", id: "3. RUNTIME SERVING & AKSELERATOR" },
      items: [
        {
          id: "engine-scheduler",
          label: { en: "vLLM / TRT-LLM Engine", id: "Engine vLLM / TRT-LLM" },
          sub: {
            en: "Continuous batching & chunked prefill",
            id: "Continuous batching & chunked prefill",
          },
          tag: "RUNTIME",
        },
        {
          id: "paged-attn",
          label: { en: "PagedAttention KV Cache", id: "PagedAttention KV Cache" },
          sub: {
            en: "Virtual block allocator (GPU VRAM)",
            id: "Alokator blok virtual (VRAM GPU)",
          },
          tag: "MEMORY",
        },
        {
          id: "gpu-workers",
          label: { en: "GPU Workers (TP=4/8)", id: "GPU Workers (TP=4/8)" },
          sub: {
            en: "NVLink All-Reduce tensor parallel",
            id: "Tensor parallel NVLink All-Reduce",
          },
          tag: "HARDWARE",
        },
      ],
    },
    {
      name: { en: "4. WEIGHTS & STORAGE", id: "4. PENYIMPANAN & BOBOT MODEL" },
      items: [
        {
          id: "local-nvme",
          label: { en: "Local NVMe Weight Cache", id: "Cache Bobot NVMe Lokal" },
          sub: {
            en: "High-speed safetensors cold start",
            id: "Cold start cepat format safetensors",
          },
          tag: "STORAGE",
        },
        {
          id: "model-registry",
          label: { en: "S3 / OCI Model Registry", id: "Model Registry S3 / OCI" },
          sub: {
            en: "Versioned checkpoints & configs",
            id: "Checkpoint versi & berkas konfigurasi",
          },
          tag: "REGISTRY",
        },
      ],
    },
  ];

  return (
    <div
      className="article-diagram-wrapper"
      role="region"
      aria-label={
        locale === "en"
          ? "Production LLM Inference Reference Architecture"
          : "Arsitektur Referensi Inferensi LLM Lingkungan Produksi"
      }
    >
      <div className="article-diagram-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="arch-dot is-live" aria-hidden="true" />
          <span className="mono" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
            {locale === "en"
              ? "PRODUCTION REFERENCE ARCHITECTURE"
              : "ARSITEKTUR REFERENSI PRODUKSI"}
          </span>
        </div>
        <span
          className="mono"
          style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.04em" }}
        >
          {locale === "en" ? "4 ARCHITECTURAL TIERS" : "4 TIER ARSITEKTUR"}
        </span>
      </div>

      {/* DESKTOP SVG VIEW (>= 768px) */}
      <div className="arch-desktop-view">
        <svg
          viewBox="0 0 760 410"
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

          {/* Tier Guides */}
          <g opacity="0.45">
            <text x="36" y="24" className="arch-tier-text mono">
              {tiers[0].name[locale]}
            </text>
            <text x="36" y="124" className="arch-tier-text mono">
              {tiers[1].name[locale]}
            </text>
            <text x="36" y="224" className="arch-tier-text mono">
              {tiers[2].name[locale]}
            </text>
            <text x="36" y="324" className="arch-tier-text mono">
              {tiers[3].name[locale]}
            </text>
          </g>

          {/* Connectors */}
          <g className="arch-connector-paths">
            {/* Tier 1 to Tier 2: Ingress -> Orchestrator */}
            <path
              d="M 180 72 L 230 72"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 380 72 C 450 72, 115 130, 115 146"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Tier 2 to Tier 3: Router -> Engine */}
            <path
              d="M 230 172 L 265 172"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 505 172 L 535 172"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 385 198 L 385 246"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Tier 3: Engine <-> PagedAttn <-> GPU Workers */}
            <path
              d="M 245 272 L 275 272"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 495 272 L 525 272"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Tier 3 to Tier 4: Storage */}
            <path
              d="M 640 298 L 640 346"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            <path
              d="M 445 372 L 405 372"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
          </g>

          {/* Tier 1 Nodes */}
          {[
            { x: 35, y: 44, w: 145, h: 56, item: tiers[0].items[0] },
            { x: 235, y: 44, w: 145, h: 56, item: tiers[0].items[1] },
          ].map(({ x, y, w, h, item }) => (
            <g key={item.id} className="arch-svg-node">
              <rect x={x} y={y} width={w} height={h} rx="8" ry="8" className="arch-svg-rect" />
              <circle cx={x + 14} cy={y + 16} r="3.5" className="arch-svg-dot" />
              <text x={x + 24} y={y + 19} className="arch-svg-type mono">
                {item.tag}
              </text>
              <text
                x={x + 14}
                y={y + 36}
                className="arch-svg-label"
                style={{ fontSize: "0.76rem", fontWeight: 600 }}
              >
                {item.label[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 49}
                fill="var(--muted)"
                style={{
                  fontSize: "0.58rem",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {item.sub[locale]}
              </text>
            </g>
          ))}

          {/* Tier 2 Nodes */}
          {[
            { x: 35, y: 144, w: 195, h: 56, item: tiers[1].items[0] },
            { x: 270, y: 144, w: 230, h: 56, item: tiers[1].items[1] },
            { x: 540, y: 144, w: 195, h: 56, item: tiers[1].items[2] },
          ].map(({ x, y, w, h, item }) => (
            <g key={item.id} className="arch-svg-node">
              <rect x={x} y={y} width={w} height={h} rx="8" ry="8" className="arch-svg-rect" />
              <circle cx={x + 14} cy={y + 16} r="3.5" className="arch-svg-dot" />
              <text x={x + 24} y={y + 19} className="arch-svg-type mono">
                {item.tag}
              </text>
              <text
                x={x + 14}
                y={y + 36}
                className="arch-svg-label"
                style={{ fontSize: "0.76rem", fontWeight: 600 }}
              >
                {item.label[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 49}
                fill="var(--muted)"
                style={{
                  fontSize: "0.58rem",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {item.sub[locale]}
              </text>
            </g>
          ))}

          {/* Tier 3 Nodes */}
          {[
            { x: 35, y: 244, w: 210, h: 56, item: tiers[2].items[0] },
            { x: 280, y: 244, w: 215, h: 56, item: tiers[2].items[1] },
            { x: 530, y: 244, w: 205, h: 56, item: tiers[2].items[2] },
          ].map(({ x, y, w, h, item }) => (
            <g key={item.id} className="arch-svg-node">
              <rect x={x} y={y} width={w} height={h} rx="8" ry="8" className="arch-svg-rect" />
              <circle cx={x + 14} cy={y + 16} r="3.5" className="arch-svg-dot" />
              <text x={x + 24} y={y + 19} className="arch-svg-type mono">
                {item.tag}
              </text>
              <text
                x={x + 14}
                y={y + 36}
                className="arch-svg-label"
                style={{ fontSize: "0.76rem", fontWeight: 600 }}
              >
                {item.label[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 49}
                fill="var(--muted)"
                style={{
                  fontSize: "0.58rem",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {item.sub[locale]}
              </text>
            </g>
          ))}

          {/* Tier 4 Nodes */}
          {[
            { x: 450, y: 344, w: 220, h: 56, item: tiers[3].items[0] },
            { x: 180, y: 344, w: 220, h: 56, item: tiers[3].items[1] },
          ].map(({ x, y, w, h, item }) => (
            <g key={item.id} className="arch-svg-node">
              <rect x={x} y={y} width={w} height={h} rx="8" ry="8" className="arch-svg-rect" />
              <circle cx={x + 14} cy={y + 16} r="3.5" className="arch-svg-dot" />
              <text x={x + 24} y={y + 19} className="arch-svg-type mono">
                {item.tag}
              </text>
              <text
                x={x + 14}
                y={y + 36}
                className="arch-svg-label"
                style={{ fontSize: "0.76rem", fontWeight: 600 }}
              >
                {item.label[locale]}
              </text>
              <text
                x={x + 14}
                y={y + 49}
                fill="var(--muted)"
                style={{
                  fontSize: "0.58rem",
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {item.sub[locale]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* MOBILE REFLOWED VIEW (< 768px) */}
      <div className="arch-mobile-view" role="list">
        {tiers.map((tierGroup) => (
          <div key={tierGroup.name.en} className="arch-mobile-tier">
            <span className="arch-mobile-tier-title mono">{tierGroup.name[locale]}</span>
            <div className="arch-mobile-tier-nodes">
              {tierGroup.items.map((node, nodeIdx) => (
                <div key={node.id} className="arch-mobile-node-wrap" role="listitem">
                  <div className="arch-mobile-card">
                    <div className="arch-mobile-card-inner">
                      <span className="arch-mobile-indicator">
                        <span className="arch-dot is-live" />
                      </span>
                      <div className="arch-mobile-card-text">
                        <span className="arch-type-tag mono">{node.tag}</span>
                        <h4 className="arch-mobile-label">{node.label[locale]}</h4>
                        <p
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--muted)",
                            margin: "4px 0 0",
                            lineHeight: 1.4,
                          }}
                        >
                          {node.sub[locale]}
                        </p>
                      </div>
                    </div>
                  </div>
                  {nodeIdx < tierGroup.items.length - 1 && (
                    <div className="arch-mobile-down-arrow" aria-hidden="true">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="article-diagram-caption mono">
        {locale === "en"
          ? "Figure 2: Modular reference architecture for a high-throughput, low-latency LLM inference system."
          : "Gambar 2: Arsitektur referensi modular untuk sistem inferensi LLM throughput tinggi dan latensi rendah."}
      </p>
    </div>
  );
}
