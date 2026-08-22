import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function DatabaseFlow() {
  return (
    <section className="database-section">
      <div className="container database-layout">
        <div className="database-copy">
          <p className="eyebrow">Data performance</p>
          <h2>
            Data is where
            <br />
            <em>performance begins.</em>
          </h2>
          <p>
            Model access patterns deliberately. The query you select, the index you maintain, and
            the response you return are product decisions as much as technical ones.
          </p>
        </div>
        <div className="database-visual">
          <ScrollReveal>
            <div className="query-card muted-query">
              <span className="mono">inefficient shape</span>
              <code>
                SELECT *<br />
                FROM providers
              </code>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={110}>
            <div className="query-arrow">↓ projection &amp; index</div>
            <div className="query-card">
              <span className="mono">intentional shape</span>
              <code>
                SELECT id, name, status
                <br />
                FROM providers
                <br />
                WHERE status = $1
              </code>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={210}>
            <div className="database-tags">
              <span>Query plan</span>
              <span>Index</span>
              <span>Cache boundary</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
