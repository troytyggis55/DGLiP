import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {googleMapsInput} from '@sanity/google-maps-input'
import {structure} from './deskStructure'

export default defineConfig({
    name: 'default',
    title: 'DGLiP',

    projectId: 'j9xh26we',
    dataset: 'production',

    plugins: [
        structureTool({structure}),
        visionTool(),
        googleMapsInput({
            apiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY || '',
        }),
    ],

    schema: {
        types: schemaTypes,
    },

    document: {
        newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'aboutUs'),
    },
})
