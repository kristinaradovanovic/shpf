import { WrenchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'keyword';
const schemaTitle = 'SEO Keyword';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: WrenchIcon as any,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Keyword name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The name of the SEO keyword.',
    }),
  ],
});
