import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/shared/utils/nuxt'
import { defu } from 'defu'

import { SITE_NAME } from '../shared/utils/constants'

export default defineNuxtConfig(
  defu(
    {
      css: ['~/assets/css/jonas-thelemann.css'],
      extends: ['@dargmuesli/nuxt-vio'],
      modules: ['@nuxt/scripts', '@nuxtjs/turnstile'],
      nitro: {
        experimental: {
          asyncContext: true, // TODO: remove when enabled in vio
        },
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
            '@dargmuesli/nuxt-vio/shared/utils/constants',
            '@intlify/core-base',
            '@intlify/shared',
            '@vuelidate/core',
            '@vuelidate/validators',
            'consola',
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
      htmlValidator: {
        enabled: false, //TODO: enable once Nuxt image links are properly escaped (https://github.com/nuxt/image/issues/1378)
      },
      linkChecker: {
        excludeLinks: [
          'https://www.studienstiftung.de/', // incorrect 404
          'https://www.linkedin.com/in/jonas-thelemann-148a74205/', // incorrect 404
        ],
      },
      site: {
        id: 'jonas-thelemann',
        identity: {
          type: 'Person',
        },
        twitter: '@dargmuesli',
      },

      $production: {
        security: {
          headers: {
            crossOriginEmbedderPolicy: 'require-corp', // breaks nuxt devtools // TODO: remove when vio sets this
          },
        },
      },
    },
    VIO_NUXT_BASE_CONFIG({
      siteName: SITE_NAME,
    }),
  ),
)
