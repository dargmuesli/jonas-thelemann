import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

export const CYPRESS_BASE_URL = 'http://localhost:3000'
export const LOCALES: LocaleObject[] = [
  {
    code: 'en',
    name: 'English',
    iso: 'en', // Will be used as catchall locale by default.
  },
  {
    code: 'de',
    name: 'Deutsch',
    iso: 'de',
  },
]
