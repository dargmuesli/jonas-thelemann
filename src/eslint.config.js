import { VIO_ESLINT_CONFIG } from '@dargmuesli/nuxt-vio/.config/lint.js'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...VIO_ESLINT_CONFIG,
  {
    settings: {
      'vue-i18n': {
        localeDir: [
          {
            pattern: './locales/*.json',
          },
          {
            pattern: './node_modules/@dargmuesli/nuxt-vio/locales/*.json',
          },
        ],
      },
    },
  },
  {
    ignores: ['gql/generated/**/*'],
  },
  {
    files: ['locales/**/*'],
    rules: {
      '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'off',
    },
  }, // TODO: remove once `@intlify/vue-i18n/no-duplicate-keys-in-locale` is checked across layers
)
