import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '@dargmuesli/nuxt-vio-testing/e2e/utils/tests'

const PAGE_PATH = '/legal-notice'

testA11y(PAGE_PATH)
testPageLoad(PAGE_PATH)
testOgImage(PAGE_PATH)
testVisualRegression(PAGE_PATH)
