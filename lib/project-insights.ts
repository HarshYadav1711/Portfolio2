import type { GitHubRepo } from "./github";
import { RESUME_PROJECT_DETAILS } from "./config";

export interface ProjectInsights {
  problem: string;
  keyFeatures: string[];
  technicalHighlights: string[];
  engineeringChallenge: string;
  contribution: string;
}

interface InsightContext {
  repo: GitHubRepo;
  title: string;
  description: string;
  tech: string[];
  nameLower: string;
  descLower: string;
  topicsLower: string[];
}

const RESUME_INSIGHTS: Record<
  string,
  Omit<ProjectInsights, never>
> = {
  "climaterisk-sentinel": {
    problem:
      "Infrastructure and planning teams need a practical way to assess climate-related geospatial risk for a defined area using open satellite data.",
    keyFeatures: [
      "AOI-based infrastructure analysis with validation workflows",
      "NDVI, NDWI, and NDBI raster analytics pipelines",
      "Interactive Leaflet GIS dashboards with temporal analysis",
      "Heuristic risk scoring and infrastructure proximity metrics",
      "Microsoft Planetary Computer STAC API integration",
    ],
    technicalHighlights: [
      "React + TypeScript frontend with component-driven map UI",
      "FastAPI backend exposing geospatial analysis endpoints",
      "PostGIS for spatial storage and AOI-based queries",
      "GeoPandas, Rasterio, and Shapely for raster/vector processing",
    ],
    engineeringChallenge:
      "Aligning heterogeneous satellite rasters across projections and resolutions — solved with spatial reprojection pipelines and consistent AOI-based processing in GeoPandas/Rasterio.",
    contribution:
      "Built the end-to-end platform: STAC data ingestion, raster analytics workflows, API layer, and interactive GIS dashboard.",
  },
  "ai_based_galaxy_morphology_classifier": {
    problem:
      "Classifying galaxy morphologies manually does not scale across large astronomical survey datasets.",
    keyFeatures: [
      "Spiral, Elliptical, and Irregular classification pipeline",
      "SDSS and Galaxy Zoo dataset ingestion and preprocessing",
      "Lightweight CNN architecture with data augmentation",
      "Training, evaluation, and checkpointing workflows",
      "Deployment-ready batch inference pipeline",
    ],
    technicalHighlights: [
      "PyTorch CNN models with configurable training loops",
      "Python preprocessing and augmentation pipeline",
      "Structured evaluation metrics for morphology classes",
      "Modular inference path for scalable prediction",
    ],
    engineeringChallenge:
      "Balancing model accuracy with training efficiency on survey-scale data — addressed with a lightweight CNN, augmentation strategy, and reproducible checkpointing.",
    contribution:
      "Implemented the full ML workflow from dataset preparation through model training, evaluation, and inference-ready deployment scripts.",
  },
  applynest: {
    problem:
      "Job seekers lack a single place to track applications across stages and consistently extract requirements from job descriptions.",
    keyFeatures: [
      "JWT-authenticated user accounts and protected routes",
      "Kanban-style application pipeline with drag-and-drop",
      "AI-assisted job description parsing",
      "Deterministic fallback for parsing without external APIs",
      "Resume bullet generation from parsed JD data",
    ],
    technicalHighlights: [
      "React + TypeScript SPA with schema-validated forms",
      "Express.js REST API with JWT middleware",
      "MongoDB for persistent application state",
      "Modular parsing layer with validation and fallback logic",
    ],
    engineeringChallenge:
      "Keeping JD parsing reliable when external AI APIs are unavailable — implemented deterministic fallback logic so parsing and bullet generation still work offline.",
    contribution:
      "Delivered the full stack: auth, Kanban workflow UI, REST API, MongoDB schemas, and the AI-assisted parsing layer with fallback behavior.",
  },
  primetrade: {
    problem:
      "Active crypto traders need accurate position tracking, automated P&L, and portfolio-level analytics in one place.",
    keyFeatures: [
      "JWT-authenticated trade and position logging",
      "Automated P&L calculations per position",
      "Portfolio analytics and performance summaries",
      "Strict user-level data isolation",
      "Docker Compose deployment for local/production parity",
    ],
    technicalHighlights: [
      "FastAPI async REST API with structured exception handling",
      "Async SQLAlchemy ORM for non-blocking database access",
      "PostgreSQL for transactional trade and portfolio data",
      "React frontend consuming typed API endpoints",
      "Dockerized multi-service architecture",
    ],
    engineeringChallenge:
      "Maintaining fast async database access while enforcing per-user data isolation — solved with async SQLAlchemy, scoped queries, and a modular backend architecture.",
    contribution:
      "Built the async API, authentication layer, P&L analytics engine, React client integration, and Docker Compose setup.",
  },
};

