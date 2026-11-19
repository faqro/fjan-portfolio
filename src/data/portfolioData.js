import profilePicture from "@/assets/profilepicture.webp";
import qwaleLogo from "@/assets/qwale.jpg";
import qwalecodeLogo from "@/assets/qwalecode.jpg";
import uscorLogo from "@/assets/uscor.jpg";
import kogitsioLogo from "@/assets/kogit.jpg";
import mokaLogo from "@/assets/moka.jpg";
import bicerinLogo from "@/assets/bicerin.jpg";
import blastfortLogo from "@/assets/blastfort.jpg";
import qauthifyLogo from "@/assets/qauthify.jpg";

import quentoLogo from "@/assets/xp/quento.jpg";
import shabodiLogo from "@/assets/xp/shabodi.jpg";
import orionLogo from "@/assets/xp/orion.jpg";
import vdcLogo from "@/assets/xp/vdc.jpg";
import awsLogo from "@/assets/xp/aws.jpg";

import instagramLogo from "@/assets/instagram.svg";
import githubLogo from "@/assets/github.svg";
import linkedinLogo from "@/assets/linkedin.svg";
import emailLogo from "@/assets/email.svg";

import aviationImg from "@/assets/cover/pilot_cockpit.webp";
import coffeeImg from "@/assets/cover/cafe_v60.webp";
import musicImg from "@/assets/cover/music_soundtrap.webp";
import culinaryImg from "@/assets/cover/cooking_potato.webp";
import motorsportImg from "@/assets/cover/car_supra.webp";

const carouselModules = import.meta.glob(
  "@/assets/carousel/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG}",
  { eager: true, import: "default" }
);

export const profileData = {
  name: "Faraaz Jan",
  initials: "FJ",
  avatar: profilePicture,
  tagline: "Software Engineer, Licensed Pilot, Entrepreneur & Music Artist",
  bio: "Avid tech enthusiast building cool software, while learning some stuff along the way. I love to spend my free time in the cockpit, exploring cafés, producing music, crafting dishes, and immersing myself in motorsport.",
  location: "Ottawa, Canada",
  roles: [
    { emoji: "💻", label: "Software Dev", pastel: "bg-sky-100/80 text-sky-800 border-sky-200/80" },
    { emoji: "✈️", label: "Private Pilot", pastel: "bg-violet-100/80 text-violet-800 border-violet-200/80" },
    { emoji: "☕", label: "Coffee Enthusiast", pastel: "bg-emerald-100/80 text-emerald-800 border-emerald-200/80" },
    { emoji: "🎵", label: "Music Artist", pastel: "bg-rose-100/80 text-rose-800 border-rose-200/80" },
  ],
};

export const businessCardData = {
  position: "Software Engineer",
  linkedin: {
    label: "linkedin.com/in/faraaz-jan",
    url: "https://www.linkedin.com/in/faraaz-jan/",
  },
  github: {
    label: "github.com/faqro",
    url: "https://github.com/faqro/",
  },
  email: "me@faraaz.page",
};

