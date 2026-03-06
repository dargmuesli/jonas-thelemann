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
  dynamic: {
    de: 'a_Ein+Bild+von+Jonas+Thelemann+und+der+Titel+der+Seite.,c_Default.takumi,description_Portfolio+von+Jonas+Thelemann.,title_Datenschutzerkl%C3%A4rung,p_Ii9kZS9wcml2YWN5LXBvbGljeSI.png',
    en: `a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.takumi,description_Jonas+Thelemann's+portfolio.,title_Privacy+Policy,p_Ii9wcml2YWN5LXBvbGljeSI.png`,
  },
  static: {
    de: 'o_dghnsj.png',
    en: `a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.takumi,description_Jonas+Thelemann's+portfolio.,title_Privacy+Policy,p_Ii9wcml2YWN5LXBvbGljeSI.png`,
  },
})
testVisualRegression(PAGE_PATH)
