import { cleanupCsp } from '@dargmuesli/nuxt-vio/server/plugins/security'
import { defu } from 'defu'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('nuxt-security:routeRules', async (routeRules) => {
    const { siteUrlTyped: siteUrl } = useSiteUrl()

    routeRules['/**'] = cleanupCsp(
      defu(
        {
          headers: {
            contentSecurityPolicy: GET_CSP({ siteUrl }),
          },
        },
        routeRules['/**'],
      ),
    )
  })
})