export const projectsList = [
  {
    name: "BicerinMatrix",
    subtitle: "github.com/qwale-app/bicerin-matrix",
    description: "Lightweight Matrix homeserver for bridge-heavy applications written in Rust.",
    image: bicerinLogo,
    url: "https://github.com/qwale-app/bicerin-matrix",
    tags: ["Chat Messaging", "Social Networking", "Rust"],
    pastel: "from-amber-200/70 via-stone-100/70 to-orange-100/70",
    accentBadge: "bg-amber-100/90 text-amber-900"
  },
  {
    name: "MokaChat",
    subtitle: "mokachat.app",
    description: "An app that aggregates chat messages across services and provides a central place of communication.",
    image: mokaLogo,
    url: "https://mokachat.app/",
    tags: ["Social Media", "Texting", "Nodejs"],
    pastel: "from-indigo-100/70 via-white/70 to-purple-100/70",
    accentBadge: "bg-indigo-100/90 text-indigo-700"
  },
  {
    name: "StudySesh",
    subtitle: "github.com/studysesh-app/studysesh",
    description: "Tutoring/studying/social networking app for college students.",
    image: null,
    url: "https://github.com/studysesh-app/studysesh",
    tags: ["Tutoring", "Studying", "React Native"],
    pastel: "from-red-100/70 via-white/70 to-rose-100/70",
    accentBadge: "bg-red-100/90 text-red-700"
  },
  {
    name: "QwaleCode",
    subtitle: "github.com/faqro/qwale-code",
    description:
      "Lightweight collaborative AI-integrated code editor designed for fast, real-time pair programming and intelligent inline assistance.",
    image: qwalecodeLogo,
    url: "https://github.com/faqro/qwale-code",
    tags: ["AI Editor", "Collaboration", "TypeScript"],
    pastel: "from-violet-100/70 via-white/70 to-sky-100/70",
    accentBadge: "bg-violet-100/90 text-violet-700",
  },
  {
    name: "Kogitsio",
    subtitle: "dev.kogits.io",
    description:
      "AI search assistant built to synthesize answers across sources with retrieval-augmented workflows and clean citations.",
    image: kogitsioLogo,
    url: "https://dev.kogits.io",
    tags: ["RAG", "LLMs", "Search"],
    pastel: "from-sky-100/70 via-white/70 to-teal-100/70",
    accentBadge: "bg-sky-100/90 text-sky-700",
  },
  // {
  //   name: "Qwale",
  //   subtitle: "qwale.ca",
  //   description:
  //     "SaaS suite development platform delivering modular productivity and cloud-native web tools for modern teams.",
  //   image: qwaleLogo,
  //   url: "https://qwale.ca",
  //   tags: ["SaaS", "Full-Stack", "Cloud"],
  //   pastel: "from-emerald-100/70 via-white/70 to-sky-100/70",
  //   accentBadge: "bg-emerald-100/90 text-emerald-700",
  // },
  {
    name: "QAuthify",
    subtitle: "github.com/faqro/QAuthify",
    description: "A lightweight and open-source JWT-based SSO auth platform made with Node, Express, and MongoDB.",
    image: qauthifyLogo,
    url: "https://github.com/faqro/QAuthify",
    tags: ["Authentication", "Single-Sign On", "JWT"],
    pastel: "from-blue-100/70 via-white/70 to-sky-100/70",
    accentBadge: "bg-blue-100/90 text-blue-700"
  },
  {
    name: "Uscor Esolang",
    subtitle: "github.com/faqro/uscor-lang",
    description:
      "An esoteric programming language implemented in C++ and inspired by Lisp, exploring minimalist syntax and custom evaluation.",
    image: uscorLogo,
    url: "https://github.com/faqro/uscor-lang",
    tags: ["C++", "Compiler", "Lisp-inspired"],
    pastel: "from-rose-100/70 via-white/70 to-amber-100/70",
    accentBadge: "bg-rose-100/90 text-rose-700",
  },
  {
    name: "BlastFort",
    subtitle: "store.steampowered.com/app/1682790",
    description: "A multi-platform JavaScript-based indie game, with multiplayer networking features, and an innovative gameplay concept. Available on Steam, itch.io, and Xbox.",
    image: blastfortLogo,
    url: "https://store.steampowered.com/app/1682790/BlastFort/",
    tags: ["Video Game", "Multiplayer", "JavaScript"],
    pastel: "from-orange-100/70 via-white/70 to-amber-100/70",
    accentBadge: "bg-orange-100/90 text-orange-700"
  },
];

