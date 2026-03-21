import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const blockName = 'SplitContentWithCtaBlock';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'contentItems',
      title: 'Content Items',
      type: 'array',
      of: [{ type: 'contentItem' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
