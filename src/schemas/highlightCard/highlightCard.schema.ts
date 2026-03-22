import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { highlightCardColorKeys } from '@lib/styles/variables/colors';

const blockName = 'highlightCard';

export default defineType({
  name: blockName,
  title: 'Highlight Card',
  icon: BlockContentIcon as any,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Icon for the card',
        },
      ],
      options: { hotspot: true },
    }),
    defineField({
      name: 'colorVariant',
      title: 'Color Variant',
      type: 'string',
      options: {
        list: Object.entries(highlightCardColorKeys).map(([key, value]) => ({
          title: key,
          value: value,
        })),
      },
      initialValue: 'White',
    }),
  ],
  preview: {
    select: {
      title: 'partnerName',
      media: 'image',
    },
  },
});
