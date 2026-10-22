import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '@dargmuesli/nuxt-vio-testing/e2e/utils/tests'

const PAGE_PATH = '/projects/contributions'

testA11y(PAGE_PATH)
testOgImage({
  de: `/de${PAGE_PATH}`,
  en: PAGE_PATH,
})
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
