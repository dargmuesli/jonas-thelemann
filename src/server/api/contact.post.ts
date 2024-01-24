import { consola } from 'consola'
import { H3Event } from 'h3'
import { createTransport } from 'nodemailer'

const MAIL_FROM = '"jonas-thelemann" <noreply+contact@jonas-thelemann.de>'
const MAIL_TO = 'e-mail+contact@jonas-thelemann.de'

export default defineEventHandler(async function (event) {
  await assertTurnstileValid(event)
  await sendMail(event)
  event.node.res.end()
})

const sendMail = async (event: H3Event) => {
  if (!event.context.cloudflare)
    return throwError(400, 'No Cloudflare context!')

  const NODEMAILER_TRANSPORTER = createTransport({
    host: event.context.cloudflare?.env.NODEMAILER_TRANSPORTER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: event.context.cloudflare?.env.NODEMAILER_TRANSPORTER_AUTH_USERNAME,
      pass: event.context.cloudflare?.env.NODEMAILER_TRANSPORTER_AUTH_PASSWORD,
    },
  })

  const body = await readBody(event)
  const mailSentData = await NODEMAILER_TRANSPORTER.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    text: [
      `Email address: ${body.emailAddress}`,
      `Name: ${body.name}`,
      `Message: ${body.message}`,
      `IP: ${event.node.req.headers['x-forwarded-for']}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join('\n'),
    subject: 'Nachricht per Kontaktformular',
  })

  consola.log('Message sent: %s', mailSentData.messageId)
}

const assertTurnstileValid = async (event: H3Event) => {
  const body = await readBody(event)
  const turnstileToken = body.captcha

  if (Array.isArray(turnstileToken)) {
    return throwError(422, 'Turnstile token cannot be an array.')
  }

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
