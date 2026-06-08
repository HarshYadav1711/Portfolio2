export const GITHUB_USERNAME = "HarshYadav1711";

/** Featured repositories — shown first and mapped to resume-aligned copy */
export const PRIORITIZED_PROJECTS: string[] = [
  "climaterisk-sentinel",
  "ai_based_galaxy_morphology_classifier",
  "applynest",
  "primetrade",
];

/** Repositories hidden from the featured projects list */
export const EXCLUDED_PROJECTS: string[] = [
  "clinic-tracker",
  "clinic",
  "primetrade-backend",
  "primetrade-data-science",
];

/** Display titles for curated repositories */
export const PROJECT_DISPLAY_NAMES: { [key: string]: string } = {
  "climaterisk-sentinel": "ClimateRisk Sentinel",
  "ai_based_galaxy_morphology_classifier": "AI-Based Galaxy Morphology Classifier",
  "applynest": "ApplyNest",
  "primetrade": "Primetrade Crypto Trade Logger",
};

export const FEATURED_PROJECT_ORDER: string[] = [
  "climaterisk-sentinel",
  "ai_based_galaxy_morphology_classifier",
  "applynest",
  "primetrade",
];

export const RESUME_PROJECT_DETAILS: {
  [key: string]: { description: string; tech: string[] };
} = {
  "climaterisk-sentinel": {
    description:
      "Geospatial climate-risk intelligence platform using Microsoft Planetary Computer STAC APIs, PostGIS, and open satellite datasets with interactive GIS dashboards, AOI validation, and heuristic risk scoring.",
    tech: ["React", "TypeScript", "FastAPI", "PostGIS", "GeoPandas", "Rasterio", "Leaflet"],
  },
  "ai_based_galaxy_morphology_classifier": {
    description:
      "Deep learning pipeline for classifying galaxy morphologies into Spiral, Elliptical, and Irregular categories using SDSS and Galaxy Zoo datasets with CNN architectures and deployment-ready inference.",
    tech: ["PyTorch", "Deep Learning", "Python", "CNN"],
  },
  "applynest": {
    description:
      "Full-stack job application tracking platform with authentication, Kanban workflow management, drag-and-drop pipelines, and AI-assisted job description parsing with deterministic fallback logic.",
    tech: ["React", "TypeScript", "Express.js", "MongoDB", "JWT"],
  },
  "primetrade": {
    description:
      "High-performance trading position tracker with JWT authentication, portfolio analytics, automated P&L calculations, and containerized FastAPI backend with async SQLAlchemy.",
    tech: ["FastAPI", "PostgreSQL", "React", "Docker"],
  },
};
