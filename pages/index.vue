<template>
  <div class="flex flex-col xl:flex-row">
    <img
      alt="Jonas in Tutzing."
      class="xl:fixed"
      :class="imageClasses"
      src="/assets/static/images/tutzing.jpg"
    />
    <img
      alt="Jonas in Tutzing."
      class="hidden xl:block"
      :class="imageClasses"
      src="/assets/static/images/tutzing.jpg"
    />
    <div class="p-4 sm:p-8">
      <main class="xl:min-h-screen min-w-0 space-y-6 pb-32">
        <div class="flex items-center justify-between">
          <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
          <h1 class="text-left">Jonas Thelemann</h1>
          <p class="text-right text-2xl font-normal text-gray-500">
            {{ t('metaInfo', { age }) }}
          </p>
        </div>
        <div>
          <i18n-t keypath="descriptionShort">
            <template #ninjaneers>
              <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
              <a href="https://www.ninjaneers.de/">Ninjaneer</a>
            </template>
            <template #university>
              <a href="https://www.uni-kassel.de/">
                <span>{{ t('universityKassel') }}</span>
              </a>
            </template>
          </i18n-t>
          <p class="text-gray-500">
            <a href="https://www.google.com/maps/place/Kassel">
              {{ t('kasselAddress') }}
            </a>
          </p>
        </div>
        <div class="pb-2">
          <ul class="-mx-1.5 flex flex-wrap">
            <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
            <li class="m-1.5">
              <SocialLink to="https://giphy.com/channel/dargmuesli"
                >Giphy</SocialLink
              >
            </li>
            <li class="m-1.5">
              <SocialLink to="https://github.com/dargmuesli">GitHub</SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink to="https://www.instagram.com/dargmuesli/"
                >Instagram</SocialLink
              >
            </li>
            <li class="m-1.5">
              <SocialLink
                to="https://www.linkedin.com/in/jonas-thelemann-148a74205/"
              >
                LinkedIn
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink to="https://www.mixcloud.com/creal/"
                >Mixcloud</SocialLink
              >
            </li>
            <li class="m-1.5">
              <SocialLink
                to="https://open.spotify.com/user/1153065250?si=cf16bda05fd2491b"
              >
                Spotify
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink
                to="https://stackoverflow.com/users/4682621/dargmuesli"
              >
                Stack Overflow
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink
                to="https://www.youtube.com/channel/UCmIrzQsJeEM5eW6KOAk9nSg"
              >
                YouTube
              </SocialLink>
            </li>
            <!-- eslint-enable @intlify/vue-i18n/no-raw-text -->
          </ul>
        </div>
        <div>
          <!-- Wrapping div required for paragraph's negative margin to work. -->
          <i18n-t class="mt-[-0.5rem]" keypath="about" tag="p">
            <template #aboutMarkSoftwareTemplate>
              <mark class="bg-[#ffff00] bg-opacity-50">{{
                t('aboutMarkSoftware')
              }}</mark>
            </template>
            <template #aboutMarkDjTemplate>
              <mark class="bg-[#ffff00] bg-opacity-50">
                {{ t('aboutMarkDj') }}
              </mark>
            </template>
            <template #aboutAttraction>
              {{ t('aboutAttraction') }}
            </template>
            <template #aboutSidefact>
              {{ t('aboutSidefact') }}
            </template>
            <template #aboutCreating>
              {{ t('aboutCreating') }}
            </template>
            <template #br>
              <br />
            </template>
          </i18n-t>
        </div>
        <div
          class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"
        >
          <section>
            <h2 class="text-2xl">{{ t('experience') }}</h2>
            <div class="mt-2">
              <p>{{ t('softwareEngineer') }}</p>
              <p>
                <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
                <a href="https://www.ninjaneers.de/">Ninjaneers GmbH</a>
                <span class="text-gray-500">
                  · {{ t('monthShortJul') }} 2020 – {{ t('present') }}
                </span>
                <!-- eslint-enable @intlify/vue-i18n/no-raw-text -->
              </p>
            </div>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('education') }}</h2>
            <div class="mt-2">
              <p>{{ t('educationGoal') }}</p>
              <i18n-t keypath="educationContent">
                <template #place>
                  <a href="https://www.uni-kassel.de/">
                    {{ t('universityKassel') }}
                  </a>
                </template>
                <template #time>
                  <span class="text-gray-500">{{ t('educationTime') }}</span>
                </template>
              </i18n-t>
            </div>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('organizations') }}</h2>
            <ul class="mt-2 list-inside list-disc">
              <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
              <li>
                <a href="https://gi.de/">{{ t('gi') }}</a>
                <span class="text-gray-500">
                  · {{ t('monthShortJan') }} 2019 – {{ t('present') }}
                </span>
              </li>
              <li>
                <a href="https://www.ccc.de/">Chaos Computer Club</a>
                <span class="text-gray-500">
                  · {{ t('monthShortMay') }} 2018 – {{ t('present') }}
                </span>
              </li>
              <li>
                <a href="https://flipdot.org/">flipdot Hackerspace Kassel</a>
                <span class="text-gray-500">
                  · {{ t('monthShortDec') }} 2016 – {{ t('present') }}
                </span>
              </li>
              <!-- eslint-enable @intlify/vue-i18n/no-raw-text -->
            </ul>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('languages') }}</h2>
            <ul class="mt-2 list-inside list-disc">
              <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
              <li>
                <span>{{ t('german') }}</span>
                <span class="text-gray-500">
                  · {{ t('proficiencyNative') }}
                </span>
              </li>
              <li>
                <span>{{ t('english') }}</span>
                <span class="text-gray-500">
                  · {{ t('proficiencyProfessional') }}
                </span>
              </li>
              <!-- eslint-enable @intlify/vue-i18n/no-raw-text -->
            </ul>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('honorsAwards') }}</h2>
            <ul class="mt-2 list-inside list-disc">
              <li>
                <i18n-t keypath="categoryItem">
                  <template #title>
                    <a
                      href="https://www.uni-kassel.de/einrichtung/index.php?eID=dumpFile&t=f&f=1988&token=e881e12fc8112d90e46d21d4fbef05530929c5c0"
                    >
                      {{ t('honorsAwardsIdeasCompetition') }}
                    </a>
                  </template>
                  <template #description>
                    <i18n-t
                      class="text-gray-500"
                      keypath="categoryItemDescriptionWithPlace"
                      tag="label"
                    >
                      <template #place>
                        <a
                          href="https://www.uni-kassel.de/einrichtung/ukt/unikat-von-der-idee-zur-gruendung/unikat-ideenwettbewerb"
                        >
                          {{ t('unikat') }}
                        </a>
                      </template>
                      <template #time>
                        {{ t('honorsAwardsIdeasCompetitionTime') }}
                      </template>
                    </i18n-t>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="categoryItem">
                  <template #title>
                    {{ t('nominationScholarship') }}
                  </template>
                  <template #description>
                    <i18n-t
                      class="text-gray-500"
                      keypath="categoryItemDescriptionWithPlace"
                      tag="label"
                    >
                      <template #place>
                        <a href="https://www.studienstiftung.de/">
                          {{ t('studyFoundation') }}
                        </a>
                      </template>
                      <template #time>
                        {{ t('nominationScholarshipTime') }}
                      </template>
                    </i18n-t>
                  </template>
                </i18n-t>
              </li>
            </ul>
          </section>
          <div class="flex flex-col items-center justify-center">
            <SocialLink
              to="https://www.linkedin.com/in/jonas-thelemann-148a74205/"
            >
              {{ t('portfolioFull') }}
            </SocialLink>
          </div>
          <hr class="md:col-span-2 xl:col-span-1 2xl:col-span-2" />
          <section class="md:col-span-2 xl:col-span-1 2xl:col-span-2">
            <h2 class="text-2xl">{{ t('projects') }}</h2>
            <ul class="mt-2 flex flex-wrap items-center justify-around">
              <li class="m-4">
                <a href="https://maev.si/">
                  <img
                    alt="maevsi's logo"
                    class="h-12"
                    src="/assets/static/logos/maevsi.svg"
                  />
                </a>
              </li>
              <li class="m-4">
                <a href="https://nearbuy-food.de/">
                  <img
                    alt="nearbuy's logo"
                    class="h-12"
                    src="/assets/static/logos/nearbuy.svg"
                  />
                </a>
              </li>
              <li class="m-4">
                <a href="https://creal.jonas-thelemann.de/">
                  <p class="h-12 text-center text-gray-500">
                    <img
                      alt="cReal's logo"
                      class="h-12"
                      src="/assets/static/logos/creal.svg"
                    />
                  </p>
                </a>
              </li>
              <li class="m-4">
                <a href="https://trapparty.jonas-thelemann.de/">
                  <img
                    alt="TrapParty's logo"
                    class="h-12"
                    src="/assets/static/logos/trapparty.svg"
                  />
                </a>
              </li>
              <li class="m-4">
                <SocialLink to="https://github.com/dargmuesli?tab=repositories">
                  {{ t('projectsMore', { repoCount }) }}
                </SocialLink>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer class="text-sm leading-6">
        <div class="mx-auto mt-8 flex w-9/12 items-center">
          <Hr />
          <IconLogo
            background-fill="rgba(0,0,0,0)"
            class="mx-12 h-12 w-12 opacity-50 brightness-0 dark:opacity-60 dark:invert"
          />
          <Hr />
        </div>
        <p class="p-2 text-center text-gray-500">
          {{ t('copyright', { year }) }}
          <br />
          <AppLink class="text-blue-400" :to="localePath('/legal-notice')">
            {{ t('legalNotice') }}
          </AppLink>
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import consola from 'consola'