function hasAny(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k));
}

function pickFeatures(ctx: InsightContext): string[] {
  const features: string[] = [];
  const { descLower, nameLower, topicsLower, tech } = ctx;

  if (hasAny(descLower + nameLower, ["auth", "jwt", "login", "signin", "signup"])) {
    features.push("User authentication with protected routes");
  }
  if (hasAny(descLower + nameLower, ["dashboard", "analytics", "metrics", "report"])) {
    features.push("Interactive dashboard and data visualization");
  }
  if (hasAny(descLower + nameLower, ["kanban", "pipeline", "workflow", "drag"])) {
    features.push("Workflow management with stage-based tracking");
  }
  if (hasAny(descLower + nameLower, ["search", "recommend", "discovery", "filter"])) {
    features.push("Search and recommendation interfaces");
  }
  if (hasAny(descLower + nameLower, ["ai", "ml", "machine learning", "model", "agent", "llm", "gpt"])) {
    features.push("AI/ML-powered processing and inference");
  }
  if (hasAny(descLower + nameLower, ["geospatial", "map", "gis", "spatial", "geo", "leaflet"])) {
    features.push("Geospatial data processing and map visualization");
  }
  if (hasAny(descLower + nameLower, ["api", "rest", "endpoint", "backend"])) {
    features.push("RESTful API for client-server communication");
  }
  if (hasAny(descLower + nameLower, ["docker", "container", "deploy"])) {
    features.push("Containerized deployment workflow");
  }
  if (hasAny(descLower + nameLower, ["real-time", "realtime", "websocket", "live"])) {
    features.push("Real-time data updates and live interactions");
  }
  if (hasAny(descLower + nameLower, ["booking", "session", "schedule", "appointment"])) {
    features.push("Scheduling and session management flows");
  }
  if (hasAny(descLower + nameLower, ["track", "logger", "monitor", "log"])) {
    features.push("Structured logging and activity tracking");
  }
  if (topicsLower.includes("full-stack") || topicsLower.includes("fullstack")) {
    features.push("Full-stack client and server implementation");
  }

  if (tech.some((t) => /react|next/i.test(t))) {
    features.push("Component-based frontend with React");
  }
  if (tech.some((t) => /postgres|mongo|mysql|sqlite|postgis/i.test(t))) {
    features.push("Persistent data storage with database-backed models");
  }

  if (features.length === 0 && ctx.description) {
    features.push("Core application logic derived from repository scope");
  }
  if (features.length === 0) {
    features.push("Functional prototype implementing repository objectives");
  }

  return [...new Set(features)].slice(0, 5);
}

