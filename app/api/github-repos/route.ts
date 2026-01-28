import { NextRequest, NextResponse } from 'next/server';

// Server-side GitHub API route to fetch repositories
// This avoids CORS issues and ensures we get complete data including descriptions

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Fetch repositories from GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Website',
        },
        // Add cache control to ensure fresh data
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const repos: any[] = await response.json();

    // Debug: Log raw API response for first few repos
    console.log('🔍 Raw GitHub API Response Sample:', 
      repos.slice(0, 3).map((r: any) => ({
        name: r.name,
        description: r.description,
        descriptionType: typeof r.description,
        fullRepo: r // Log full repo object to see all fields
      }))
    );

    // Fetch README content for repos without descriptions
    // This helps when descriptions exist in README but not in the About section
    const reposWithDescriptions = await Promise.all(
      repos.map(async (repo: any) => {
        let description = repo.description;
        
        // Handle description field
        if (description === null || description === undefined || description === '') {
          description = null;
        } else {
          description = String(description).trim();
          if (description.length === 0) {
            description = null;
          }
        }
        
        // If no description from API, try to get it from README
        if (!description) {
          try {
            // Try to fetch README content
            const readmeResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/readme`,
              {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                  'User-Agent': 'Portfolio-Website',
                },
              }
            );
            
            if (readmeResponse.ok) {
              const readmeData: any = await readmeResponse.json();
              // Decode base64 content
              const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
              
              // Extract description from README
              // Strategy: Look for the first paragraph after the title
              const lines = readmeContent.split('\n');
              
              // Skip the title (first # heading) and find first substantial paragraph
              let foundTitle = false;
              let descriptionLines: string[] = [];
              
              for (const line of lines) {
                const trimmed = line.trim();
                
                // Skip empty lines, images, code blocks, and other headings
                if (trimmed.length === 0 || 
                    trimmed.startsWith('![') ||
                    trimmed.startsWith('```') ||
                    trimmed.startsWith('|') || // Tables
                    trimmed.match(/^#{2,}/)) { // Subheadings
                  continue;
                }
                
                // Found the main title
                if (trimmed.startsWith('# ') && !foundTitle) {
                  foundTitle = true;
                  continue;
                }
                
                // After title, collect first substantial paragraph
                if (foundTitle && trimmed.length >= 30) {
                  // This looks like a description paragraph
                  description = trimmed.substring(0, 300).trim(); // Limit to 300 chars
                  // Remove markdown links and formatting
                  description = description
                    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
                    .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold
                    .replace(/\*([^\*]+)\*/g, '$1') // Remove italic
                    .replace(/`([^`]+)`/g, '$1'); // Remove code
                  
                  if (description.length > 0) {
                    console.log(`✅ Extracted description from README for "${repo.name}": ${description.substring(0, 60)}...`);
                    break;
                  }
                }
              }
            }
          } catch (readmeError) {
            // Silently fail - we'll just use null description
            console.log(`⚠️ Could not fetch README for "${repo.name}"`);
          }
        }
        
        return {
          id: repo.id,
          name: repo.name,
          description: description, // Can be string or null
          html_url: repo.html_url,
          homepage: repo.homepage || null,
          language: repo.language || null,
          topics: repo.topics || [],
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          fork: repo.fork || false,
          archived: repo.archived || false,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
        };
      })
    );

    // Log descriptions for debugging
    console.log('📋 Server-side GitHub API - Final repos with descriptions:', 
      reposWithDescriptions.slice(0, 6).map(r => ({
        name: r.name,
        hasDescription: !!r.description,
        description: r.description ? r.description.substring(0, 80) + '...' : 'NULL',
        descriptionLength: r.description ? r.description.length : 0
      }))
    );

    return NextResponse.json(reposWithDescriptions);
  } catch (error: any) {
    console.error('Error fetching GitHub repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories', details: error.message },
      { status: 500 }
    );
  }
}
