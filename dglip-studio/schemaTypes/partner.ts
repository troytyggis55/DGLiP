import { defineType, defineField } from "sanity";

export default defineType({
    name: "partner",
    title: "Samarbeidspartner",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Navn",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "image",
            title: "Bilde",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "description",
            title: "Beskrivelse",
            type: "text",
            validation: Rule => Rule.required().max(800).warning('Beskrivelsen bør være kortere enn 800 tegn.'),
        }),
        defineField({
            name: "website",
            title: "Lenke",
            type: "url",
        }),
    ],
});
