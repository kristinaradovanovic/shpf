import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'quote';
const schemaTitle = 'Quote';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'image',
      title: 'Image',
      name: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      preview: {
        select: {
          title: 'asset.originalFilename',
          subtitle: 'alt',
          imageUrl: 'asset.url',
        },
      },
    }),
  ],
  preview: {
    select: {
      title: '_type',
      updatedAt: '_updatedAt',
    },
  },
});
