import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'titleWithKeywordsItem';
const schemaTitle = 'Title With Keywords Item';

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
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description below the keywords',
    }),
  ],
});
