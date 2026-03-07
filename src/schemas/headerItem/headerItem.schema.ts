import { UlistIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'headerItem';
const schemaTitle = 'Header Item';
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
      description: 'The page this header item links to',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sublinks',
      title: 'Sublinks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
      description: 'The sublinks pages of this page',
    }),
  ],
  preview: {
    select: {
      title: 'page.node.title',
      sublinks: 'sublinks',
    },
    prepare(selection) {
      const { title, sublinks } = selection;
      return {
        title: title,
        subtitle: sublinks ? `Sublinks: ${sublinks.length}` : '',
      };
    },
  },
});
