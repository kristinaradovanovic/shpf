import { imageField } from '@lib/fields/image-field/image-field';
import { backgroundColors, buttonColors } from '@lib/styles/variables/colors';
import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'imageCtaCard';
const schemaTitle = 'Image CTA Card';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: SquareIcon as any,
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
    defineField(
      imageField({
        image: {
          required: true,
          imageFieldName: 'image',
          imageTitle: 'Image',
        },
        alt: { required: true },
      }),
    ),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButtonItem',
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required(),
    }),
  ],
});
