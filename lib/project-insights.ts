import type { GitHubRepo } from "./github";
import { RESUME_PROJECT_DETAILS } from "./config";

export interface ProjectInsights {
  problem: string;
  keyFeatures: string[];
  outcomes: string[];
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
      "Infrastructure risk review needs AOI-scoped satellite analysis without hosting full raster archives — requires splitting map UI from server-side fetch, reprojection, and index computation.",
    keyFeatures: [
      "AOI-based infrastructure analysis with validation workflows",
      "NDVI, NDWI, and NDBI raster analytics pipelines",
      "Interactive Leaflet GIS dashboards with temporal analysis",
      "Heuristic risk scoring and infrastructure proximity metrics",
      "Microsoft Planetary Computer STAC API integration",
    ],
    technicalHighlights: [
      "React/TypeScript map client; geospatial work isolated in FastAPI services",
      "PostGIS spatial storage and indexed AOI boundary queries",
      "GeoPandas, Rasterio, and Shapely: reproject, clip to AOI, compute indices server-side",
      "Planetary Computer STAC: fetch only tiles required per analysis request",
    ],
    engineeringChallenge:
      "Source tiles arrive in mixed CRS and resolutions — added a server-side reproject-and-clip step before index math so API responses stay consistent regardless of upstream tile format.",
    contribution:
      "End-to-end platform: STAC ingestion, raster analytics, API layer, GIS dashboard.",
    outcomes: [
      "FastAPI returns NDVI, NDWI, and NDBI for validated AOIs without pre-downloading full catalogs",
      "PostGIS holds AOI boundaries; clients read results through a fixed REST contract",
      "Leaflet renders layers from API payloads — raster I/O stays off the browser",
      "STAC requests pull only the scenes needed for each run, not entire collections",
    ],
  },
  "ai_based_galaxy_morphology_classifier": {
    problem:
      "Survey-scale galaxy labeling needs repeatable batch runs — training, evaluation, and inference must be separate entry points with saved checkpoints, not one-off notebook execution.",
    keyFeatures: [
      "Spiral, Elliptical, and Irregular classification pipeline",
      "SDSS and Galaxy Zoo dataset ingestion and preprocessing",
      "Lightweight CNN architecture with data augmentation",
      "Training, evaluation, and checkpointing workflows",
      "Deployment-ready batch inference pipeline",
    ],
    technicalHighlights: [
      "PyTorch training module: configurable epochs, augmentation, checkpoint writes",
      "Shared Python preprocessing pipeline for training and inference scripts",
      "Evaluation step records per-class metrics before a checkpoint is used for inference",
      "Inference entry point loads weights from disk — no training deps at predict time",
    ],
    engineeringChallenge:
      "Full-dataset CNN training was too slow to iterate on — kept a lightweight architecture, fixed augmentation, and checkpoint resume so experiments and batch inference share one weight file.",
    contribution:
      "Full ML workflow: dataset prep, training, evaluation, inference-ready deployment scripts.",
    outcomes: [
      "Training writes checkpoints and per-class metrics for reproducible reruns",
      "Preprocessing normalizes SDSS and Galaxy Zoo inputs before each training job",
      "Batch inference script classifies imagery from a saved checkpoint without retraining",
      "Spiral, Elliptical, and Irregular labels produced through the same inference path",
    ],
  },
  applynest: {
    problem:
      "Application tracking needs per-user persistence in MongoDB and JD parsing that returns the same field shape when external AI endpoints are unavailable — requires auth-gated REST routes and a non-AI parser path.",
    keyFeatures: [
      "JWT-authenticated user accounts and protected routes",
      "Kanban-style application pipeline with drag-and-drop",
      "AI-assisted job description parsing",
      "Deterministic fallback for parsing without external APIs",
      "Resume bullet generation from parsed JD data",
    ],
    technicalHighlights: [
      "Express REST API with JWT middleware on protected routes",
      "MongoDB schemas for applications, pipeline stages, and parsed JD fields per user",
      "Parsing module enforces one output schema for AI and deterministic fallback paths",
      "React/TypeScript client submits schema-validated requests against fixed API contracts",
    ],
    engineeringChallenge:
      "External AI parsers fail or rate-limit without warning — built a deterministic fallback that writes the same document shape so MongoDB updates and form state do not depend on which parser ran.",
    contribution:
      "Full stack: auth, Kanban UI, REST API, MongoDB schemas, AI-assisted parsing with offline fallback.",
    outcomes: [
      "JWT-checked Express routes gate reads and writes to per-user application documents",
      "Kanban stage changes persist via REST; client state reloads from API responses",
      "JD parsing falls back to rule-based extraction when AI calls fail, keeping forms populated",
      "Resume bullets generated from parsed fields stored in MongoDB, not client-only state",
    ],
  },
  primetrade: {
    problem:
      "Trade logging and P&L require concurrent API handlers that do not block on database I/O, plus row-level isolation per authenticated user in PostgreSQL — needs async DB access and a containerized run configuration.",
    keyFeatures: [
      "JWT-authenticated trade and position logging",
      "Automated P&L calculations per position",
      "Portfolio analytics and performance summaries",
      "Strict user-level data isolation",
      "Docker Compose deployment for local/production parity",
    ],
    technicalHighlights: [
      "FastAPI async handlers with async SQLAlchemy sessions for PostgreSQL I/O",
      "P&L and portfolio aggregates computed in the service layer from position rows",
      "JWT auth; repository queries include user ID in WHERE clauses on every read/write",
      "Docker Compose defines API, database, and frontend services for repeatable deployment",
    ],
    engineeringChallenge:
      "Synchronous ORM calls would stall concurrent trade requests — moved to async SQLAlchemy and scoped every trade query to the authenticated user ID to prevent cross-account reads.",
    contribution:
      "Async API, auth layer, P&L analytics engine, React client, Docker Compose setup.",
    outcomes: [
      "Async endpoints serve trade and portfolio data without blocking the event loop on DB calls",
      "Per-position P&L derived from logged entries stored under transactional PostgreSQL writes",
      "Portfolio summaries exposed through the same FastAPI service that handles auth and trades",
      "Docker Compose runs the full stack locally and in containers with identical service definitions",
    ],
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

function inferOutcomes(ctx: InsightContext): string[] {
  const outcomes: string[] = [];
  const { descLower, nameLower, tech } = ctx;

  if (hasAny(nameLower + descLower, ["climaterisk", "climate", "geospatial", "ndvi", "stac"])) {
    outcomes.push(
      "Supports AOI-scoped geospatial analysis across open satellite-derived raster layers."
    );
  }
  if (hasAny(nameLower + descLower, ["galaxy", "morphology", "cnn", "classif"])) {
    outcomes.push(
      "Automates image classification through a reproducible training and inference pipeline."
    );
  }
  if (hasAny(nameLower + descLower, ["kanban", "job application", "applynest"])) {
    outcomes.push(
      "Tracks workflow state across pipeline stages with persistent, user-scoped records."
    );
  }
  if (hasAny(nameLower + descLower, ["primetrade", "crypto", "trade", "p&l", "portfolio"])) {
    outcomes.push(
      "Derives position-level profit-and-loss and portfolio summaries from logged trade data."
    );
  }
  if (hasAny(descLower + nameLower, ["auth", "jwt"])) {
    outcomes.push("Restricts data access to authenticated users via token-based API protection.");
  }
  if (hasAny(descLower + nameLower, ["dashboard", "analytics", "visual"])) {
    outcomes.push("Presents operational data through interactive dashboard views.");
  }
  if (hasAny(descLower + nameLower, ["api", "rest", "endpoint", "fastapi", "express"])) {
    outcomes.push("Exposes core application behavior through documented REST endpoints.");
  }
  if (hasAny(descLower + nameLower, ["docker", "container", "compose"])) {
    outcomes.push("Supports reproducible multi-service setups via containerized deployment.");
  }
  if (hasAny(descLower + nameLower, ["ml", "model", "pytorch", "inference"])) {
    outcomes.push("Delivers model predictions through a scriptable inference workflow.");
  }
  if (hasAny(descLower + nameLower, ["map", "leaflet", "gis", "spatial"])) {
    outcomes.push("Renders spatial results on interactive map interfaces.");
  }

  if (outcomes.length === 0 && tech.length > 0) {
    outcomes.push(
      `Delivers the repository's scoped functionality using ${tech.slice(0, 3).join(", ")}.`
    );
  }

  return [...new Set(outcomes)].slice(0, 4);
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
    outcomes: inferOutcomes(ctx),
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
