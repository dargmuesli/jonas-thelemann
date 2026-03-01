import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '@dargmuesli/nuxt-vio-testing/e2e/utils/tests'

const PAGE_PATH = '/legal-notice'

testA11y(PAGE_PATH)
testPageLoad(PAGE_PATH)
testOgImage({
  de: 'a_Ein+Bild+von+Jonas+Thelemann+und+der+Titel+der+Seite.,c_Default.satori,description_Portfolio+von+Jonas+Thelemann.,title_Impressum,p_Ii9kZS9sZWdhbC1ub3RpY2Ui.png',
  en: `a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.satori,description_Jonas+Thelemann's+portfolio.,title_Legal+notice,p_Ii9sZWdhbC1ub3RpY2Ui.png`,
})
testVisualRegression(PAGE_PATH)
