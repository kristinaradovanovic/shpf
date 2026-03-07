import { EditIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'author';
const schemaTitle = 'Author';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: EditIcon as any,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().error('Please provide a name.'),
      description: 'The name of the author.',
      placeholder: 'Jessica Smith',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email().error('Please provide a valid email address.'),
      description: "The author's email address.",
      placeholder: 'name@example.com',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: "The author's role.",
      placeholder: 'eg. CEO',
    }),
  ],
});
