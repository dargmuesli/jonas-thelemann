import { IncomingMessage } from 'node:http'

export function append(path: string, pathToAppend: string): string {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}

export function getHost(req: IncomingMessage) {
  if (!req.headers.host) throw new Error('Host header is not given!')

  return req.headers.host
}
