import type { GitHubRepo, GitHubUserProfile } from "./github";
import {
  EDUCATION_START_DATE,
  INTERNSHIPS,
  getListedSkills,
} from "./profile-data";

export interface ImpactMetric {
  label: string;
  value: string;
  source: string;
}

const ACTIVE_PROJECT_MONTHS = 12;
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

function normalizeTech(value: string): string {
  return value.trim().toLowerCase();
}

function countTechnologies(repos: GitHubRepo[]): number {
  const technologies = new Set<string>();

  getListedSkills().forEach((skill) => technologies.add(normalizeTech(skill)));

  repos.forEach((repo) => {
    if (repo.language) {
      technologies.add(normalizeTech(repo.language));
    }
    repo.topics.forEach((topic) => technologies.add(normalizeTech(topic)));
  });

  return technologies.size;
}

function countActiveProjects(repos: GitHubRepo[]): number {
  const cutoff = Date.now() - ACTIVE_PROJECT_MONTHS * 30 * 24 * 60 * 60 * 1000;

  return repos.filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      new Date(repo.updated_at).getTime() >= cutoff
  ).length;
}

function countOriginalRepos(repos: GitHubRepo[]): number {
  return repos.filter((repo) => !repo.fork).length;
}

function calculateYearsLearning(
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

  const learningStart = Math.min(...startTimestamps);
  const years = (Date.now() - learningStart) / MS_PER_YEAR;

  return Math.round(years * 10) / 10;
}

function formatYears(value: number): string {
  return value % 1 === 0 ? `${value}` : value.toFixed(1);
}

export function computeImpactMetrics(
  repos: GitHubRepo[],
  profile: GitHubUserProfile | null
): ImpactMetric[] {
  const publicRepoCount =
    profile?.public_repos ?? countOriginalRepos(repos);
  const repoSource = profile
    ? "Public repositories on GitHub"
    : "Original repositories fetched from GitHub";

  const years = calculateYearsLearning(repos, profile);
  const yearSources: string[] = [`B.Tech start (${EDUCATION_START_DATE.slice(0, 7)})`];
  if (profile?.created_at) {
    yearSources.push("GitHub account creation");
  }
  const originalRepos = repos.filter((repo) => !repo.fork);
  if (originalRepos.length > 0) {
    yearSources.push("earliest public repository");
  }

  return [
    {
      label: "GitHub Repositories",
      value: String(publicRepoCount),
      source: repoSource,
    },
    {
      label: "Technologies Used",
      value: String(countTechnologies(repos)),
      source: "Listed skills plus languages and topics from public repos",
    },
    {
      label: "Internship Experiences",
      value: String(INTERNSHIPS.length),
      source: "Completed and in-progress internships on resume",
    },
    {
      label: "Active Projects",
      value: String(countActiveProjects(repos)),
      source: `Non-fork, non-archived repos updated in the last ${ACTIVE_PROJECT_MONTHS} months`,
    },
    {
      label: "Years Learning Software Development",
      value: formatYears(years),
      source: `From earliest of ${yearSources.join(", ")}`,
    },
  ];
}
