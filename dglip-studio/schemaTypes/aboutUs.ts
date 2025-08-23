import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'aboutUs',
    title: 'Om oss',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tittel',
            type: 'string',
            initialValue: 'Om oss',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Innhold',
            type: 'blockContent',
        })
    ],
})