import { assertTurnstileValid } from '@dargmuesli/nuxt-vio/server/utils/dependencies/turnstile'
import {
  defineEventHandler,
  getRequestHeader,
  readValidatedBody,
} from 'nuxt/server'
import { z } from 'zod'

const MAIL_FROM = '"jonas-thelemann" <noreply+contact@jonas-thelemann.de>'
const MAIL_TO = 'e-mail+contact@jonas-thelemann.de'
const BODY_SCHEMA = z.object({
  captcha: z.string(),
  emailAddress: z.email(),
  message: z.string().min(1),
  name: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, BODY_SCHEMA)
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
