import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/utils/constants'
import { defu } from 'defu'

import { SITE_NAME } from './utils/constants'

export default defineNuxtConfig(
  defu(
    {
      extends: ['@dargmuesli/nuxt-vio'],

      // modules
      linkChecker: {
        excludeLinks: [
          ...(process.env.CI ? ['https://www.instagram.com/dargmuesli/'] : []),
          'https://www.linkedin.com/in/jonas-thelemann-148a74205/', // requires login
        ],
      },
      site: {
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
