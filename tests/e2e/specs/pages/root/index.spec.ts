import { expect } from '@playwright/test'

import fixture from '../../../fixtures/githubApi.json' assert { type: 'json' }
import { PAGE_READY } from '../../../utils/constants'
import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'
import { vioTest } from '#tests/e2e/fixtures/vioTest'

const PAGE_PATH = '/'

testA11y(PAGE_PATH)
testOgImage(PAGE_PATH)
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)

vioTest.beforeEach(async ({ context }) => {
  await context.route(
    'https://api.github.com/users/dargmuesli/repos?per_page=1',
    (route) =>
      route.fulfill({
        status: 200,
        body: fixture.toString(),
        headers: {
          link: '<https://api.github.com/user/4778485/repos?per_page=1&page=2>; rel="next", <https://api.github.com/user/4778485/repos?per_page=1&page=1337>; rel="last"',
        },
      }),
  )
})

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
