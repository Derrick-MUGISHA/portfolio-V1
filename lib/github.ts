import type { GitHubData, Repository, Commit, ContributionDay } from "@/types/github"

// Function to fetch GitHub data from the real GitHub API
export async function fetchGitHubData(username: string): Promise<GitHubData> {
  try {
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`)
    }

    const reposData = await reposResponse.json()

    // Transform repositories data
    const repositories: Repository[] = reposData.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      defaultBranch: repo.default_branch,
      updatedAt: repo.updated_at,
    }))

    // Fetch recent commits (this is a simplified approach)
    // In a real app, you might need to fetch commits for each repository
    const commitsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=10`)

    if (!commitsResponse.ok) {
      throw new Error(`GitHub API error: ${commitsResponse.status}`)
    }

    const eventsData = await commitsResponse.json()

    // Filter push events and extract commits
    const commits: Commit[] = []

    eventsData.forEach((event: any) => {
      if (event.type === "PushEvent") {
        event.payload.commits.forEach((commit: any) => {
          commits.push({
            id: commit.sha,
            message: commit.message,
            repository: event.repo.name.split("/")[1],
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
            date: event.created_at,
          })
        })
      }
    })

    // Fetch contribution data (this requires a GraphQL query to GitHub's API)
    // For demo purposes, we'll generate mock contribution data
    const contributionData = generateMockContributionData()

    return {
      username,
      repositories,
      commits,
      contributions: contributionData,
    }
  } catch (error) {
    console.error("Error fetching GitHub data:", error)

    // Fallback to mock data if the API fails
    return generateMockGitHubData(username)
  }
}

// Generate mock GitHub data for demo purposes
function generateMockGitHubData(username: string): GitHubData {
  const repositories: Repository[] = [
    {
      id: "repo1",
      name: "portfolio-website",
      description: "My personal portfolio website built with Next.js and Three.js",
      url: `https://github.com/${username}/portfolio-website`,
      stars: 24,
      forks: 5,
      topics: ["next-js", "three-js", "portfolio", "typescript"],
      defaultBranch: "main",
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "repo2",
      name: "react-3d-viewer",
      description: "A React component for viewing 3D models with Three.js",
      url: `https://github.com/${username}/react-3d-viewer`,
      stars: 156,
      forks: 32,
      topics: ["react", "three-js", "3d", "component", "npm-package"],
      defaultBranch: "main",
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
    {
      id: "repo3",
      name: "node-api-starter",
      description: "A starter template for Node.js APIs with Express and TypeScript",
      url: `https://github.com/${username}/node-api-starter`,
      stars: 87,
      forks: 15,
      topics: ["node-js", "express", "typescript", "api", "starter-template"],
      defaultBranch: "main",
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    },
    {
      id: "repo4",
      name: "e-commerce-platform",
      description: "A full-stack e-commerce platform with React, Node.js, and MongoDB",
      url: `https://github.com/${username}/e-commerce-platform`,
      stars: 42,
      forks: 8,
      topics: ["e-commerce", "react", "node-js", "mongodb", "full-stack"],
      defaultBranch: "main",
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    },
  ]

  const commits: Commit[] = [
    {
      id: "commit1",
      message: "Fix responsive layout issues on mobile devices",
      repository: "portfolio-website",
      url: `https://github.com/${username}/portfolio-website/commit/abc123`,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "commit2",
      message: "Add dark mode support",
      repository: "portfolio-website",
      url: `https://github.com/${username}/portfolio-website/commit/def456`,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "commit3",
      message: "Implement GLTF model loading with progress indicator",
      repository: "react-3d-viewer",
      url: `https://github.com/${username}/react-3d-viewer/commit/ghi789`,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      id: "commit4",
      message: "Update dependencies and fix security vulnerabilities",
      repository: "node-api-starter",
      url: `https://github.com/${username}/node-api-starter/commit/jkl012`,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    },
    {
      id: "commit5",
      message: "Add unit tests for authentication middleware",
      repository: "node-api-starter",
      url: `https://github.com/${username}/node-api-starter/commit/mno345`,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    },
    {
      id: "commit6",
      message: "Implement shopping cart functionality with local storage persistence",
      repository: "e-commerce-platform",
      url: `https://github.com/${username}/e-commerce-platform/commit/pqr678`,
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    },
  ]

  return {
    username,
    repositories,
    commits,
    contributions: generateMockContributionData(),
  }
}

// Generate mock contribution data for the GitHub activity graph
function generateMockContributionData(): ContributionDay[] {
  const contributions: ContributionDay[] = []
  const today = new Date()

  // Generate data for the last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Generate a random contribution count with higher probability on weekdays
    // and occasional streaks of activity
    let count = 0
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Create a pattern with some streaks and gaps
    if (i % 7 === 0) {
      // Create a streak every 7 days
      count = Math.floor(Math.random() * 12) + 1
    } else if (i % 23 === 0) {
      // Create a high activity day occasionally
      count = Math.floor(Math.random() * 20) + 5
    } else if (isWeekend) {
      // Less activity on weekends
      count = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0
    } else {
      // Normal weekday
      count = Math.random() > 0.3 ? Math.floor(Math.random() * 8) : 0
    }

    // Add some recent high activity
    if (i < 14) {
      count = Math.max(count, Math.floor(Math.random() * 10))
    }

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
    })
  }

  return contributions
}

