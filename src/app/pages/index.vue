<template>
  <div class="flex flex-col xl:flex-row">
    <aside :aria-label="t('asideLabel')" class="relative flex">
      <div
        class="flex aspect-3543/2364 max-h-[80vh] flex-1 xl:fixed xl:h-screen xl:max-h-none xl:max-w-[38.2vw]"
      >
        <NuxtImg
          alt="Jonas in Wiesbaden."
          class="flex-1 object-cover object-[50%_50%]"
          densities="x1 x2"
          fetchpriority="high"
          format="webp"
          height="1182"
          :nonce="nonce"
          :placeholder="!runtimeConfig.public.vio.isTesting"
          preload
          sizes="320px xs:640px sm:768px md:1024px lg:1280px xl:1536px 2xl:1772px"
          src="/assets/static/images/wiesbaden.jpg"
          width="1772"
          @load="indicateLoadingDoneHeroImage"
        />
      </div>
      <div class="hidden aspect-3543/2364 h-screen max-w-[38.2vw] xl:block" />
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
                <span>{{ t('organizationUniversityKassel') }}</span>
              </a>
            </template>
            <template #maevsi>
              <a href="https://maev.si/">
                <span>{{ t('organizationMaevsi') }}</span>
              </a>
            </template>
          </i18n-t>
          <p class="text-gray-500 dark:text-gray-400">
            <a href="https://www.google.com/maps/place/Kassel">
              {{ t('addressKassel') }}
            </a>
          </p>
        </div>
        <div class="pb-2">
          <ul class="-mx-1.5 flex flex-wrap">
            <li v-for="link in socialLinks" :key="link.to" class="m-1.5">
              <JtPortfolioLink :to="link.to">
                {{ link.label }}
              </JtPortfolioLink>
            </li>
          </ul>
        </div>
        <div>
          <!-- Wrapping div required for paragraph's negative margin to work. -->
          <i18n-t class="-mt-2" keypath="about" tag="p">
            <template #aboutMarkSoftwareTemplate>
              <JtPortfolioHighlight>
                {{ t('aboutMarkSoftware') }}
              </JtPortfolioHighlight>
            </template>
            <template #aboutMarkDjTemplate>
              <JtPortfolioHighlight>
                {{ t('aboutMarkDj') }}
              </JtPortfolioHighlight>
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
          <JtPortfolioSection :title="t('experience')">
            <JtPortfolioItem
              v-for="(item, idx) in experienceItems"
              :key="idx"
              :is-visible="item.isVisible"
              :subtitle-place="item.organization"
              :subtitle-place-url="item.organizationUrl"
              :subtitle-time="item.timespan"
              :title="item.role"
            />
          </JtPortfolioSection>
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
                    {{ t('organizationUniversityKassel') }}
                  </a>
                </template>
                <template #subtitle>
                  <span>{{ t('educationTime') }}</span>
                </template>
              </i18n-t>
            </div>
          </section>
          <JtPortfolioSection :title="t('engagement')">
            <JtPortfolioItem
              v-for="(item, idx) in engagementItems"
              :key="idx"
              :is-visible="item.isVisible"
              :subtitle-place="item.organization"
              :subtitle-place-url="item.organizationUrl"
              :subtitle-time="item.timespan"
              :title="item.role"
            />
          </JtPortfolioSection>
          <JtPortfolioSection :title="t('languages')">
            <JtPortfolioItem
              v-for="(item, idx) in languageItems"
              :key="idx"
              :title="item.title"
              :subtitle-text="item.proficiency"
            />
          </JtPortfolioSection>
          <JtPortfolioSection :title="t('honorsAwards')">
            <JtPortfolioItem
              v-for="(item, idx) in honorsAwardsItems"
              :key="idx"
              :title="item.title"
              :title-url="item.titleUrl"
              :subtitle-place="item.subtitlePlace"
              :subtitle-place-url="item.subtitlePlaceUrl"
              :subtitle-time="item.subtitleTime"
            />
          </JtPortfolioSection>
          <JtPortfolioSection :title="t('organizations')">
            <JtPortfolioItem
              v-for="(item, idx) in organizationItems"
              :key="idx"
              :title="item.title"
              :title-url="item.url"
              :subtitle-text="item.timespan"
            />
          </JtPortfolioSection>
          <hr
            class="border-gray-200 md:col-span-2 xl:col-span-1 2xl:col-span-2"
          />
          <section class="md:col-span-2 xl:col-span-1 2xl:col-span-2">
            <h2 class="text-2xl">{{ t('projects') }}</h2>
            <ul class="mt-2 flex flex-wrap items-center justify-around">
              <li
                v-for="project in projectItems"
                :key="project.name"
                class="m-4"
              >
                <VioLink
                  :aria-label="project.name"
                  class="inline-block"
                  is-external-icon-disabled
                  :to="project.url"
                >
                  <NuxtImg
                    :alt="project.altText"
                    class="h-12 w-auto"
                    :height="project.height"
                    :nonce="nonce"
                    :src="project.logoSrc"
                    :width="project.width"
                  />
                </VioLink>
              </li>
              <li class="m-4">
                <JtPortfolioLink :to="localePath('projects-contributions')">
                  {{ t('projectsMore', { repoCount }) }}
                </JtPortfolioLink>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer class="text-sm leading-6">
        <JtLayoutFooter />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { consola } from 'consola'
