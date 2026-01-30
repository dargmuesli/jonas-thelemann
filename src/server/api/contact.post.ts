const MAIL_FROM = '"jonas-thelemann" <noreply+contact@jonas-thelemann.de>'
const MAIL_TO = 'e-mail+contact@jonas-thelemann.de'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await assertTurnstileValid({ token: body.captcha })

  await event.context.$email?.nodemailer.transporter.sendMail({
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
})
