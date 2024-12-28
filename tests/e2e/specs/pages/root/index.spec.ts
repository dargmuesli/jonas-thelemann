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
    'CEO/CTO and founder of maevsi · Ninjaneer · Master of Science in Computer Science'
  const textGerman =
    'CEO/CTO und Gründer von maevsi · Ninjaneer · Master of Science der Informatik'

  vioTest('displays English translations', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(textEnglish)).toBeVisible()
  })

  vioTest('displays German translations', async ({ page }) => {
    await page.goto('/de')
    await expect(page.getByText(textGerman)).toBeVisible()
  })
})

vioTest.describe('visual regression', () => {
  vioTest('displays the cookie banner', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
