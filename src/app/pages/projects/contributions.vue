<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-10">
    <div class="flex flex-col items-center gap-4">
      <img
        alt="dargmuesli"
        class="size-20 shrink-0 rounded-full sm:size-24"
        :src="
          isTesting
            ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxwYXRoIGQ9Ik0wLDBoMXYxSDB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+'
            : 'https://avatars.githubusercontent.com/u/4778485?v=4'
        "
      />
      <h1 class="flex flex-col text-center">
        <span
          class="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-300"
        >
          {{ t('openSourceContributionsName', { total: projects.length }) }}
        </span>
        <span
          class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100"
        >
          {{ t('openSourceContributions') }}
        </span>
      </h1>
      <p class="max-w-2xl text-center text-sm text-gray-600 dark:text-gray-400">
        {{
          t('summary', {
            major: majorProjectCount,
            signature: signatureContributions.length,
          })
        }}
      </p>
    </div>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2
          class="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100"
        >
          {{ t('signatureTitle') }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ t('signatureIntro') }}
        </p>
      </div>
      <ul class="grid gap-4 sm:grid-cols-2">
        <li
          v-for="item in signatureContributions"
          :key="item.title"
          class="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <h3
            class="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100"
          >
            {{ item.title }}
          </h3>
          <p class="grow text-xs text-gray-600 sm:text-sm dark:text-gray-400">
            {{ item.body }}
          </p>
          <ul class="flex flex-wrap gap-x-3 gap-y-1 text-xs">
            <li v-for="link in item.links" :key="link.to">
              <VioLink
                class="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                is-external-icon-disabled
                :to="link.to"
              >
                {{ link.label }}
              </VioLink>
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2
          class="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100"
        >
          {{ t('allTitle') }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ t('allIntro') }}
        </p>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          v-model="searchQuery"
          class="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          :placeholder="t('search')"
          type="text"
        />
        <select
          v-model="sortBy"
          :aria-label="t('sortBy')"
          class="rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        >
          <option value="contribution">{{ t('sortByContribution') }}</option>
          <option value="stars">{{ t('sortByStars') }}</option>
          <option value="recent">{{ t('sortByRecent') }}</option>
          <option value="name">{{ t('sortByName') }}</option>
        </select>
      </div>

      <ul
        v-if="visibleProjects.length"
        class="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
      >
        <li
          v-for="project in visibleProjects"
          :key="project.repository.url"
          class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <JtContributionRow :project />
        </li>
      </ul>
      <p
        v-else
        class="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {{ t('noRepositoriesFound') }}
      </p>

      <button
        v-if="filteredProjects.length > visibleProjects.length"
        class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        @click="isShowingAll = true"
      >
        {{
          t('showAll', {
            count: filteredProjects.length - visibleProjects.length,
          })
        }}
      </button>

      <p
        class="text-center text-xs text-gray-500 sm:text-sm dark:text-gray-400"
      >
        {{
          t('showingRepositories', {
            count: visibleProjects.length,
            total: projects.length,
          })
        }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ContributedProject } from '~~/shared/utils/contributions'

// Enough rows to show the ranking works without asking the reader to scroll past hundreds.
const PREVIEW_LIMIT = 20
// The threshold above which a project counts as one a reader is likely to recognize.
const MAJOR_PROJECT_STARS = 1000
const { t } = useI18n()
const isTesting = useIsTesting()