export const experienceList = [
  {
    company: "Amazon Web Services",
    role: "Software Development Engineer Intern",
    date: "May 2026 - Aug 2026",
    location: "Austin, Texas",
    image: awsLogo,
    description:
      "Developed test aggregation integration for Machine Learning Accelerator firmware testing engine. Created central dashboard with visualizations of aggregated firmware test results for live test results on AWS hardware. Created integration for firmware testing with internal continuous testing tracking service, to track firmware versions readiness from development to release.",
    current: false,
    accent: "from-amber-100/70 to-orange-50/60",
  },
  {
    company: "Verdance Development Corporation",
    role: "Software Developer Intern",
    date: "Apr 2025 - Mar 2026",
    location: "Ottawa, Canada",
    image: vdcLogo,
    description:
      "Developed web apps for housing developer clients. Designed financial budgeting software focused on real estate development. Designed industry-targeted Project Management software. Developed an Azure-hosted full-stack web application using React.js + Express.",
    current: false,
    accent: "from-emerald-100/70 to-teal-50/60",
  },
  {
    company: "Orion Studios Interactive",
    role: "Game Developer",
    date: "Jun 2021 - Jul 2024",
    location: "Ottawa, Canada",
    image: orionLogo,
    description:
      "Developed and built a business for software development and game publishing. Managed accounting, legal registration, and affairs of the company. Ran marketing campaigns and detailed the company's finance.",
    current: false,
    accent: "from-violet-100/70 to-purple-50/60",
  },
  {
    company: "Shabodi",
    role: "DevOps/Virtualization Intern",
    date: "Jul 2023 - Sep 2023",
    location: "Mississauga, Canada",
    image: shabodiLogo,
    description:
      "Led research efforts into server software and bare-metal virtualization. Spearheaded server-side software migration project from VMware ESXi to Proxmox. Enhanced computing capabilities and eliminated unnecessary software licensing with open-source alternatives.",
    current: false,
    accent: "from-sky-100/70 to-blue-50/60",
  },
  {
    company: "Quento",
    role: "Web Application Developer Intern",
    date: "Sep 2020 - Dec 2020",
    location: "Ottawa, Canada",
    image: quentoLogo,
    description:
      "Developed a Progressive Web App for the company's e-learning and note-taking service. Packaged the PWA as a near-native app for Android, iOS, and Microsoft UWP platforms.",
    current: false,
    accent: "from-rose-100/70 to-pink-50/60",
  },
];

export const educationList = [
  {
    company: "Carleton University",
    role: "Bachelor of Computer Science (Honours)",
    date: "Sep 2024 - May 2027",
    location: "Ottawa, Canada",
    current: true,
    accent: "from-rose-100/60 to-amber-50/60",
  },
  {
    company: "University of West Georgia",
    role: "Transient Student",
    date: "Jan 2024 - Mar 2024",
    location: "Carrollton, Georgia",
    accent: "from-sky-100/60 to-indigo-50/60",
  },
  {
    company: "University of Helsinki",
    role: "Transient Student",
    date: "Oct 2023 - Mar 2024",
    location: "Helsinki, Finland",
    accent: "from-violet-100/60 to-sky-50/60",
  },
  {
    company: "The University of British Columbia",
    role: "Bachelor of Science",
    date: "Sep 2023 - Apr 2024",
    location: "Vancouver, Canada",
    badge: "Transferred",
    accent: "from-teal-100/60 to-emerald-50/60",
  },
  {
    company: "Lisgar Collegiate Institute",
    role: "Highschool Diploma (OSSD)",
    date: "Sep 2019 - Jun 2023",
    location: "Ottawa, Canada",
    accent: "from-amber-100/60 to-rose-50/60",
  },
];

