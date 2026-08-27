import { getRootHost } from '@dargmuesli/nuxt-vio/shared/utils/networking'
import { defu } from 'defu'

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
      'frame-src': [`${siteUrl}~partytown/`],
      'img-src': ['https://avatars.githubusercontent.com/u/'],
      'report-to': 'sentry',
      'script-src-attr': "'unsafe-inline'", // TODO: remove when nuxt image `onError` attribute script is removed (https://github.com/nuxt/image/issues/1011)
      'worker-src': [`${siteUrl}~partytown/`, `${siteUrl}_nuxt-scripts-sw.js`],
    },
    {
      // Nuxt (static)
      'script-src-elem': ["'self'"],
    },
  )
}
