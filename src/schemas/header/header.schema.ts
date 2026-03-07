import { buttonColorKeys } from '@lib/styles/variables/colors';
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
      name: 'navSocials',
      title: 'Social links',
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
      name: 'navSocials',
      title: 'Social links',
      type: 'navSocial',
      description: 'The social links in the header',
      group: ['navSocials'],
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
      name: 'buttonColor',
      title: 'Button Color',
      type: 'string',
      options: {
        list: Object.keys(buttonColorKeys),
      },
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'The text to display on the CTA button, for example "Ge en gåva"',
      placeholder: 'Ge en gåva nu',
    }),
  ],
});
