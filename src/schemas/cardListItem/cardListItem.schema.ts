import { imageField } from '@lib/fields/image-field/image-field';
import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const blockName = 'cardListItem';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField(imageField({ image: { required: false }, alt: { required: false } })),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: ['left', 'right'],
      },
      validation: (rule) => rule.required(),
    }),
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
      name: 'checklistItems',
      title: 'Checklist Items',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'ctaButtonItem' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
