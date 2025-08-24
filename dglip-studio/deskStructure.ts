import { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .id('about')
        .schemaType('aboutUs')
        .title('Om oss')
        .child(
          S.editor()
            .id('about')
            .schemaType('aboutUs')
            .documentId('aboutUs')
        ),
      S.listItem()
        .id('frontpage')
        .schemaType('frontpage')
        .title('Forside')
        .child(
          S.editor()
            .id('frontpage')
            .schemaType('frontpage')
            .documentId('frontpage')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['aboutUs', 'frontpage'].includes(item.getId()!)
      ),
    ]);
