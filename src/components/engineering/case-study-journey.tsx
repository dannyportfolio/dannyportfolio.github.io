"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { useLocale } from "@/context/locale-context";
import { SystemArchitecture, type ArchitectureNode } from "./system-architecture";

function getNodeType(id: string): ArchitectureNode["type"] {
  if (
    id.includes("client") ||
    id.includes("discovery") ||
    id.includes("intake") ||
    id.includes("brand") ||
    id.includes("search")
  ) {
    return "client";
  }
  if (
    id.includes("api") ||
    id.includes("quote") ||
    id.includes("spec") ||
    id.includes("fsm") ||
    id.includes("state")
  ) {
    return "api";
  }
  if (
    id.includes("idempotency") ||
    id.includes("auth") ||
    id.includes("rbac") ||
    id.includes("gateway")
  ) {
    return "service";
  }
  if (id.includes("cache") || id.includes("lead")) {
    return "cache";
  }
  if (
    id.includes("database") ||
    id.includes("ledger") ||
    id.includes("storage") ||
    id.includes("order")
  ) {
    return "database";
  }
  if (id.includes("queue") || id.includes("procurement") || id.includes("webhook")) {
    return "queue";
  }
  if (id.includes("worker") || id.includes("production") || id.includes("tracking")) {
    return "worker";
  }
  return "observability";
}

export function CaseStudyJourney({ project }: { project: Project }) {
  const { locale } = useLocale();
  const steps = useMemo(() => project.architectureSteps || [], [project.architectureSteps]);
  const [active, setActive] = useState(steps[0]?.id || "");

  const projectNodes: ArchitectureNode[] = useMemo(
    () =>
      steps.map((step) => ({
        id: step.id,
        label: step.label[locale],
        type: getNodeType(step.id),
      })),
    [steps, locale],
  );

  useEffect(() => {
    if (steps.length === 0) return;
    const elements = steps
      .map((item) => document.getElementById(`journey-${item.id}`))
      .filter((item): item is HTMLElement => Boolean(item));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(visible.target.id.replace("journey-", ""));
        }
      },
      {
        rootMargin: "-35% 0px -40% 0px",
        threshold: [0.2, 0.5, 0.8],
      },
    );

    elements.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [steps]);

  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="case-journey">
      <div className="case-journey-visual">
        <SystemArchitecture
          nodes={projectNodes}
          activeNode={active || steps[0]?.id}
          variant="journey"
          onNodeClick={(id) => {
            setActive(id);
            const el = document.getElementById(`journey-${id}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }}
        />
      </div>

      <div className="case-journey-steps">
        {steps.map((item, index) => (
          <article
            key={item.id}
            id={`journey-${item.id}`}
            className={active === item.id ? "is-active" : ""}
          >
            <span className="mono">
              {locale === "en" ? "STAGE" : "TAHAP"} {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{item.label[locale]}</h3>
            <p>{item.description[locale]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
