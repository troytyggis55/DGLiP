import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'course',
    title: 'Kurs',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tittel',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
            description: 'Unik identifikator for kurset, brukt i URL. Genereres automatisk fra' +
                ' tittelen. Unngå å redigere selv.',
        }),
        defineField({
            name: 'startDate',
            title: 'Startdato',
            type: 'datetime',
        }),
        defineField({
            name: 'endDate',
            title: 'Sluttdato',
            type: 'datetime',
        }),
        defineField({
            name: 'location',
            title: 'Sted',
            type: 'geopoint',
        }),
        defineField({
            name: 'mainImage',
            title: 'Forsidebilde',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'partner',
            title: 'Samarbeidspartner',
            type: 'reference',
            to: [{type: 'partner'}],
            description: 'Velg en samarbeidspartnere for dette kurset.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'importantInfo',
            title: 'Viktig informasjon',
            type: 'blockContent',
            description: 'Uthevet informasjon som vises utenfor brødteksten. Påmeldingsinformasjon, pris, osv.',
        }),
        defineField({
            name: 'preamble',
            title: 'Ingress',
            type: 'text',
            description: 'Kort beskrivelse av kurset, vises på kortet og som ingress på kurssiden.',
        }),
        defineField({
            name: 'body',
            title: 'Brødtekst',
            type: 'blockContent',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'preamble',
            startDate: 'startDate',
            endDate: 'endDate',
            media: 'mainImage',
        },
    },
})