function inferProblem(ctx: InsightContext): string {
  const blob = `${ctx.nameLower} ${ctx.descLower}`;

  if (hasAny(blob, ["climaterisk", "climate", "geospatial risk"])) {
    return "Teams need accessible geospatial tools to evaluate climate-related risk for specific areas of interest.";
  }
  if (hasAny(blob, ["galaxy", "morphology", "astronom"])) {
    return "Large-scale astronomical datasets require automated classification instead of manual morphology labeling.";
  }
  if (hasAny(blob, ["applynest", "job application", "job track"])) {
    return "Job applicants need structured tracking across hiring stages and consistent parsing of job requirements.";
  }
  if (hasAny(blob, ["primetrade", "crypto", "trade log", "trading"])) {
    return "Traders need reliable position tracking with automated profit/loss calculations and portfolio insights.";
  }
  if (hasAny(blob, ["agent", "multi-agent", "autonomous"])) {
    return "Complex workflows benefit from autonomous agents that coordinate tasks and reduce manual orchestration.";
  }
  if (hasAny(blob, ["dashboard", "analytics", "engagement", "progress"])) {
    return "Stakeholders need a centralized view to monitor metrics, progress, and engagement in one interface.";
  }
  if (hasAny(blob, ["booking", "session", "mentor"])) {
    return "Users need a reliable system to discover, schedule, and manage sessions without manual coordination.";
  }
  if (hasAny(blob, ["security", "vulnerability", "penetration"])) {
    return "Web applications require systematic security assessment to surface exploitable weaknesses early.";
  }
  if (hasAny(blob, ["blog", "content", "article", "publish"])) {
    return "Content creators need a structured platform to publish and manage articles efficiently.";
  }
  if (hasAny(blob, ["ecommerce", "order", "shop", "cart", "pizza"])) {
    return "Customers need a streamlined ordering flow with reliable cart and checkout behavior.";
  }
  if (hasAny(blob, ["crm", "lead", "customer"])) {
    return "Sales and support teams need organized customer data and actionable interaction history.";
  }
  if (ctx.description && ctx.description.length > 20) {
    const trimmed = ctx.description.replace(/\.$/, "");
    if (/^(a|an|the)\s/i.test(trimmed)) {
      return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}.`;
    }
    return `Addresses the need described in the repository: ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}.`;
  }

  const readableName = ctx.title.toLowerCase();
  return `Provides a software solution for ${readableName} use cases identified in the repository scope.`;
}

function buildTechnicalHighlights(ctx: InsightContext): string[] {
  const highlights: string[] = [];
  const { tech, descLower, nameLower } = ctx;
  const techLower = tech.map((t) => t.toLowerCase());

  const hasFrontend = techLower.some((t) =>
    /react|next|vite|vue|angular|html|css|tailwind|typescript|javascript/.test(t)
  );
  const hasBackend = techLower.some((t) =>
    /node|express|fastapi|django|flask|python|graphql|rest/.test(t)
  );
  const db = tech.find((t) => /postgres|mongo|mysql|sqlite|postgis|redis/i.test(t));
  const hasDocker = techLower.some((t) => t.includes("docker"));
  const hasMl = techLower.some((t) =>
    /pytorch|tensorflow|scikit|ml|deep learning|cnn/.test(t)
  );

  if (hasFrontend) {
    const stack = tech.filter((t) =>
      /react|next|typescript|javascript|vite|tailwind/i.test(t.toLowerCase())
    );
    highlights.push(
      `Frontend: ${stack.slice(0, 3).join(", ") || "React"} component structure`
    );
  }
  if (hasBackend) {
    const stack = tech.filter((t) =>
      /node|express|fastapi|python|rest|graphql/i.test(t.toLowerCase())
    );
    highlights.push(`Backend: ${stack.slice(0, 3).join(", ") || "API"} service layer`);
  }
  if (db) {
    highlights.push(`Database: ${db} for persistent application data`);
  }
  if (hasAny(descLower + nameLower, ["rest", "api", "endpoint"]) || hasBackend) {
    highlights.push("APIs: REST-style endpoints connecting client and server layers");
  }
  if (hasMl) {
    highlights.push("ML pipeline: data preprocessing, model training, and inference workflow");
  }
  if (hasDocker) {
    highlights.push("Architecture: containerized services for reproducible deployment");
  }
  if (hasFrontend && hasBackend) {
    highlights.push("Architecture: full-stack separation between UI and API services");
  } else if (!hasFrontend && hasBackend && hasMl) {
    highlights.push("Architecture: backend-centric processing pipeline with scriptable workflows");
  }

  if (highlights.length === 0) {
    highlights.push(
      `Implementation centered on ${tech.slice(0, 3).join(", ") || ctx.repo.language || "core repository technologies"}`
    );
  }

  return [...new Set(highlights)].slice(0, 5);
}

function inferEngineeringChallenge(ctx: InsightContext): string {
  const { tech, descLower, nameLower } = ctx;
  const techLower = tech.map((t) => t.toLowerCase());

  if (hasAny(nameLower + descLower, ["geospatial", "raster", "postgis", "spatial"])) {
    return "Processing spatial data at varying resolutions and projections — handled with dedicated geospatial libraries and AOI-scoped pipelines.";
  }
  if (hasAny(nameLower + descLower, ["jwt", "auth"]) && techLower.some((t) => /react|express|fastapi|node/.test(t))) {
    return "Enforcing authenticated, user-scoped access across frontend and API — implemented with JWT middleware and protected route patterns.";
  }
  if (hasAny(nameLower + descLower, ["ml", "model", "cnn", "pytorch", "classif"])) {
    return "Building a reproducible training and inference path — structured with checkpointing, evaluation steps, and modular preprocessing.";
  }
  if (hasAny(nameLower + descLower, ["async", "fastapi", "sqlalchemy", "primetrade"])) {
    return "Serving database-heavy endpoints without blocking — addressed with async API handlers and non-blocking ORM queries.";
  }
  if (hasAny(nameLower + descLower, ["kanban", "drag", "pipeline", "workflow"])) {
    return "Keeping application state consistent across interactive workflow UI — managed with validated schemas and persistent backend state.";
  }
  if (hasAny(nameLower + descLower, ["agent", "multi-agent"])) {
    return "Coordinating multiple autonomous components reliably — designed with modular agent roles and explicit task handoffs.";
  }
  if (hasAny(nameLower + descLower, ["search", "recommend"])) {
    return "Returning relevant results from unstructured inputs — implemented with ranking/filter logic and structured query interfaces.";
  }

  const fullStack = techLower.some((t) => /react|next/.test(t)) &&
    techLower.some((t) => /node|express|fastapi|python/.test(t));
  if (fullStack) {
    return "Integrating frontend state with backend contracts — solved by defining REST endpoints and consistent validation on both sides.";
  }

  return "Translating repository requirements into maintainable modules — organized code by responsibility across data, logic, and interface layers.";
}

function inferContribution(ctx: InsightContext): string {
  const { title, tech, repo } = ctx;
  const primary = tech.slice(0, 3).join(", ") || repo.language || "the project stack";
  const scope = tech.length >= 4 ? "full-stack" : tech.length >= 2 ? "multi-layer" : "core";

  if (hasAny(ctx.nameLower + ctx.descLower, ["intern", "assignment", "lab"])) {
    return `Implemented ${scope} features for ${title} using ${primary}, following repository-defined requirements.`;
  }

  return `Designed and built the ${scope} implementation for ${title}, covering architecture, core features, and integration across ${primary}.`;
}

function inferFromMetadata(ctx: InsightContext): ProjectInsights {
  return {
    problem: inferProblem(ctx),
    keyFeatures: pickFeatures(ctx),
    technicalHighlights: buildTechnicalHighlights(ctx),
    engineeringChallenge: inferEngineeringChallenge(ctx),
    contribution: inferContribution(ctx),
  };
}

export function buildProjectInsights(
  repo: GitHubRepo,
  input: { title: string; description: string; tech: string[]; nameLower: string }
): ProjectInsights {
  const resumeKey = Object.keys(RESUME_PROJECT_DETAILS).find((key) =>
    input.nameLower.includes(key)
  );

  if (resumeKey && RESUME_INSIGHTS[resumeKey]) {
    return RESUME_INSIGHTS[resumeKey];
  }

  const ctx: InsightContext = {
    repo,
    title: input.title,
    description: input.description,
    tech: input.tech,
    nameLower: input.nameLower,
    descLower: (repo.description || input.description).toLowerCase(),
    topicsLower: repo.topics.map((t) => t.toLowerCase()),
  };

  return inferFromMetadata(ctx);
}
