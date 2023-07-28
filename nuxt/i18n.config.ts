// // TODO: find out why the following does not work
// import { i18nConfig } from '@dargmuesli/nuxt-vio/i18n.config'
// export default defineI18nConfig(() => i18nConfig)

export default defineI18nConfig(() => ({
  fallbackWarn: false, // covered by linting
  missingWarn: false, // covered by linting
}))
