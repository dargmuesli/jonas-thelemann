import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '@dargmuesli/nuxt-vio-testing/e2e/utils/tests'

const PAGE_PATH = '/projects/contributions'

testA11y(PAGE_PATH)
testOgImage({
  dynamic: {
    de: 'a_Ein+Bild+von+Jonas+Thelemann+und+der+Titel+der+Seite.,c_Default.takumi,description_Beitr%C3%A4ge+zu+10+%C3%B6ffentlichen+Softwareprojekten.,title_Jonas+Thelemann,p_Ii9kZS9wcm9qZWN0cy9jb250cmlidXRpb25zIg.png',
    en: 'a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.takumi,description_Contributions+to+10+public+software+projects.,title_Jonas+Thelemann,p_Ii9wcm9qZWN0cy9jb250cmlidXRpb25zIg.png',
  },
  static: {
    de: 'o_svpevy.png',
    en: 'a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.takumi,description_Contributions+to+10+public+software+projects.,title_Jonas+Thelemann,p_Ii9wcm9qZWN0cy9jb250cmlidXRpb25zIg.png',
  },
})
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
