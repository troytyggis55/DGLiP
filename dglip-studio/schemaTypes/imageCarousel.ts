import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'imageCarousel',
    title: 'Bildekarusell',
    type: 'document',
    fields: [
        defineField({
            name: 'images',
            title: 'Bilder',
            type: 'array',
            of: [{
                type: 'image',
                options: {
                    hotspot: {
                        previews: [
                            { title: 'Forhåndsvisning', aspectRatio: 9 / 16 },
                        ]
                    }
                },
            }],

        }),
    ],
})