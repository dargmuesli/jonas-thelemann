// TODO: remove jiti (https://github.com/microsoft/playwright/issues/14303)
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url, { interopDefault: true })
const vioConfiguration = await jiti.import(
  './node_modules/@dargmuesli/nuxt-vio-testing/playwright.config',
)

export default vioConfiguration
