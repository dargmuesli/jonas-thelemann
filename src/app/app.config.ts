const address = {
  city: '34121 Kassel',
  name: 'Jonas Thelemann',
  street: 'Virchowstraße 4',
}

export default defineAppConfig({
  vio: {
    pages: {
      legalNotice: {
        contact: {
          email: 'e-mail+legal-notice@jonas-thelemann.de',
        },
        responsibility: {
          address,
        },
        tmg: {
          address,
        },
      },
      privacyPolicy: {
        hostingCdn: {
          external: {
            address: {
              city: '91710 Gunzenhausen, Deutschland',
              name: 'Hetzner Online GmbH',
              street: 'Industriestr. 25',
            },
          },
        },
        mandatoryInfo: {
          responsible: {
            address: {
              ...address,
              email: 'e-mail+privacy-policy@jonas-thelemann.de',
            },
          },
        },
      },
    },
    server: {
      middleware: {
        headers: {
          NEL: '\'{"report_to":"csp-endpoint","max_age":31536000,"include_subdomains":true}\'',
          'Report-To':
            '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"https://o4507259039973376.ingest.de.sentry.io/api/4507260561653840/security/?sentry_key=1e53178c1dba9b39147de4a21853a3e3"}],"include_subdomains":true}}',
        },
      },
    },
  },
})
