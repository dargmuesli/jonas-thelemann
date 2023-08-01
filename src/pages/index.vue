<template>
  <div class="flex flex-col xl:flex-row">
    <nuxt-img
      alt="Jonas in Tutzing."
      class="xl:fixed"
      :class="imageClasses"
      fetchpriority="high"
      format="webp"
      preload
      src="/assets/static/images/tutzing.jpg"
    />
    <nuxt-img
      alt="Jonas in Tutzing."
      class="hidden xl:block"
      :class="imageClasses"
      fetchpriority="high"
      format="webp"
      preload
      src="/assets/static/images/tutzing.jpg"
    />
    <div class="p-4 sm:p-8">
      <main class="xl:min-h-screen min-w-0 space-y-6 pb-32">
        <div class="flex items-center justify-between">
          <h1 class="text-left">{{ t('jonasThelemann') }}</h1>
          <p class="text-right text-2xl font-normal text-gray-500">
            {{ t('metaInfo', { age }) }}
          </p>
        </div>
        <div>
          <i18n-t keypath="descriptionShort">
            <template #ninjaneers>
              <a href="https://www.ninjaneers.de/">{{ t('ninjaneer') }}</a>
            </template>
            <template #university>
              <a href="https://www.uni-kassel.de/">
                <span>{{ t('universityKassel') }}</span>
              </a>
            </template>
            <template #maevsi>
              <a href="https://maev.si/">
                <span>{{ t('maevsi') }}</span>
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
            <li class="m-1.5">
              <SocialLink to="https://giphy.com/channel/dargmuesli">
                {{ t('giphy') }}
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink to="https://github.com/dargmuesli">
                {{ t('gitHub') }}
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink to="https://www.instagram.com/dargmuesli/">
                {{ t('instagram') }}
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink
                to="https://www.linkedin.com/in/jonas-thelemann-148a74205/"
              >
                {{ t('linkedIn') }}
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink to="https://www.mixcloud.com/creal/">
                {{ t('mixcloud') }}
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink to="https://open.spotify.com/user/1153065250">
                {{ t('spotify') }}
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink
                to="https://stackoverflow.com/users/4682621/dargmuesli"
              >
                {{ t('stackOverflow') }}
              </SocialLink>
            </li>
            <li class="m-1.5">
              <SocialLink
                to="https://www.youtube.com/channel/UCmIrzQsJeEM5eW6KOAk9nSg"
              >
                {{ t('youTube') }}
              </SocialLink>
            </li>
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
            <ul class="mt-2 flex flex-col gap-1 list-inside list-disc">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark">
                      {{ t('foundingScholar') }}
                    </span>
                  </template>
                  <template #subtitle>
                    <i18n-t keypath="placeTime">
                      <template #place>
                        <a href="https://hessen-ideen.de/">
                          {{ t('hessenIdeen') }}
                        </a>
                      </template>
                      <template #time>
                        {{ t('foundingScholarTimespan') }}
                      </template>
                    </i18n-t>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark">
                      {{ t('experienceNinjaneer') }}
                    </span>
                  </template>
                  <template #subtitle>
                    <i18n-t keypath="placeTime">
                      <template #place>
                        <a href="https://www.ninjaneers.de/">
                          {{ t('ninjaneers') }}
                        </a>
                      </template>
                      <template #time>
                        {{
                          t('experienceNinjaneerTimespan', {
                            present: t('present'),
                          })
                        }}
                      </template>
                    </i18n-t>
                  </template>
                </i18n-t>
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('education') }}</h2>
            <div class="mt-2">
              <p>{{ t('educationGoal') }}</p>
              <i18n-t keypath="titleSubtitle" class="text-gray-500" tag="span">
                <template #title>
                  <a class="text-text-dark" href="https://www.uni-kassel.de/">
                    {{ t('universityKassel') }}
                  </a>
                </template>
                <template #subtitle>
                  <span>{{ t('educationTime') }}</span>
                </template>
              </i18n-t>
            </div>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('organizations') }}</h2>
            <ul class="mt-2 flex flex-col gap-1 list-inside list-disc">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <a class="text-text-dark" href="https://gi.de/">{{
                      t('gi')
                    }}</a>
                  </template>
                  <template #subtitle>
                    <span>
                      {{ t('giTimespan', { present: t('present') }) }}
                    </span>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <a class="text-text-dark" href="https://www.ccc.de/">{{
                      t('ccc')
                    }}</a>
                  </template>
                  <template #subtitle>
                    <span>
                      {{ t('cccTimespan', { present: t('present') }) }}
                    </span>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <a class="text-text-dark" href="https://flipdot.org/">{{
                      t('flipdot')
                    }}</a>
                  </template>
                  <template #subtitle>
                    <span>
                      {{ t('flipdotTimespan', { present: t('present') }) }}
                    </span>
                  </template>
                </i18n-t>
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('languages') }}</h2>
            <ul class="mt-2 flex flex-col gap-1 list-inside list-disc">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark">{{ t('german') }}</span>
                  </template>
                  <template #subtitle>
                    <span>
                      {{ t('proficiencyNative') }}
                    </span>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark">{{ t('english') }}</span>
                  </template>
                  <template #subtitle>
                    <span>
                      {{ t('proficiencyProfessional') }}
                    </span>
                  </template>
                </i18n-t>
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('honorsAwards') }}</h2>
            <ul class="mt-2 flex flex-col gap-1 list-inside list-disc">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <a
                      class="text-text-dark"
                      href="https://www.uni-kassel.de/einrichtung/index.php?eID=dumpFile&t=f&f=1988&token=e881e12fc8112d90e46d21d4fbef05530929c5c0"
                    >
                      {{ t('honorsAwardsIdeasCompetition') }}
                    </a>
                  </template>
                  <template #subtitle>
                    <i18n-t keypath="placeTime">
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
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark">
                      {{ t('nominationScholarship') }}
                    </span>
                  </template>
                  <template #subtitle>
                    <i18n-t keypath="placeTime">
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
                <VioLink class="inline-block" to="https://maev.si/">
                  <img
                    alt="maevsi's logo"
                    class="h-12"
                    src="/assets/static/logos/maevsi.svg"
                  />
                </VioLink>
              </li>
              <li class="m-4">
                <VioLink class="inline-block" to="https://nearbuy-food.de/">
                  <img
                    alt="nearbuy's logo"
                    class="h-12"
                    src="/assets/static/logos/nearbuy.svg"
                  />
                </VioLink>
              </li>
              <li class="m-4">
                <VioLink
                  class="inline-block"
                  to="https://creal.jonas-thelemann.de/"
                >
                  <img
                    alt="cReal's logo"
                    class="h-12"
                    src="/assets/static/logos/creal.svg"
                  />
                </VioLink>
              </li>
              <li class="m-4">
                <VioLink
                  class="inline-block"
                  to="https://trapparty.jonas-thelemann.de/"
                >
                  <img
                    alt="TrapParty's logo"
                    class="h-12"
                    src="/assets/static/logos/trapparty.svg"
                  />
                </VioLink>
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
          <VioHr />
          <IconLogo
            background-fill="rgba(0,0,0,0)"
            class="mx-12 h-12 w-12 opacity-50 brightness-0 dark:opacity-60 dark:invert"
          />
          <VioHr />
        </div>
        <div class="flex flex-col items-center opacity-60">
          <span>
            {{ t('copyright', { year }) }}
          </span>
          <div class="flex gap-4">
            <VioLink is-colored :to="localePath('/legal-notice')">
              {{ t('legalNotice') }}
            </VioLink>
            <VioLink is-colored :to="localePath('/privacy-policy')">
              {{ t('privacyPolicy') }}
            </VioLink>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { consola } from 'consola'

