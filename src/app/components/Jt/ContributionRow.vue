<template>
  <div class="flex flex-col gap-1.5 px-4 py-3 sm:px-6">
    <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <VioLink
        class="group min-w-0 text-sm sm:text-base"
        is-external-icon-disabled
        :to="project.repository.url"
      >
        <span class="text-gray-500 dark:text-gray-400">{{ ownerPrefix }}</span
        ><span
          class="font-semibold text-blue-600 group-hover:underline dark:text-blue-400"
          >{{ project.repository.name }}</span
        >
      </VioLink>
      <span
        v-if="role"
        class="shrink-0 rounded border px-1.5 py-0.5 text-xs font-medium"
        :class="
          role.isMaintainer
            ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            : 'border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
        "
      >
        {{ role.label }}
      </span>
    </div>
    <p
      class="line-clamp-2 text-xs text-gray-600 sm:text-sm dark:text-gray-400"
      :class="{ italic: !project.repository.description }"
    >
      {{ project.repository.description || t('noDescription') }}
    </p>
    <ul
      class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-400"
    >
      <li
        :aria-label="t('stars', project.repository.stars)"
        class="flex items-center gap-1"
      >
        <svg
          aria-hidden="true"
          class="size-3.5 fill-current"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.147.612a.75.75 0 01.416 1.279l-3.046 2.97.718 4.53a.75.75 0 01-1.088.791L8 12.347l-4.002 2.107a.75.75 0 01-1.088-.79l.718-4.53L1.382 6.374a.75.75 0 01.416-1.28l4.147-.611L7.327.668A.75.75 0 018 .25z"
          />
        </svg>
        <span class="font-medium">{{
          project.repository.stars.toLocaleString(locale)
        }}</span>
      </li>
      <li v-for="stat in stats" :key="stat.label">
        <VioLink
          class="underline-offset-2 hover:underline"
          is-external-icon-disabled
          :to="stat.to"
        >
          {{ stat.label }}
        </VioLink>
      </li>
      <li v-if="lastActivityYear" class="text-gray-500 dark:text-gray-500">
        {{ t('lastActive', { year: lastActivityYear }) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ContributedProject } from '~~/shared/utils/contributions'

const { project } = defineProps<{
  project: ContributedProject
}>()

const { locale, t } = useI18n()

// Kept out of the template because a bare slash there counts as untranslated raw text.
const ownerPrefix = `${project.repository.owner.name}/`

const role = computed(() => {
  switch (project.contribution.role) {
    case 'ADMIN':
    case 'MAINTAIN':
      return { isMaintainer: true, label: t('roleMaintainer') }
    case 'WRITE':
      return { isMaintainer: false, label: t('roleTeamMember') }
    case 'TRIAGE':
      return { isMaintainer: false, label: t('roleTriage') }
    default:
      // Read access is what everyone has, so it says nothing worth a badge.
      return undefined
  }
})

// Only rendered where the count is positive, so every link leads to a populated search result.
const stats = computed(() => {
  const { commits, issues, pull_requests_merged, reviews } =
    project.contribution
  const url = project.repository.url

  return [
    {
      count: commits,
      label: t('commits', commits),
      to: `${url}/commits?author=${GITHUB_USER}`,
    },
    {
      count: pull_requests_merged,
      label: t('pullRequests', pull_requests_merged),
      to: `${url}/pulls?q=is%3Apr+is%3Amerged+author%3A${GITHUB_USER}`,
    },
    {
      count: reviews,
      label: t('reviews', reviews),
      to: `${url}/pulls?q=is%3Apr+reviewed-by%3A${GITHUB_USER}`,
    },
    {
      count: issues,
      label: t('issues', issues),
      to: `${url}/issues?q=is%3Aissue+author%3A${GITHUB_USER}`,
    },
  ].filter((stat) => stat.count > 0)
})

// Only the year is shown, which is all the distinction a reader needs here.
// It also keeps the markup free of locale-dependent date formatting.
const lastActivityYear = computed(() =>
  project.contribution.last_activity_at?.slice(0, 4),
)
</script>

<i18n lang="yaml">
de:
  commits: '{n} Commit | {n} Commits'
  issues: '{n} Issue | {n} Issues'
  lastActive: 'zuletzt {year}'
  noDescription: Keine Beschreibung verfügbar
  pullRequests: '{n} Pull Request | {n} Pull Requests'
  reviews: '{n} Review | {n} Reviews'
  roleMaintainer: Maintainer
  roleTeamMember: Teammitglied
  roleTriage: Triage
  stars: '{n} Stern | {n} Sterne'
en:
  commits: '{n} commit | {n} commits'
  issues: '{n} issue | {n} issues'
  lastActive: 'last active {year}'
  noDescription: No description available
  pullRequests: '{n} merged PR | {n} merged PRs'
  reviews: '{n} review | {n} reviews'
  roleMaintainer: Maintainer
  roleTeamMember: Team member
  roleTriage: Triage
  stars: '{n} star | {n} stars'
</i18n>
