export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  metrics: { label: string; value: string; detail: string }[];
  highlights: string[];
  techStack: string[];
  nodeColor: string;
  statusTag: string;
  isLatest?: boolean;
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "applied-systems-senior",
    company: "Applied Systems",
    role: "Senior Software Engineer & Tech Lead",
    period: "Feb 2025 – Present",
    location: "Remote",
    summary:
      "Directing zero-to-one product delivery and frontend modernization for the enterprise Benefits platform in the Applied Systems ecosystem.",
    metrics: [
      { label: "Target Adoption", value: "45%", detail: "Achieved early milestone with React UI migration" },
      { label: "Sprint Velocity", value: "+20%", detail: "Boosted via OpenAPI client generation & TanStack Query" },
      { label: "Team Leadership", value: "4 SWEs", detail: "Guided cross-functional engineers & sprint backlog" },
    ],
    highlights: [
      "Secured unanimous leadership approval for 3-Phase Frontend Modernization Strategy to React 18 & TanStack Query, stabilizing core workflows and eliminating bugs.",
      "Designed and shipped complex full-stack features using Go/gRPC (ben-services) and React (ben-ui), including Endorse/Revise Plan Actions and multi-term Accounting.",
      "Managed cross-team dependencies and aligned resources across departments for Autofill mapping infrastructure, drastically reducing manual data entry for users.",
      "Conducted 14-day Datadog error analysis in production-us and authored comprehensive DevOps Improvement Report to establish proactive alerting standards.",
      "Optimized engineering predictability and sprint throughput by authoring a formal process proposal and transitioning team from Scrum to Scrumban.",
    ],
    techStack: ["Golang", "gRPC", "React 18", "TanStack Query", "Datadog", "TypeScript", "Microservices", "Docker", "Kubernetes"],
    nodeColor: "#00f0ff",
    statusTag: "SYSTEM ACTIVE",
    isLatest: true,
  },
  {
    id: "applied-systems-swe",
    company: "Applied Systems",
    role: "Software Engineer (Foundational Tech Lead)",
    period: "May 2024 – Feb 2025",
    location: "Remote",
    summary:
      "Acted as the foundational technical leader for a newly formed engineering team, spearheading zero-to-one architecture for the Benefits platform.",
    metrics: [
      { label: "Concurrency", value: "Soft Lock", detail: "Engineered /v1/lock API preventing edit collisions" },
      { label: "Zero-to-One", value: "100%", detail: "Built foundational architecture and CI/CD pipelines" },
      { label: "Security", value: "RBAC", detail: "Implemented Agency/Branch/Dept Structure Permissions" },
    ],
    highlights: [
      "Engineered the optimistic Soft Locking API (/v1/lock) in Golang to prevent concurrent edit conflicts across active enterprise users.",
      "Drove architectural integration of the Epic SDK data layer into the Benefits platform, standardizing backend data access patterns.",
      "Spearheaded Apigee proxy integration across the stack, authoring automated OpenAPI generation workflows and developer testing guides.",
      "Established core team culture, CI/CD pipelines, E2E testing strategies, and modern mocking patterns to ensure scalable delivery.",
    ],
    techStack: ["Golang", "Apigee", "Epic SDK", "OpenAPI", "Docker", "GitLab CI", "React", "Jest", "Cypress"],
    nodeColor: "#38bdf8",
    statusTag: "COMPLETE",
  },
  {
    id: "index-exchange-swe2",
    company: "Index Exchange",
    role: "Software Engineer 2",
    period: "Mar 2021 – Feb 2023",
    location: "Toronto, ON",
    summary:
      "Architected high-throughput ad marketplace targeting systems and led high-impact performance optimization task force.",
    metrics: [
      { label: "Page Load", value: "14s → 0.5s", detail: "96% speedup via Golang server-side pagination" },
      { label: "Ad Revenue", value: "+20%", detail: "Delivered granular audience deal targeting system" },
      { label: "API Latency", value: "-30%", detail: "Optimized microservices via Helm, K8s, ArgoCD" },
    ],
    highlights: [
      "Created audience deal targeting system connecting publishers and buyers, generating a direct 20% increase in marketplace ad revenue.",
      "Slashed page load times from 14s to 0.5s by engineering high-performance server-side pagination in Golang with query indexing.",
      "Championed company-wide adoption of Delve debugger in Golang, drastically improving team debugging velocity and root-cause analysis.",
      "Generated automated Go modules and NPM client packages under OpenAPI / Swagger specifications for cross-team integration.",
      "Mentored and onboarded 4+ engineers and co-op students, accelerating team ramp-up and domain knowledge sharing.",
    ],
    techStack: ["Golang", "Kubernetes", "Helm", "ArgoCD", "Delve", "Swagger", "Docker", "Microservices", "MySQL"],
    nodeColor: "#f000ff",
    statusTag: "COMPLETE",
  },
  {
    id: "index-exchange-swe1",
    company: "Index Exchange",
    role: "Software Engineer",
    period: "Sep 2019 – Mar 2021",
    location: "Toronto, ON",
    summary:
      "Modernized legacy deal creation workflows and designed modular UI component systems with real-time data streaming.",
    metrics: [
      { label: "Feature Flags", value: "100%", detail: "Targeted releases to specific user cohorts" },
      { label: "Deal Time", value: "-45%", detail: "Streamlined workflow via Angular & RxJS" },
      { label: "Reusability", value: "High", detail: "Built shared Angular CDK view/edit components" },
    ],
    highlights: [
      "Migrated legacy deal creation UI to Angular + Golang stack utilizing RxJS observables for real-time data updates.",
      "Engineered flexible feature flag system enabling targeted feature rollouts to specific enterprise buyer cohorts.",
      "Built custom Angular Material & CDK components handling dynamic view/edit modes with rich animations, adopted across multiple projects.",
    ],
    techStack: ["Angular", "RxJS", "Golang", "TypeScript", "Angular Material", "REST APIs", "Jest"],
    nodeColor: "#a855f7",
    statusTag: "COMPLETE",
  },
  {
    id: "index-exchange-solutions",
    company: "Index Exchange",
    role: "Solutions Engineer",
    period: "Jul 2018 – Sep 2019",
    location: "Toronto, ON",
    summary:
      "Developed automation deployment tools and managed mission-critical technical troubleshooting for top-tier enterprise partners.",
    metrics: [
      { label: "Deploy Time", value: "-90%", detail: "Automated JS deployment tool via Node.js" },
      { label: "Compliance", value: "100%", detail: "GDPR & CCPA client data privacy consent" },
      { label: "Key Clients", value: "Tier 1", detail: "Bloomberg, Microsoft, eBay, etc." },
    ],
    highlights: [
      "Built automated Node.js mass-deployment utility for production JavaScript tag releases, reducing deployment time by over 90%.",
      "Delivered technical solutions and troubleshooting for marquee enterprise accounts including Bloomberg, Microsoft, and eBay.",
      "Ensured 100% compliance with GDPR and CCPA regulations through privacy control architectures and client consent management.",
    ],
    techStack: ["Node.js", "JavaScript", "GDPR/CCPA", "HTTP/Web APIs", "Client Integrations"],
    nodeColor: "#eab308",
    statusTag: "COMPLETE",
  },
  {
    id: "precise-parklink",
    company: "Precise Parklink",
    role: "Full Stack Developer",
    period: "Sep 2016 – Jul 2018",
    location: "Toronto, ON",
    summary:
      "Engineered mission-critical physical hardware integrations, EMV payment terminal rollouts, and license plate recognition notification systems.",
    metrics: [
      { label: "Payments", value: "EMV Rollout", detail: "Moneris Hosted Vault & terminal integration" },
      { label: "Systems", value: "Hospital Passes", detail: "Automated pay station dispenser software" },
      { label: "Stack", value: "C# / .NET", detail: "High-reliability hardware integration" },
    ],
    highlights: [
      "Modernized payment infrastructure for physical parking equipment, integrating Moneris API with Skidata Parking Systems.",
      "Engineered automated license plate detection web application providing instant email alert triggers upon vehicle entry/exit.",
      "Developed dynamic registration portal with Moneris hosted vault page, allowing customized payment options for municipal clients.",
    ],
    techStack: ["C#", ".NET Framework", "MS SQL", "Moneris API", "Skidata", "JavaScript"],
    nodeColor: "#22c55e",
    statusTag: "COMPLETE",
  },
];
