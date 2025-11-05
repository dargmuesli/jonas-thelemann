<template>
  <div class="flex flex-col xl:flex-row">
    <aside :aria-label="t('asideLabel')" class="relative flex">
      <div
        class="flex aspect-[2081/3009] max-h-[80vh] flex-1 xl:fixed xl:h-[100vh] xl:max-h-[none] xl:max-w-[38.2vw]"
      >
        <NuxtImg
          alt="Jonas in Tutzing."
          class="flex-1 object-cover object-[50%_30%]"
          densities="x1 x2"
          fetchpriority="high"
          format="webp"
          height="3009"
          :nonce="nonce"
          :placeholder="!runtimeConfig.public.vio.isTesting"
          preload
          sizes="320px xs:640px sm:768px md:1024px lg:1280px xl:1536px 2xl:2081px"
          src="/assets/static/images/tutzing.jpg"
          width="2081"
          @load="indicateLoadingDoneHeroImage"
        />
      </div>
      <div
        class="hidden aspect-[2081/3009] h-[100vh] max-w-[38.2vw] xl:block"
      />
    </aside>
    <div class="p-4 sm:p-8">
      <main class="min-w-0 space-y-6 pb-32 xl:min-h-screen">
        <div class="flex items-center justify-between">
          <h1 class="text-left">{{ t('jonasThelemann') }}</h1>
          <ClientOnly>
            <p
              class="text-right text-2xl font-normal text-gray-500 dark:text-gray-400"
            >
              {{ t('metaInfo', { age }) }}
            </p>
          </ClientOnly>
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
          <p class="text-gray-500 dark:text-gray-400">
            <a href="https://www.google.com/maps/place/Kassel">
              {{ t('kasselAddress') }}
            </a>
          </p>
        </div>
        <div class="pb-2">
          <ul class="-mx-1.5 flex flex-wrap">
            <li class="m-1.5">
              <SocialLink :to="localePath('/contact')">
                {{ t('contactForm') }}
              </SocialLink>
            </li>
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
              <mark
                class="dark:text-text-bright bg-[#ffff00]/50 dark:bg-gray-700"
              >
                {{ t('aboutMarkSoftware') }}
              </mark>
            </template>
            <template #aboutMarkDjTemplate>
              <mark
                class="dark:text-text-bright bg-[#ffff00]/50 dark:bg-gray-700"
              >
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
            <ul class="mt-2 flex list-inside list-disc flex-col gap-1">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
                      {{ t('experienceMaevsi') }}
                    </span>
                  </template>
                  <template #subtitle>
                    <i18n-t keypath="placeTime">
                      <template #place>
                        <a href="https://maev.si/">
                          {{ t('maevsi') }}
                        </a>
                      </template>
                      <template #time>
                        {{
                          t('experienceMaevsiTimespan', {
                            present: t('present'),
                          })
                        }}
                      </template>
                    </i18n-t>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
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
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
                      {{ t('experienceFederalVolunteerService') }}
                    </span>
                  </template>
                  <template #subtitle>
                    <i18n-t keypath="placeTime">
                      <template #place>
                        <a href="https://www.landkreiskassel.de/">
                          {{ t('kasselCounty') }}
                        </a>
                      </template>
                      <template #time>
                        {{
                          t('experienceFederalVolunteerServiceTimespan', {
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
              <i18n-t
                keypath="titleSubtitle"
                class="text-gray-500 dark:text-gray-400"
                tag="span"
              >
                <template #title>
                  <a
                    class="text-text-dark dark:text-text-bright"
                    href="https://www.uni-kassel.de/"
                  >
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
            <ul class="mt-2 flex list-inside list-disc flex-col gap-1">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <a
                      class="text-text-dark dark:text-text-bright"
                      href="https://www.ccc.de/"
                    >
                      {{ t('ccc') }}
                    </a>
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
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <a
                      class="text-text-dark dark:text-text-bright"
                      href="https://flipdot.org/"
                    >
                      {{ t('flipdot') }}
                    </a>
                  </template>
                  <template #subtitle>
                    <span>
                      {{ t('flipdotTimespan', { present: t('present') }) }}
                    </span>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <a
                      class="text-text-dark dark:text-text-bright"
                      href="https://gi.de/"
                    >
                      {{ t('gi') }}
                    </a>
                  </template>
                  <template #subtitle>
                    <span>
                      {{ t('giTimespan', { present: t('present') }) }}
                    </span>
                  </template>
                </i18n-t>
              </li>
            </ul>
          </section>
          <section>
            <h2 class="text-2xl">{{ t('languages') }}</h2>
            <ul class="mt-2 flex list-inside list-disc flex-col gap-1">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
                      {{ t('german') }}
                    </span>
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
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
                      {{ t('english') }}
                    </span>
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
            <ul class="mt-2 flex list-inside list-disc flex-col gap-1">
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
                      {{ t('honorsAwardsElectoralOfficer') }}
                    </span>
                  </template>
                  <template #subtitle>
                    <a href="https://www.kassel.de/">
                      {{ t('kasselCity') }}
                    </a>
                  </template>
                </i18n-t>
              </li>
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
                      {{ t('foundingScholar') }}
                    </span>
                  </template>
                  <template #subtitle>
                    <i18n-t keypath="placeTime">
                      <template #place>
                        <a href="https://www.exist.de/">
                          {{ t('exist') }}
                        </a>
                      </template>
                      <template #time>
                        {{ t('foundingScholarTimespan') }}
                      </template>
                    </i18n-t>
                  </template>
                </i18n-t>
              </li>
              <!-- <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <a
                      class="text-text-dark dark:text-text-bright"
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
              </li> -->
              <li>
                <i18n-t
                  keypath="titleSubtitle"
                  class="text-gray-500 dark:text-gray-400"
                  tag="span"
                >
                  <template #title>
                    <span class="text-text-dark dark:text-text-bright">
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
          <hr
            class="border-gray-200 md:col-span-2 xl:col-span-1 2xl:col-span-2"
          />
          <section class="md:col-span-2 xl:col-span-1 2xl:col-span-2">
            <h2 class="text-2xl">{{ t('projects') }}</h2>
            <ul class="mt-2 flex flex-wrap items-center justify-around">
              <li class="m-4">
                <VioLink
                  aria-label="Vibetype"
                  class="inline-block"
                  is-external-icon-disabled
                  to="https://maev.si/"
                >
                  <NuxtImg
                    alt="Vibetype's logo"
                    class="h-12 w-auto"
                    height="180"
                    :nonce="nonce"
                    src="/assets/static/logos/vibetype.svg"
                    width="547"
                  />
                </VioLink>
              </li>
              <li class="m-4">
                <VioLink
                  aria-label="nearbuy"
                  class="inline-block"
                  is-external-icon-disabled
                  to="https://nearbuy-food.de/"
                >
                  <NuxtImg
                    alt="nearbuy's logo"
                    class="h-12 w-auto"
                    height="734"
                    :nonce="nonce"
                    src="/assets/static/logos/nearbuy.svg"
                    width="1734"
                  />
                </VioLink>
              </li>
              <li class="m-4">
                <VioLink
                  aria-label="cReal"
                  class="inline-block"
                  is-external-icon-disabled
                  to="https://creal.jonas-thelemann.de/"
                >
                  <NuxtImg
                    alt="cReal's logo"
                    class="h-12 w-auto"
                    height="1330"
                    :nonce="nonce"
                    src="/assets/static/logos/creal.svg"
                    width="1330"
                  />
                </VioLink>
              </li>
              <li class="m-4">
                <VioLink
                  aria-label="TrapParty"
                  class="inline-block"
                  is-external-icon-disabled
                  to="https://trapparty.jonas-thelemann.de/"
                >
                  <NuxtImg
                    alt="TrapParty's logo"
                    class="h-12 w-auto"
                    height="1308"
                    :nonce="nonce"
                    src="/assets/static/logos/trapparty.svg"
                    width="1308"
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
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { consola } from 'consola'
import { getQuery } from 'ufo'

definePageMeta({
  layout: 'root',
})

const { t } = useI18n()
const localePath = useLocalePath()
const { indicateLoadingDone } = useLoadingDoneIndicator()
const { indicateLoadingDone: indicateLoadingDoneHeroImage } =
  useLoadingDoneIndicator('hero-image')
const runtimeConfig = useRuntimeConfig()
const siteConfig = useSiteConfig()
const nonce = useNonce()

// data
const repoCount = useState<string | undefined>('repoCount', () =>
  runtimeConfig.public.vio.isTesting ? '1337' : undefined,
)

// computations
const age = computed(() =>
  runtimeConfig.public.vio.isTesting
    ? 1337
    : Math.abs(
        new Date(Date.now() - Date.parse('1998-12-17')).getUTCFullYear() - 1970,
      ),
)

// methods
const init = async () => {
  if (repoCount.value) return

  try {
    const res = await $fetch.raw(
      'https://api.github.com/users/dargmuesli/repos?per_page=1',
    )

    if (!res.ok) throw createError('Response is not ok!')

    const headerLink = res.headers.get('link')
    if (!headerLink) {
      repoCount.value = undefined
      return
    }
    const headerLinkSplitComma = headerLink.split(', ')[1]
    if (!headerLinkSplitComma) return
    const headerLinkSplitSemicolon = headerLinkSplitComma.split('; ')[0]
    if (!headerLinkSplitSemicolon) return
    const headerLinkQueryPage = getQuery<{ page: string }>(
      headerLinkSplitSemicolon.replace(/(^<|>$)/g, ''),
    ).page
    repoCount.value = headerLinkQueryPage
  } catch (e) {
    consola.error(JSON.stringify(e))
  }
}

// lifecycle
onMounted(() => indicateLoadingDone())

// initialization
await init()
useHeadDefault({ title: siteConfig.name })
</script>

<i18n lang="yaml">
de:
  about: '{aboutMarkSoftwareTemplate} irgendwo zwischen Frontend, Backend und DevOps.{br}{aboutMarkDjTemplate}, manchmal am Doubletime rappen.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Angezogen von Dingen, die er nicht versteht. Gelangweilt, wenn Videos langsamer als mit 2x-Geschwindigkeit abspielen.
  aboutCreating: Ist verliebt darin, Dinge zu erschaffen.
  aboutMarkDj: DJ und Event-Organisator
  aboutMarkSoftware: Leidenschaftlicher Software-Entwickler
  aboutSidefact: Freundet sich mit der Mitte von Schwarz und Weiß an, hodlt nebenbei.
  asideLabel: Titelbild
  ccc: Chaos Computer Club
  cccTimespan: Mai 2018 – {present}
  contactForm: Kontaktformular
  descriptionShort: Geschäftsführer und Gründer {'@'}{maevsi} · {ninjaneers} · M.Sc. Informatik
  education: Bildung
  educationGoal: Master der Software-Entwicklung
  educationTime: 2021 – 2024
  english: Englisch
  exist: EXIST
  experience: Erfahrung
  experienceFederalVolunteerService: 'Freiwilligendienstler: Flüchlingshilfe'
  experienceFederalVolunteerServiceTimespan: Jan 2017 – Aug 2017
  experienceMaevsi: Geschäftsführer und technischer Leiter
  experienceMaevsiTimespan: Nov 2024 – {present}
  experienceNinjaneer: Software-Entwickler
  experienceNinjaneerTimespan: Jul 2020 – {present}
  flipdot: flipdot Hackspace Kassel
  flipdotTimespan: Dec 2016 – {present}
  foundingScholar: Gründungs-Stipendiant
  foundingScholarTimespan: Sep 2024 – Aug 2025
  german: Deutsch
  gi: Gesellschaft für Informatik
  giphy: Giphy
  gitHub: GitHub
  giTimespan: Jan 2019 – Dez 2025
  # hessenIdeen: Hessen Ideen
  honorsAwards: Ehrungen und Auszeichnungen
  honorsAwardsElectoralOfficer: Wahlvorsteher
  # honorsAwardsIdeasCompetition: Ideenwettbewerb Top 10 Projekt
  # honorsAwardsIdeasCompetitionTime: Okt 2020
  instagram: Instagram
  jonasThelemann: Jonas Thelemann
  kasselAddress: Kassel, Hessen, Deutschland
  kasselCity: Stadt Kassel
  kasselCounty: Landkreis Kassel
  languages: Sprachen
  linkedIn: LinkedIn
  maevsi: maevsi
  metaInfo: '{age}, er/ihn'
  mixcloud: Mixcloud
  ninjaneer: Ninjaneer
  ninjaneers: Ninjaneers
  nominationScholarship: Nominierung für ein Stipendium
  nominationScholarshipTime: Jul 2019
  organizations: Organisationen
  placeTime: '{place}, {time}'
  present: heute
  proficiencyNative: muttersprachliches Niveau
  proficiencyProfessional: professionelles Arbeitsniveau
  projects: Projekte
  projectsMore: und {repoCount} weitere…
  spotify: Spotify
  stackOverflow: Stack Overflow
  studyFoundation: Studienstiftung des deutschen Volkes
  titleSubtitle: '{title} · {subtitle}'
  # unikat: UNIKAT
  universityKassel: Universität Kassel
  youTube: YouTube
en:
  about: '{aboutMarkSoftwareTemplate} somewhere between frontend, backend and devops.{br}{aboutMarkDjTemplate}, occasionally rapping double times.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Attracted to things he doesn't understand. Bored when videos play at speeds of less than 2x.
  aboutCreating: Loves to create.
  aboutMarkDj: DJ and event organizer
  aboutMarkSoftware: Passionate software developer
  aboutSidefact: Getting used to the middle of black and white, hodling in the meantime.
  asideLabel: Title image
  ccc: Chaos Computer Club
  cccTimespan: May 2018 – {present}
  contactForm: Contact form
  descriptionShort: Director and founder {'@'}{maevsi} · {ninjaneers} · M.Sc. Computer Science
  education: Education
  educationGoal: Master's degree Software Engineering
  educationTime: 2021 – 2024
  english: English
  exist: EXIST
  experience: Experience
  experienceFederalVolunteerService: 'Volunteer Service Worker: refugee aid'
  experienceFederalVolunteerServiceTimespan: Jan 2017 – Aug 2017
  experienceMaevsi: Executive Director and Head of Technology
  experienceMaevsiTimespan: Nov 2024 – {present}
  experienceNinjaneer: Software Engineer
  experienceNinjaneerTimespan: Jul 2020 – today
  flipdot: flipdot Hackspace Kassel
  flipdotTimespan: Dez 2016 – {present}
  foundingScholar: Founding Scholar
  foundingScholarTimespan: Sep 2024 – Aug 2025
  german: German
  gi: German Informatics Society
  giphy: Giphy
  gitHub: GitHub
  giTimespan: Jan 2019 – Dec 2025
  # hessenIdeen: Hesse Ideas
  honorsAwards: Honors & Awards
  honorsAwardsElectoralOfficer: Electoral Officer
  # honorsAwardsIdeasCompetition: Ideas Competition Top 10 Project
  # honorsAwardsIdeasCompetitionTime: Oct 2020
  instagram: Instagram
  jonasThelemann: Jonas Thelemann
  kasselAddress: Kassel, Hesse, Germany
  kasselCity: City of Kassel
  kasselCounty: Kassel County
  languages: Languages
  linkedIn: LinkedIn
  maevsi: maevsi
  metaInfo: '{age}, he/him'
  mixcloud: Mixcloud
  ninjaneer: Ninjaneer
  ninjaneers: Ninjaneers
  nominationScholarship: Nomination for a scholarship
  nominationScholarshipTime: Jul 2019
  organizations: Organizations
  placeTime: '{place}, {time}'
  present: today
  proficiencyNative: native proficiency
  proficiencyProfessional: professional working proficiency
  projects: Projects
  projectsMore: and {repoCount} others…
  spotify: Spotify
  stackOverflow: Stack Overflow
  studyFoundation: Study Foundation of the German People
  titleSubtitle: '{title} · {subtitle}'
  # unikat: UNIKAT
  universityKassel: University of Kassel
  youTube: YouTube
</i18n>
