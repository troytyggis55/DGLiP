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
            .id('aboutUs')
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
      S.listItem()
        .id('imageCarousel')
        .schemaType('imageCarousel')
        .title('Bildekarusell')
        .child(
            S.editor()
                .id('imageCarousel')
                .schemaType('imageCarousel')
                .documentId('imageCarousel')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['aboutUs', 'frontpage', 'imageCarousel'].includes(item.getId()!)
      ),
    ]);
