"use client";

import { useEffect, useState } from "react";
import { SystemArchitecture } from "./system-architecture";

const journey = [
  {
    id: "client",
    label: "Client → API",
    description:
      "A clear contract begins at the boundary: validate intent, shape the response, and establish a traceable request.",
  },
  {
    id: "cache",
    label: "API → Cache",
    description:
      "Cache only the reads that benefit from it, with a clear invalidation and failure strategy.",
  },
  {
    id: "database",
    label: "Cache miss → Database",
    description:
      "Keep data access intentional: projection, indexes, query shape, and transaction boundaries matter.",
  },
  {
    id: "worker",
    label: "Queue → Worker",
    description:
      "Move resilient asynchronous work outside the request path with explicit retry and idempotency decisions.",
  },
  {
    id: "logs",
    label: "Observability",
    description:
      "Logs, metrics, and traces make a system explainable when it is operating under real conditions.",
  },
];

export function CaseStudyJourney() {
  const [active, setActive] = useState(journey[0].id);

  useEffect(() => {
    const sections = journey
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
        rootMargin: "-38% 0px -42% 0px",
        threshold: [0.2, 0.5, 0.8],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="case-journey">
      <div className="case-journey-visual">
        <SystemArchitecture activeNode={active} />
      </div>

      <div className="case-journey-steps">
        {journey.map((item, index) => (
          <article
            key={item.id}
            id={`journey-${item.id}`}
            className={active === item.id ? "is-active" : ""}
          >
            <span className="mono">STEP {String(index + 1).padStart(2, "0")}</span>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
