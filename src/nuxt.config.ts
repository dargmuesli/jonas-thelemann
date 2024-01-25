import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/utils/constants'
import { defu } from 'defu'

import { SITE_NAME } from './utils/constants'

export default defineNuxtConfig(
  defu(
    {
      extends: ['@dargmuesli/nuxt-vio'],
      modules: ['@nuxtjs/turnstile'],
      nitro: {
        prerender: {
          autoSubfolderIndex: false, // prevents Cloudflare Pages' redirection issue (https://community.cloudflare.com/t/removing-trailing-slash-on-static-websites/583429/4)
        },
      },
      runtimeConfig: {
        public: {
          turnstile: {
            siteKey: '0x4AAAAAAAQiMSbON1vdesv0',
          },
        },
        nodemailer: {
          transporter: undefined,
        },
      },
      vite: {
        optimizeDeps: {
          include: ['@dargmuesli/nuxt-vio/utils/constants'],
        },
      },

      // modules
      colorMode: {
        preference: 'light',
      },
      linkChecker: {
        fetchRemoteUrls: !process.env.CI,
        excludeLinks: [
          'https://www.linkedin.com/in/jonas-thelemann-148a74205/', // requires login
        ],
      },
      security: {
        headers: {
          contentSecurityPolicy: defu(
            {
              // jonas-thelemann
              'connect-src': [
                'https://backend.jonas-thelemann.de/api/',
                'https://api.github.com/users/dargmuesli/repos',
              ],
            },
            {
              // Cloudflare Turnstile
              'frame-src': ['https://challenges.cloudflare.com'],
              'script-src': [
                'https://challenges.cloudflare.com',
                "'sha256-oHL20tRmipXhd3ivYNMpZSHAVebPXJMetWmfG3i5FKY='",
              ],
            },
          ),
        },
      },
      turnstile: {
        secretKeyPath: process.env.NUXT_PUBLIC_SITE_URL
          ? '/run/secrets/jonas-thelemann_turnstile-key'
          : undefined,
      },
      site: {
        id: 'jonas-thelemann',
        identity: {
          type: 'Person',
        },
        twitter: '@dargmuesli',
      },
    },
    VIO_NUXT_BASE_CONFIG({
      siteName: SITE_NAME,
    }),
  ),
)
