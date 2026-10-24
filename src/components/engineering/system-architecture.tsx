"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import { useLocale } from "@/context/locale-context";
import { translations } from "@/data/translations";

export type ArchitectureNode = {
  id: string;
  label: string;
  type: "client" | "api" | "service" | "cache" | "database" | "queue" | "worker" | "observability";
  tier?: "ingress" | "persistence" | "async";
  description?: string;
};

const defaultNodesEn: ArchitectureNode[] = [
  {
    id: "client",
    label: "Client App",
    type: "client",
    tier: "ingress",
    description: "Web/mobile clients submitting requests",
  },
  {
    id: "api",
    label: "API Gateway",
    type: "api",
    tier: "ingress",
    description: "Routing, rate limiting, and request validation",
  },
  {
    id: "auth",
    label: "Auth & RBAC",
    type: "service",
    tier: "ingress",
    description: "Token verification and permission claims",
  },
  {
    id: "cache",
    label: "Cache Boundary",
    type: "cache",
    tier: "persistence",
    description: "Fast read tier for hot entities",
  },
  {
    id: "database",
    label: "PostgreSQL DB",
    type: "database",
    tier: "persistence",
    description: "Atomic transactional persistence with strict constraints",
  },
  {
    id: "queue",
    label: "Message Queue",
    type: "queue",
    tier: "async",
    description: "Durable buffering for asynchronous workflows",
  },
  {
    id: "worker",
    label: "Worker Service",
    type: "worker",
    tier: "async",
    description: "Background processing and integration dispatch",
  },
  {
    id: "logs",
    label: "Observability",
    type: "observability",
    tier: "async",
    description: "Structured logging, metrics, and audit telemetry",
  },
];

const defaultNodesId: ArchitectureNode[] = [
  {
    id: "client",
    label: "Aplikasi Klien",
    type: "client",
    tier: "ingress",
    description: "Klien web/mobile yang mengirimkan permintaan",
  },
  {
    id: "api",
    label: "API Gateway",
    type: "api",
    tier: "ingress",
    description: "Routing, rate limiting, dan validasi permintaan",
  },
  {
    id: "auth",
    label: "Autentikasi & RBAC",
    type: "service",
    tier: "ingress",
    description: "Verifikasi token dan izin peran pengguna",
  },
  {
    id: "cache",
    label: "Lapisan Caching",
    type: "cache",
    tier: "persistence",
    description: "Penyimpanan cepat untuk entitas sering dibaca",
  },
  {
    id: "database",
    label: "Basis Data Utama",
    type: "database",
    tier: "persistence",
    description: "Penyimpanan transaksional PostgreSQL ACID",
  },
  {
    id: "queue",
    label: "Antrean Pesan",
    type: "queue",
    tier: "async",
    description: "Buffer pesan tahan uji untuk proses asinkron",
  },
  {
    id: "worker",
    label: "Background Worker",
    type: "worker",
    tier: "async",
    description: "Pemrosesan tugas latar dan integrasi eksternal",
  },
  {
    id: "logs",
    label: "Observabilitas",
    type: "observability",
    tier: "async",
    description: "Pencatatan terstruktur, metrik, dan audit sistem",
  },
];

