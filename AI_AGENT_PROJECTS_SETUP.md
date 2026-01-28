# AI Agent Projects Setup

## ✅ Changes Made

Your portfolio has been updated to automatically prioritize and display your AI Agent projects!

## How It Works

1. **Automatic Detection**: The portfolio automatically detects AI Agent projects by checking:
   - Repository name contains "ai" and "agent"
   - Repository description mentions "ai agent" or "artificial intelligence agent"
   - GitHub topics include "ai-agent" or both "ai" and "agent"

2. **Priority Display**: 
   - Up to **2 AI Agent projects** will be shown first in your portfolio
   - Remaining slots (up to 6 total) will be filled with your other projects
   - AI Agent projects are sorted by most recently updated

3. **Manual Configuration** (Optional):
   - If you want to explicitly specify which projects to prioritize, edit `lib/config.ts`
   - Add repository names to the `PRIORITIZED_PROJECTS` array
   - Example:
     ```typescript
     export const PRIORITIZED_PROJECTS: string[] = [
       "my-ai-agent-project",
       "another-ai-agent"
     ];
     ```

## What Happens Now

- Your portfolio will automatically fetch projects from GitHub
- AI Agent projects will be detected and prioritized
- They will appear at the top of your "Featured Projects" section
- The portfolio will show up to 6 projects total (2 AI Agent + 4 others)

## Verification

After deploying, check your portfolio:
1. Navigate to the "Projects" section
2. Your AI Agent projects should appear first
3. They should have proper descriptions, tech stack, and links

## Troubleshooting

If your AI Agent projects don't appear:

1. **Check Repository Names**: Make sure your repositories have "ai" and "agent" in the name or description
2. **Check GitHub Topics**: Add topics like "ai-agent", "ai", or "agent" to your repositories
3. **Manual Configuration**: Use the `PRIORITIZED_PROJECTS` array in `lib/config.ts` to explicitly specify project names
4. **Check Filters**: Ensure repositories are:
   - Not archived
   - Not forks
   - Not named "portfolio" or "test"
   - Public (private repos won't show unless authenticated)

## Example Repository Names That Will Be Detected

- `ai-agent-project`
- `my-ai-agent`
- `agent-ai-system`
- `intelligent-ai-agent`
- Any repository with "ai" and "agent" keywords

## Next Steps

1. **Deploy your changes** to see the AI Agent projects appear
2. **Verify** that your projects are showing correctly
3. **Customize** descriptions and topics on GitHub for better presentation
4. **Add live URLs** to your repositories' homepage field if you have deployed versions
