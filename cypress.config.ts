import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config)

      config.env = {
        ...process.env,
        ...config.env,
      }

      return config
    },
    video: false,
  },
  env: {
    ALWAYS_GENERATE_DIFF: false,
    failSilently: false,
  },
  screenshotsFolder: './cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,
})
