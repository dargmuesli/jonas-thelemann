import mailchannelsPlugin from '@cloudflare/pages-plugin-mailchannels'

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [
        { name: 'Jonas Thelemann', email: 'e-mail+form@jonas-thelemann.de' },
      ],
    },
  ],
  from: { name: 'jonas-thelemann.de', email: 'no-reply@cloudflare.com' },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: '/thank-you' },
    }),
})
