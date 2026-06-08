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

/** Visual previews for featured projects — swap .svg placeholders for .png screenshots when available */
export const PROJECT_SCREENSHOTS: Record<
  string,
  { src: string; alt: string }
> = {
  "climaterisk-sentinel": {
    src: "/projects/climaterisk-sentinel.svg",
    alt: "ClimateRisk Sentinel geospatial climate-risk dashboard preview",
  },
  "ai_based_galaxy_morphology_classifier": {
    src: "/projects/galaxy-morphology.svg",
    alt: "AI-Based Galaxy Morphology Classifier model training dashboard preview",
  },
  applynest: {
    src: "/projects/applynest.svg",
    alt: "ApplyNest job application Kanban board preview",
  },
  primetrade: {
    src: "/projects/primetrade.svg",
    alt: "Primetrade crypto trading portfolio dashboard preview",
  },
  qps: {
    src: "/projects/qps.svg",
    alt: "QPS project dashboard preview",
  },
};

export function resolveProjectPreview(
  repoName: string,
  index: number
): { image: string; imageAlt: string } {
  const nameLower = repoName.toLowerCase();

  const matchedKey = Object.keys(PROJECT_SCREENSHOTS).find((key) =>
    nameLower.includes(key)
  );
  if (matchedKey) {
    const { src, alt } = PROJECT_SCREENSHOTS[matchedKey];
    return { image: src, imageAlt: alt };
  }

  const orderedKey = FEATURED_PROJECT_ORDER[index];
  if (orderedKey && PROJECT_SCREENSHOTS[orderedKey]) {
    const { src, alt } = PROJECT_SCREENSHOTS[orderedKey];
    return { image: src, imageAlt: alt };
  }

  return {
    image: "",
    imageAlt: "",
  };
}

export const RESUME_PROJECT_DETAILS: {
  [key: string]: { description: string; tech: string[] };
} = {
  "climaterisk-sentinel": {
    description:
      "Climate-risk geospatial platform: Planetary Computer STAC APIs, PostGIS, open satellite data, GIS dashboards, AOI validation, heuristic risk scoring.",
    tech: ["React", "TypeScript", "FastAPI", "PostGIS", "GeoPandas", "Rasterio", "Leaflet"],
  },
  "ai_based_galaxy_morphology_classifier": {
    description:
      "CNN pipeline classifying galaxy morphologies (Spiral, Elliptical, Irregular) on SDSS and Galaxy Zoo data with deployment-ready inference.",
    tech: ["PyTorch", "Deep Learning", "Python", "CNN"],
  },
  "applynest": {
    description:
      "Full-stack job tracker: auth, Kanban drag-and-drop, AI-assisted JD parsing with deterministic offline fallback.",
    tech: ["React", "TypeScript", "Express.js", "MongoDB", "JWT"],
  },
  "primetrade": {
    description:
      "Crypto position tracker: JWT auth, portfolio analytics, automated P&L, containerized FastAPI backend with async SQLAlchemy.",
    tech: ["FastAPI", "PostgreSQL", "React", "Docker"],
  },
};
