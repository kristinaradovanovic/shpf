import { imageField } from '@lib/fields/image-field/image-field';
import { backgroundColors, buttonColors } from '@lib/styles/variables/colors';
import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const blockName = 'cardItem';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField(imageField({ image: { required: false }, alt: { required: false } })),
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
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButtonItem',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: Object.keys(backgroundColors),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonColor',
      title: 'Button Color',
      type: 'string',
      options: {
        list: Object.keys(buttonColors),
      },
    }),
  ],
});
