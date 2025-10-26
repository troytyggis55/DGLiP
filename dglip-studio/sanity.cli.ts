import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'j9xh26we',
    dataset: 'production'
  },
  deployment: {
      autoUpdates: true
  },
})
