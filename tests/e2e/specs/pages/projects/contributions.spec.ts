import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/projects/contributions'

testA11y(PAGE_PATH)
testOgImage(PAGE_PATH)
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
