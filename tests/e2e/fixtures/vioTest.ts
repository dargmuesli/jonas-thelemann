import { type Page, test, expect } from '@playwright/test'

import {
  COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT,
  TIMEZONE_DEFAULT,
} from '#tests/e2e/utils/constants'
import { jiti } from '#tests/playwright.config'

const constants = await jiti.import(
  './node_modules/@dargmuesli/nuxt-vio/utils/constants',
)
const {
  COOKIE_CONTROL_CONSENT_COOKIE_NAME,
  TESTING_COOKIE_NAME,
  TIMEZONE_COOKIE_NAME,
} = constants as {
  COOKIE_CONTROL_CONSENT_COOKIE_NAME: string
  TESTING_COOKIE_NAME: string
  TIMEZONE_COOKIE_NAME: string
}

const createDefaultPage = (page: Page) => {
  return {
    page,
    goto: async (
      url: string,
      options?: {
        cookieControl?: boolean
        isLoading?: boolean
      },
    ) => {
      await page.goto(url)

      // if (!options || options.cookieControl !== false) {
      //   await expect(
      //     page.getByRole('button', { name: 'Cookie control' }),
      //   ).toBeVisible()
      // }

      if (!options || options.isLoading !== false) {
        await expect(page.getByTestId('is-loading')).toHaveAttribute(
          'data-is-loading',
          'false',
        )
      }
    },
  }
}

export const vioTest = test.extend<{
  defaultPage: ReturnType<typeof createDefaultPage>
  _autoSnapshotSuffix: unknown
}>({
  defaultPage: async ({ page, context }, use) => {
    await context.addCookies([
      {
        domain: 'localhost',
        name: TESTING_COOKIE_NAME,
        path: '/',
        value: 'true',
      },
      {
        domain: 'localhost',
        name: TIMEZONE_COOKIE_NAME,
        path: '/',
        value: TIMEZONE_DEFAULT,
      },
      {
        domain: 'localhost',
        name: COOKIE_CONTROL_CONSENT_COOKIE_NAME,
        path: '/',
        value: COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT,
      },
    ])

    const defaultPage = createDefaultPage(page)

    await use(defaultPage)

    // After use a cleanup function could be run for data that has been created for the test
    // await cleanup()
  },
})