// Hand-written because no count knows which work mattered.
// Every claim here is a merged change, and the links are the evidence.
const signatureContributions = [
  {
    body: t('signatureSpotifyBody'),
    links: [
      {
        label: 'spotify-web-api-java',
        to: 'https://github.com/spotify-web-api-java/spotify-web-api-java',
      },
    ],
    title: t('signatureSpotifyTitle'),
  },
  {
    body: t('signatureGraphiqlBody'),
    links: [
      {
        label: 'graphiql#4448',
        to: 'https://github.com/graphql/graphiql/pull/4448',
      },
    ],
    title: t('signatureGraphiqlTitle'),
  },
  {
    body: t('signatureNuxtBody'),
    links: [
      {
        label: 'nuxt/nuxt#31020',
        to: 'https://github.com/nuxt/nuxt/pull/31020',
      },
    ],
    title: t('signatureNuxtTitle'),
  },
  {
    body: t('signatureCookieControlBody'),
    links: [
      {
        label: 'nuxt-cookie-control',
        to: 'https://github.com/dargmuesli/nuxt-cookie-control',
      },
    ],
    title: t('signatureCookieControlTitle'),
  },
  {
    body: t('signatureSyncthingBody'),
    links: [
      {
        label: 'syncthing#5446',
        to: 'https://github.com/syncthing/syncthing/pull/5446',
      },
    ],
    title: t('signatureSyncthingTitle'),
  },
  {
    body: t('signatureCrystalBody'),
    links: [
      {
        label: 'crystal#2954',
        to: 'https://github.com/graphile/crystal/pull/2954',
      },
      {
        label: 'crystal#2955',
        to: 'https://github.com/graphile/crystal/pull/2955',
      },
    ],
    title: t('signatureCrystalTitle'),
  },
]
const searchQuery = ref('')
const sortBy = ref('contribution')
const isShowingAll = ref(false)

const projects = (
  (
    await (isTesting
      ? import('~/assets/data/contributions-test.json')
      : import('~/assets/data/contributions.json'))
  ).default as ContributedProject[]
).filter(hasContribution)

const majorProjectCount = projects.filter(
  (project) =>
    project.repository.stars >= MAJOR_PROJECT_STARS &&
    (project.contribution.commits > 0 ||
      project.contribution.pull_requests_merged > 0),
).length

const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const matches = query
    ? projects.filter((project) =>
        [
          project.repository.name,
          project.repository.owner.name,
          project.repository.description,
        ].some((field) => field?.toLowerCase().includes(query)),
      )
    : [...projects]

  return matches.sort((a, b) => {
    switch (sortBy.value) {
      case 'stars':
        return b.repository.stars - a.repository.stars
      case 'recent':
        return (b.contribution.last_activity_at ?? '').localeCompare(
          a.contribution.last_activity_at ?? '',
        )
      case 'name':
        return a.repository.name.localeCompare(b.repository.name)
      default:
        return getContributionScore(b) - getContributionScore(a)
    }
  })
})

// A search narrows the list on its own, so the preview limit would only hide matches from it.
const visibleProjects = computed(() =>
  isShowingAll.value || searchQuery.value.trim()
    ? filteredProjects.value
    : filteredProjects.value.slice(0, PREVIEW_LIMIT),
)

useHeadDefault({
  description: t('description', {
    total: projects.length,
  }),
})
</script>

