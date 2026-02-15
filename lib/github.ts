// GitHub API utility functions
import { PRIORITIZED_PROJECTS, EXCLUDED_PROJECTS, PROJECT_DISPLAY_NAMES, FEATURED_PROJECT_ORDER } from './config';

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

// Fetch repositories from GitHub using server-side API route
// This ensures we get complete data including descriptions and avoids CORS issues
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    // Use server-side API route instead of direct GitHub API call
    const response = await fetch(`/api/github-repos?username=${encodeURIComponent(username)}`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Log descriptions for debugging
    if (repos.length > 0) {
      console.log('📋 Fetched GitHub Repos - Descriptions Sample:', 
        repos.slice(0, 6).map(r => ({ 
          name: r.name, 
          description: r.description || '(null/empty)',
          descriptionType: typeof r.description,
          descriptionLength: r.description ? r.description.length : 0
        }))
      );
    }
    
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

// Available project images in the public folder
// These will be matched to projects in order (first project gets first image, etc.)
const PROJECT_IMAGES = [
  '/Screenshot 2025-12-09 234211.png',
  '/Screenshot 2025-12-09 234256.png',
  '/Screenshot 2025-12-09 234320.png',
  '/Screenshot 2025-12-09 234343.png',
];

// Map project names to their specific images
const getProjectImage = (repoName: string, index: number): string => {
  const nameLower = repoName.toLowerCase();
  
  // Map specific project names to their images
  if (nameLower.includes('qps')) {
    return '/QPS.png'; // QPS project image (add this image to public folder if you have one)
  }
  if (nameLower === '1' || nameLower.trim() === '1') {
    return '/1.png';
  }
  if (nameLower.includes('blog') && nameLower.includes('website')) {
    return '/Blog Website.png';
  }
  if (nameLower.includes('pokeslider') || nameLower.includes('poke-slider')) {
    return '/PokeSlider.png';
  }
  if (nameLower.includes('her')) {
    return '/Her.png';
  }
  if (nameLower.includes('portfolio')) {
    return '/Portfolio.png';
  }
  
  // Fallback to index-based assignment
  return index < PROJECT_IMAGES.length 
    ? PROJECT_IMAGES[index] 
    : `/project${index + 1}.jpg`;
};

// Convert GitHub repos to Project format
export async function convertReposToProjects(repos: GitHubRepo[], username: string): Promise<Project[]> {
  // Filter out forks, archived repos, and excluded projects
  const filteredRepos = repos.filter(repo => {
    const nameLower = repo.name.toLowerCase();
    
    // Check if project is explicitly excluded
    const isExcluded = EXCLUDED_PROJECTS.some(excluded => 
      nameLower.includes(excluded.toLowerCase())
    );
    
    // Standard filters
    const isStandardFiltered = 
      repo.name.includes('portfolio') || 
      repo.fork || 
      repo.archived || 
      repo.name.includes('test');
    
    return !isExcluded && !isStandardFiltered;
  });

  // Check if project is prioritized (AI Agent projects or explicitly prioritized)
  const isPrioritizedProject = (repo: GitHubRepo): boolean => {
    const nameLower = repo.name.toLowerCase();
    const descLower = (repo.description || '').toLowerCase();
    const topicsLower = repo.topics.map(t => t.toLowerCase());
    
    // Check if explicitly prioritized in config (includes QPS and AI Agent projects)
    const isExplicitlyPrioritized = PRIORITIZED_PROJECTS.some(prioritized => 
      nameLower.includes(prioritized.toLowerCase())
    );
    
    // Check for AI Agent keywords
    const hasAIAgentKeywords = (
      nameLower.includes('ai') && nameLower.includes('agent') ||
      nameLower.includes('agent') && (nameLower.includes('ai') || descLower.includes('ai')) ||
      topicsLower.includes('ai-agent') ||
      topicsLower.includes('ai') && topicsLower.includes('agent') ||
      descLower.includes('ai agent') ||
      descLower.includes('artificial intelligence agent')
    );
    
    return isExplicitlyPrioritized || hasAIAgentKeywords;
  };

  // Separate prioritized projects (QPS, AI Agents) from others
  const prioritizedProjects = filteredRepos.filter(isPrioritizedProject);
  const otherProjects = filteredRepos.filter(repo => !isPrioritizedProject(repo));

  // Sort prioritized projects by FEATURED_PROJECT_ORDER, then by recency
  const getOrderIndex = (repoName: string) => {
    const nameLower = repoName.toLowerCase();
    const idx = FEATURED_PROJECT_ORDER.findIndex(key => nameLower.includes(key));
    return idx >= 0 ? idx : FEATURED_PROJECT_ORDER.length;
  };
  
  const sortedPrioritizedProjects = prioritizedProjects.sort((a, b) => {
    const orderA = getOrderIndex(a.name);
    const orderB = getOrderIndex(b.name);
    if (orderA !== orderB) return orderA - orderB;
    // Same order group: sort by recency
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  // Sort other projects by stars first, then by update date
  const sortedOtherProjects = otherProjects.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  // Combine: Prioritized projects first (QPS, dashboards, AI Agents), then other projects
  // Show up to 8 prioritized so we include QPS + 3 dashboard projects + AI agents, then fill to 8 total
  const maxTotal = 8;
  const maxPrioritizedProjects = Math.min(8, sortedPrioritizedProjects.length);
  const maxOtherProjects = Math.max(0, maxTotal - maxPrioritizedProjects);
  
  const selectedRepos = [
    ...sortedPrioritizedProjects.slice(0, maxPrioritizedProjects),
    ...sortedOtherProjects.slice(0, maxOtherProjects)
  ];

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
    selectedRepos.map(async (repo, index) => {
      const tech = detectTechStack(repo);
      
      // Use the GitHub repository description exactly as it appears on GitHub
      let description = '';
      
      // Use the GitHub repository description exactly as it appears on GitHub
      // Check if description exists and is not null/empty
      if (repo.description && typeof repo.description === 'string' && repo.description.trim().length > 0) {
        // Use the actual GitHub description as-is (just trim whitespace)
        description = repo.description.trim();
      } else if (repo.description === null || repo.description === undefined || repo.description === '') {
        // Only use fallback if description is truly missing
        console.warn(`⚠️ No GitHub description found for repo: "${repo.name}". Value:`, repo.description);
        const nameWords = repo.name
          .split(/[-_]/)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
        description = `${nameWords} project`;
      } else {
        // Fallback for any other case
        description = String(repo.description).trim() || `${repo.name} project`;
      }

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

      // Assign image based on project name, or fallback to index-based assignment
      const projectImage = getProjectImage(repo.name, index);

      // Use custom display name if configured, otherwise format repo name
      const nameLower = repo.name.toLowerCase();
      const customTitle = Object.keys(PROJECT_DISPLAY_NAMES).find(key => nameLower.includes(key));
      const title = customTitle
        ? PROJECT_DISPLAY_NAMES[customTitle]
        : repo.name
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

      return {
        title,
        description: description,
        tech: tech.length > 0 ? tech : ['JavaScript', 'Git'],
        image: projectImage,
        liveUrl: liveUrl,
        githubUrl: repo.html_url,
      };
    })
  );

  return projects;
}

