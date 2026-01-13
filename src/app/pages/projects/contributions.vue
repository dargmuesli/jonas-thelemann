<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-6">
    <div class="flex flex-col items-center gap-4">
      <img
        alt="dargmuesli"
        class="size-20 shrink-0 rounded-full sm:size-24"
        src="https://avatars.githubusercontent.com/u/4778485?v=4"
      />
      <h1 class="flex flex-col">
        <span
          class="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-300"
        >
          {{ t('openSourceContributionsName', { total: repos.length }) }}
        </span>
        <span
          class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100"
        >
          {{ t('openSourceContributions') }}
        </span>
      </h1>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('search')"
        class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
      />
      <select
        v-model="sortBy"
        :aria-label="t('sortBy')"
        class="rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
      >
        <option value="stars">{{ t('sortByStars') }}</option>
        <option value="name">{{ t('sortByName') }}</option>
      </select>
    </div>

    <div class="flex flex-col gap-6">
      <div
        v-for="(group, owner) in groupedRepos"
        :key="owner"
        class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        <VioLink
          :aria-label="t('viewGitHubProfile', { owner })"
          class="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 sm:px-6 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          is-external-icon-disabled
          :to="`https://github.com/${owner}`"
        >
          <img
            v-if="group.length"
            :src="group[0]?.repository.owner.avatar_url"
            :alt="t('profilePicture')"
            class="h-8 w-8 shrink-0 rounded-full sm:h-10 sm:w-10"
          />
          <h2
            class="truncate text-base font-semibold text-blue-600 hover:underline sm:text-lg dark:text-blue-400"
          >
            {{ owner }}
          </h2>
        </VioLink>

        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li
            v-for="repo in expandedGroups[owner]
              ? group
              : group.slice(0, REPO_PREVIEW_LIMIT)"
            :key="repo.repository.url"
            class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div
              class="flex items-start justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
            >
              <VioLink
                class="group flex min-w-0 flex-1 flex-col gap-2"
                is-external-icon-disabled
                :to="repo.repository.url"
              >
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <h3
                    class="truncate text-sm font-semibold text-blue-600 group-hover:underline sm:text-base dark:text-blue-400"
                  >
                    {{ repo.repository.name }}
                  </h3>
                  <span
                    v-if="repo.repository.fork"
                    class="shrink-0 rounded border border-yellow-300 bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  >
                    {{ t('fork') }}
                  </span>
                </div>
                <p
                  v-if="repo.repository.description"
                  class="line-clamp-2 text-xs text-gray-600 sm:text-sm dark:text-gray-400"
                >
                  {{ repo.repository.description }}
                </p>
                <p
                  v-else
                  class="text-xs text-gray-600 italic sm:text-sm dark:text-gray-400"
                >
                  {{ t('noDescription') }}
                </p>
              </VioLink>
              <div class="flex shrink-0 flex-col items-end gap-2">
                <div
                  class="flex items-center gap-1 text-xs text-gray-600 sm:text-sm dark:text-gray-400"
                >
                  <svg
                    class="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.147.612a.75.75 0 01.416 1.279l-3.046 2.97.718 4.53a.75.75 0 01-1.088.791L8 12.347l-4.002 2.107a.75.75 0 01-1.088-.79l.718-4.53L1.382 6.374a.75.75 0 01.416-1.28l4.147-.611L7.327.668A.75.75 0 018 .25z"
                    />
                  </svg>
                  <span class="font-medium">{{
                    repo.repository.stars.toLocaleString()
                  }}</span>
                </div>
                <VioLink
                  :aria-label="
                    t('viewMyCommits', { repo: repo.repository.name })
                  "
                  class="text-xs text-gray-600 underline-offset-2 hover:underline sm:text-sm dark:text-gray-400"
                  is-external-icon-disabled
                  :to="`https://github.com/${owner}/${repo.repository.name}/commits?author=dargmuesli`"
                >
                  {{ t('myCommits') }}
                </VioLink>
              </div>
            </div>
          </li>
        </ul>

        <button
          v-if="group.length > REPO_PREVIEW_LIMIT"
          class="flex w-full items-center justify-center gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:px-6 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          @click="toggleExpandedGroup(owner)"
        >
          <span>{{
            expandedGroups[owner]
              ? t('showLess')
              : t('showMore', { count: group.length - REPO_PREVIEW_LIMIT })
          }}</span>
          <svg
            :class="[
              'h-4 w-4 shrink-0 transition-transform',
              expandedGroups[owner] ? 'rotate-180' : '',
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="filteredAndSortedRepos.length === 0"
      class="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ t('noRepositoriesFound') }}
      </p>
    </div>

    <div
      class="text-center text-xs text-gray-500 sm:text-sm dark:text-gray-400"
    >
      {{
        t('showingRepositories', {
          count: filteredAndSortedRepos.length,
          total: repos.length,
        })
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import repos from '~/assets/data/contributions.json'

const { t } = useI18n()
const searchQuery = ref('')
const sortBy = ref('stars')
const expandedGroups = ref<Record<string, boolean>>({})
const REPO_PREVIEW_LIMIT = 3

const toggleExpandedGroup = (owner: string) => {
  expandedGroups.value[owner] = !expandedGroups.value[owner]
}

const filteredAndSortedRepos = computed(() => {
  const filtered = repos.filter((repo) => {
    const query = searchQuery.value.toLowerCase()
    return (
      repo.repository.name.toLowerCase().includes(query) ||
      repo.repository.description?.toLowerCase().includes(query) ||
      false
    )
  })

  return filtered.sort((a, b) => {
    if (sortBy.value === 'stars') {
      return b.repository.stars - a.repository.stars
    }
    return a.repository.name.localeCompare(b.repository.name)
  })
})

const groupedRepos = computed(() => {
  const groups: Record<string, typeof repos> = {}

  for (const repo of filteredAndSortedRepos.value) {
    const owner = repo.repository.owner.name
    if (!groups[owner]) {
      groups[owner] = []
    }
    groups[owner].push(repo)
  }

  // Sort groups by total stars or name
  return Object.fromEntries(
    Object.entries(groups)
      .sort((a, b) => {
        if (sortBy.value === 'stars') {
          const starsA = a[1].reduce((sum, r) => sum + r.repository.stars, 0)
          const starsB = b[1].reduce((sum, r) => sum + r.repository.stars, 0)
          return starsB - starsA
        }
        return a[0].localeCompare(b[0])
      })
      .map(([owner, repos]) => [
        owner,
        repos.sort((a, b) => {
          if (sortBy.value === 'stars') {
            return b.repository.stars - a.repository.stars
          }
          return a.repository.name.localeCompare(b.repository.name)
        }),
      ]),
  )
})

useHeadDefault({
  description: t('description', {
    total: repos.length,
  }),
})
</script>

<i18n lang="yaml">
de:
  description: Beiträge zu {total} öffentlichen Softwareprojekten.
  fork: Fork
  myCommits: Beiträge ansehen
  noDescription: Keine Beschreibung verfügbar
  noRepositoriesFound: Keine Repositories gefunden.
  openSourceContributions: Öffentlichen Softwareprojekten
  openSourceContributionsName: 'Jonas Thelemann wirkte mit an {total}'
  profilePicture: Profilbild
  search: Repositories durchsuchen...
  showingRepositories: 'Zeige {count} von {total} Repositories'
  showLess: Weniger anzeigen
  showMore: '{count} weitere anzeigen'
  sortBy: Sortieren nach
  sortByName: Nach Name sortieren
  sortByStars: Nach Sternen sortieren
  viewGitHubProfile: 'GitHub-Profil von {owner} anzeigen'
  viewMyCommits: 'Beiträge in {repo} anzeigen'
en:
  description: Contributions to {total} public software projects.
  fork: Fork
  myCommits: View contributions
  noDescription: No description available
  noRepositoriesFound: No repositories found.
  openSourceContributions: Public Software Projects
  openSourceContributionsName: Jonas Thelemann contributed to {total}
  profilePicture: Profile picture
  search: Search repositories...
  showingRepositories: 'Showing {count} of {total} repositories'
  showLess: Show less
  showMore: 'Show {count} more'
  sortBy: Sort by
  sortByName: Sort by name
  sortByStars: Sort by stars
  viewGitHubProfile: 'View {owner} GitHub profile'
  viewMyCommits: 'View contributions in {repo}'
</i18n>