// import { getQuery } from 'ufo'
import repos from '~/assets/data/contributions.json'

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
const isTesting = useIsTesting()

// data
const age = isTesting
  ? 1337
  : Math.abs(
      new Date(Date.now() - Date.parse('1998-12-17')).getUTCFullYear() - 1970,
    )
const repoCount = isTesting ? '1337' : (repos.length - 3).toString() // 3 already displayed project subtracted
const socialLinks = [
  { to: localePath('/contact'), label: t('contactForm') },
  { to: 'https://giphy.com/channel/dargmuesli', label: t('brandGiphy') },
  { to: 'https://github.com/dargmuesli', label: t('brandGitHub') },
  { to: 'https://www.instagram.com/dargmuesli/', label: t('brandInstagram') },
  {
    to: 'https://www.linkedin.com/in/jonas-thelemann-148a74205/',
    label: t('brandLinkedIn'),
  },
  { to: 'https://www.mixcloud.com/creal/', label: t('brandMixcloud') },
  { to: 'https://open.spotify.com/user/1153065250', label: t('brandSpotify') },
  {
    to: 'https://stackoverflow.com/users/4682621/dargmuesli',
    label: t('brandStackOverflow'),
  },
  {
    to: 'https://www.youtube.com/channel/UCmIrzQsJeEM5eW6KOAk9nSg',
    label: t('brandYouTube'),
  },
]
const experienceItems = [
  {
    role: t('roleExecutiveDirectorAndHeadOfTechnology'),
    organization: t('organizationMaevsi'),
    organizationUrl: 'https://maev.si/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthNov'), year: 2024 }),
      to: t('present'),
    }),
  },
  {
    role: t('roleBusinessPartnershipsRepresentative'),
    organization: t('organizationNinjaneers'),
    organizationUrl: 'https://www.ninjaneers.de/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthOct'), year: 2025 }),
      to: t('present'),
    }),
  },
  {
    role: t('roleEcosystemTeamMember'),
    organization: t('organizationNuxt'),
    organizationUrl: 'https://nuxt.com/team',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthJul'), year: 2022 }),
      to: t('present'),
    }),
  },
  {
    isVisible: false,
    role: t('roleFullStackSoftwareEngineer'),
    organization: t('organizationNinjaneers'),
    organizationUrl: 'https://www.ninjaneers.de/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthJul'), year: 2020 }),
      to: t('time', { month: t('timeMonthSep'), year: 2025 }),
    }),
  },
  {
    isVisible: false,
    role: t('foundingScholar'),
    organization: t('organizationExist'),
    organizationUrl: 'https://www.exist.de/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthSep'), year: 2024 }),
      to: t('time', { month: t('timeMonthAug'), year: 2025 }),
    }),
  },
  {
    isVisible: false,
    role: t('foundingScholar'),
    organization: t('organizationHesseIdeas'),
    organizationUrl: 'https://www.exist.de/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthJan'), year: 2023 }),
      to: t('time', { month: t('timeMonthJun'), year: 2023 }),
    }),
  },
  {
    isVisible: false,
    role: t('roleFederalVolunteerService'),
    organization: t('organizationKasselCounty'),
    organizationUrl: 'https://www.landkreiskassel.de/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthJan'), year: 2017 }),
      to: t('time', { month: t('timeMonthAug'), year: 2017 }),
    }),
  },
]
const engagementItems = [
  {
    organization: t('organizationFlipdot'),
    organizationUrl: 'https://flipdot.org/',
    role: t('roleBoardMember'),
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthJun'), year: 2025 }),
      to: t('present'),
    }),
  },
  {
    organization: t('organizationCommonGroundsForum'),
    organizationUrl: 'https://common-grounds-forum.org/',
    role: t('rolePoliticalAdvocate'),
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthAug'), year: 2024 }),
      to: t('present'),
    }),
  },
  {
    organization: t('organizationKasselCity'),
    organizationUrl: 'https://www.kassel.de/',
    role: t('roleElectoralSupervisor'),
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthJun'), year: 2025 }),
      to: t('present'),
    }),
  },
  {
    isVisible: false,
    organization: t('organizationGermanyInformaticsSociety'),
    organizationUrl: 'https://gi.de/',
    role: t('roleUniversityGroupSpokesperson'),
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthJan'), year: 2019 }),
      to: t('time', { month: t('timeMonthDec'), year: 2025 }),
    }),
  },
  {
    isVisible: false,
    organization: t('organizationKasselCity'),
    organizationUrl: 'https://www.kassel.de/',
    role: t('roleElectoralAssistant'),
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthSep'), year: 2021 }),
      to: t('time', { month: t('timeMonthJan'), year: 2025 }),
    }),
  },
]
const organizationItems = [
  {
    title: t('organizationChaosComputerClub'),
    url: 'https://www.ccc.de/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthMay'), year: 2018 }),
      to: t('present'),
    }),
  },
  {
    title: t('organizationFlipdot'),
    url: 'https://flipdot.org/',
    timespan: t('timeSpan', {
      from: t('time', { month: t('timeMonthDec'), year: 2016 }),
      to: t('present'),
    }),
  },
]
const languageItems = [
  { title: t('languageGerman'), proficiency: t('proficiencyNative') },
  { title: t('languageEnglish'), proficiency: t('proficiencyProfessional') },
]
const honorsAwardsItems = [
  {
    title: t('honorsAwardsIdeasCompetitionTop10Project'),
    titleUrl: undefined,
    subtitlePlace: t('organizationUnikat'),
    subtitlePlaceUrl:
      'https://www.uni-kassel.de/einrichtung/ukt/unikat-von-der-idee-zur-gruendung.html',
    subtitleTime: t('time', { month: t('timeMonthOct'), year: 2020 }),
  },
  {
    title: t('nominationScholarship'),
    titleUrl: undefined,
    subtitlePlace: t('studyFoundation'),
    subtitlePlaceUrl: 'https://www.studienstiftung.de/',
    subtitleTime: t('time', { month: t('timeMonthJul'), year: 2019 }),
  },
]
const projectItems = [
  {
    name: 'Vibetype',
    url: 'https://maev.si/',
    logoSrc: '/assets/static/logos/vibetype.svg',
    altText: "Vibetype's logo",
    width: 547,
    height: 180,
  },
  {
    name: 'nearbuy',
    url: 'https://nearbuy-food.de/',
    logoSrc: '/assets/static/logos/nearbuy.svg',
    altText: "nearbuy's logo",
    width: 1734,
    height: 734,
  },
  {
    name: 'cReal',
    url: 'https://creal.jonas-thelemann.de/',
    logoSrc: '/assets/static/logos/creal.svg',
    altText: "cReal's logo",
    width: 1330,
    height: 1330,
  },
  {
    name: 'TrapParty',
    url: 'https://trapparty.jonas-thelemann.de/',
    logoSrc: '/assets/static/logos/trapparty.svg',
    altText: "TrapParty's logo",
    width: 1308,
    height: 1308,
  },
]

