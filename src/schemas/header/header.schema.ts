import { ThListIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'header';
const schemaTitle = 'Header';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: ThListIcon as any,
  type: 'document',
  groups: [
    {
      name: 'main',
      title: 'Main',
    },
    {
      name: 'headerItems',
      title: 'Header items',
    },
  ],
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
      name: 'headerItems',
      title: 'Header items',
      type: 'array',
      description: 'The items in the header',
      of: [{ type: 'headerItem' }],
      group: ['headerItems'],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'headerCtaButtonItem',
      group: ['main'],
    }),
  ],
});