export const skillCategories = [
  {
    id: "programming",
    label: "Programming",
    pastel: "bg-violet-100/80 text-violet-800",
    items: [
      "C++",
      "Javascript/Typescript",
      "Java",
      "Python",
      "React",
      "Node/Express",
      "Kotlin",
      "C#",
      "C",
      "R",
      "VB.NET",
      "Xojo",
      "Android Studio",
      "Xcode",
      "HTML/CSS",
      "Qiskit",
      "Haskell",
      "Django",
      "Qt Framework",
      "Rust",
      "Electron",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    pastel: "bg-sky-100/80 text-sky-800",
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "LanceDB",
      "SPARQL RDF",
      "Cassandra",
    ],
  },
  {
    id: "network",
    label: "Cloud & DevOps",
    pastel: "bg-emerald-100/80 text-emerald-800",
    items: [
      "GCP",
      "AWS",
      "Azure",
      "fly.io",
      "Render",
      "Git",
      "Docker",
      "Kubernetes",
      "Proxmox",
    ],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    pastel: "bg-rose-100/80 text-rose-800",
    items: [
      "Large Language Models",
      "Machine Learning",
      "Retrieval-Augmented Generation",
      "OpenAI API",
      "embedJS",
    ],
  },
  {
    id: "gamedev",
    label: "Game Dev",
    pastel: "bg-amber-100/80 text-amber-800",
    items: ["Unity", "Godot", "GDevelop", "GameMaker Studio", "Construct"],
  },
  {
    id: "productivity",
    label: "Creative & Productivity",
    pastel: "bg-pink-100/80 text-pink-800",
    items: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "Soundtrap",
      "FL Studio",
      "Audacity",
      "Figma",
      "Paint.NET",
      "Microsoft Office",
      "GSuite",
      "Jira",
      "Confluence",
      "LucidChart",
    ],
  },
  {
    id: "other",
    label: "Domains",
    pastel: "bg-teal-100/80 text-teal-800",
    items: [
      "Hardware Engineering/IoT",
      "Statistics",
      "Accounting",
      "Engineering",
      "Linux Development",
      "Network Virtualization",
      "Continuous Integration and Deployment"
    ],
  },
  {
    id: "languages",
    label: "Spoken Languages",
    pastel: "bg-indigo-100/80 text-indigo-800",
    items: ["English", "French", "Urdu", "Japanese"],
  },
];

