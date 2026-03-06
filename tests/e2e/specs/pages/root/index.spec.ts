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
    de: 'a_Ein+Bild+von+Jonas+Thelemann+und+der+Titel+der+Seite.,c_Default.takumi,description_Gesch%C3%A4ftsf%C3%BChrer+%40maevsi+%C2%B7+%C3%96kosystem+%40Nuxt+%C2%B7+M.Sc.+Informatik,title_Jonas+Thelemann,p_Ii9kZSI.png',
    en: 'a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.takumi,description_Director+%40maevsi+%C2%B7+Ecosystem+%40Nuxt+%C2%B7+M.Sc.+Computer+Science,title_Jonas+Thelemann.png',
  },
  static: {
    de: 'o_d33hz.png',
    en: 'o_7pu0sx.png',
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
