import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '@dargmuesli/nuxt-vio-testing/e2e/utils/tests'

const PAGE_PATH = '/privacy-policy'

testA11y(PAGE_PATH)
testPageLoad(PAGE_PATH)
testOgImage({
  de: 'o_l4qbvq.png',
  en: `a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.satori,description_Jonas+Thelemann's+portfolio.,title_Privacy+Policy,p_Ii9wcml2YWN5LXBvbGljeSI.png`,
})
testVisualRegression(PAGE_PATH)
