import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import { LOCALES } from './utils/constants'

const BASE_URL =
  'https://' +
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ||
    `${process.env.HOST || 'localhost'}:3000`)
const SITEMAP_EXCLUSIONS = ['/200.html', '/404.html', '/robots.txt']

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // fallback data to prevent invalid html at generation
      },
      title: 'Jonas Thelemann', // fallback data to prevent invalid html at generation
    },
  },
  css: ['@/assets/css/main.css'],
  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    [
      '@funken-studio/sitemap-nuxt-3',
      { exclude: SITEMAP_EXCLUSIONS, hostname: BASE_URL },
    ], // Should be declared at the end of the array.
  ],
  nitro: {
    compressPublicAssets: true,
  },
  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },
  runtimeConfig: {
    public: {
      googleAnalyticsId: '', // set via environment variable `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` only
      isTesting: false, // set via environment variable `NUXT_PUBLIC_IS_TESTING` only
    },
  },
  typescript: {
    shim: false,
    strict: true,
    tsConfig: {
      vueCompilerOptions: {
        htmlAttributes: [], // https://github.com/johnsoncodehk/volar/issues/1970#issuecomment-1276994634
      },
    },
  },

  // modules
  cookieControl: {
    cookies: {
      necessary: [
        {
          description: {
            de: 'Dieser Cookie von uns speichert die Einstellungen, die in diesem Dialog getroffen werden.',
            en: 'This cookie of ours stores the settings made in this dialog.',
          },
          name: {
            de: 'Cookie-Präferenzen',
            en: 'Cookie Preferences',
          },
          targetCookieIds: [
            'cookie_control_is_consent_given',
            'cookie_control_cookies_enabled_ids',
          ],
        },
        {
          description: {
            de: 'Dieser Cookie von uns speichert die Sprache, in der diese Webseite angezeigt wird.',
            en: "This cookie of ours stores the language that's used to display this website.",
          },
          name: {
            de: 'Sprache',
            en: 'Language',
          },
          targetCookieIds: ['i18n_redirected'],
        },
      ],
      optional: [
        {
          description: {
            de: 'Die Cookies vom Drittanbieter Google ermöglichen die Analyse von Nutzerverhalten. Diese Analyse hilft uns unsere Dienste zu verbessern, indem wir verstehen, wie diese Webseite genutzt wird.',
            en: 'The third-party cookies by Google enable the analysis of user behavior. This analysis helps us to improve our services by understanding how this website is used.',
          },
          id: 'google-analytics',
          name: 'Analytics',
          targetCookieIds: ['_ga', '_ga_K4R41W62BR'],
        },
      ],
    },
    locales: ['en', 'de'],
  },
  htmlValidator: {
    failOnError: true,
    logLevel: 'warning',
  },
  i18n: {
    baseUrl: BASE_URL,
    defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
    detectBrowserLanguage: false, // Enabling browser language detection does not generate (!) other languages than the default one.
    locales: LOCALES,
    vueI18n: {
      messages: {
        de: localeDe,
        en: localeEn,
      },
      fallbackWarn: false, // TODO: don't show incorrect warnings (https://github.com/intlify/vue-i18n-next/issues/776)
    },
  },
})
