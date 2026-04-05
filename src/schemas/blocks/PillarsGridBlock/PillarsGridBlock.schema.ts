import { BlockContentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { ImagePreviewComponent } from '@schemas/SanityComponents';

const blockName = 'PillarsGridBlock';

export default defineType({
  name: blockName,
  title: blockName,
  icon: BlockContentIcon as any,
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTagline',
      title: 'Section tagline',
      description:
        'A short, descriptive text that appears above the title to provide context or highlight the content of the card.',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'highlightCards',
      title: 'Highlight Cards',
      type: 'array',
      of: [{ type: 'highlightCard' }],
      validation: (rule) => rule.required().min(3).max(4),
    }),
  ],
  preview: {
    select: {
      title: '_type',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        media: ImagePreviewComponent({
          src: `/block-previews/${blockName}.webp`,
          alt: `${blockName} Preview`,
        }),
      };
    },
  },
});
