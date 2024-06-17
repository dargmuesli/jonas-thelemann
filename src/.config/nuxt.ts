import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/utils/nuxt'
import { defu } from 'defu'

import { SITE_NAME } from '../utils/constants'

export default defineNuxtConfig(
  defu(
    {
      devServer: {
        https: {
          key: './.config/certificates/ssl.key',
          cert: './.config/certificates/ssl.crt',
        },
      },
      extends: ['@dargmuesli/nuxt-vio'],
      modules: ['@nuxtjs/turnstile'],
      nitro: {
        prerender: {
          autoSubfolderIndex: false, // prevents Cloudflare Pages' redirection issue (https://community.cloudflare.com/t/removing-trailing-slash-on-static-websites/583429/4)
        },
      },
      runtimeConfig: {
        nodemailer: {
          transporter: undefined,
        },
        public: {
          turnstile: {
            siteKey: '0x4AAAAAAAQiMSbON1vdesv0',
          },
        },
      },
      vite: {
        optimizeDeps: {
          include: [
            '@dargmuesli/nuxt-vio/utils/constants',
            '@vuelidate/core',
            'consola',
            'sweetalert2',
          ],
        },
      },

      // modules
      colorMode: {
        preference: 'light',
      },
      gtag: {
        id: 'G-K4R41W62BR',
      },
      linkChecker: {
        excludeLinks: [
          'https://www.studienstiftung.de/', // incorrect 404
          'https://www.linkedin.com/in/jonas-thelemann-148a74205/', // incorrect 404
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
              'report-to': 'csp-endpoint',
              'report-uri':
                'https://o4507259039973376.ingest.sentry.io/api/4507260561653840/security/?sentry_key=1e53178c1dba9b39147de4a21853a3e3',
              'script-src-attr': "'unsafe-inline'", // Nuxt image on error
            },
            {
              // Cloudflare Turnstile
              'frame-src': ['https://challenges.cloudflare.com'],
              'script-src-elem': [
                'https://challenges.cloudflare.com',
                // "'sha256-oHL20tRmipXhd3ivYNMpZSHAVebPXJMetWmfG3i5FKY='", // TODO: enable once unsafe-inline is removed in Vio
              ],
            },
          ),
        },
      },
      turnstile: {
        secretKeyPath:
          process.env.NUXT_PUBLIC_SITE_URL ||
          process.env.NODE_ENV === 'production'
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
