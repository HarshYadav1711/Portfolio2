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

// Validate URL format
function isValidUrlFormat(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

// Validate URL using server-side API route
async function validateUrl(url: string): Promise<boolean> {
  // First check URL format
  if (!isValidUrlFormat(url)) {
    return false;
  }

  try {
    // Use API route to validate URL server-side (avoids CORS issues)
    const response = await fetch(`/api/validate-url?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error(`Error validating URL ${url}:`, error);
    // If validation fails, err on the side of caution and return false
    return false;
  }
}

// Convert GitHub repos to Project format
export async function convertReposToProjects(repos: GitHubRepo[], username: string): Promise<Project[]> {
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

  // Known problematic projects that should not show live URLs
  // These projects have homepage URLs set but return 404
  // Check both repository names and URL patterns
  const problematicProjects = ['her', 'my-portfolio', 'myportfolio'];
  const problematicUrlPatterns = [
    /her/i,  // Match "her" in URLs
    /my-?portfolio/i,  // Match "my-portfolio" or "myportfolio" in URLs
  ];

  // Process projects and validate URLs
  const projects = await Promise.all(
    filteredRepos.map(async (repo, index) => {
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

      // Validate homepage URL
      let liveUrl = '';
      const repoNameLower = repo.name.toLowerCase().trim();
      const homepageLower = (repo.homepage || '').toLowerCase().trim();
      
      // Check if this is a known problematic project by repository name
      const isProblematicByName = problematicProjects.some(problematic => {
        const problematicLower = problematic.toLowerCase().trim();
        return repoNameLower === problematicLower || repoNameLower.includes(problematicLower);
      });
      
      // Check if URL matches problematic patterns
      const isProblematicByUrl = problematicUrlPatterns.some(pattern => 
        pattern.test(repo.homepage || '')
      );
      
      const isProblematicProject = isProblematicByName || isProblematicByUrl;

      // Also check if URL is a Vercel deployment that might be broken
      const isVercelDeployment = homepageLower.includes('vercel.app') || homepageLower.includes('vercel.com');

      if (repo.homepage && repo.homepage.trim() !== '') {
        // Skip validation for known problematic projects - don't show live URL at all
        if (isProblematicProject) {
          console.warn(`Skipping live URL for known problematic project: ${repo.name} (URL: ${repo.homepage})`);
          liveUrl = '';
        } else if (isVercelDeployment) {
          // For Vercel deployments, always validate to catch 404 errors
          const isValid = await validateUrl(repo.homepage);
          if (isValid) {
            liveUrl = repo.homepage;
          } else {
            console.warn(`Invalid or inaccessible Vercel deployment for project ${repo.name}: ${repo.homepage}`);
            liveUrl = '';
          }
        } else {
          // Validate URL for other projects
          const isValid = await validateUrl(repo.homepage);
          if (isValid) {
            liveUrl = repo.homepage;
          } else {
            // URL is invalid, don't set liveUrl
            console.warn(`Invalid or inaccessible URL for project ${repo.name}: ${repo.homepage}`);
            liveUrl = '';
          }
        }
      }

      return {
        title: repo.name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        description: description,
        tech: tech.length > 0 ? tech : ['JavaScript', 'Git'],
        image: `/project${index + 1}.jpg`, // TODO: Add project screenshots to /public folder (project1.jpg, project2.jpg, etc.)
        liveUrl: liveUrl,
        githubUrl: repo.html_url,
      };
    })
  );

  return projects;
}

