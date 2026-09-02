export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Game Dev & Engine" | "Systems & ML" | "Hackathon & Tools" | "Enterprise Systems";
  badge: string;
  year: string;
  description: string;
  longDescription: string;
  architectureDetails: string[];
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  accentColor: string;
  status: "ACTIVE DEV" | "PRODUCTION" | "COMPLETED" | "PROTOTYPE";
  stats: { label: string; value: string }[];
  hologramType: "arcade" | "matrix" | "vault" | "terminal";
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "wallpaper-vault",
    title: "wallpaper-vault",
    subtitle: "Digital Aesthetic Hub & Local ML Tagger",
    category: "Systems & ML",
    badge: "Personal Workflow Hub",
    year: "2024 – Present",
    description:
      "A centralized digital aesthetic hub to manage, auto-crop, and serve ultra-high-res wallpaper collections to external rotation tools like DisplayFusion, integrated with local ONNX computer vision models.",
    longDescription:
      "Built as a high-performance personal media pipeline. Solves multi-monitor aesthetic alignment with automated focal point detection, intelligent cropping algorithms, and local computer vision inference (WD14 Taggers) running in Python with ONNX Runtime. Seamlessly checks for and utilizes CUDA/GPU acceleration with graceful CPU fallbacks.",
    architectureDetails: [
      "Local ML Inference pipeline with ONNX Runtime & Python executing WD14 vision taggers",
      "Dynamic hardware acceleration detection (CUDA vs CPU fallback)",
      "Automated aspect-ratio cropping and smart thumbnail generation",
      "RESTful service serving synchronized collections directly to DisplayFusion hooks",
    ],
    techStack: ["Python", "ONNX Runtime", "CUDA", "TypeScript", "Go", "DisplayFusion API", "OpenCV"],
    githubUrl: "https://github.com/wongpatrick/wallpaper-vault",
    accentColor: "#00f0ff",
    status: "ACTIVE DEV",
    stats: [
      { label: "Pipeline", value: "Local ONNX" },
      { label: "Speed", value: "<150ms/img" },
      { label: "Hardware", value: "CUDA / CPU" },
    ],
    hologramType: "vault",
  },
  // {
  //   id: "project-anaconda",
  //   title: "Project Anaconda",
  //   subtitle: "Cyberpunk Stealth Metroidvania in Godot 4",
  //   category: "Game Dev & Engine",
  //   badge: "Game Engine & Mechanics",
  //   year: "2024 – Present",
  //   description:
  //     "A cyberpunk stealth metroidvania built in Godot 4 using C#, featuring perspective-shifting mechanics, dynamic camera logic, and retro hacking minigames.",
  //   longDescription:
  //     "A deep dive into modular gameplay engineering and game architecture. Built with Godot 4 and C# to achieve tight input response and custom state machines. Features dynamic 2D/3D perspective shifting, line-of-sight raycasting stealth detection, procedural audio synthesis, and interactive in-game hacking terminals.",
  //   architectureDetails: [
  //     "Modular hierarchical state machine (HSM) architecture in C#",
  //     "Dynamic camera framing logic with perspective-shift transitions",
  //     "Raycast-based stealth detection cones & alert AI behavior trees",
  //     "Custom retro hacking minigame subsystem integrated with terminal UI",
  //   ],
  //   techStack: ["Godot 4", "C#", "HLSL/GLSL Shaders", "State Machines", "Game Physics", "Aseprite"],
  //   accentColor: "#f000ff",
  //   status: "ACTIVE DEV",
  //   stats: [
  //     { label: "Engine", value: "Godot 4 C#" },
  //     { label: "Genre", value: "Stealth Action" },
  //     { label: "Framerate", value: "60 FPS Fixed" },
  //   ],
  //   hologramType: "arcade",
  // },
  {
    id: "hogwarts-house-cup",
    title: "Hogwarts House Cup Bot",
    subtitle: "Enterprise Gamified Kudos Platform",
    category: "Hackathon & Tools",
    badge: "Hackathon Winner",
    year: "2021",
    description:
      "A Harry Potter-inspired Slack bot and interactive Angular dashboard built during an in-house hackathon to celebrate teammate achievements through a gamified house point system.",
    longDescription:
      "Created to foster team camaraderie and celebrate cross-functional wins. Features instant Slack slash-command point awards, real-time leaderboard calculations, animated trophy presentations, and a responsive web dashboard.",
    architectureDetails: [
      "Slack Bolt API event listeners & webhook receivers",
      "Interactive Angular single-page dashboard with real-time score updates",
      "Leaderboard calculation engine with anti-gaming rate limits",
      "Continuous deployment pipeline on cloud infrastructure",
    ],
    techStack: ["Angular", "TypeScript", "Node.js", "Slack API", "Heroku", "CSS Animations"],
    accentColor: "#ffb800",
    status: "COMPLETED",
    stats: [
      { label: "Event", value: "IX Hackathon" },
      { label: "Adoption", value: "100+ Staff" },
      { label: "Stack", value: "Angular + Node" },
    ],
    hologramType: "terminal",
  },
  {
    id: "wong-os-terminal",
    title: "WONG_OS v8.0 (This Site)",
    subtitle: "3D Cyberpunk Command Center & Interactive Portfolio",
    category: "Systems & ML",
    badge: "Interactive Experience",
    year: "2026",
    description:
      "A cyberpunk command center featuring real-time Three.js 3D isometric room rendering, interactive CRT shader overlays, Web Audio API synthesis, and a live CLI console.",
    longDescription:
      "Designed and built from the ground up using Next.js 15, TypeScript, Three.js, and Framer Motion. Bridges retro CRT terminal nostalgia with cutting-edge WebGL lighting, procedural audio synthesis, and rich interactive resume exploration.",
    architectureDetails: [
      "Custom WebGL Three.js isometric 3D workspace with raycasted object interaction",
      "Procedural Web Audio API sound synthesizer with zero external asset dependencies",
      "Full CLI command parser (`help`, `cat resume`, `matrix`, `sfx`, `skills`)",
      "Progressive enhancement with 2D fallback and reduced-motion accessibility",
    ],
    techStack: ["Next.js 15", "Three.js", "WebGL", "TypeScript", "Web Audio API", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/wongpatrick",
    accentColor: "#00ff66",
    status: "PRODUCTION",
    stats: [
      { label: "3D Engine", value: "Three.js" },
      { label: "Audio", value: "Web Audio Synth" },
      { label: "Performance", value: "60 FPS" },
    ],
    hologramType: "matrix",
  },
];
