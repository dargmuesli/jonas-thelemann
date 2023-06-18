export default defineNuxtConfig({
  extends: ['@dargmuesli/nuxt-vio'],

  // modules
  sitemap: {
    exclude: ['/api/**'],
  },
})
