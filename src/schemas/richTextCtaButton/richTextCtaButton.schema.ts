import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { RichTextCTAButtonSchemaType } from './richTextCtaButton.types';
import { buttonColorKeys } from '@lib/styles/variables/colors';

const schemaName = 'richTextCtaButton';
const schemaTitle = 'RichText CTA Button';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: SquareIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'The text of the call-to-action button.',
    }),
    defineField({
      name: 'ctaType',
      title: 'CTA Type',
      type: 'string',
      options: {
        list: [
          { title: 'Mail', value: 'mail' },
          { title: 'Link', value: 'link' },
          { title: 'Page', value: 'page' },
          { title: 'Scroll', value: 'scroll' },
        ],
      },
      description: 'The type of the call-to-action button.',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      description: 'The URL of the call-to-action button.',
      hidden: ({ parent }) => (parent as RichTextCTAButtonSchemaType)?.ctaType !== 'link',
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as RichTextCTAButtonSchemaType)?.ctaType === 'link' && !value) {
            return 'CTA Link is required';
          }

          if (
            (context.parent as RichTextCTAButtonSchemaType)?.ctaType === 'link' &&
            !(value?.startsWith('http://') || value?.startsWith('https://'))
          ) {
            return 'Has to be a valid URL that starts with http or https';
          }

          return true;
        }),
    }),
    defineField({
      name: 'ctaMail',
      title: 'CTA Mail',
      type: 'string',
      description: 'The email address of the call-to-action button.',
      hidden: ({ parent }) => (parent as RichTextCTAButtonSchemaType)?.ctaType !== 'mail',
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as RichTextCTAButtonSchemaType)?.ctaType === 'mail' && !value) {
            return 'CTA Mail is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'ctaPage',
      title: 'CTA Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'The page to navigate to when the call-to-action button is clicked.',
      hidden: ({ parent }) => (parent as RichTextCTAButtonSchemaType)?.ctaType !== 'page',
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as RichTextCTAButtonSchemaType)?.ctaType === 'page' && !value) {
            return 'CTA Page is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'ctaScrollToIndex',
      title: 'CTA Scroll To',
      type: 'number',
      description: 'The index of the block to scroll to when the call-to-action button is clicked.',
      hidden: ({ parent }) => (parent as RichTextCTAButtonSchemaType)?.ctaType !== 'scroll',
      validation: (rule) =>
        rule
          .positive()
          .integer()
          .custom((value, context) => {
            if ((context.parent as RichTextCTAButtonSchemaType)?.ctaType !== 'scroll') return true;
            if (!value) {
              return 'Block index (larger than or equal to 1) is required';
            }

            if (value > 0 && !(context.document?.blocks as any)?.length) {
              return 'No blocks to scroll to';
            }
            if (
              value > 0 &&
              (context.document?.blocks as any)?.length &&
              value > (context.document?.blocks as any).length
            ) {
              return `Block index out of bounds. Max index: ${(context.document?.blocks as any).length}`;
            }
            return true;
          }),
    }),
    defineField({
      name: 'buttonColor',
      title: 'Button Color',
      type: 'string',
      options: {
        list: Object.keys(buttonColorKeys),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
  ],
});
