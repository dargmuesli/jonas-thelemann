import { IncomingMessage } from 'node:http'

export const append = (path: string, pathToAppend: string) =>
  path + (path.endsWith('/') ? '' : '/') + pathToAppend

export const getHost = (req: IncomingMessage) => {
  if (!req.headers.host) throw new Error('Host header is not given!')

  return req.headers.host
}

export const isTesting = () => process.client && window.Cypress

declare global {
  interface Window {
    Cypress: any
  }
}
