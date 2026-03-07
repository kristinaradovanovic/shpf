import { EditIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'expertise';
const schemaTitle = 'Expertise';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: EditIcon as any,
  type: 'document',
  groups: [{ name: 'blocks', title: 'Blocks' }],
  fields: [
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      title: 'Locale',
      type: 'string',
      readOnly: true,
      // hidden: true,
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return 'Language translation must be set, use the [Translations] button';
          }
          return true;
        }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the expertise',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
