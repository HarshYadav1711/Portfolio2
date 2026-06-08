import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering (required when using searchParams)
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Website",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return NextResponse.json(
        { error: "Failed to fetch repositories" },
        { status: response.status }
      );
    }

    const repos: Array<Record<string, unknown>> = await response.json();

    // Enrich repos missing descriptions by extracting the first README paragraph
    const reposWithDescriptions = await Promise.all(
      repos.map(async (repo) => {
        let description = repo.description as string | null | undefined;

        if (description === null || description === undefined || description === "") {
          description = null;
        } else {
          description = String(description).trim();
          if (description.length === 0) {
            description = null;
          }
        }

        if (!description) {
          try {
            const readmeResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/readme`,
              {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  "User-Agent": "Portfolio-Website",
                },
              }
            );

            if (readmeResponse.ok) {
              const readmeData: { content: string } = await readmeResponse.json();
              const readmeContent = Buffer.from(readmeData.content, "base64").toString("utf-8");
              const lines = readmeContent.split("\n");
              let foundTitle = false;

              for (const line of lines) {
                const trimmed = line.trim();

                if (
                  trimmed.length === 0 ||
                  trimmed.startsWith("![") ||
                  trimmed.startsWith("```") ||
                  trimmed.startsWith("|") ||
                  trimmed.match(/^#{2,}/)
                ) {
                  continue;
                }

                if (trimmed.startsWith("# ") && !foundTitle) {
                  foundTitle = true;
                  continue;
                }

                if (foundTitle && trimmed.length >= 30) {
                  description = trimmed
                    .substring(0, 300)
                    .trim()
                    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
                    .replace(/\*\*([^\*]+)\*\*/g, "$1")
                    .replace(/\*([^\*]+)\*/g, "$1")
                    .replace(/`([^`]+)`/g, "$1");

                  if (description.length > 0) {
                    break;
                  }
                }
              }
            }
          } catch {
            // README enrichment is best-effort
          }
        }

        return {
          id: repo.id,
          name: repo.name,
          description,
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

    return NextResponse.json(reposWithDescriptions);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repositories" },
      { status: 500 }
    );
  }
}
