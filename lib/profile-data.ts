// Verifiable profile data shared across portfolio sections

export const SITE_URL = "https://portfolio2-ivory-mu.vercel.app";

export const PROFILE = {
  name: "Harsh Yadav",
  location: "Prayagraj, India",
  degree: "B.Tech, Computer Science",
  institution: "United College of Engineering and Research",
  email: "harshyadav.20032010@gmail.com",
  phone: "+91 9118209699",
  linkedin: "https://www.linkedin.com/in/harsh-yadav-20032010am/",
  github: "https://github.com/HarshYadav1711",
} as const;

export const PROFESSIONAL_SUMMARY =
  "CS undergraduate building ML and full-stack systems in Python, PyTorch, Scikit-learn, Pandas, and FastAPI.";

export const PRIMARY_TECHNOLOGIES = [
  "Python",
  "PyTorch",
  "React",
  "TypeScript",
  "FastAPI",
  "PostgreSQL",
] as const;

export const AREAS_OF_INTEREST = [
  "AI-powered products",
  "Full-stack web applications",
  "Scalable backend systems",
  "Applied machine learning",
] as const;

export const CURRENTLY_EXPLORING = [
  {
    title: "AI Applications",
    description: "ML features and GenAI-assisted workflows in production apps.",
    focusAreas: [
      "Deep learning pipelines",
      "FastAPI model serving",
      "Retrieval-augmented workflows",
      "Practical AI product features",
    ],
  },
  {
    title: "Full Stack Systems",
    description: "End-to-end delivery: React, Node.js, API-first architecture.",
    focusAreas: [
      "React + TypeScript frontends",
      "Backend APIs and services",
      "PostgreSQL-backed applications",
      "End-to-end product development",
    ],
  },
  {
    title: "Scalable Architecture",
    description: "Auth flows, data layers, and services beyond demo scope.",
    focusAreas: [
      "Service boundaries",
      "Authentication systems",
      "Data modeling",
      "Reliability and maintainability",
    ],
  },
  {
    title: "Modern Web Engineering",
    description: "TypeScript, component design, performance-minded frontend patterns.",
    focusAreas: [
      "Type-safe development",
      "Accessibility",
      "Performance optimization",
      "Reusable component systems",
    ],
  },
] as const;

export const RESUME_PATH = "/Harsh Yadav Resume.pdf";
export const RESUME_DOWNLOAD_NAME = "Harsh_Yadav_Resume.pdf";

/** B.Tech start date from resume (Oct 2023) */
export const EDUCATION_START_DATE = "2023-10-01";

export function getCurrentAcademicYear(): string {
  const start = new Date(EDUCATION_START_DATE);
  const now = new Date();
  let yearsCompleted = now.getFullYear() - start.getFullYear();
  if (
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())
  ) {
    yearsCompleted--;
  }
  const currentYear = Math.min(Math.max(yearsCompleted + 1, 1), 4);
  const suffix =
    currentYear === 1 ? "st" : currentYear === 2 ? "nd" : currentYear === 3 ? "rd" : "th";
  return `${currentYear}${suffix} Year`;
}

/** Internship entries — status reflects resume timeline */
export const INTERNSHIPS = [
  {
    year: "2026",
    role: "Full Stack Development Intern",
    company: "VibeOps (Remote)",
    status: "in_progress",
  },
  {
    year: "2025",
    role: "Cybersecurity Intern",
    company: "Prodigy Infotech (Remote)",
    status: "completed",
  },
  {
    year: "2025",
    role: "Python Programming Intern",
    company: "CodeAlpha (Remote)",
    status: "completed",
  },
] as const;

/** Full-stack apps with auth, API, and persistence — documented on resume */
export const PRODUCTION_SYSTEMS = [
  "climaterisk-sentinel",
  "applynest",
  "primetrade",
] as const;

export function getCompletedInternships() {
  return INTERNSHIPS.filter((internship) => internship.status === "completed");
}

export function getInternshipSummary(): string {
  const completed = getCompletedInternships().length;
  return `${completed} completed · ${INTERNSHIPS.length} total — full-stack, cybersecurity, Python/ML`;
}

export const SKILL_CATEGORIES: Record<string, string[]> = {
  "Full-Stack Engineering": [
    "React.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Vite",
  ],
  "Backend Systems": [
    "Python",
    "FastAPI",
    "Node.js",
    "Express.js",
    "REST APIs",
    "JWT Authentication",
    "C++",
  ],
  "AI & Machine Learning": [
    "PyTorch",
    "Scikit-learn",
    "TensorFlow",
    "Deep Learning",
    "CNNs",
    "Feature Engineering",
    "Data Preprocessing",
    "Model Evaluation",
    "Predictive Modeling",
    "Pandas",
    "NumPy",
  ],
  "Data & Databases": [
    "PostgreSQL",
    "MongoDB",
    "PostGIS",
    "SQL",
    "SQLite",
    "MySQL",
    "GeoPandas",
    "Rasterio",
    "Shapely",
    "Leaflet",
    "STAC APIs",
  ],
  "Developer Tools": ["Git", "GitHub", "Docker", "Postman", "Figma"],
};

export function getListedSkills(): string[] {
  return [...new Set(Object.values(SKILL_CATEGORIES).flat())];
}

export const CERTIFICATIONS = [
  {
    period: "Nov 2025",
    title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    issuer: "Oracle",
  },
  {
    period: "Dec 2025 – Present",
    title: "Full Stack Web Development",
    issuer: "GeeksforGeeks",
  },
] as const;

export const ACHIEVEMENT_ACTIVITIES = [
  "Codefront 2.0 Hackathon — Team Logic Lords (GDG On Campus).",
  "Elite Coders Winter of Code (ECWoC) — open source among 5000+ participants.",
  "DRISHTI: Annual Youth Dialogue 2026 — Hindu College, University of Delhi.",
  "Renaissance-Techspan 2026 Participation Certificate.",
  "DevFest 2025 (UIT Prayagraj) — hands-on labs on emerging tech.",
  "Open-source contributor; focus on scalable backends and applied AI/ML.",
  "Interests: competitive coding, game development, AI research.",
] as const;

/** Compact achievement cards — summaries only; full detail lives in Resume */
export const ACHIEVEMENT_HIGHLIGHTS = [
  {
    id: "oracle-ai",
    title: "Oracle Cloud AI Foundations Associate",
    summary: "OCI 2025 AI Foundations Associate · Nov 2025",
    resumeAnchor: "#resume-certifications",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    summary: "Codefront 2.0 · Team Logic Lords (GDG On Campus)",
    resumeAnchor: "#resume-achievements",
  },
  {
    id: "open-source",
    title: "Open Source",
    summary: "ECWoC participant · 5000+ contributor program",
    resumeAnchor: "#resume-achievements",
  },
  {
    id: "certifications",
    title: "Certifications",
    summary: `${CERTIFICATIONS.length} credentials · Oracle AI + GeeksforGeeks Full Stack`,
    resumeAnchor: "#resume-certifications",
  },
] as const;
