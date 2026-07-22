export type Project = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  challenge: string;
  architecture: string;
  technologies: string[];
  contributions: string[];
  reliability: string;
  implementation: string[];
  github?: string;
  liveUrl?: string;
  caseStudy: boolean;
};

const todo = "TODO: add verified project detail.";

export const projects: Project[] = [
  { slug: "gegarap-id", name: "gegarap.id", summary: "Project profile ready for Danny to document its product and engineering story.", problem: todo, challenge: todo, architecture: todo, technologies: ["TODO: add technologies"], contributions: [todo], reliability: todo, implementation: [todo], caseStudy: true },
  { slug: "tetuku", name: "Tetuku", summary: "Project profile ready for a verified backend and product description.", problem: todo, challenge: todo, architecture: todo, technologies: ["TODO: add technologies"], contributions: [todo], reliability: todo, implementation: [todo], caseStudy: true },
  { slug: "lelungo", name: "Lelungo", summary: "Project profile ready for an architecture and delivery case study.", problem: todo, challenge: todo, architecture: todo, technologies: ["TODO: add technologies"], contributions: [todo], reliability: todo, implementation: [todo], caseStudy: true },
  { slug: "ternakscan", name: "TernakScan", summary: "Project profile ready for its validated technical scope and contribution.", problem: todo, challenge: todo, architecture: todo, technologies: ["TODO: add technologies"], contributions: [todo], reliability: todo, implementation: [todo], caseStudy: true },
  { slug: "ai-trading-assistant", name: "AI Trading Assistant", summary: "Project profile ready for a carefully scoped engineering case study.", problem: todo, challenge: todo, architecture: todo, technologies: ["TODO: add technologies"], contributions: [todo], reliability: todo, implementation: [todo], caseStudy: true },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
