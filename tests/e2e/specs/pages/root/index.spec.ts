import { vioTest } from '@dargmuesli/nuxt-vio-testing/e2e/fixtures/vioTest'
import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '@dargmuesli/nuxt-vio-testing/e2e/utils/tests'
import { PAGE_READY } from '@dargmuesli/nuxt-vio-testing/e2e/utils/constants'
import { expect } from '@playwright/test'

const PAGE_PATH = '/'

testA11y(PAGE_PATH)
testOgImage({
  dynamic: {
    de: 'a_Ein+Bild+von+Jonas+Thelemann+und+der+Titel+der+Seite.,c_Default.takumi,description_~R2VzY2jDpGZ0c2bDvGhyZXIgQG1hZXZzaSDCtyDDlmtvc3lzdGVtIEBOdXh0IMK3IE0uU2MuIEluZm9ybWF0aWs,title_Jonas+Thelemann,p_Ii9kZSI,s_BPaTRn8nz4pTnT9o.png',
    en: 'a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.takumi,description_~RGlyZWN0b3IgQG1hZXZzaSDCtyBFY29zeXN0ZW0gQE51eHQgwrcgTS5TYy4gQ29tcHV0ZXIgU2NpZW5jZQ,title_Jonas+Thelemann,s_S6n9rd3Wee4ODKKd.png',
  },
  static: {
    de: 'o_6781f89ecf4b05d3.png',
    en: 'o_734c8f126f2b3a9d.png',
  },
})
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)

vioTest.describe('internationalization', () => {
  const textEnglish =
    'Director @maevsi · Ecosystem @Nuxt · M.Sc. Computer Science'
  const textGerman =
    'Geschäftsführer @maevsi · Ökosystem @Nuxt · M.Sc. Informatik'

  vioTest('displays English translations', async ({ defaultPage }) => {
    await defaultPage.goto('/')
    await expect(defaultPage.page.getByText(textEnglish)).toBeVisible()
  })

  vioTest('displays German translations', async ({ defaultPage }) => {
    await defaultPage.goto('/de')
    await expect(defaultPage.page.getByText(textGerman)).toBeVisible()
  })
})

vioTest.describe('visual regression', () => {
  vioTest('displays the cookie banner', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
