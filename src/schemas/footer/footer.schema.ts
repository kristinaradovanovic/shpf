import { imageField } from '@lib/fields/image-field/image-field';
import { backgroundColors } from '@lib/styles/variables/colors';
import { ThListIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'footer';
const schemaTitle = 'Footer';
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
      name: 'contact',
      title: 'Contact',
    },
    {
      name: 'navSocials',
      title: 'Social links',
    },
    {
      name: 'footerItems',
      title: 'Footer items',
    },
    {
      name: 'legal',
      title: 'Legal',
    },
    // {
    //   name: 'newsletter',
    //   title: 'Newsletter',
    // },
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
      name: 'title',
      title: 'Main Footer Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: ['main'],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
      group: ['main'],
    }),
    defineField(
      imageField({
        image: {
          imageTitle: 'Logotype',
          imageDescription: 'The logotype for the footer',
          required: true,
        },
        alt: {
          altTitle: 'Logotype alternative text',
          altDescription: 'Important for SEO and accessibility.',
          required: false,
        },
        group: ['main'],
      }),
    ),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: Object.keys(backgroundColors),
      },
      validation: (rule) => rule.required(),
      group: ['main'],
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details',
      type: 'contactDetails',
      group: ['contact'],
    }),
    defineField({
      name: 'navSocials',
      title: 'Nav Socials',
      type: 'navSocial',
      description: 'The social links in the footer',
      group: ['navSocials'],
    }),
    defineField({
      name: 'footerItems',
      title: 'Footer items',
      type: 'array',
      description: 'The items in the Footer',
      of: [{ type: 'footerItem' }],
      group: ['footerItems'],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      description: 'The copyright text',
      group: ['legal'],
    }),
    defineField({
      name: 'policies',
      title: 'Legal info',
      type: 'navItem',
      description: 'A list of links to the privacy policy, cookie etc pages in the footer',
      group: ['legal'],
    }),
    // defineField({
    //   name: 'newsletter',
    //   title: 'Newsletter',
    //   type: 'newsletter',
    //   group: ['newsletter'],
    // }),
  ],
});
