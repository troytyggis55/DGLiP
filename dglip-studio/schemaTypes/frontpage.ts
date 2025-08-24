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
        defineField({
            name: 'partners',
            title: 'Aktive partnere',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'partner' } }],
            description: 'Velg partnere som skal vises på forsiden',
        })
    ],
})