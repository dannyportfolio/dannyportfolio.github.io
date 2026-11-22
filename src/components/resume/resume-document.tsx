import type { ResumeModel } from "@/lib/resume/build-resume";

/**
 * Single-column, ATS-parseable resume document rendered identically on screen and in print.
 * Empty optional sections (such as Education when unverified) are omitted rather than printed as placeholders.
 */
export function ResumeDocument({
  model,
  standalone = false,
}: {
  model: ResumeModel;
  standalone?: boolean;
}) {
  const NameHeading = standalone ? "h1" : "h2";
  const SectionHeading = standalone ? "h2" : "h3";
  const ItemHeading = standalone ? "h3" : "h4";

  return (
    <article
      className={`resume-document ${model.detailed ? "resume-detailed" : ""}`}
      aria-label={`${model.name} Resume`}
    >
      <header className="resume-header">
        <NameHeading className="resume-doc-name">{model.name}</NameHeading>
        <p className="resume-title">{model.headline}</p>
        <address className="resume-contact">
          {model.contact.map((item, index) => (
            <span key={`${item.label}-${item.value}`} className="resume-contact-item">
              {index > 0 && (
                <span className="resume-contact-sep" aria-hidden="true">
                  {" | "}
                </span>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="resume-contact-link"
                >
                  {item.value}
                </a>
              ) : (
                <span>{item.value}</span>
              )}
            </span>
          ))}
        </address>
      </header>

      <section className="resume-section">
        <SectionHeading className="resume-section-heading">Professional Summary</SectionHeading>
        <p className="resume-summary-text">{model.summary}</p>
      </section>

      <section className="resume-section">
        <SectionHeading className="resume-section-heading">Technical Skills</SectionHeading>
        <ul className="resume-skill-list">
          {model.skillCategories.map((category) => (
            <li key={category.id} className="resume-skill-row">
              <strong>{category.label}: </strong>
              <span>{category.skills.join(", ")}</span>
            </li>
          ))}
        </ul>
      </section>

      {model.experience.length > 0 && (
        <section className="resume-section">
          <SectionHeading className="resume-section-heading">
            Professional Experience
          </SectionHeading>
          <div className="resume-stack">
            {model.experience.map((exp) => (
              <div key={exp.id} className="resume-item resume-experience-item">
                <div className="resume-item-head">
                  <div className="resume-item-primary">
                    <ItemHeading className="resume-item-title-text">{exp.title}</ItemHeading>
                    <span className="resume-item-org">
                      {" | "}
                      {exp.organization} ({exp.location})
                    </span>
                  </div>
                  <span className="resume-item-period">{exp.period}</span>
                </div>
                <ul className="resume-bullets">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {model.projects.length > 0 && (
        <section className="resume-section">
          <SectionHeading className="resume-section-heading">Selected Projects</SectionHeading>
          <div className="resume-stack">
            {model.projects.map((project) => (
              <div key={project.slug} className="resume-item resume-project-item">
                <div className="resume-item-head">
                  <div className="resume-item-primary">
                    <ItemHeading className="resume-item-title-text">{project.title}</ItemHeading>
                    <span className="resume-item-org">
                      {" - "}
                      {project.subtitle}
                    </span>
                  </div>
                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-item-link"
                    >
                      {project.link.label}
                    </a>
                  )}
                </div>
                <p className="resume-project-stack">
                  {project.context && (
                    <>
                      <strong>Context: </strong>
                      {project.context}
                      {" | "}
                    </>
                  )}
                  <strong>Stack: </strong>
                  {project.stack.join(", ")}
                </p>
                <ul className="resume-bullets">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {project.architecture && (
                  <p className="resume-project-arch">
                    <strong>Architecture: </strong>
                    {project.architecture}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {model.education.length > 0 && (
        <section className="resume-section">
          <SectionHeading className="resume-section-heading">Education</SectionHeading>
          <div className="resume-stack">
            {model.education.map((item) => (
              <div key={`${item.institution}-${item.credential}`} className="resume-item">
                <div className="resume-item-head">
                  <div className="resume-item-primary">
                    <ItemHeading className="resume-item-title-text">{item.credential}</ItemHeading>
                    <span className="resume-item-org">
                      {" | "}
                      {item.institution}
                    </span>
                  </div>
                  <span className="resume-item-period">{item.period}</span>
                </div>
                {item.details && <p className="resume-meta-line">{item.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {model.certifications.length > 0 && (
        <section className="resume-section">
          <SectionHeading className="resume-section-heading">Certifications</SectionHeading>
          <div className="resume-stack resume-stack--compact">
            {model.certifications.map((cert) => (
              <div key={cert.name} className="resume-item resume-cert-item">
                <div className="resume-item-head">
                  <div className="resume-item-primary">
                    <strong className="resume-cert-name">{cert.name}</strong>
                    <span className="resume-item-org">
                      {" | "}
                      {cert.issuer}
                      {cert.year ? ` (${cert.year})` : ""}
                    </span>
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-item-link"
                    >
                      {cert.url.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {model.additional.length > 0 && (
        <section className="resume-section">
          <SectionHeading className="resume-section-heading">Additional Information</SectionHeading>
          <ul className="resume-additional-list">
            {model.additional.map((item) => (
              <li key={item.label}>
                <strong>{item.label}: </strong>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