export function SystemArchitecture({
  nodes: customNodes,
  activeNode,
  compact = false,
  variant = "auto",
  onNodeClick,
}: {
  nodes?: ArchitectureNode[];
  activeNode?: string;
  compact?: boolean;
  variant?: "auto" | "showcase" | "journey";
  onNodeClick?: (id: string) => void;
}) {
  const { locale } = useLocale();
  const idPrefix = useId();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isJourney = variant === "journey" || (variant === "auto" && Boolean(customNodes));

  const nodes = useMemo(() => {
    if (customNodes && customNodes.length > 0) return customNodes;
    return locale === "id" ? defaultNodesId : defaultNodesEn;
  }, [customNodes, locale]);

  const activeId = activeNode || nodes[0]?.id || "";
  const t = translations.diagrams;

  const handleKeyDown = (e: KeyboardEvent, nodeId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNodeClick?.(nodeId);
    }
  };

  // JOURNEY VARIANT: Vertical connected interactive pipeline for case studies
  if (isJourney) {
    const activeIndex = nodes.findIndex((n) => n.id === activeId);
    const activeNodeData = nodes[activeIndex] || nodes[0];

    return (
      <div
        className={`system-architecture arch-journey-container ${compact ? "is-compact" : ""}`}
        role="region"
        aria-label={`${locale === "en" ? "System Architecture Flow" : "Alur Arsitektur Sistem"}: ${nodes.length} ${t.systemStages[locale]}`}
      >
        <div className="arch-journey-header">
          <div className="arch-journey-badge">
            <span className="arch-dot is-live" aria-hidden="true" />
            <span className="mono">
              {nodes.length} {t.systemStages[locale]}
            </span>
          </div>
          {activeNodeData && (
            <span className="arch-active-pill mono">
              {t.activeStage[locale]}: {String(Math.max(1, activeIndex + 1)).padStart(2, "0")}
            </span>
          )}
        </div>

        <div className="arch-journey-pipeline" role="list">
          {nodes.map((node, index) => {
            const isActive = activeId === node.id;
            const isTarget = onNodeClick !== undefined;

            return (
              <div key={node.id} className="arch-journey-item" role="listitem">
                <div
                  className={`arch-journey-card node-${node.type} ${isActive ? "is-active" : ""}`}
                  onClick={() => onNodeClick?.(node.id)}
                  onKeyDown={(e) => handleKeyDown(e, node.id)}
                  role={isTarget ? "button" : "group"}
                  tabIndex={isTarget ? 0 : undefined}
                  aria-pressed={isTarget ? isActive : undefined}
                  aria-label={`${locale === "en" ? "Stage" : "Tahap"} ${index + 1}: ${node.label} (${node.type})`}
                >
                  <div className="arch-journey-card-top">
                    <span className="arch-step-num mono">{String(index + 1).padStart(2, "0")}</span>
                    <span className={`arch-type-tag tag-${node.type} mono`}>
                      {node.type.toUpperCase()}
                    </span>
                    <span className="arch-indicator" aria-hidden="true">
                      <span className={`arch-dot ${isActive ? "is-active" : ""}`} />
                    </span>
                  </div>
                  <h4 className="arch-journey-label">{node.label}</h4>
                  {isActive && (
                    <span className="arch-live-label mono">{t.activeStage[locale]}</span>
                  )}
                </div>

                {index < nodes.length - 1 && (
                  <div className="arch-journey-connector" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 28"
                      className="arch-connector-svg"
                      preserveAspectRatio="none"
                    >
                      <line x1="12" y1="0" x2="12" y2="22" className="arch-connector-line" />
                      <polygon points="8,18 12,25 16,18" className="arch-connector-arrowhead" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="arch-journey-footer">
          <span className="arch-legend-item">
            <span className="arch-dot" aria-hidden="true" /> {t.requestFlow[locale]}
          </span>
          {onNodeClick && <span className="arch-hint mono">{t.clickToNavigate[locale]} ↗</span>}
        </div>
      </div>
    );
  }

  // SHOWCASE VARIANT: Desktop SVG Diagram + Mobile Reflowed Hierarchy
  const arrowMarkerId = `${idPrefix}-arrow`;
  const activeHover = hoveredNode || activeId;

  return (
    <div
      className={`system-architecture arch-showcase-container ${compact ? "is-compact" : ""}`}
      role="region"
      aria-label={
        locale === "en"
          ? "System Architecture Showcase Diagram"
          : "Diagram Showcase Arsitektur Sistem"
      }
    >
      {/* DESKTOP/TABLET SVG DIAGRAM (>= 768px) */}
      <div className="arch-desktop-view">
        <svg
          viewBox="0 0 680 390"
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
            <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="4"
                floodColor="var(--accent)"
                floodOpacity="0.15"
              />
            </filter>
          </defs>

          {/* Tier Label Guides */}
          <g className="arch-tier-guides" opacity="0.4">
            <text x="40" y="24" className="arch-tier-text mono">
              {t.ingestionTier[locale].toUpperCase()}
            </text>
            <text x="140" y="144" className="arch-tier-text mono">
              {t.persistenceTier[locale].toUpperCase()}
            </text>
            <text x="40" y="264" className="arch-tier-text mono">
              {t.asyncTier[locale].toUpperCase()}
            </text>
          </g>

          {/* Dynamic Connector Paths */}
          <g className="arch-connector-paths">
            {/* Tier 1: Client -> API Gateway */}
            <path
              d="M 175 66 L 255 66"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            {/* Tier 1: API Gateway -> Auth */}
            <path
              d="M 395 66 L 475 66"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Tier 1 to Tier 2: API Gateway -> Cache */}
            <path
              d="M 305 97 C 305 130, 215 125, 215 152"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            {/* Tier 1 to Tier 2: API Gateway -> Database */}
            <path
              d="M 355 97 C 355 130, 465 125, 465 152"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Tier 2: Cache <-> Database */}
            <path
              d="M 285 186 L 390 186"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Tier 2 to Tier 3: Database -> Queue */}
            <path
              d="M 465 217 C 465 252, 110 248, 110 272"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />

            {/* Tier 3: Queue -> Worker */}
            <path
              d="M 175 306 L 255 306"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
            {/* Tier 3: Worker -> Observability */}
            <path
              d="M 395 306 L 475 306"
              className="arch-path"
              markerEnd={`url(#${arrowMarkerId})`}
            />
          </g>

          {/* 8 Explicit Architecture Nodes in SVG */}
          {[
            { id: "client", x: 40, y: 36, w: 135, h: 60, type: "client" as const, node: nodes[0] },
            { id: "api", x: 260, y: 36, w: 135, h: 60, type: "api" as const, node: nodes[1] },
            { id: "auth", x: 480, y: 36, w: 135, h: 60, type: "service" as const, node: nodes[2] },
            { id: "cache", x: 145, y: 156, w: 140, h: 60, type: "cache" as const, node: nodes[3] },
            {
              id: "database",
              x: 395,
              y: 156,
              w: 140,
              h: 60,
              type: "database" as const,
              node: nodes[4],
            },
            { id: "queue", x: 40, y: 276, w: 135, h: 60, type: "queue" as const, node: nodes[5] },
            {
              id: "worker",
              x: 260,
              y: 276,
              w: 135,
              h: 60,
              type: "worker" as const,
              node: nodes[6],
            },
            {
              id: "logs",
              x: 480,
              y: 276,
              w: 135,
              h: 60,
              type: "observability" as const,
              node: nodes[7],
            },
          ].map(({ id, x, y, w, h, type, node }) => {
            const isNodeActive = activeHover === id;
            const labelText = node ? node.label : id;

            return (
              <g
                key={id}
                className={`arch-svg-node node-${type} ${isNodeActive ? "is-active" : ""}`}
                onMouseEnter={() => setHoveredNode(id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => onNodeClick?.(id)}
                role="button"
                tabIndex={0}
                aria-label={`${labelText} (${type})`}
                filter={isNodeActive ? `url(#${idPrefix}-glow)` : undefined}
                style={{ cursor: "pointer" }}
              >
                <rect x={x} y={y} width={w} height={h} rx="10" ry="10" className="arch-svg-rect" />
                <circle cx={x + 16} cy={y + 19} r="4" className="arch-svg-dot" />
                <text x={x + 28} y={y + 23} className="arch-svg-type mono">
                  {type.toUpperCase()}
                </text>
                <text x={x + 16} y={y + 44} className="arch-svg-label">
                  {labelText}
                </text>
                <title>{`${labelText} — ${node?.description || type}`}</title>
              </g>
            );
          })}
        </svg>
      </div>

      {/* MOBILE REFLOWED HIERARCHY (< 768px): Strategy B Vertical Sequence */}
      <div className="arch-mobile-view" role="list">
        {[
          { title: t.ingestionTier[locale], items: nodes.slice(0, 3) },
          { title: t.persistenceTier[locale], items: nodes.slice(3, 5) },
          { title: t.asyncTier[locale], items: nodes.slice(5, 8) },
        ].map((tierGroup, groupIdx) => (
          <div key={tierGroup.title} className="arch-mobile-tier">
            <span className="arch-mobile-tier-title mono">{tierGroup.title}</span>
            <div className="arch-mobile-tier-nodes">
              {tierGroup.items.map((node, nodeIdx) => {
                const isActive = activeHover === node.id;
                const isLastInTier = nodeIdx === tierGroup.items.length - 1;
                const isLastInAll = groupIdx === 2 && isLastInTier;

                return (
                  <div key={node.id} className="arch-mobile-node-wrap" role="listitem">
                    <div
                      className={`arch-mobile-card node-${node.type} ${isActive ? "is-active" : ""}`}
                      onClick={() => onNodeClick?.(node.id)}
                      onKeyDown={(e) => handleKeyDown(e, node.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${node.label} (${node.type})`}
                    >
                      <div className="arch-mobile-card-inner">
                        <span className="arch-mobile-indicator">
                          <span className={`arch-dot ${isActive ? "is-active" : ""}`} />
                        </span>
                        <div className="arch-mobile-card-text">
                          <span className={`arch-type-tag tag-${node.type} mono`}>
                            {node.type.toUpperCase()}
                          </span>
                          <h4 className="arch-mobile-label">{node.label}</h4>
                        </div>
                      </div>
                    </div>
                    {!isLastInAll && (
                      <div className="arch-mobile-down-arrow" aria-hidden="true">
                        ↓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Legend & Status */}
      <div className="architecture-legend">
        <span>
          <i className="arch-dot is-live" /> {t.requestFlow[locale]}
        </span>
        <span>{t.illustrativeSystem[locale]}</span>
      </div>
    </div>
  );
}
