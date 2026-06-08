import type { Project } from "./github";
import { PRODUCTION_SYSTEMS } from "./profile-data";

function matches(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text));
}

function hasTech(tech: string[], patterns: RegExp[]): boolean {
  const joined = tech.join(" ").toLowerCase();
  return matches(joined, patterns);
}

function isProductionSystem(project: Project): boolean {
  const blob = `${project.title} ${project.description} ${project.githubUrl}`.toLowerCase();
  return PRODUCTION_SYSTEMS.some((slug) => blob.includes(slug));
}

/** Compact scope labels for recruiter scanning — derived from project metadata only */
export function deriveProjectScopeBadges(project: Project): string[] {
  const badges: string[] = [];
  const add = (badge: string) => {
    if (!badges.includes(badge)) badges.push(badge);
  };

  const blob = `${project.title} ${project.description}`.toLowerCase();
  const tech = project.tech;

  const hasFrontend = hasTech(tech, [/react/, /next\.?js/, /vue/, /angular/]);
  const hasBackend = hasTech(tech, [
    /fastapi/,
    /express/,
    /node\.?js/,
    /django/,
    /flask/,
  ]);

  if (hasFrontend && hasBackend) {
    add("Full Stack");
  }

  if (
    matches(blob, [/geospatial/, /postgis/, /geopandas/, /leaflet/, /gis/]) ||
    hasTech(tech, [/postgis/, /geopandas/, /leaflet/, /rasterio/])
  ) {
    add("Geospatial");
  }

  if (
    matches(blob, [/computer vision/, /cnn/, /morphology/, /galaxy/, /image classif/]) ||
    hasTech(tech, [/cnn/, /deep learning/])
  ) {
    add("Computer Vision");
  }

  if (
    matches(blob, [/machine learning/, /deep learning/, /pytorch/, /tensorflow/, /ai-assisted/, /ai\/ml/]) ||
    hasTech(tech, [/pytorch/, /tensorflow/, /scikit/, /deep learning/])
  ) {
    add("AI/ML");
  }

  if (isProductionSystem(project)) {
    add("Production System");
  }

  const stackLabels: { label: string; match: RegExp }[] = [
    { label: "React", match: /react/ },
    { label: "FastAPI", match: /fastapi/ },
    { label: "PostgreSQL", match: /postgres/ },
    { label: "MongoDB", match: /mongo/ },
    { label: "PyTorch", match: /pytorch/ },
  ];

  for (const { label, match } of stackLabels) {
    if (hasTech(tech, [match])) {
      add(label);
    }
  }

  return badges.slice(0, 5);
}