definePageMeta({
  layout: false,
})

const { t } = useI18n()
const localePath = useLocalePath()
const { indicateLoadingDone } = useLoadingDoneIndicator()
const runtimeConfig = useRuntimeConfig()

// data
const imageClasses =
  'xl:h-[100vh] max-h-[80vh] xl:max-h-[none] xl:max-w-[50vw] object-cover object-position-custom'
let repoCount: string | null = null

// computations
const age = computed(() =>
  runtimeConfig.public.isTesting
    ? 1337
    : Math.abs(
        new Date(Date.now() - Date.parse('1998-12-17')).getUTCFullYear() - 1970,
      ),
)
const year = computed(() =>
  runtimeConfig.public.isTesting ? 1337 : new Date().getFullYear(),
)

// methods
const init = async () => {
  try {
    const res = await $fetch.raw(
      'https://api.github.com/users/dargmuesli/repos?per_page=1',
    )

    if (!res.ok) throw createError('Response is not ok!')

    const headerLink = res.headers.get('link')
    repoCount = headerLink
      ? new URLSearchParams(
          new URL(
            headerLink
              .split(', ')[1]
              .split('; ')[0]
              .replace(/(^<|>$)/g, ''),
          ).searchParams,
        ).get('page')
      : null
  } catch (e) {
    consola.error(JSON.stringify(e))
  }
}

onMounted(() => indicateLoadingDone())

// initialization
await init()
useSeoMeta({ title: 'Jonas Thelemann' })
</script>

