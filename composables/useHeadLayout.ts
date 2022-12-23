export const useHeadLayout = () => {
  const router = useRouter()
  const host = useHost()
  const { t } = useI18n()
  const head = useLocaleHead({ addSeoAttributes: true })

  useHead(head.value)
  useHead({
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
    link: [
      {
        href: '/assets/static/favicon/apple-touch-icon.png',
        rel: 'apple-touch-icon',
        sizes: '180x180',
      },
      {
        href: '/assets/static/favicon/favicon-16x16.png',
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        href: '/assets/static/favicon/favicon-32x32.png',
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        href: '/assets/static/favicon/favicon.ico',
        rel: 'icon',
        type: 'image/x-icon',
      },
      {
        href: '/assets/static/favicon/site.webmanifest',
        rel: 'manifest',
      },
      {
        color: '#202020',
        href: '/assets/static/favicon/safari-pinned-tab.svg',
        rel: 'mask-icon',
      },
      {
        href: '/assets/static/favicon/favicon.ico',
        rel: 'shortcut icon',
      },
    ],
    meta: [
      {
        key: 'description',
        name: 'description',
        property: 'description',
        content: t('globalOgSeoDescription'),
      },
      {
        key: 'og:description',
        property: 'og:description',
        content: t('globalOgSeoDescription'),
      },
      {
        content: '/assets/static/favicon/browserconfig.xml',
        name: 'msapplication-config',
      },
      {
        content: '#202020',
        name: 'msapplication-TileColor',
      },
      {
        content: '#202020',
        name: 'theme-color',
      },
      {
        key: 'og:image',
        property: 'og:image',
        content: `https://${host}/assets/static/logos/jonas-thelemann_with-text_open-graph.png`, // Does not support .svg as of 2021-06.
      },
      {
        key: 'og:image:alt',
        property: 'og:image:alt',
        content: t('globalOgImageAlt'),
      },
      {
        key: 'og:image:height',
        property: 'og:image:height',
        content: '627',
      },
      {
        key: 'og:image:width',
        property: 'og:image:width',
        content: '1200',
      },
      {
        key: 'og:site_name',
        property: 'og:site_name',
        content: 'Jonas Thelemann',
      },
      {
        key: 'og:type',
        property: 'og:type',
        content: 'website', // https://ogp.me/#types
      },
      {
        key: 'og:title',
        property: 'og:title',
        content: 'Jonas Thelemann',
      },
      {
        key: 'og:url',
        property: 'og:url',
        content: 'https://' + host + router.currentRoute.value.fullPath,
      },
      {
        key: 'twitter:card',
        property: 'twitter:card',
        content: 'summary',
      },
      {
        key: 'twitter:description',
        property: 'twitter:description',
        content: t('globalOgSeoDescription'),
      },
      {
        key: 'twitter:image',
        property: 'twitter:image',
        content: `https://${host}/assets/static/logos/jonas-thelemann_with-text_open-graph.png`, // Does not support .svg as of 2021-06.
      },
      {
        key: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: t('globalOgImageAlt'),
      },
      {
        key: 'twitter:site',
        property: 'twitter:site',
        content: '@dargmuesli',
      },
      {
        key: 'twitter:title',
        property: 'twitter:title',
        content: 'Jonas Thelemann',
      },
    ],
    title: 'Jonas Thelemann',
  })
}
