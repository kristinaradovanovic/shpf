import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const schemaName = 'testimonial';
const schemaTitle = 'Testimonial';

export default defineType({
  name: schemaName,
  title: schemaTitle,
  icon: BlockContentIcon as any,
  type: 'document',
  fields: [
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      title: 'Locale',
      type: 'string',
      /* readOnly: true, */
      /*  hidden: true, */
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return 'Language translation must be set, use the [Translations] button';
          }
          return true;
        }),
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the person who gave the testimonial',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'The role of the person who gave the testimonial',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'The company related to the person who gave the testimonial',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      company: 'company',
    },
    prepare(selection) {
      const { name, role, company } = selection;
      return {
        title: name,
        subtitle: `${role} at ${company}`,
      };
    },
  },
});