export const skillKeywords = {
  "C++": ["cpp", "cxx", "systems", "native", "compiler"],
  "Javascript/Typescript": ["js", "ts", "ecmascript", "web", "frontend", "backend", "node"],
  Java: ["jvm", "oop", "spring", "android"],
  Python: ["py", "scripting", "backend", "ml", "ai", "data"],
  React: ["js", "javascript", "ts", "typescript", "jsx", "tsx", "frontend", "web", "ui"],
  "Node/Express": ["js", "javascript", "ts", "typescript", "nodejs", "backend", "server", "api", "rest", "web"],
  Kotlin: ["android", "jvm", "mobile", "java"],
  "C#": ["csharp", "dotnet", ".net", "unity", "microsoft"],
  C: ["systems", "embedded", "low-level", "native"],
  R: ["statistics", "data", "analytics", "rstudio"],
  "VB.NET": ["visual basic", "dotnet", ".net", "microsoft"],
  Xojo: ["desktop", "cross-platform", "basic"],
  "Android Studio": ["mobile", "android", "kotlin", "java", "apk"],
  Xcode: ["ios", "swift", "apple", "macos", "mobile"],
  "HTML/CSS": ["web", "frontend", "markup", "styling", "tailwind", "ui"],
  Qiskit: ["quantum", "python", "ibm"],
  Haskell: ["functional", "fp", "lambda"],
  Django: ["python", "py", "backend", "web", "api"],
  "Qt Framework": ["cpp", "c++", "gui", "desktop", "cross-platform"],
  Rust: ["systems", "cargo", "crates", "memory safety", "native", "webassembly", "wasm"],
  Electron: ["desktop", "cross-platform", "javascript", "typescript", "chromium", "nodejs", "app"],

  MongoDB: ["db", "database", "nosql", "document", "atlas"],
  PostgreSQL: ["db", "database", "sql", "postgres", "relational"],
  MySQL: ["db", "database", "sql", "relational"],
  Firebase: ["db", "database", "nosql", "google", "auth", "host", "hosting", "realtime"],
  LanceDB: ["db", "database", "vector", "ai", "rag", "embeddings"],
  "SPARQL RDF": ["db", "database", "graph", "semantic", "ontology", "query"],
  Cassandra: ["db", "database", "nosql", "distributed", "apache"],

  GCP: ["google cloud", "cloud", "host", "hosting", "deploy", "deployment", "server", "iaas"],
  AWS: ["amazon web services", "amazon", "cloud", "host", "hosting", "deploy", "ec2", "s3", "lambda", "server"],
  Azure: ["microsoft", "cloud", "host", "hosting", "deploy", "deployment", "server"],
  "fly.io": ["cloud", "host", "hosting", "deploy", "deployment", "paas", "server"],
  Render: ["cloud", "host", "hosting", "deploy", "deployment", "paas", "server"],
  Git: ["vcs", "version control", "github", "gitlab", "source control"],
  Docker: ["container", "containers", "containerization", "devops", "image", "vm"],
  Kubernetes: ["k8s", "container", "containers", "orchestration", "devops", "cloud", "cluster"],
  Proxmox: ["vm", "virtualization", "hypervisor", "homelab", "server", "host", "hosting", "container", "lxc"],

  "Large Language Models": ["llm", "ai", "gpt", "chatgpt", "nlp", "generative"],
  "Machine Learning": ["ml", "ai", "deep learning", "neural", "data science"],
  "Retrieval-Augmented Generation": ["rag", "ai", "llm", "vector", "search", "embeddings"],
  "OpenAI API": ["gpt", "chatgpt", "llm", "ai", "api"],
  embedJS: ["js", "javascript", "rag", "ai", "llm", "embeddings", "vector"],

  Unity: ["game", "3d", "2d", "csharp", "c#", "engine"],
  Godot: ["game", "3d", "2d", "gdscript", "engine"],
  GDevelop: ["game", "2d", "engine", "no-code"],
  "GameMaker Studio": ["game", "2d", "gml", "engine"],
  Construct: ["game", "2d", "html5", "engine"],

  "Adobe Illustrator": ["design", "vector", "svg", "graphics", "creative"],
  "Adobe Photoshop": ["design", "photo", "image", "editing", "graphics"],
  "Adobe Premiere Pro": ["video", "editing", "film", "creative"],
  Soundtrap: ["music", "daw", "audio", "production", "beats"],
  "FL Studio": ["music", "daw", "audio", "production", "beats", "synth"],
  Audacity: ["audio", "editing", "sound", "recording"],
  Figma: ["design", "ui", "ux", "prototype", "wireframe"],
  "Paint.NET": ["image", "editing", "graphics"],
  "Microsoft Office": ["word", "excel", "powerpoint", "docs", "spreadsheets"],
  GSuite: ["google workspace", "docs", "sheets", "slides"],
  Jira: ["agile", "scrum", "tickets", "project management", "atlassian"],
  Confluence: ["docs", "wiki", "documentation", "atlassian"],
  LucidChart: ["diagrams", "flowchart", "architecture", "uml"],

  "Hardware Engineering/IoT": ["iot", "embedded", "firmware", "arduino", "raspberry pi", "circuits"],
  Statistics: ["math", "probability", "data", "analytics"],
  Accounting: ["finance", "bookkeeping", "budget", "business"],
  Engineering: ["systems", "architecture", "design"],
  "Linux Development": ["ubuntu", "debian", "bash", "shell", "unix", "cli", "os"],
  "Network Virtualization": ["sdn", "vlan", "proxmox", "networking", "vm"],
  "Continuous Integration and Deployment": ["ci", "cd", "cicd", "ci/cd", "pipeline", "github actions", "automation", "devops"],

  English: ["spoken", "language"],
  French: ["spoken", "language", "français"],
  Urdu: ["spoken", "language"],
  Japanese: ["spoken", "language", "nihongo"],
};

