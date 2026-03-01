import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '@dargmuesli/nuxt-vio-testing/e2e/utils/tests'

const PAGE_PATH = '/projects/contributions'

testA11y(PAGE_PATH)
testOgImage({
  de: 'o_nty7in.png',
  en: 'a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.satori,description_Contributions+to+10+public+software+projects.,title_Jonas+Thelemann,p_Ii9wcm9qZWN0cy9jb250cmlidXRpb25zIg.png',
})
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