const { t } = useI18n()
const config = useRuntimeConfig()
const localePath = useLocalePath()

// data
const imageClasses =
  'max-h-[80vh] xl:max-w-[50vw] object-cover object-position-custom xl:h-[100vh] xl:max-h-[none]'
let repoCount: string | null = null

// computations
const age = computed(() =>
  config.public.isTesting
    ? 1337
    : Math.abs(
        new Date(Date.now() - Date.parse('1998-12-17')).getUTCFullYear() - 1970
      )
)
const year = computed(() =>
  config.public.isTesting ? 1337 : new Date().getFullYear()
)
// methods
const init = async () => {
  try {
    const res = await $fetch.raw(
      'https://api.github.com/users/dargmuesli/repos?per_page=1'
    )

    if (!res.ok) throw createError('Response is not ok!')

    const headerLink = res.headers.get('link')
    repoCount = headerLink
      ? new URLSearchParams(
          new URL(
            headerLink
              .split(', ')[1]
              .split('; ')[0]
              .replace(/(^<|>$)/g, '')
          ).searchParams
        ).get('page')
      : null
  } catch (e) {
    consola.error(JSON.stringify(e))
  }
}

// initialization
await init()
</script>

<i18n lang="yaml">
de:
  about: '{aboutMarkSoftwareTemplate} irgendwo zwischen Frontend, Backend und DevOps.{br}{aboutMarkDjTemplate}, manchmal am Doubletime rappen.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Angezogen von Dingen, die er nicht versteht. Gelangweilt, wenn Videos langsamer als mit 2x-Geschwindigkeit abspielen.
  aboutCreating: Ist verliebt darin, Dinge zu erschaffen.
  aboutMarkDj: DJ und Event-Organisator
  aboutMarkSoftware: Leidenschaftlicher Software-Entwickler
  aboutSidefact: Freundet sich gerade mit der Mitte von Schwarz und Weiß an, hodlt nebenbei.
  categoryItem: '{title} · {description}'
  # categoryItemDescription: '{time}'
  categoryItemDescriptionWithPlace: '{place}, {time}'
  copyright: © {year} Jonas Thelemann. Alle Rechte vorbehalten.
  descriptionShort: '{ninjaneers}, studiert an der {university}.'
  education: Bildung
  educationContent: '{place} · {time}'
  educationGoal: Master der Software-Entwicklung
  educationTime: 2021 – 2023
  english: Englisch
  experience: Erfahrung
  german: Deutsch
  gi: Gesellschaft für Informatik
  honorsAwards: Ehrungen und Auszeichnungen
  honorsAwardsIdeasCompetition: Ideenwettbewerb Top 10 Projekt
  honorsAwardsIdeasCompetitionTime: Okt 2020
  kasselAddress: Kassel, Hessen, Deutschland
  languages: Sprachen
  legalNotice: Impressum
  metaInfo: '{age}, er/ihn'
  monthShortDec: Dez
  monthShortJan: Jan
  monthShortJul: Jul
  monthShortMay: Mai
  nominationScholarship: Nominierung für ein Stipendium
  nominationScholarshipTime: Jul 2019
  organizations: Organisationen
  portfolioFull: Zum ganzen Portfolio
  present: heute
  proficiencyNative: muttersprachliches Niveau
  proficiencyProfessional: professionelles Arbeitsniveau
  projects: Projekte
  projectsMore: und {repoCount} weitere…
  softwareEngineer: Software-Entwickler
  studyFoundation: Studienstiftung des deutschen Volkes
  unikat: UNIKAT
  universityKassel: Universität Kassel
