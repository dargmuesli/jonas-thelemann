// TODO: remove jiti (https://github.com/microsoft/playwright/issues/14303)
import jiti from 'jiti'
const vioConfig = jiti(new URL('', import.meta.url).pathname)(
  './node_modules/@dargmuesli/nuxt-vio/playwright.config',
).default

export default vioConfig
