export const useLoadingDoneIndicator = (id?: string) => {
  const route = useRoute()
  const loadingIds = useState<string[]>('loadingIds', () => [])

  const loadingId = id || route.name?.toString()

  if (!loadingId)
    throw createError({ statusCode: 500, statusMessage: 'Loading id missing!' })

  const loadingIdToAdd = `${process.server ? 'ssr' : 'csr'}_${loadingId}`

  if (loadingIds.value.includes(loadingIdToAdd)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Loading id already exists!',
    })
  }

  const loadingIdSsr = `ssr_${loadingId}`

  if (process.client && loadingIds.value.includes(loadingIdSsr)) {
    loadingIds.value.splice(loadingIds.value.indexOf(loadingIdSsr), 1)
  }

  loadingIds.value.push(loadingIdToAdd)

  return {
    loadingIds,
    indicateLoadingDone: () => {
      loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1)
    },
  }
}
