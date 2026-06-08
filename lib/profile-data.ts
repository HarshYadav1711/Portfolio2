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
  "AI/ML-focused Computer Science undergraduate with hands-on experience building machine learning and deep learning systems using Python, PyTorch, Scikit-learn, Pandas, and FastAPI.";

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
    description: "Building practical ML features and GenAI-assisted workflows in production apps.",
  },
  {
    title: "Full Stack Systems",
    description: "End-to-end delivery with React, Node.js, and API-first architecture.",
  },
  {
    title: "Scalable Architecture",
    description: "Reliable services, auth flows, and data layers that hold up beyond demos.",
  },
  {
    title: "Modern Web Engineering",
    description: "TypeScript, component design, and performance-minded frontend patterns.",
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

/** Internship entries — used for dynamic impact counts */
export const INTERNSHIPS = [
  {
    year: "2026",
    role: "Full Stack Development Intern",
    company: "VibeOps (Remote)",
  },
  {
    year: "2025",
    role: "Cybersecurity Intern",
    company: "Prodigy Infotech (Remote)",
  },
  {
    year: "2025",
    role: "Python Programming Intern",
    company: "CodeAlpha (Remote)",
  },
] as const;

export function getInternshipSummary(): string {
  return `${INTERNSHIPS.length} internships — ${INTERNSHIPS.map((i) => i.role).join(", ")}`;
}

export const SKILL_CATEGORIES: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "TypeScript", "SQL", "C++"],
  Frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Vite"],
  Backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Authentication"],
  Databases: ["PostgreSQL", "MongoDB", "SQLite", "MySQL", "PostGIS"],
  "AI / ML": [
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "TensorFlow",
    "Deep Learning",
    "CNNs",
    "Feature Engineering",
    "Data Preprocessing",
    "Model Evaluation",
    "Predictive Modeling",
  ],
  Geospatial: ["GeoPandas", "Rasterio", "Shapely", "Leaflet", "STAC APIs"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Postman", "Figma"],
};

export function getListedSkills(): string[] {
  return [...new Set(Object.values(SKILL_CATEGORIES).flat())];
}
