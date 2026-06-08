// ============================================
// PERSONALIZE: Add your GitHub username here
// ============================================
// Example: If your GitHub URL is https://github.com/yourusername
// Then set: export const GITHUB_USERNAME = "yourusername";
export const GITHUB_USERNAME = "HarshYadav1711"; // TODO: Replace with your actual GitHub username

// ============================================
// PRIORITIZED PROJECTS: Projects to always show first
// ============================================
// Add repository names (exact match or partial match) that should be prioritized
// These projects will appear first in your portfolio
export const PRIORITIZED_PROJECTS: string[] = [
  "climaterisk-sentinel",
  "ai_based_galaxy_morphology_classifier",
  "applynest",
  "primetrade",
];

// ============================================
// EXCLUDED PROJECTS: Projects to hide from portfolio
// ============================================
// Add repository names that should be excluded from the portfolio
export const EXCLUDED_PROJECTS: string[] = [
  "clinic-tracker",
  "clinic",
  "primetrade-backend",
  "primetrade-data-science",
];

// ============================================
// PROJECT DISPLAY NAMES: Custom titles for specific repos
// ============================================
// Map repo name keyword (lowercase) to the exact title to show in portfolio
export const PROJECT_DISPLAY_NAMES: { [key: string]: string } = {
  "climaterisk-sentinel": "ClimateRisk Sentinel",
  "ai_based_galaxy_morphology_classifier": "AI-Based Galaxy Morphology Classifier",
  "applynest": "ApplyNest",
  "primetrade": "Primetrade Crypto Trade Logger",
};

// Order for featured projects (first in list = show first)
export const FEATURED_PROJECT_ORDER: string[] = [
  "climaterisk-sentinel",
  "ai_based_galaxy_morphology_classifier",
  "applynest",
  "primetrade",
];

// Resume project descriptions and tech stack overrides
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

