export interface TraitMetric {
  name: string;
  score: number; // 0-100
  code: string;
  description: string;
}

export interface SystemProfile {
  callsign: string;
  realName: string;
  title: string;
  location: string;
  status: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string[];
  education: {
    degree: string;
    field: string;
    institution: string;
    year: string;
    location: string;
    crossoverNote: string;
  };
  traits: TraitMetric[];
  coreValues: { title: string; desc: string; icon: string }[];
}

export const SYSTEM_PROFILE: SystemProfile = {
  callsign: "WONG_OS // ROOT",
  realName: "Patrick Wong",
  title: "Senior Software Engineer & Tech Lead",
  location: "Toronto, ON",
  status: "ONLINE // READY TO DEPLOY",
  email: "wp.patrickwong@gmail.com",
  linkedin: "https://linkedin.com/in/pwong-softeng",
  github: "https://github.com/wongpatrick",
  bio: [
    "Experienced senior full-stack engineer and technical leader with a deep foundation in distributed systems, backend reliability, and reactive frontend architecture.",
    "Known as a 'professional button pusher' with a relentless drive to understand systems from the metal to the pixel. Proven track record of building cross-functional engineering teams from scratch, defining architectural roadmaps, and mentoring developers across all levels.",
    "Started with a Bachelor of Science in Medical Physics—bringing scientific rigor, mathematical modeling, and analytical debugging to high-throughput software architectures.",
  ],
  education: {
    degree: "Bachelor of Science",
    field: "Medical Physics",
    institution: "Toronto Metropolitan University",
    year: "2014",
    location: "Toronto, ON",
    crossoverNote:
      "Scientific foundation providing deep intuition for signal processing, numerical optimization, raycasting physics in Godot, and rigorous data analysis in distributed observability.",
  },
  traits: [
    { name: "Distributed Systems & Go", score: 96, code: "GO_ARCH", description: "Microservices, gRPC, soft-locking, high-concurrency data streaming" },
    { name: "Frontend Architecture", score: 94, code: "FE_MOD", description: "React 18/19, TanStack Query, state machines, component design systems" },
    { name: "Team Building & Leadership", score: 92, code: "ZERO_TO_ONE", description: "Zero-to-one squad building, Scrumban workflow, mentorship culture" },
    { name: "DevOps & SRE Observability", score: 90, code: "DATADOG_APM", description: "K8s, ArgoCD, Datadog 14-day telemetry analysis, automated CI/CD" },
    { name: "Game Engine & Mechanics", score: 86, code: "GODOT_C#", description: "Godot 4, C# state machines, ONNX local computer vision inference" },
    { name: "Performance Optimization", score: 98, code: "PERF_TUNING", description: "14s to 0.5s pagination re-architecting, query caching, load testing" },
  ],
  coreValues: [
    {
      title: "Pragmatic Architecture",
      desc: "Simplicity and predictability over hype. Build modular systems that your future team will thank you for.",
      icon: "Cpu",
    },
    {
      title: "Developer Empowerment",
      desc: "Great engineering cultures thrive on fast feedback loops, rich debugging tools (Delve/OpenAPI), and mentorship.",
      icon: "Shield",
    },
    {
      title: "Zero-to-One Delivery",
      desc: "Bridging product vision with engineering capacity to turn ambitious roadmaps into reliable production code.",
      icon: "Zap",
    },
    {
      title: "Continuous Curiosity",
      desc: "From Medical Physics to Go microservices, Godot C# game engines, and local ONNX machine learning models.",
      icon: "Sparkles",
    },
  ],
};
