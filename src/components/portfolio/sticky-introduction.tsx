import { ScrollReveal } from "@/components/motion/scroll-reveal";

const topics = [
  "Backend Architecture",
  "API Design",
  "Database",
  "Caching",
  "Queues",
  "Infrastructure",
  "Observability",
];
export function StickyIntroduction() {
  return (
    <section id="about" className="sticky-introduction">
      <div className="container sticky-introduction-grid">
        <div className="sticky-introduction-title">
          <p className="eyebrow">01 / Introduction</p>
          <h2>
            I build software
            <br />
            behind <em>the interface.</em>
          </h2>
          <p>Reliable products are shaped by the systems people never see.</p>
        </div>
        <div className="introduction-topics">
          {topics.map((topic, index) => (
            <ScrollReveal key={topic} delay={index * 50} className="introduction-topic">
              <span className="mono">0{index + 1}</span>
              <h3>{topic}</h3>
              <i>↓</i>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
