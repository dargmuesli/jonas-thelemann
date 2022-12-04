import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const { res } = event.node
  res.setHeader('Content-Type', 'text/plain')
  res.end('OK')
})
