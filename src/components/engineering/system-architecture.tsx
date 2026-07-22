import type { CSSProperties } from "react";

export type ArchitectureNode = {
  id: string;
  label: string;
  type: "client" | "api" | "service" | "cache" | "database" | "queue" | "worker" | "observability";
};

const defaultNodes: ArchitectureNode[] = [
  { id: "client", label: "Client", type: "client" },
  { id: "api", label: "API", type: "api" },
  { id: "auth", label: "Auth", type: "service" },
  { id: "cache", label: "Cache", type: "cache" },
  { id: "database", label: "Database", type: "database" },
  { id: "queue", label: "Queue", type: "queue" },
  { id: "worker", label: "Worker", type: "worker" },
  { id: "logs", label: "Logs", type: "observability" },
];

export function SystemArchitecture({ nodes = defaultNodes, activeNode, compact = false }: { nodes?: ArchitectureNode[]; activeNode?: string; compact?: boolean }) {
  return <div className={`system-architecture ${compact ? "is-compact" : ""}`} role="img" aria-label="Illustrative backend system architecture"><svg viewBox="0 0 640 390" aria-hidden="true" focusable="false"><path className="architecture-path" d="M118 80H224M318 80H420M270 118V182M467 118V182M270 220V285M467 220V285M318 80L467 182M467 220L570 285" /></svg><div className="architecture-nodes">{nodes.map((node, index) => <div key={node.id} className={`architecture-node node-${node.type} ${activeNode === node.id ? "is-active" : ""}`} style={{ "--node-index": index } as CSSProperties}><span>{node.label}</span><i /></div>)}</div><div className="architecture-legend"><span><i /> request flow</span><span>Illustrative system</span></div></div>;
}
