import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'frontpage',
    title: 'Forside',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Bilde',
            type: 'image',
            options: {
                hotspot: {
                    previews: [
                        { title: 'Forhåndsvisning', aspectRatio: 4 / 3 },
                    ]
                }
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
})