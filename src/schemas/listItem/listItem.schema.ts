import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'listItem';
const schemaTitle = 'List Item';
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
      description: 'The title of the block.',
    }),
    defineField({
      name: 'item',
      title: 'Item',
      type: 'linkItem',
      validation: (rule) => rule.required(),
    }),
  ],
});
