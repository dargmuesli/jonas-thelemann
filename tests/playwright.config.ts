// TODO: remove jiti (https://github.com/microsoft/playwright/issues/14303)
import jiti from 'jiti'

const moduleFileUrl = new URL(import.meta.url)
const JITI = jiti(moduleFileUrl.pathname)
const vioConfiguration = JITI(
  './node_modules/@dargmuesli/nuxt-vio-testing/playwright.config',
).default

export default vioConfiguration
