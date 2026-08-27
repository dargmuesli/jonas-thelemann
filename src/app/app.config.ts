const address = {
  city: '34121 Kassel',
  name: 'Jonas Thelemann',
  street: 'Virchowstraße 4',
}

export default defineAppConfig({
  vio: {
    seo: {
      ogImage: {
        defaultComponent: 'Default.takumi',
      },
    },
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
  },
})
