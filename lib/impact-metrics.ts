import type { GitHubRepo, GitHubUserProfile } from "./github";
import { RESUME_PROJECT_DETAILS } from "./config";
import {
  EDUCATION_START_DATE,
  PRODUCTION_SYSTEMS,
  getCompletedInternships,
  getListedSkills,
} from "./profile-data";

export interface ImpactMetric {
  label: string;
  value: string;
  source: string;
}

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

function repoMatchesSlug(repo: GitHubRepo, slug: string): boolean {
  return (
    !repo.fork &&
    repo.name.toLowerCase().includes(slug.toLowerCase())
  );
}

function countResumeProjects(repos: GitHubRepo[]): number {
  const slugs = Object.keys(RESUME_PROJECT_DETAILS);

  if (repos.length === 0) {
    return slugs.length;
  }

  return slugs.filter((slug) =>
    repos.some((repo) => repoMatchesSlug(repo, slug))
  ).length;
}

function countProductionSystems(repos: GitHubRepo[]): number {
  if (repos.length === 0) {
    return PRODUCTION_SYSTEMS.length;
  }

  return PRODUCTION_SYSTEMS.filter((slug) =>
    repos.some((repo) => repoMatchesSlug(repo, slug))
  ).length;
}

function countTechnologiesApplied(): number {
  return getListedSkills().length;
}

function calculateYearsBuilding(
  repos: GitHubRepo[],
  profile: GitHubUserProfile | null
): number {
  const startTimestamps = [new Date(EDUCATION_START_DATE).getTime()];

  if (profile?.created_at) {
    startTimestamps.push(new Date(profile.created_at).getTime());
  }

  const originalRepos = repos.filter((repo) => !repo.fork);
  if (originalRepos.length > 0) {
    const earliestRepo = originalRepos.reduce((earliest, repo) => {
      const created = new Date(repo.created_at).getTime();
      return created < earliest ? created : earliest;
    }, Infinity);

    if (earliestRepo !== Infinity) {
      startTimestamps.push(earliestRepo);
    }
  }

  const buildingStart = Math.min(...startTimestamps);
  const years = (Date.now() - buildingStart) / MS_PER_YEAR;

  return Math.round(years * 10) / 10;
}

function formatYears(value: number): string {
  return value % 1 === 0 ? `${value}` : value.toFixed(1);
}

export function computeImpactMetrics(
  repos: GitHubRepo[],
  profile: GitHubUserProfile | null
): ImpactMetric[] {
  const projectCount = countResumeProjects(repos);
  const projectSource =
    repos.length > 0
      ? "Resume projects matched to public GitHub repos"
      : "Resume-documented portfolio projects";

  const productionCount = countProductionSystems(repos);
  const productionSource =
    repos.length > 0
      ? "Auth, API, and data-layer systems verified on GitHub"
      : "Full-stack systems on resume";

  const completedInternships = getCompletedInternships();
  const years = calculateYearsBuilding(repos, profile);
  const yearSources: string[] = [
    `B.Tech start (${EDUCATION_START_DATE.slice(0, 7)})`,
  ];
  if (profile?.created_at) {
    yearSources.push("GitHub account creation");
  }
  const originalRepos = repos.filter((repo) => !repo.fork);
  if (originalRepos.length > 0) {
    yearSources.push("earliest public repository");
  }

  return [
    {
      label: "Projects Completed",
      value: String(projectCount),
      source: projectSource,
    },
    {
      label: "Technologies Applied",
      value: String(countTechnologiesApplied()),
      source: "Resume and portfolio skill listings",
    },
    {
      label: "Internships Completed",
      value: String(completedInternships.length),
      source: `Completed: ${completedInternships.map((i) => i.role).join(", ")}`,
    },
    {
      label: "Production Systems Built",
      value: String(productionCount),
      source: productionSource,
    },
    {
      label: "Years Building Software",
      value: formatYears(years),
      source: `From earliest of ${yearSources.join(", ")}`,
    },
  ];
}
