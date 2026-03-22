import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

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
  ],
  preview: {
    select: {
      title: 'partnerName',
      media: 'image',
    },
  },
});
