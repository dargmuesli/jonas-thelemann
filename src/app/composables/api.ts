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
