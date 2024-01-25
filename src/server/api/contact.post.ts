import { existsSync, readFileSync } from 'node:fs'

import { consola } from 'consola'
import { H3Event } from 'h3'
import { createTransport } from 'nodemailer'

const MAIL_FROM = '"jonas-thelemann" <noreply+contact@jonas-thelemann.de>'
const MAIL_TO = 'e-mail+contact@jonas-thelemann.de'
const SECRET_NODEMAILER_TRANSPORTER_PATH =
  '/run/secrets/jonas-thelemann_nodemailer-transporter'

export default defineEventHandler(async function (event) {
  await assertTurnstileValid(event)
  await sendMail(event)
  event.node.res.end()
})

const sendMail = async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig()

  const transport = runtimeConfig.nodemailer.transporter
    ? runtimeConfig.nodemailer.transporter
    : existsSync(SECRET_NODEMAILER_TRANSPORTER_PATH)
      ? JSON.parse(readFileSync(SECRET_NODEMAILER_TRANSPORTER_PATH, 'utf-8'))
      : undefined

  if (!transport) {
    throw new Error('The SMTP configuration secret is missing!')
  }

  const NODEMAILER_TRANSPORTER = createTransport(transport)

  console.log(JSON.stringify(event.node.req.headers))

  const body = await readBody(event)
  const mailSentData = await NODEMAILER_TRANSPORTER.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    text: [
      `Email address: ${body.emailAddress}`,
      `Name: ${body.name}`,
      `Message: ${body.message}`,
      `IP: ${event.node.req.headers['cf-connecting-ip']}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join('\n'),
    subject: 'Nachricht per Kontaktformular',
  })

  consola.log('Message sent: %s', mailSentData.messageId)
}

const assertTurnstileValid = async (event: H3Event) => {
  const body = await readBody(event)
  const turnstileToken = body.captcha

  if (!turnstileToken) {
    return throwError(422, 'Turnstile token not provided.')
  }

  const result = await verifyTurnstileToken(turnstileToken, event)

  if (!result.success) {
    return throwError(
      403,
      `Turnstile verification unsuccessful: ${result['error-codes'].join(', ')}`,
    )
  }

  consola.debug('Turnstile verification succeeded')
}

const throwError = (code: number, message: string) => {
  consola.error(message)
  throw createError({
    statusCode: code,
    statusMessage: message,
  })
}
