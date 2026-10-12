import { assertTurnstileValid } from '@dargmuesli/nuxt-vio/server/utils/dependencies/turnstile'
import { defineEventHandler, getRequestHeader, readBody } from 'nuxt/server'

const MAIL_FROM = '"jonas-thelemann" <noreply+contact@jonas-thelemann.de>'
const MAIL_TO = 'e-mail+contact@jonas-thelemann.de'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    captcha?: string
    emailAddress: string
    message: string
    name: string
  }>(event)
  await assertTurnstileValid({ token: body.captcha })

  await event.context.$email?.nodemailer.transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    text: [
      `Email address: ${body.emailAddress}`,
      `Name: ${body.name}`,
      `Message: ${body.message}`,
      `IP: ${getRequestHeader(event, 'cf-connecting-ip')}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join('\n'),
    subject: 'Nachricht per Kontaktformular',
  })
})