// lifecycle
onMounted(() => indicateLoadingDone())

// initialization
useHeadDefault({
  description: t('descriptionShort', {
    maevsi: t('organizationMaevsi'),
    ninjaneers: t('organizationNinjaneers'),
  }),
  title: siteConfig.name,
})
</script>

<i18n lang="yaml">
de:
  about: '{aboutMarkSoftwareTemplate} irgendwo zwischen Frontend, Backend und DevOps.{br}{aboutMarkDjTemplate}, manchmal am Doubletime rappen.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Angezogen von Dingen, die er nicht versteht. Gelangweilt, wenn Videos langsamer als mit 2x-Geschwindigkeit abspielen.
  aboutCreating: Ist verliebt darin, Dinge zu erschaffen.
  aboutMarkDj: DJ und Event-Organisator
  aboutMarkSoftware: Leidenschaftlicher Software-Entwickler
  aboutSidefact: Freundet sich mit der Mitte von Schwarz und Weiß an, hodlt nebenbei.
  addressKassel: Kassel, Hessen, Deutschland
  asideLabel: Titelbild
  brandGiphy: Giphy
  brandGitHub: GitHub
  brandInstagram: Instagram
  brandLinkedIn: LinkedIn
  brandMixcloud: Mixcloud
  brandSpotify: Spotify
  brandStackOverflow: Stack Overflow
  brandYouTube: YouTube
  contactForm: Kontaktformular
  descriptionShort: Geschäftsführer und Gründer {'@'}{maevsi} · {ninjaneers} · M.Sc. Informatik
  education: Ausbildung
  educationGoal: Master der Software-Entwicklung
  educationTime: 2021 – 2024
  engagement: Ehrenamt
  experience: Berufserfahrung
  foundingScholar: Gründungs-Stipendiant
  honorsAwards: Auszeichnungen
  honorsAwardsIdeasCompetitionTop10Project: Ideenwettbewerb Top 10 Projekt
  jonasThelemann: Jonas Thelemann
  languageEnglish: Englisch
  languageGerman: Deutsch
  languages: Sprachen
  metaInfo: '{age}, er/ihm'
  ninjaneer: Ninjaneer
  nominationScholarship: Nominierung für ein Stipendium
  organizationChaosComputerClub: Chaos Computer Club
  organizationCommonGroundsForum: Common Grounds Forum
  organizationExist: EXIST
  organizationFlipdot: flipdot
  organizationGermanyInformaticsSociety: Gesellschaft für Informatik
  organizationHesseIdeas: Hessen Ideen
  organizationKasselCity: Stadt Kassel
  organizationKasselCounty: Landkreis Kassel
  organizationMaevsi: maevsi
  organizationNinjaneers: Ninjaneers
  organizationNuxt: Nuxt
  organizations: Mitgliedschaften
  organizationUnikat: UNIKAT
  organizationUniversityKassel: Universität Kassel
  present: heute
  proficiencyNative: muttersprachliches Niveau
  proficiencyProfessional: professionelles Arbeitsniveau
  projects: Projekte
  projectsMore: und {repoCount} Beiträge…
  roleBoardMember: Vorstandsmitglied
  roleBusinessPartnershipsRepresentative: Repräsentant für Geschäftspartnerschaften
  roleEcosystemTeamMember: Mitglied des Ökosystem-Teams
  roleElectoralAssistant: Beisitzer
  roleElectoralSupervisor: Wahlvorsteher
  roleExecutiveDirectorAndHeadOfTechnology: Geschäftsführer und technischer Leiter
  roleFederalVolunteerService: 'Freiwilligendienstler: Flüchlingshilfe'
  roleFullStackSoftwareEngineer: Full-Stack Software-Entwickler
  rolePoliticalAdvocate: Interessenvertreter der politischen Jugend
  roleUniversityGroupSpokesperson: Sprecher der Universitätsgruppe
  studyFoundation: Studienstiftung des deutschen Volkes
  time: '{month} {year}'
  timeMonthAug: Aug
  timeMonthDec: Dez
  timeMonthJan: Jan
  timeMonthJul: Jul
  timeMonthJun: Jun
  timeMonthMay: Mai
  timeMonthNov: Nov
  timeMonthOct: Okt
  timeMonthSep: Sep
  timeSpan: '{from} – {to}'
  titleSubtitle: '{title} · {subtitle}'
