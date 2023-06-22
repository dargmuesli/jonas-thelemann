import { test, expect } from '@playwright/test'

import { COOKIE_CONTROL_DEFAULT } from '../../utils/constants'

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: 'ncc_c',
      value: COOKIE_CONTROL_DEFAULT,
      domain: 'localhost',
      path: '/',
    },
  ])
})

test.describe('seo', () => {
  test('generates the open graph image', async ({ page }) => {
    await page.goto('/api/pages/og')
    await expect(page.getByTestId('is-loading')).toHaveAttribute(
      'data-is-loading',
      'false'
    )
    await page.getByRole('button', { name: 'Cookie control' }).isVisible()
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
