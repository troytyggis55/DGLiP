import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {googleMapsInput} from '@sanity/google-maps-input'

export default defineConfig({
  name: 'default',
  title: 'DGLiP',

  projectId: 'j9xh26we',
  dataset: 'production',

  plugins: [
      structureTool(),
      visionTool(),
      googleMapsInput({
            apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY || '',
      }),
  ],

  schema: {
    types: schemaTypes,
  },
})
