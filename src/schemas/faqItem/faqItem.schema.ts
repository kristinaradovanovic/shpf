import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'faqItem';
const schemaTitle = 'Faq Item';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: SquareIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
});
