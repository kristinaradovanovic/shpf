import { UlistIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'navItem';
const schemaTitle = 'Footer Item';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: UlistIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Nav item title',
      type: 'string',
    }),
    defineField({
      name: 'isTitleHidden',
      title: 'Hide name?',
      type: 'boolean',
      description: 'Hide the title of the nav item?',
      initialValue: false,
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
      description: 'The pages in the nav item.',
    }),
  ],
});