export const hobbiesList = [
  {
    id: "aviation",
    title: "Private Pilot",
    subtitle: "Diamond DA20 & Cessna 152",
    description:
      "Licensed private pilot logging cross-country hours in the DA20 and C152. Nothing compares to the peace and quiet flying at 6,000 feet.",
    image: aviationImg,
    tags: ["DA20 Katana", "Cessna 152", "VFR Rated"],
    gradient: "from-sky-100/80 via-white/70 to-indigo-100/80",
    badgeClass: "bg-sky-100/90 text-sky-700",
  },
  {
    id: "coffee",
    title: "Specialty Coffee & Grand Cafés",
    subtitle: "Coffee Tasting and Café Hopping",
    description:
      "Dialing in V60 pour-overs to unlock tasting notes, and hunting down historic grand cafés with timeless architecture.",
    image: coffeeImg,
    tags: ["Pour-Over", "Espresso", "Cafés"],
    gradient: "from-amber-100/80 via-white/70 to-rose-100/80",
    badgeClass: "bg-amber-100/90 text-amber-800",
  },
  {
    id: "music",
    title: "Music Production",
    subtitle: "FL Studio & Soundtrap",
    description:
      "Composing electronic music, layering synths, and arranging beats to make something cool.",
    image: musicImg,
    tags: ["FL Studio", "Soundtrap", "Audacity"],
    gradient: "from-violet-100/80 via-white/70 to-pink-100/80",
    badgeClass: "bg-violet-100/90 text-violet-700",
  },
  {
    id: "culinary",
    title: "Cooking & Baking",
    subtitle: "Culinary Craft",
    description:
      "Experimenting with new recipes, trying new cuisine, and plating every dish with fine-dining precision.",
    image: culinaryImg,
    tags: ["Cooking", "Baking", "Cuisine"],
    gradient: "from-emerald-100/80 via-white/70 to-amber-100/80",
    badgeClass: "bg-emerald-100/90 text-emerald-700",
  },
  {
    id: "motorsport",
    title: "Automotive & Motorsport",
    subtitle: "Auto Shows & Track Days",
    description:
      "Lifelong auto enthusiast frequenting auto shows, Formule One races, and bringing paddock energy.",
    image: motorsportImg,
    tags: ["Automotive Shows", "Motorsport Races"],
    gradient: "from-rose-100/80 via-white/70 to-sky-100/80",
    badgeClass: "bg-rose-100/90 text-rose-700",
  },
];

export const photographyList = Object.entries(carouselModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image], idx) => ({
    id: path,
    image,
    alt: `Photo ${idx + 1}`,
  }));

export const contactList = [
  {
    contact: "LinkedIn",
    username: "@faraaz-jan",
    image: linkedinLogo,
    url: "https://www.linkedin.com/in/faraaz-jan/",
    pastel: "from-sky-100/75 to-blue-50/75",
    description: "Connect professionally & view updates",
  },
  {
    contact: "GitHub",
    username: "@faqro",
    image: githubLogo,
    url: "https://github.com/faqro/",
    pastel: "from-violet-100/75 to-slate-50/75",
    description: "Explore open-source code & repos",
  },
  {
    contact: "Instagram",
    username: "@faraaz.jan",
    image: instagramLogo,
    url: "https://www.instagram.com/faraaz.jan/",
    pastel: "from-rose-100/75 to-amber-50/75",
    description: "Photography & travel",
  },
  {
    contact: "Email",
    username: "me@faraaz.page",
    image: emailLogo,
    url: "mailto:me@faraaz.page",
    pastel: "from-emerald-100/75 to-teal-50/75",
    description: "Direct inbox for contact",
    copyValue: "me@faraaz.page",
  },
];
