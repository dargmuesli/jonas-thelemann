import mailChannelsPlugin from "@dargmuesli/pages-plugin-mailchannels";

interface Env {
  DKIM_PRIVATE_KEY: string;
}

export const onRequest: PagesFunction<Env> = (context) =>
  mailChannelsPlugin({
    personalizations: [
      {
        dkim_domain: "jonas-thelemann.de",
        dkim_selector: "mailchannels",
        dkim_private_key: context.env.DKIM_PRIVATE_KEY,
        to: [
          { name: "Jonas Thelemann", email: "e-mail+form@jonas-thelemann.de" },
        ],
      },
    ],
    from: { name: "jonas-thelemann.de", email: "no-reply@jonas-thelemann.de" },
    respondWith: () =>
      new Response(null, {
        status: 302,
        headers: { Location: "/thank-you" },
      }),
  })(context);
