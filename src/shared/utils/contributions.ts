export interface ContributionActivity {
  commits: number
  issues: number
  last_activity_at: string | null
  pull_requests_merged: number
  reviews: number
  role: string | null
}

export interface ContributedRepositoryOwner {
  avatar_url: string | null
  name: string
  type: string | null
  url: string | null
}

export interface ContributedRepository {
  description: string | null
  fork: boolean | null
  name: string
  owner: ContributedRepositoryOwner
  stars: number
  url: string
}

export interface ContributedProject {
  contribution: ContributionActivity
  repository: ContributedRepository
}

// A merged pull request carries its review rounds with it.
// A review carries reading someone else's code.
// So both weigh more than a single commit.
export const getContributionVolume = (project: ContributedProject) =>
  project.contribution.commits +
  project.contribution.pull_requests_merged * 3 +
  project.contribution.reviews * 2 +
  project.contribution.issues

// Ranks how much was done against how far the project reaches.
// Both sides are logarithmic.
// So one commit to a huge project cannot outrank years of maintenance.
// And a thousand commits to a project nobody uses cannot outrank a fix in Nuxt.
export const getContributionScore = (project: ContributedProject) =>
  Math.log10(getContributionVolume(project) + 1) *
  Math.log10(project.repository.stars + 10)

// GitHub lists repositories for reasons that are not contributions, plain ownership among them.
// Those would render a row whose every link leads to an empty search result.
export const hasContribution = (project: ContributedProject) =>
  getContributionVolume(project) > 0
