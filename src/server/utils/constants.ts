import { getRootHost } from '@dargmuesli/nuxt-vio/shared/utils/networking'
import { defu } from 'defu'

export const DARGSTACK_SECRET_UNUSED_THIRD_PARTY = 'UNSET THIRD PARTY SECRET'

export const GET_CSP = ({ siteUrl }: { siteUrl: URL }) => {
  const domainTldPort =
    IS_IN_FRONTEND_DEVELOPMENT && !import.meta.prerender
      ? PRODUCTION_HOST
      : getRootHost(siteUrl.host)

  return defu(
    {
      // jonas-thelemann
      'connect-src': [
        `https://backend.${domainTldPort}/api/`,
        'https://api.github.com/users/dargmuesli/repos',
      ],
      'report-to': 'csp-endpoint',
      'report-uri':
        'https://o4507259039973376.ingest.de.sentry.io/api/4507260561653840/security/?sentry_key=1e53178c1dba9b39147de4a21853a3e3',
      'script-src-attr': "'unsafe-inline'", // Nuxt image on error
    },
    {
      // Cloudflare Turnstile
      'frame-src': ['https://challenges.cloudflare.com'],
      'script-src-elem': ['https://challenges.cloudflare.com'],
    },
  )
}
