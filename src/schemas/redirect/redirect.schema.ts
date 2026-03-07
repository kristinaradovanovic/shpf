import { TransferIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'redirect';
const schemaTitle = 'Redirect';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: TransferIcon as any,
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'From',
      type: 'string',
      description: 'The path you want to redirect from',
      // must be a string that is like a slug /path or /path/to
      validation: (rule) =>
        rule
          .required()
          .regex(/^\/[a-z0-9-]*(\/[a-z0-9-]+)*$/)
          .error('Must be a valid path, e.g. /path/to'),
    }),
    defineField({
      name: 'destination',
      title: 'To',
      type: 'string',
      description: 'The path you want to redirect to',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\/[a-z0-9-]*(\/[a-z0-9-]+)*$/)
          .error('Must be a valid path, e.g. /path/to'),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent?',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
      description: 'Should the redirect be permanent (301) or temporary (302)?',
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
    },
    prepare({ source, destination, permanent }) {
      return {
        title: source,
        subtitle: `${destination} (${permanent ? 'Permanent' : 'Temporary'})`,
      };
    },
  },
});