<i18n lang="yaml">
de:
  allIntro: Nach Gewicht des Beitrags sortiert, nicht nach Bekanntheit des Projekts.
  allTitle: Alle Beiträge
  description: Beiträge zu {total} öffentlichen Softwareprojekten.
  noRepositoriesFound: Keine Repositories gefunden.
  openSourceContributions: Öffentlichen Softwareprojekten
  openSourceContributionsName: 'Jonas Thelemann wirkte mit an {total}'
  search: Repositories durchsuchen...
  showAll: 'Alle anzeigen ({count} weitere)'
  showingRepositories: 'Zeige {count} von {total} Repositories'
  signatureCookieControlBody: Ein umfangreich konfigurierbarer Cookie-Banner für Nuxt. Ich habe die Betreuung übernommen und kümmere mich um Releases, Issues und Reviews.
  signatureCookieControlTitle: Maintainer von nuxt-cookie-control
  signatureCrystalBody: Crystal erzeugt GraphQL-APIs aus PostgreSQL-Schemas. Ich habe das tsvector-Plugin beigetragen, das PostgreSQLs Volltextsuche über die generierte API verfügbar macht, sowie einen Fix für die Erkennung fehlender Indizes.
  signatureCrystalTitle: Volltextsuche für Graphile Crystal
  signatureGraphiqlBody: GraphiQLs Variablen-Editor hat Werte für eigene Skalare als ungültig markiert, weil er deren Schemas nicht kennen konnte. Meine Änderung stellt sie bereit, sodass Werkzeuge auf Basis von graphiql-react solche Variablen korrekt prüfen.
  signatureGraphiqlTitle: Eigene Skalare im Variablen-Editor von GraphiQL
  signatureIntro: Die Beiträge, die ich hervorheben würde, mit dem jeweiligen Nachweis daneben.
  signatureNuxtBody: Nuxt hat CSS-Layer in der falschen Reihenfolge ausgegeben. Mein Fix dafür steckt im Core, und ich habe Triage-Rechte im Repository, wo ich weiterhin Fehler melde und eingrenze.
  signatureNuxtTitle: Ein Fix für die CSS-Layer-Reihenfolge in Nuxts Core
  signatureSpotifyBody: Ich betreue den Java-Wrapper für Spotifys Web-API, eine Bibliothek, die es seit 2014 gibt. Releases, Abhängigkeits-Updates und Pull-Request-Reviews laufen über mich.
  signatureSpotifyTitle: Maintainer von spotify-web-api-java
  signatureSyncthingBody: Syncthing hat Docker-Images nur für eine Architektur veröffentlicht. Ich habe den Multi-Architektur-Build in die Release-Skripte eingebracht und die Veröffentlichungs-Pipeline darum herum aufgeräumt.
  signatureSyncthingTitle: Multi-Architektur-Docker-Images für Syncthing
  signatureTitle: Ausgewählte Beiträge
  sortBy: Sortieren nach
  sortByContribution: Nach Beitrag sortieren
  sortByName: Nach Name sortieren
  sortByRecent: Nach Aktualität sortieren
  sortByStars: Nach Sternen sortieren
  summary: '{signature} ausgewählte Beiträge, gemergte Arbeit in {major} Projekten mit über 1.000 Sternen.'
en:
  allIntro: Ranked by the weight of the contribution, not by how well known the project is.
  allTitle: All contributions
  description: Contributions to {total} public software projects.
  noRepositoriesFound: No repositories found.
  openSourceContributions: Public Software Projects
  openSourceContributionsName: Jonas Thelemann contributed to {total}
  search: Search repositories...
  showAll: 'Show all ({count} more)'
  showingRepositories: 'Showing {count} of {total} repositories'
  signatureCookieControlBody: A highly configurable cookie banner for Nuxt. I took over its maintenance and handle its releases, issues and reviews.
  signatureCookieControlTitle: Maintainer of nuxt-cookie-control
  signatureCrystalBody: Crystal generates GraphQL APIs from PostgreSQL schemas. I contributed the tsvector plugin that exposes PostgreSQL full-text search through the generated API, plus a fix to its missing index detection.
  signatureCrystalTitle: Full-text search for Graphile Crystal
  signatureGraphiqlBody: GraphiQL's variable editor marked values for custom scalars as invalid, because it had no way to learn their schemas. My change exposes them, so tools built on graphiql-react validate those variables properly.
  signatureGraphiqlTitle: Custom scalars in GraphiQL's variable editor
  signatureIntro: The contributions I would point to, each with the evidence next to it.
  signatureNuxtBody: Nuxt emitted CSS layers in the wrong order. My fix for it is in core, and I hold triage rights on the repository, where I keep reporting and narrowing down bugs.
  signatureNuxtTitle: A CSS layer ordering fix in Nuxt core
  signatureSpotifyBody: I maintain the Java wrapper for Spotify's Web API, a library that has been around since 2014. Its releases, dependency work and pull request reviews run through me.
  signatureSpotifyTitle: Maintainer of spotify-web-api-java
  signatureSyncthingBody: Syncthing published Docker images for a single architecture. I added the multi-architecture build to its release scripts and cleaned up the publishing pipeline around it.
  signatureSyncthingTitle: Multi-architecture Docker images for Syncthing
  signatureTitle: Signature contributions
  sortBy: Sort by
  sortByContribution: Sort by contribution
  sortByName: Sort by name
  sortByRecent: Sort by recent activity
  sortByStars: Sort by stars
  summary: '{signature} signature contributions, merged work in {major} projects with over 1,000 stars.'
</i18n>
