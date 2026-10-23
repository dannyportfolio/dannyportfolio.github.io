import { education, certifications, type Education } from "@/data/education";
import { experiences, type Experience } from "@/data/experience";
import { profile, targetRoles, type TargetRole } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { skillsForRole } from "@/data/skills";
import { translations, type Locale } from "@/data/translations";

export function ResumeDocument({
  role,
  detailed = false,
  locale = "en",
}: {
  role: TargetRole;
  detailed?: boolean;
  locale?: Locale;
}) {
  const target = targetRoles[role];
  const t = translations.resume;
  const lang = locale;
  const selectedProjects = projects.slice(0, detailed ? projects.length : 3);

  return (
    <article className={`resume-document ${detailed ? "resume-detailed" : ""}`}>
      <header className="resume-header">
        <div>
          <h1>{profile.name}</h1>
          <p className="resume-title">
            {target.label[lang]} <span>|</span> {target.subtitle[lang]}
          </p>
        </div>
        <address className="resume-contact">
          {profile.email && (
            <div>
              <a href={`mailto:${profile.email}`} className="resume-contact-link">
                {profile.email}
              </a>
            </div>
          )}
          {profile.location && <div>{profile.location}</div>}
          {profile.portfolioUrl && (
            <div>
              <a
                href={profile.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-contact-link"
              >
                {profile.portfolioUrl.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {profile.github && (
            <div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-contact-link"
              >
                github.com/{profile.github.replace(/^https?:\/\/github\.com\//, "")}
              </a>
            </div>
          )}
          {profile.linkedin && (
            <div>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-contact-link"
              >
                {profile.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </div>
          )}
        </address>
      </header>

      <ResumeSection title={t.summary[lang]}>
        <p>{target.summary[lang]}</p>
      </ResumeSection>

      <ResumeSection title={t.skills[lang]}>
        <SkillList skills={skillsForRole(role)} />
      </ResumeSection>

      {experiences.length > 0 && (
        <ResumeSection title={t.experience[lang]}>
          <div className="resume-stack">
            {experiences.map((item) => (
              <ExperienceItem key={`${item.company}-${item.position}`} item={item} />
            ))}
          </div>
        </ResumeSection>
      )}

      <ResumeSection title={t.projects[lang]}>
        <div className="resume-stack">
          {selectedProjects.map((project) => (
            <ProjectItem key={project.slug} project={project} detailed={detailed} locale={lang} />
          ))}
        </div>
      </ResumeSection>

      {education.length > 0 ? (
        <ResumeSection title={t.education[lang]}>
          <div className="resume-stack">
            {education.map((item) => (
              <EducationItem key={item.institution} item={item} />
            ))}
          </div>
        </ResumeSection>
      ) : (
        <ResumeSection title={t.education[lang]}>
          <p className="resume-empty-note">{t.noEducationYet[lang]}</p>
        </ResumeSection>
      )}

      {certifications.length > 0 ? (
        <ResumeSection title={t.certifications[lang]}>
          {certifications.map((item) => (
            <p key={item.name}>
              {item.name} · {item.issuer}
              {item.year ? ` · ${item.year}` : ""}
            </p>
          ))}
        </ResumeSection>
      ) : (
        <ResumeSection title={t.certifications[lang]}>
          <p className="resume-empty-note">{t.noCertificationsYet[lang]}</p>
        </ResumeSection>
      )}

      <ResumeSection title={t.additional[lang]}>
        <p>
          <b>{t.workPreference[lang]}</b> {profile.availability[lang]}
        </p>
        <p>
          <b>{t.relocation[lang]}</b> {profile.relocation[lang]}
        </p>
      </ResumeSection>
    </article>
  );
}

function SkillList({ skills }: { skills: string[] }) {
  return (
    <div className="resume-skills">
      {skills.map((skill) => (
        <span key={skill}>{skill}</span>
      ))}
    </div>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  return (
    <div className="resume-item">
      <div className="resume-item-title">
        <strong>{item.position}</strong>
        <span>{item.period}</span>
      </div>
      <p className="resume-meta">
        {item.company} · {item.employmentType} · {item.location}
      </p>
      <ul>
        {item.responsibilities.concat(item.contributions).map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="resume-tech">{item.technologies.join(" · ")}</p>
    </div>
  );
}

function ProjectItem({
  project,
  detailed,
  locale = "en",
}: {
  project: Project;
  detailed: boolean;
  locale?: Locale;
}) {
  const t = translations.resume;
  return (
    <div className="resume-item">
      <div className="resume-item-title">
        <strong>{project.name}</strong>
        <span>
          {project.technologies.length > 0 ? project.technologies.join(" · ") : project.domain}
        </span>
      </div>
      <p>{project.summary[locale]}</p>
      {detailed && (
        <>
          <p>
            <b>{t.architecture[locale]}</b> {project.architecture[locale]}
          </p>
          <p>
            <b>{t.backendResponsibility[locale]}</b> {project.contributions[locale].join(" ")}
          </p>
          <p>
            <b>{t.reliabilityPerformance[locale]}</b> {project.reliability[locale]}
          </p>
        </>
      )}
    </div>
  );
}

function EducationItem({ item }: { item: Education }) {
  return (
    <div className="resume-item">
      <div className="resume-item-title">
        <strong>{item.credential}</strong>
        <span>{item.period}</span>
      </div>
      <p>
        {item.institution}
        {item.details ? ` · ${item.details}` : ""}
      </p>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
