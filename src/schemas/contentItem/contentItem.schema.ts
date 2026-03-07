import { backgroundColorKeys } from '@lib/styles/variables/colors';
import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const blockName = 'contentItem';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
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
          description: 'Icon for the service category item',
        },
      ],
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: backgroundColorKeys['White'],
      options: {
        list: Object.keys(backgroundColorKeys),
      },
    }),
  ],
});
