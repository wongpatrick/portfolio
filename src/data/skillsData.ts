export interface SkillCategory {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  color: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  experienceYears: string;
  highlight: string;
  featured?: boolean;
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: "languages",
    name: "Core Languages",
    tagline: "High-performance backend systems, typed frontends, and engine scripting",
    iconName: "Code2",
    color: "#00f0ff",
    skills: [
      { name: "Golang", level: 95, experienceYears: "6+ yrs", highlight: "Microservices, gRPC, Gin, Delve, soft-locking APIs, high-throughput APIs", featured: true },
      { name: "TypeScript", level: 95, experienceYears: "7+ yrs", highlight: "Next.js, React 18/19, Angular, strict type architectures, full-stack contracts", featured: true },
      { name: "JavaScript", level: 95, experienceYears: "9+ yrs", highlight: "ESNext, Node.js automation, browser tag systems, event loops", featured: true },
      { name: "C# / .NET", level: 85, experienceYears: "4+ yrs", highlight: "Godot 4 game systems, state machines, Skidata hardware integrations, MS SQL", featured: true },
      { name: "Python", level: 80, experienceYears: "3+ yrs", highlight: "Local ONNX ML inference, WD14 vision taggers, automation scripts", featured: true },
      { name: "SQL", level: 90, experienceYears: "7+ yrs", highlight: "Query optimization, pagination, index strategies, relational modeling", featured: false },
      { name: "C / C++", level: 70, experienceYears: "Academic / Systems", highlight: "Medical physics computational simulations & fundamentals", featured: false },
    ],
  },
  {
    id: "frontend",
    name: "Frontend Architecture",
    tagline: "Predictable, accessible, and reactive user interfaces",
    iconName: "Layout",
    color: "#f000ff",
    skills: [
      { name: "React 18 / 19", level: 95, experienceYears: "6+ yrs", highlight: "Led 3-phase modernization, custom hooks, atomic components, performance tuning", featured: true },
      { name: "TanStack Query", level: 95, experienceYears: "3+ yrs", highlight: "Server state caching, optimistic updates, automated API client integration", featured: true },
      { name: "Next.js", level: 90, experienceYears: "4+ yrs", highlight: "App Router, SSR, edge routing, performance optimization", featured: true },
      { name: "Three.js / WebGL", level: 85, experienceYears: "2+ yrs", highlight: "3D scenes, shaders, raycasting, interactive camera controls", featured: true },
      { name: "Angular & RxJS", level: 90, experienceYears: "4+ yrs", highlight: "Reactive streams, custom CDK animation components, deal creation UI", featured: true },
      { name: "Tailwind CSS", level: 95, experienceYears: "5+ yrs", highlight: "Utility-first design systems, responsive HUDs, dark themes", featured: false },
      { name: "Framer Motion", level: 92, experienceYears: "4+ yrs", highlight: "Layout animations, scroll-linked transforms, gesture interactions", featured: false },
    ],
  },
  {
    id: "backend",
    name: "Distributed Systems & Backend",
    tagline: "Resilient microservices, optimistic concurrency, and high-load APIs",
    iconName: "Server",
    color: "#00ff66",
    skills: [
      { name: "gRPC & Protobuf", level: 90, experienceYears: "3+ yrs", highlight: "High-performance inter-service communication in Go", featured: true },
      { name: "RESTful & OpenAPI", level: 95, experienceYears: "8+ yrs", highlight: "Swagger code-gen, contract-first design, OpenAPI spec generation", featured: true },
      { name: "Optimistic Soft Locking", level: 95, experienceYears: "Production", highlight: "Engineered /v1/lock to eliminate multi-user edit collisions", featured: true },
      { name: "Microservices", level: 92, experienceYears: "6+ yrs", highlight: "Decoupled domain services, resilient inter-service networking", featured: true },
      { name: "Gin / Express / Node", level: 95, experienceYears: "7+ yrs", highlight: "Fast Go routing, Node deployment tools, middle-tier aggregation", featured: false },
      { name: "Databases (Postgres/MySQL)", level: 90, experienceYears: "8+ yrs", highlight: "PostgreSQL, MySQL, MariaDB, MongoDB, Redis caching layers", featured: false },
    ],
  },
  {
    id: "devops",
    name: "DevOps, SRE & Observability",
    tagline: "Continuous delivery, container orchestration, and proactive monitoring",
    iconName: "Terminal",
    color: "#ffb800",
    skills: [
      { name: "Kubernetes & Helm", level: 88, experienceYears: "4+ yrs", highlight: "Cluster deployments, Helm chart management, pod scaling", featured: true },
      { name: "ArgoCD & GitOps", level: 88, experienceYears: "3+ yrs", highlight: "Declarative continuous delivery and automated rollouts", featured: true },
      { name: "Docker & Containerization", level: 95, experienceYears: "6+ yrs", highlight: "Multi-stage builds, minimal runtime images, Tilt local workflows", featured: true },
      { name: "Datadog & APM", level: 92, experienceYears: "4+ yrs", highlight: "Authored 14-day DevOps error report, custom dashboards, APM tracing", featured: true },
      { name: "Apigee API Gateway", level: 88, experienceYears: "2+ yrs", highlight: "Enterprise API proxies, rate limiting, Structure Permissions RBAC", featured: false },
      { name: "CI/CD (GitLab, GitHub Actions)", level: 92, experienceYears: "6+ yrs", highlight: "Automated test matrix, linting, preview builds, release tagging", featured: false },
    ],
  },
  {
    id: "leadership",
    name: "Leadership & Engineering Culture",
    tagline: "Zero-to-one team scaling, process refinement, and developer empowerment",
    iconName: "Users",
    color: "#38bdf8",
    skills: [
      { name: "Zero-to-One Team Building", level: 95, experienceYears: "Leadership", highlight: "Formed engineering squads from ground up, establishing culture and ceremonies", featured: true },
      { name: "Technical Strategy & Roadmapping", level: 95, experienceYears: "Leadership", highlight: "Gained executive buy-in for 3-Phase React migration & architecture overhauls", featured: true },
      { name: "Mentorship & Developer Experience", level: 95, experienceYears: "7+ yrs", highlight: "Mentored juniors and co-ops, introduced Delve debugging and typed client tools", featured: true },
      { name: "Scrumban / Agile Optimization", level: 92, experienceYears: "Leadership", highlight: "Authored formal process proposal transitioning teams from Scrum to Scrumban", featured: true },
      { name: "Testing Strategy (TDD/E2E)", level: 92, experienceYears: "8+ yrs", highlight: "Jest, Cypress, React Testing Library, API contract tests, mock servers", featured: false },
    ],
  },
];
