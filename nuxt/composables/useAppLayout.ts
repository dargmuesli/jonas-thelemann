export const useAppLayout = () => {
  const head = useLocaleHead({ addSeoAttributes: true })

  useHead(head.value)
  useHead({
    bodyAttrs: {
      class:
        'bg-background-bright dark:bg-background-dark font-sans text-text-dark dark:text-text-bright',
    },
    meta: [
      {
        content: '#202020',
        name: 'msapplication-TileColor',
      },
      {
        content: '#202020',
        name: 'theme-color',
      },
    ],
  })
  useSeoMeta({
    twitterSite: '@dargmuesli',
  })
}
