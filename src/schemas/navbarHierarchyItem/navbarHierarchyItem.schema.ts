import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'navbarHierarchyItem';
const schemaTitle = 'Navbar Item';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: ComponentIcon as any,
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      description: 'The page to link to.',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return 'Page is required';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      pageTitle: 'page.node.title',
    },
    prepare(selection) {
      const { pageTitle } = selection;
      return {
        title: pageTitle,
        subtitle: 'Internal page',
      };
    },
  },
});
