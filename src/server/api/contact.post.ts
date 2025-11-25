import { consola } from 'consola'
import { createTransport } from 'nodemailer'

const MAIL_FROM = '"jonas-thelemann" <noreply+contact@jonas-thelemann.de>'
const MAIL_TO = 'e-mail+contact@jonas-thelemann.de'

export default defineEventHandler(async () => {
  await assertTurnstileValid()
  await sendMail()
})

const sendMail = async () => {
  const event = useEvent()
  const runtimeConfig = useRuntimeConfig()

  const transport = runtimeConfig.nodemailer.transporter

  if (!transport) {
    throw new Error('The SMTP configuration secret is missing!')
  }

  const NODEMAILER_TRANSPORTER = createTransport(transport)

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

const assertTurnstileValid = async () => {
  const event = useEvent()
  const body = await readBody(event)
  const turnstileToken = body.captcha

  if (!turnstileToken) {
    return throwError(422, 'Turnstile token not provided.')
  }

  const result = await verifyTurnstileToken(turnstileToken)

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
