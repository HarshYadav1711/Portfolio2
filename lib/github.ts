// GitHub API utility functions
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

// Tech stack detection based on repository topics and language
const detectTechStack = (repo: GitHubRepo): string[] => {
  const tech: string[] = [];
  const topics = repo.topics.map(t => t.toLowerCase());
  const language = repo.language?.toLowerCase() || '';

  // Frontend
  if (topics.includes('react') || topics.includes('nextjs') || topics.includes('next.js')) tech.push('React', 'Next.js');
  else if (topics.includes('react')) tech.push('React');
  if (topics.includes('typescript') || language === 'typescript') tech.push('TypeScript');
  if (topics.includes('javascript') || language === 'javascript') tech.push('JavaScript');
  if (topics.includes('tailwind') || topics.includes('tailwindcss')) tech.push('TailwindCSS');
  if (topics.includes('html')) tech.push('HTML');
  if (topics.includes('css')) tech.push('CSS');

  // Backend
  if (topics.includes('nodejs') || topics.includes('node.js') || language === 'javascript') tech.push('Node.js');
  if (topics.includes('express') || topics.includes('expressjs')) tech.push('ExpressJS');
  if (topics.includes('python') || language === 'python') tech.push('Python');
  if (topics.includes('fastapi')) tech.push('FastAPI');
  if (topics.includes('django')) tech.push('Django');

  // Databases
  if (topics.includes('mongodb')) tech.push('MongoDB');
  if (topics.includes('mysql')) tech.push('MySQL');
  if (topics.includes('postgresql') || topics.includes('postgres')) tech.push('PostgreSQL');
  if (topics.includes('redis')) tech.push('Redis');

  // Tools & Others
  if (topics.includes('git')) tech.push('Git');
  if (topics.includes('docker')) tech.push('Docker');
  if (topics.includes('aws')) tech.push('AWS');
  if (topics.includes('figma')) tech.push('Figma');
  if (topics.includes('framer-motion') || topics.includes('framermotion')) tech.push('Framer Motion');

  // If no tech detected, use language
  if (tech.length === 0 && language) {
    tech.push(language.charAt(0).toUpperCase() + language.slice(1));
  }

  return [...new Set(tech)]; // Remove duplicates
};

// Fetch repositories from GitHub
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

// Convert GitHub repos to Project format
export function convertReposToProjects(repos: GitHubRepo[], username: string): Project[] {
  // Filter out forks and archived repos, sort by stars and recency
  const filteredRepos = repos
    .filter(repo => !repo.name.includes('portfolio') && !repo.fork && !repo.archived && !repo.name.includes('test'))
    .sort((a, b) => {
      // Sort by stars first, then by update date
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    })
    .slice(0, 6); // Get top 6 projects

  return filteredRepos.map((repo, index) => {
    const tech = detectTechStack(repo);
    
    // Generate a better description if none exists
    let description = repo.description || '';
    if (!description || description.trim().length === 0) {
      const nameWords = repo.name
        .split(/[-_]/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      description = `A ${nameWords} project showcasing modern development practices and clean architecture.`;
    }

    // Enhance short descriptions
    if (description.length < 60) {
      description += ` Built with best practices and modern web technologies.`;
    }

    // Capitalize first letter
    description = description.charAt(0).toUpperCase() + description.slice(1);

    return {
      title: repo.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      description: description,
      tech: tech.length > 0 ? tech : ['JavaScript', 'Git'],
      image: `/project${index + 1}.jpg`, // TODO: Add project screenshots to /public folder (project1.jpg, project2.jpg, etc.)
      liveUrl: repo.homepage || `https://${username}.github.io/${repo.name}`,
      githubUrl: repo.html_url,
    };
  });
}

