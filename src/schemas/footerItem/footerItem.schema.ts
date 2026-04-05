import { UlistIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'footerItem';
const schemaTitle = 'Footer Item';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: UlistIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'The page this footer item links to',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'page.node.title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  },
});
