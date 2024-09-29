import { test, expect } from '@playwright/test'

import { COOKIE_CONTROL_DEFAULT, SITE_URL } from '../../utils/constants'

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: 'ncc_c',
      value: COOKIE_CONTROL_DEFAULT,
      url: SITE_URL,
    },
  ])
})

test.describe('seo', () => {
  test('generates the open graph image', async ({ page }) => {
    await page.goto(
      `/__og-image__/${process.env.VIO_SERVER === 'static' ? 'static' : 'image'}/og.png`,
    )
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
