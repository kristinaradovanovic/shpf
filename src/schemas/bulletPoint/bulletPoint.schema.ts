import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'bulletPoint';
const schemaTitle = 'Bullet Point';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: SquareIcon as any,
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
          description: 'Icon for the bullet point',
        },
      ],
      options: { hotspot: true },
    }),
  ],
});
