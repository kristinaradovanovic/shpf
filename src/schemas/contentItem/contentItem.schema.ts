import { imageField } from '@lib/fields/image-field/image-field';
import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const blockName = 'contentItem';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField(imageField({ image: { required: false }, alt: { required: false } })),
    defineField({
      name: 'sectionTagline',
      title: 'Section tagline',
      description:
        'A short, descriptive text that appears above the title to provide context or highlight the content of the card.',
      type: 'string',
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
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButtonItem',
    }),
  ],
});
