import { imageField } from '@lib/fields/image-field/image-field';
import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const blockName = 'partnerItem';

export default defineType({
  name: blockName,
  title: 'Partner Item',
  icon: BlockContentIcon as any,
  type: 'document',
  fields: [
    defineField(imageField({ image: { required: false }, alt: { required: false } })),
    defineField({
      name: 'partnerName',
      title: 'Partner Name',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'partnerName',
      media: 'image',
    },
  },
});
