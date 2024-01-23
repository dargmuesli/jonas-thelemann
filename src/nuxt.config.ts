import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/utils/constants'
import { defu } from 'defu'

import { SITE_NAME } from './utils/constants'

export default defineNuxtConfig(
  defu(
    {
      extends: ['@dargmuesli/nuxt-vio'],
      nitro: {
        prerender: {
          autoSubfolderIndex: false, // prevents Cloudflare Pages' redirection issue (https://community.cloudflare.com/t/removing-trailing-slash-on-static-websites/583429/4)
        },
      },
      vite: {
        optimizeDeps: {
          include: ['@dargmuesli/nuxt-vio/utils/constants'],
        },
      },

      // modules
      linkChecker: {
        fetchRemoteUrls: !process.env.CI,
        excludeLinks: [
          'https://www.linkedin.com/in/jonas-thelemann-148a74205/', // requires login
        ],
      },
      security: {
        headers: {
          contentSecurityPolicy: {
            'connect-src': ['https://api.github.com/users/dargmuesli/repos'],
          },
        },
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
