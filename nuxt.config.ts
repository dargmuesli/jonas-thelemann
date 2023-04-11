import { LOCALES, SITE_NAME } from '@dargmuesli/nuxt-vio/utils/constants'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'

const BASE_URL =
  'https://' +
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ||
    `${process.env.HOST || 'localhost'}:3000`)

export default defineNuxtConfig({
  extends: ['@dargmuesli/nuxt-vio', 'nuxt-seo-kit'],
  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
      googleAnalyticsId: '', // set via environment variable `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` only
      ...{
        siteName: SITE_NAME,
        siteUrl: BASE_URL,
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
          id: 'c',
          name: {
            de: 'Cookie-Präferenzen',
            en: 'Cookie Preferences',
          },
          targetCookieIds: ['ncc_c', 'ncc_e'],
        },
        {
          description: {
            de: 'Dieser Cookie von uns speichert die Sprache, in der diese Webseite angezeigt wird.',
            en: "This cookie of ours stores the language that's used to display this website.",
          },
          id: 'l',
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
          id: 'ga',
          links: {
            'https://policies.google.com/privacy': 'Google Privacy Policy',
            'https://policies.google.com/terms': 'Google Terms of Service',
          },
          name: 'Analytics',
          targetCookieIds: ['_ga', '_ga_K4R41W62BR'],
        },
      ],
    },
    locales: ['en', 'de'],
  },
  htmlValidator: {
    // failOnError: true,
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
  linkChecker: {
    failOn404: false, // TODO: enable (https://github.com/harlan-zw/nuxt-seo-kit/issues/4#issuecomment-1434522124)
  },
  site: {
    splash: false,
  },
})
