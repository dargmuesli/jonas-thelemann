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
testOgImage(PAGE_PATH)
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)

vioTest.describe('internationalization', () => {
  const textEnglish =
    'Director and founder @maevsi · Ninjaneer · M.Sc. Computer Science'
  const textGerman =
    'Geschäftsführer und Gründer @maevsi · Ninjaneer · M.Sc. Informatik'

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
