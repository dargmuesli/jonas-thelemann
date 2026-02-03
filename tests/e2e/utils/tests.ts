import { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { consola } from 'consola'
import { joinURL } from 'ufo'

import { vioTest } from '../fixtures/vioTest'

export const testA11y = (url: string) =>
  vioTest.describe('a11y', () => {
    vioTest(
      'should not have any automatically detectable accessibility issues',
      async ({ defaultPage }) => {
        await defaultPage.goto(url)

        const accessibilityScanResults = await new AxeBuilder({
          page: defaultPage.page,
        }).analyze()

        if (accessibilityScanResults.violations.length) {
          consola.log(
            accessibilityScanResults.violations,
            accessibilityScanResults.violations[0].nodes,
          )
        }
        expect(accessibilityScanResults.violations.length).toEqual(0)
      },
    )
  })

export const testOgImage = (url: string) =>
  vioTest.describe('visual regression', () => {
    vioTest('generates the open graph image', async ({ page }) => {
      await page.goto(
        joinURL(
          `/__og-image__/${process.env.VIO_SERVER === 'static:test' ? 'static' : 'image'}`,
          url,
          '/og.png',
        ),
      )
      await expect(page).toHaveScreenshot({ fullPage: true })

      await page.goto(
        joinURL(
          `/__og-image__/${process.env.VIO_SERVER === 'static:test' ? 'static' : 'image'}/de`,
          url,
          '/og.png',
        ),
      )
      await expect(page).toHaveScreenshot({ fullPage: true })
    })
  })

export const testPageLoad = (url: string, status = 200) =>
  vioTest.describe('page load', () => {
    vioTest('loads the page successfully', async ({ request }) => {
      const resp = await request.get(url)
      expect(resp.status()).toBe(status)
    })
  })

export const testVisualRegression = (url: string) =>
  vioTest.describe('visual regression', () => {
    vioTest('looks as before', async ({ defaultPage }) => {
      await defaultPage.goto(url)

      await expect(defaultPage.page).toHaveScreenshot({
        timeout: 10000,
      })
    })
  })