en:
  about: '{aboutMarkSoftwareTemplate} somewhere between frontend, backend and devops.{br}{aboutMarkDjTemplate}, occasionally rapping double times.{br}{aboutAttraction}{br}{aboutSidefact}{br}{aboutCreating}'
  aboutAttraction: Attracted to things he doesn't understand. Bored when videos play at speeds of less than 2x.
  aboutCreating: Loves to create.
  aboutMarkDj: DJ and event organizer
  aboutMarkSoftware: Passionate software developer
  aboutSidefact: Getting used to the middle of black and white, hodling in the meantime.
  addressKassel: Kassel, Hesse, Germany
  asideLabel: Title image
  brandGiphy: Giphy
  brandGitHub: GitHub
  brandInstagram: Instagram
  brandLinkedIn: LinkedIn
  brandMixcloud: Mixcloud
  brandSpotify: Spotify
  brandStackOverflow: Stack Overflow
  brandYouTube: YouTube
  contactForm: Contact form
  descriptionShort: Director and founder {'@'}{maevsi} · {ninjaneers} · M.Sc. Computer Science
  education: Education
  educationGoal: Master's degree Software Engineering
  educationTime: 2021 – 2024
  engagement: Civic Engagement
  experience: Professional Experience
  foundingScholar: Founding Scholar
  honorsAwards: Awards
  honorsAwardsIdeasCompetitionTop10Project: Ideas Competition Top 10 Project
  jonasThelemann: Jonas Thelemann
  languageEnglish: English
  languageGerman: German
  languages: Languages
  metaInfo: '{age}, he/him'
  ninjaneer: Ninjaneer
  nominationScholarship: Nomination for a scholarship
  organizationChaosComputerClub: Chaos Computer Club
  organizationCommonGroundsForum: Common Grounds Forum
  organizationExist: EXIST
  organizationFlipdot: flipdot
  organizationGermanyInformaticsSociety: German Informatics Society
  organizationHesseIdeas: Hesse Ideas
  organizationKasselCity: City of Kassel
  organizationKasselCounty: Kassel County
  organizationMaevsi: maevsi
  organizationNinjaneers: Ninjaneers
  organizationNuxt: Nuxt
  organizations: Memberships
  organizationUnikat: UNIKAT
  organizationUniversityKassel: University of Kassel
  present: present
  proficiencyNative: native proficiency
  proficiencyProfessional: professional working proficiency
  projects: Projects
  projectsMore: and {repoCount} contributions…
  roleBoardMember: Board Member
  roleBusinessPartnershipsRepresentative: Business Partnerships Representative
  roleEcosystemTeamMember: Ecosystem Team Member
  roleElectoralAssistant: Electoral Assistant
  roleElectoralSupervisor: Electoral Supervisor
  roleExecutiveDirectorAndHeadOfTechnology: Executive Director and Head of Technology
  roleFederalVolunteerService: 'Volunteer Service Worker: refugee aid'
  roleFullStackSoftwareEngineer: Full-Stack Software Engineer
  rolePoliticalAdvocate: Political Youth Advocate
  roleUniversityGroupSpokesperson: University Group Spokesperson
  studyFoundation: Study Foundation of the German People
  time: '{month} {year}'
  timeMonthAug: Aug
  timeMonthDec: Dec
  timeMonthJan: Jan
  timeMonthJul: Jul
  timeMonthJun: Jun
  timeMonthMay: May
  timeMonthNov: Nov
  timeMonthOct: Oct
  timeMonthSep: Sep
  timeSpan: '{from} – {to}'
  titleSubtitle: '{title} · {subtitle}'
</i18n>
