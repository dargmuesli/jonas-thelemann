// @ts-check

import pluginJs from '@eslint/js'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginTypescript from 'typescript-eslint'

const configurationJs = pluginJs.configs.recommended
const configurationPrettier = pluginPrettierRecommended
const configurationTslint = [
  ...pluginTypescript.configs.strict,
  ...pluginTypescript.configs.stylistic,
]

export default pluginTypescript.config(
  configurationJs,
  configurationPrettier,
  ...configurationTslint,

  // general
  {
    rules: {
      'no-console': 'error',
    },
  },
)
