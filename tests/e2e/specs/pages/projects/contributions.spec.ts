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
    de: 'a_Ein+Bild+von+Jonas+Thelemann+und+der+Titel+der+Seite.,c_Default.takumi,description_~QmVpdHLDpGdlIHp1IDEwIMO2ZmZlbnRsaWNoZW4gU29mdHdhcmVwcm9qZWt0ZW4u,title_Jonas+Thelemann,p_Ii9kZS9wcm9qZWN0cy9jb250cmlidXRpb25zIg,s_qnzKFNYGDahFOfrd.png',
    en: 'a_A+picture+of+Jonas+Thelemann+and+the+title+of+the+page.,c_Default.takumi,description_Contributions+to+10+public+software+projects.,title_Jonas+Thelemann,p_Ii9wcm9qZWN0cy9jb250cmlidXRpb25zIg,s_qdp1c3Ri6jnVxxd-.png',
  },
  static: {
    de: 'o_d3999ee8a66c2074.png',
    en: 'o_a584d3e571b7f4e3.png',
  },
})
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)
