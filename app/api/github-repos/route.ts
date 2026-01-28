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

    // Map and return repos with descriptions preserved
    const mappedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || null, // Preserve null if no description
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
    }));

    // Log descriptions for debugging
    console.log('📋 Server-side GitHub API - Repos with descriptions:', 
      mappedRepos.slice(0, 5).map(r => ({
        name: r.name,
        hasDescription: !!r.description,
        description: r.description ? r.description.substring(0, 50) + '...' : 'null'
      }))
    );

    return NextResponse.json(mappedRepos);
  } catch (error: any) {
    console.error('Error fetching GitHub repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories', details: error.message },
      { status: 500 }
    );
  }
}
