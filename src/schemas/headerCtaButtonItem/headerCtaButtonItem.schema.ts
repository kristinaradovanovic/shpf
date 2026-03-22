import { SquareIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'headerCtaButtonItem';
const schemaTitle = 'Header CTA Button Item';

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
      name: 'ctaPage',
      title: 'CTA Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'The page to navigate to when the call-to-action button is clicked.',
      validation: (rule) => rule.required().error('CTA Page is required'),
    }),
  ],
});