<i18n lang="yaml">
de:
  about: '{aboutMarkSoftwareTemplate} irgendwo zwischen Frontend, Backend und DevOps.{br}{aboutMarkDjTemplate}, manchmal am Doubletime rappen.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Angezogen von Dingen, die er nicht versteht. Gelangweilt, wenn Videos langsamer als mit 2x-Geschwindigkeit abspielen.
  aboutCreating: Ist verliebt darin, Dinge zu erschaffen.
  aboutMarkDj: DJ und Event-Organisator
  aboutMarkSoftware: Leidenschaftlicher Software-Entwickler
  aboutSidefact: Freundet sich mit der Mitte von Schwarz und Weiß an, hodlt nebenbei.
  ccc: Chaos Computer Club
  cccTimespan: Mai 2018 – {present}
  copyright: © {year} Jonas Thelemann. Alle Rechte vorbehalten.
  descriptionShort: '{ninjaneers}, studiert an der {university}, gründet {maevsi}.'
  education: Bildung
  educationGoal: Master der Software-Entwicklung
  educationTime: 2021 – 2023
  english: Englisch
  experience: Erfahrung
  experienceNinjaneer: Software-Entwickler
  experienceNinjaneerTimespan: Jul 2020 – {present}
  flipdot: flipdot Hackerspace Kassel
  flipdotTimespan: Dec 2016 – {present}
  foundingScholar: Gründungs-Stipendiant
  foundingScholarTimespan: Jan – Jun 2023
  german: Deutsch
  gi: Gesellschaft für Informatik
  giphy: Giphy
  gitHub: GitHub
  giTimespan: Jan 2019 – today
  hessenIdeen: Hessen Ideen
  honorsAwards: Ehrungen und Auszeichnungen
  honorsAwardsIdeasCompetition: Ideenwettbewerb Top 10 Projekt
  honorsAwardsIdeasCompetitionTime: Okt 2020
  instagram: Instagram
  jonasThelemann: Jonas Thelemann
  kasselAddress: Kassel, Hessen, Deutschland
  languages: Sprachen
  legalNotice: Impressum
  linkedIn: LinkedIn
  maevsi: maevsi
  metaInfo: '{age}, er/ihn'
  mixcloud: Mixcloud
  ninjaneer: Ninjaneer
  ninjaneers: Ninjaneers GmbH
  nominationScholarship: Nominierung für ein Stipendium
  nominationScholarshipTime: Jul 2019
  organizations: Organisationen
  placeTime: '{place}, {time}'
  portfolioFull: Zum ganzen Portfolio
  present: heute
  privacyPolicy: Datenschutz
  proficiencyNative: muttersprachliches Niveau
  proficiencyProfessional: professionelles Arbeitsniveau
  projects: Projekte
  projectsMore: und {repoCount} weitere…
  spotify: Spotify
  stackOverflow: Stack Overflow
  studyFoundation: Studienstiftung des deutschen Volkes
  titleSubtitle: '{title} · {subtitle}'
  unikat: UNIKAT
  universityKassel: Universität Kassel
  youTube: YouTube
en:
  about: '{aboutMarkSoftwareTemplate} somewhere between frontend, backend and devops.{br}{aboutMarkDjTemplate}, occasionally rapping double times.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Attracted to things he doesn't understand. Bored when videos play at speeds of less than 2x.
  aboutCreating: Loves to create.
  aboutMarkDj: DJ and event organizer
  aboutMarkSoftware: Passionate software developer
  aboutSidefact: Getting used to the middle of black and white, hodling in the meantime.
  ccc: Chaos Computer Club
  cccTimespan: May 2018 – {present}
  copyright: © {year} Jonas Thelemann. All rights reserved.
  descriptionShort: '{ninjaneers}, studying at {university}, founding {maevsi}.'
  education: Education
  educationGoal: Master's degree Software Engineering
  educationTime: 2021 – 2023
  english: English
  experience: Experience
  experienceNinjaneer: Software Engineer
  experienceNinjaneerTimespan: Jul 2020 – today
  flipdot: flipdot Hackerspace Kassel
  flipdotTimespan: Dez 2016 – {present}
  foundingScholar: Founding Scholar
  foundingScholarTimespan: Jan – Jun 2023
  german: German
  gi: German Informatics Society
  giphy: Giphy
  gitHub: GitHub
  giTimespan: Jan 2019 – today
  hessenIdeen: Hesse Ideas
  honorsAwards: Honors & Awards
  honorsAwardsIdeasCompetition: Ideas Competition Top 10 Project
  honorsAwardsIdeasCompetitionTime: Oct 2020
  instagram: Instagram
  jonasThelemann: Jonas Thelemann
  kasselAddress: Kassel, Hesse, Germany
  languages: Languages
  legalNotice: Legal notice
  linkedIn: LinkedIn
  maevsi: maevsi
  metaInfo: '{age}, he/him'
  mixcloud: Mixcloud
  ninjaneer: Ninjaneer
  ninjaneers: Ninjaneers GmbH
  nominationScholarship: Nomination for a scholarship
  nominationScholarshipTime: Jul 2019
  organizations: Organizations
  placeTime: '{place}, {time}'
  portfolioFull: View full portfolio
  present: today
  privacyPolicy: Privacy
  proficiencyNative: native proficiency
  proficiencyProfessional: professional working proficiency
  projects: Projects
  projectsMore: and {repoCount} others…
  spotify: Spotify
  stackOverflow: Stack Overflow
  studyFoundation: Study Foundation of the German People
  titleSubtitle: '{title} · {subtitle}'
  unikat: UNIKAT
  universityKassel: University of Kassel
  youTube: YouTube
</i18n>