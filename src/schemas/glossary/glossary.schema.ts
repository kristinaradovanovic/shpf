import { StringIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'glossary';
const schemaTitle = 'Glossary';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: StringIcon as any,
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The term to be defined.',
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The definition of the term.',
    }),
  ],
});
