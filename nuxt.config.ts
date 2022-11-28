import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { viteExternalsPlugin } from 'vite-plugin-externals'

import localeDe from './locales/de.json'
import localeEn from './locales/en.json'
import { LOCALES } from './utils/constants'

const BASE_URL =
  'https://' +
  (process.env.NUXT_PUBLIC_STACK_DOMAIN ||
    `${process.env.HOST || 'localhost'}:3000`)

export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  modules: [
    // [
    //   '@dargmuesli/nuxt-cookie-control',
    //   {
    //     locales: ['en', 'de'],
    //     necessary: [
    //       {
    //         name: {
    //           de: 'Authentifizierungsdaten',
    //           en: 'Authentication Data',
    //         },
    //         // cookies: ['JWT_NAME'],
    //       },
    //       {
    //         name: {
    //           de: 'Cookie-Präferenzen',
    //           en: 'Cookie Preferences',
    //         },
    //         // cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
    //       },
    //       {
    //         name: {
    //           de: 'Spracheinstellungen',
    //           en: 'Language Settings',
    //         },
    //         // cookies: ['i18n_redirected'],
    //       },
    //     ],
    //     optional: [
    //       {
    //         name: 'Google Analytics',
    //         identifier: 'ga',
    //         // cookies: ['_ga', '_gat', '_gid'],
    //         accepted: () => {
    //           const { $ga } = useNuxtApp()
    //           $ga.enable()
    //         },
    //         declined: () => {
    //           const { $ga } = useNuxtApp()
    //           $ga.disable()
    //         },
    //       },
    //     ],
    //   },
    // ],
    // [
    //   '@nuxtjs/google-analytics',
    //   {
    //     disabled: () => {
    //       const enabledCookies =
    //         document.cookie
    //           .match(
    //             '(^|;)\\s*' +
    //               'cookie_control_enabled_cookies' +
    //               '\\s*=\\s*([^;]+)'
    //           )
    //           ?.pop() || ''
    //       return !enabledCookies.split(',').includes('ga')
    //     },
    //   },
    // ],
    [
      '@nuxtjs/html-validator',
      {
        failOnError: true,
        logLevel: 'warning',
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        baseUrl: BASE_URL,
        defaultLocale: 'en', // Must be set for the default prefix_except_default prefix strategy.
        detectBrowserLanguage: {
          cookieSecure: true,
          redirectOn: 'root',
        },
        locales: LOCALES,
        vueI18n: {
          messages: {
            de: localeDe,
            en: localeEn,
          },
          fallbackWarn: false, // TODO: don't show incorrect warnings (https://github.com/intlify/vue-i18n-next/issues/776)
        },
        // vueI18nLoader: true,
      },
    ],
    '@nuxtjs/robots',
    '@funken-studio/sitemap-nuxt-3', // Should be declared at the end of the array.
  ],
  nitro: {
    compressPublicAssets: true,
  },
  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },
  runtimeConfig: {
    public: {
      googleAnalytics: {
        debug: process.env.NODE_ENV !== 'production',
      },
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
  vite: {
    plugins: [
      viteExternalsPlugin({
        webpack: 'webpack',
      }),
      VueI18nPlugin({
        include:
          '!' +
          resolve(dirname(fileURLToPath(import.meta.url)), './node_modules/**'), // https://github.com/intlify/bundle-tools/issues/168
      }),
    ],
  },
})
