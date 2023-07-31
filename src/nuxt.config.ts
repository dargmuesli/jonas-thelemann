import { I18N_MODULE_CONFIG } from '@dargmuesli/nuxt-vio/utils/constants'

export default defineNuxtConfig({
  extends: ['@dargmuesli/nuxt-vio'],

  // modules
  i18n: {
    ...I18N_MODULE_CONFIG, // `langDir`, `lazy` and `locales` must be configured to extend a layer having lazy-loaded translations (https://v8.i18n.nuxtjs.org/guide/layers#locales)
  },
})
