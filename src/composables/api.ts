export const useServiceFetch = ({
  name,
  path,
  port,
}: {
  name?: string
  path?: string
  port?: number
}) => {
  const getServiceHref = useGetServiceHref()

  return $fetch.create({
    baseURL: getServiceHref({ name, port }) + (path || ''),
  })
}

export const useBackendFetch = () => {
  const runtimeConfig = useRuntimeConfig()

  return runtimeConfig.public.vio.stagingHost
    ? $fetch
    : useServiceFetch({
        name: 'backend',
        port: 1337,
      })
}
