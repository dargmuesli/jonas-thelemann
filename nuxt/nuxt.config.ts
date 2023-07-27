import localeDe from './locales/de.json'
import localeEn from './locales/en.json'

export default defineNuxtConfig({
  app: {}, // TODO: remove?
  extends: ['@dargmuesli/nuxt-vio'],

  // modules
  i18n: {
    vueI18n: {
      messages: {
        de: localeDe,
        en: localeEn,
      },
    },
  },
})
