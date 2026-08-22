import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PerformanceVisualization() {
  return (
    <section className="performance-section">
      <div className="container performance-layout">
        <div>
          <p className="eyebrow">Performance thinking</p>
          <h2>
            Performance is not a feature. <em>It is architecture.</em>
          </h2>
          <p>
            Start with the request path, measurements, data access, and response shape — then make
            an intentional improvement.
          </p>
        </div>
        <div className="latency-story" aria-label="Illustrative latency improvement sequence">
          <ScrollReveal>
            <div className="latency-step">
              <span>Request</span>
              <strong>300ms</strong>
              <small>Illustrative example</small>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="latency-line">
              <span>measure → optimise</span>
            </div>
            <div className="latency-step">
              <span>Projection</span>
              <strong>120ms</strong>
              <small>Illustrative example</small>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="latency-line">
              <span>cache intentionally</span>
            </div>
            <div className="latency-step accent">
              <span>Cache</span>
              <strong>35ms</strong>
              <small>Illustrative example</small>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
