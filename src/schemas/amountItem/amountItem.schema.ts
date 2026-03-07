import { NumberIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'amountItem';
const schemaTitle = 'Amount Item';
export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: NumberIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
});