en:
  about: '{aboutMarkSoftwareTemplate} somewhere between frontend, backend and devops.{br}{aboutMarkDjTemplate}, occasionally rapping double times.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Attracted to things he doesn't understand. Bored when videos play at speeds of less than 2x.
  aboutCreating: Loves to create.
  aboutMarkDj: DJ and event organizer
  aboutMarkSoftware: Passionate software developer
  aboutSidefact: Currently getting used to the middle of black and white, hodling in the meantime.
  categoryItem: '{title} · {description}'
  # categoryItemDescription: '{time}'
  categoryItemDescriptionWithPlace: '{place}, {time}'
  copyright: © {year} Jonas Thelemann. All rights reserved.
  descriptionShort: '{ninjaneers}, studying at {university}.'
  education: Education
  educationContent: '{place} · {time}'
  educationGoal: Master's degree Software Engineering
  educationTime: 2021 – 2023
  english: English
  experience: Experience
  german: German
  gi: German Informatics Society
  honorsAwards: Honors & Awards
  honorsAwardsIdeasCompetition: Ideas Competition Top 10 Project
  honorsAwardsIdeasCompetitionTime: Oct 2020
  kasselAddress: Kassel, Hesse, Germany
  languages: Languages
  legalNotice: Legal notice
  metaInfo: '{age}, he/him'
  monthShortDec: Dec
  monthShortJan: Jan
  monthShortJul: Jul
  monthShortMay: May
  nominationScholarship: Nomination for a scholarship
  nominationScholarshipTime: Jul 2019
  organizations: Organizations
  portfolioFull: View full portfolio
  present: today
  proficiencyNative: native proficiency
  proficiencyProfessional: professional working proficiency
  projects: Projects
  projectsMore: and {repoCount} others…
  softwareEngineer: Software Engineer
  studyFoundation: Study Foundation of the German People
  unikat: UNIKAT
  universityKassel: University of Kassel
</i18n>
