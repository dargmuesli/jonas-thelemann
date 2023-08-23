import { VIO_NUXT_BASE_CONFIG } from '@dargmuesli/nuxt-vio/utils/constants'

import { SITE_NAME } from './utils/constants'

export default defineNuxtConfig({
  ...VIO_NUXT_BASE_CONFIG({
    siteName: SITE_NAME,
  }),
  extends: ['@dargmuesli/nuxt-vio'],

  linkChecker: {
    excludeLinks: [
      'https://www.linkedin.com/in/jonas-thelemann-148a74205/', // requires login
    ],
    failOnError: false, // TODO: enable (https://github.com/harlan-zw/nuxt-link-checker/issues/13)
  },
})
