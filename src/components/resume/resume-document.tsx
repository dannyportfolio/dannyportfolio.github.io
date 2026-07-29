import { education, certifications } from "@/data/education";
import { experiences } from "@/data/experience";
import { profile, targetRoles, type TargetRole } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillsForRole } from "@/data/skills";

export function ResumeDocument({ role, detailed = false }: { role: TargetRole; detailed?: boolean }) {
  const target = targetRoles[role];
  const selectedProjects = projects.slice(0, detailed ? projects.length : 3);
  return <article className={`resume-document ${detailed ? "resume-detailed" : ""}`}>
    <header className="resume-header"><div><h1>{profile.name}</h1><p className="resume-title">{target.label} <span>|</span> {target.subtitle}</p></div></header>
    <ResumeSection title="Professional Summary"><p>{target.summary}</p></ResumeSection>
    <ResumeSection title="Technical Skills"><div className="resume-skills">{skillsForRole(role).map((skill) => <span key={skill}>{skill}</span>)}</div></ResumeSection>
    {experiences.length > 0 && <ResumeSection title="Professional Experience"><div className="resume-stack">{experiences.map((item) => <div key={`${item.company}-${item.position}`} className="resume-item"><div className="resume-item-title"><strong>{item.position}</strong><span>{item.period}</span></div><p className="resume-meta">{item.company} · {item.employmentType} · {item.location}</p><ul>{item.responsibilities.concat(item.contributions).map((point) => <li key={point}>{point}</li>)}</ul><p className="resume-tech">{item.technologies.join(" · ")}</p></div>)}</div></ResumeSection>}
    <ResumeSection title="Selected Projects"><div className="resume-stack">{selectedProjects.map((project) => <div key={project.slug} className="resume-item"><div className="resume-item-title"><strong>{project.name}</strong><span>{project.domain}</span></div><p>{project.summary}</p>{detailed && <><p><b>System focus:</b> {project.highlights.join(" · ")}</p><p><b>Engineering contribution:</b> {project.contributions.join(" ")}</p><p><b>Reliability / performance:</b> {project.reliability}</p></>}</div>)}</div></ResumeSection>
    {education.length > 0 && <ResumeSection title="Education">{education.map((item) => <div className="resume-item" key={item.institution}><div className="resume-item-title"><strong>{item.credential}</strong><span>{item.period}</span></div><p>{item.institution}{item.details ? ` · ${item.details}` : ""}</p></div>)}</ResumeSection>}
    {certifications.length > 0 && <ResumeSection title="Certifications">{certifications.map((item) => <p key={item.name}>{item.name} · {item.issuer}{item.year ? ` · ${item.year}` : ""}</p>)}</ResumeSection>}
    <ResumeSection title="Additional Information"><p><b>Work preference:</b> {profile.availability}</p><p><b>Relocation:</b> {profile.relocation}</p></ResumeSection>
  </article>;
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="resume-section"><h2>{title}</h2>{children}</section>; }
