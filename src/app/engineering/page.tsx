import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { Badge } from "@/components/ui/badge";
import { engineeringArticles } from "@/data/engineering";
import { principles } from "@/data/skills";

export const metadata = {
  title: "Engineering",
  description: "Engineering principles for production-ready backend systems.",
};

export default function EngineeringPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Engineering notes</p>
          <h1>
            Clarity for systems
            <br />
            <em>under real load.</em>
          </h1>
          <p>
            Practical principles for dependable software, without overstating unverified experience.
          </p>
        </div>
      </section>
      <section className="section tint">
        <div className="container">
          <SectionHeading eyebrow="Principles" title="How I think about production systems." />
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <article key={principle}>
                <span className="mono">0{index + 1}</span>
                <h3>{principle}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Article library" title="Practical backend topics." />
          <div className="article-grid">
            {engineeringArticles.map((article) => (
              <article key={article.slug} className="article-card">
                <p className="mono">/{article.slug}</p>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <div className="badge-row">
                  {article.topics.map((topic) => (
                    <Badge key={topic}>{topic}</Badge>
                  ))}
                </div>
                <span className="muted">Engineering note</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
