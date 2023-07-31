export default defineNuxtConfig({
  extends: ['@dargmuesli/nuxt-vio'],

  // modules
  i18n: {
    langDir: 'locales',
    lazy: true,
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English',
        iso: 'en', // Will be used as catchall locale by default.
      },
      {
        code: 'de',
        file: 'de.json',
        name: 'Deutsch',
        iso: 'de',
      },
    ],
  }, // `langDir`, `lazy` and `locales` must be configured to extend a layer having lazy-loaded translations (https://v8.i18n.nuxtjs.org/guide/layers#locales)
  sitemap: {
    exclude: ['/api/**'],
  },
})
