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
            name: 'preamble',
            title: 'Ingress',
            type: 'text',
        }),
        defineField({
            name: 'mainImage',
            title: 'Hovedbilde',
            type: 'image',
        }),
        defineField({
            name: 'content',
            title: 'Innhold',
            type: 'blockContent',
        })
    ],
})