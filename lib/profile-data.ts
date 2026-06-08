// Verifiable profile data shared across portfolio sections

/** B.Tech start date from resume (Oct 2023) */
export const EDUCATION_START_DATE = "2023-10-01";

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

export const SKILL_CATEGORIES: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "TypeScript", "SQL", "C++"],
  Frontend: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Vite"],
  Backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Authentication"],
  Databases: ["PostgreSQL", "MongoDB", "SQLite", "MySQL", "PostGIS"],
  "AI / ML": ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Deep Learning", "Feature Engineering"],
  Geospatial: ["GeoPandas", "Rasterio", "Shapely", "Leaflet", "STAC APIs"],
  "Tools & Platforms": ["Git", "GitHub", "Docker", "Postman", "Figma"],
};

export function getListedSkills(): string[] {
  return [...new Set(Object.values(SKILL_CATEGORIES).flat())];
}
